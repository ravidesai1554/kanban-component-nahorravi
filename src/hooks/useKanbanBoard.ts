import { useState, useCallback } from 'react';
import { KanbanTask, KanbanColumn, Priority, TaskStatus } from '@/components/KanbanBoard/KanbanBoard.types';
import { reorderTasks, moveTaskBetweenColumns } from '@/utils/task.utils';

export const useKanbanBoard = (initialColumns: KanbanColumn[], initialTasks: Record<string, KanbanTask>) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [tasks, setTasks] = useState<Record<string, KanbanTask>>(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set());

  const moveTask = useCallback(
    (taskId: string, fromColumnId: string, toColumnId: string, fromIndex: number, toIndex: number) => {
      setColumns((prevColumns) => {
        const newColumns = [...prevColumns];
        const fromColumn = newColumns.find((col) => col.id === fromColumnId);
        const toColumn = newColumns.find((col) => col.id === toColumnId);

        if (!fromColumn || !toColumn) return prevColumns;

        if (fromColumnId === toColumnId) {
          // Reorder within same column
          fromColumn.taskIds = reorderTasks(fromColumn.taskIds, fromIndex, toIndex);
        } else {
          // Move between columns
          const result = moveTaskBetweenColumns(
            fromColumn.taskIds,
            toColumn.taskIds,
            fromIndex,
            toIndex
          );
          fromColumn.taskIds = result.source;
          toColumn.taskIds = result.destination;

          // Update task status
          setTasks((prevTasks) => ({
            ...prevTasks,
            [taskId]: {
              ...prevTasks[taskId],
              status: toColumn.status,
            },
          }));
        }

        return newColumns;
      });
    },
    []
  );

  const addTask = useCallback((task: Omit<KanbanTask, 'id' | 'createdAt'>) => {
    const newTask: KanbanTask = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date(),
    };

    setTasks((prev) => ({
      ...prev,
      [newTask.id]: newTask,
    }));

    setColumns((prev) =>
      prev.map((col) =>
        col.status === task.status
          ? { ...col, taskIds: [...col.taskIds, newTask.id] }
          : col
      )
    );

    return newTask.id;
  }, []);

  const updateTask = useCallback((taskId: string, updates: Partial<KanbanTask>) => {
    setTasks((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        ...updates,
      },
    }));

    // If status changed, move task to new column
    if (updates.status && updates.status !== tasks[taskId].status) {
      const oldStatus = tasks[taskId].status;
      const newStatus = updates.status;

      setColumns((prev) =>
        prev.map((col) => {
          if (col.status === oldStatus) {
            return {
              ...col,
              taskIds: col.taskIds.filter((id) => id !== taskId),
            };
          }
          if (col.status === newStatus) {
            return {
              ...col,
              taskIds: [...col.taskIds, taskId],
            };
          }
          return col;
        })
      );
    }
  }, [tasks]);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => {
      const newTasks = { ...prev };
      delete newTasks[taskId];
      return newTasks;
    });

    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        taskIds: col.taskIds.filter((id) => id !== taskId),
      }))
    );

    setSelectedTaskIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(taskId);
      return newSet;
    });
  }, []);

  const duplicateTask = useCallback((taskId: string) => {
    const originalTask = tasks[taskId];
    if (!originalTask) return;

    const newTask: KanbanTask = {
      ...originalTask,
      id: `task-${Date.now()}`,
      title: `${originalTask.title} (Copy)`,
      createdAt: new Date(),
    };

    setTasks((prev) => ({
      ...prev,
      [newTask.id]: newTask,
    }));

    setColumns((prev) =>
      prev.map((col) =>
        col.status === originalTask.status
          ? { ...col, taskIds: [...col.taskIds, newTask.id] }
          : col
      )
    );

    return newTask.id;
  }, [tasks]);

  const bulkDeleteTasks = useCallback((taskIds: string[]) => {
    setTasks((prev) => {
      const newTasks = { ...prev };
      taskIds.forEach((id) => delete newTasks[id]);
      return newTasks;
    });

    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        taskIds: col.taskIds.filter((id) => !taskIds.includes(id)),
      }))
    );

    setSelectedTaskIds(new Set());
  }, []);

  const toggleTaskSelection = useCallback((taskId: string) => {
    setSelectedTaskIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  }, []);

  const selectAllTasks = useCallback(() => {
    setSelectedTaskIds(new Set(Object.keys(tasks)));
  }, [tasks]);

  const clearSelection = useCallback(() => {
    setSelectedTaskIds(new Set());
  }, []);

  const getFilteredTasks = useCallback(() => {
    let filtered = Object.values(tasks);

    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.assignee?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter((task) => task.priority === filterPriority);
    }

    return filtered.reduce((acc, task) => {
      acc[task.id] = task;
      return acc;
    }, {} as Record<string, KanbanTask>);
  }, [tasks, searchQuery, filterPriority]);

  return {
    columns,
    tasks,
    searchQuery,
    filterPriority,
    selectedTaskIds,
    setSearchQuery,
    setFilterPriority,
    moveTask,
    addTask,
    updateTask,
    deleteTask,
    duplicateTask,
    bulkDeleteTasks,
    toggleTaskSelection,
    selectAllTasks,
    clearSelection,
    getFilteredTasks,
  };
};
