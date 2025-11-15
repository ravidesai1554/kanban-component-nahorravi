import { useEffect, useCallback, useRef } from 'react';
import { KanbanColumn, KanbanTask } from '@/components/KanbanBoard/KanbanBoard.types';

interface UseKeyboardNavigationProps {
  columns: KanbanColumn[];
  tasks: Record<string, KanbanTask>;
  onTaskEdit: (task: KanbanTask) => void;
  onCloseModal: () => void;
  isModalOpen: boolean;
  selectedTaskIds: Set<string>;
  selectAllTasks: () => void;
  clearSelection: () => void;
  bulkDeleteTasks: (taskIds: string[]) => void;
}

export const useKeyboardNavigation = ({
  columns,
  tasks,
  onTaskEdit,
  onCloseModal,
  isModalOpen,
  selectedTaskIds,
  selectAllTasks,
  clearSelection,
  bulkDeleteTasks,
}: UseKeyboardNavigationProps) => {
  const currentFocusRef = useRef<{ columnIndex: number; taskIndex: number }>({
    columnIndex: 0,
    taskIndex: 0,
  });

  const focusTask = useCallback((columnIndex: number, taskIndex: number) => {
    const column = columns[columnIndex];
    if (!column) return;

    const taskId = column.taskIds[taskIndex];
    if (!taskId) return;

    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`) as HTMLElement;
    if (taskElement) {
      taskElement.focus();
      currentFocusRef.current = { columnIndex, taskIndex };
    }
  }, [columns]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Escape key - close modal or clear selection
    if (e.key === 'Escape') {
      if (isModalOpen) {
        onCloseModal();
      } else if (selectedTaskIds.size > 0) {
        clearSelection();
      }
      return;
    }

    // Don't handle other shortcuts when modal is open or when typing in inputs
    if (isModalOpen || (e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
      return;
    }

    const { columnIndex, taskIndex } = currentFocusRef.current;
    const currentColumn = columns[columnIndex];

    // Arrow key navigation
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextTaskIndex = Math.min(taskIndex + 1, (currentColumn?.taskIds.length || 1) - 1);
      focusTask(columnIndex, nextTaskIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevTaskIndex = Math.max(taskIndex - 1, 0);
      focusTask(columnIndex, prevTaskIndex);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextColumnIndex = Math.min(columnIndex + 1, columns.length - 1);
      focusTask(nextColumnIndex, 0);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevColumnIndex = Math.max(columnIndex - 1, 0);
      focusTask(prevColumnIndex, 0);
    }
    // Home - jump to first task in column
    else if (e.key === 'Home') {
      e.preventDefault();
      focusTask(columnIndex, 0);
    }
    // End - jump to last task in column
    else if (e.key === 'End') {
      e.preventDefault();
      const lastTaskIndex = (currentColumn?.taskIds.length || 1) - 1;
      focusTask(columnIndex, lastTaskIndex);
    }
    // Enter or Space - open task modal
    else if (e.key === 'Enter' || e.key === ' ') {
      const taskId = currentColumn?.taskIds[taskIndex];
      if (taskId && tasks[taskId]) {
        e.preventDefault();
        onTaskEdit(tasks[taskId]);
      }
    }
    // Ctrl/Cmd + A - select all tasks
    else if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
      e.preventDefault();
      selectAllTasks();
    }
    // Delete or Backspace - bulk delete selected tasks
    else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedTaskIds.size > 0) {
      e.preventDefault();
      if (confirm(`Delete ${selectedTaskIds.size} selected task(s)?`)) {
        bulkDeleteTasks(Array.from(selectedTaskIds));
      }
    }
  }, [
    columns,
    tasks,
    isModalOpen,
    onTaskEdit,
    onCloseModal,
    selectedTaskIds,
    selectAllTasks,
    clearSelection,
    bulkDeleteTasks,
    focusTask,
  ]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { focusTask };
};
