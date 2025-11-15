import React, { useState, useCallback } from 'react';
import { KanbanColumn } from './KanbanColumn';
import { TaskModal } from './TaskModal';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useKanbanBoard } from '@/hooks/useKanbanBoard';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { KanbanTask, TaskStatus, KanbanColumn as Column } from './KanbanBoard.types';
import { Search, Filter } from 'lucide-react';

interface KanbanBoardProps {
  initialColumns: Column[];
  initialTasks: Record<string, KanbanTask>;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialColumns, initialTasks }) => {
  const {
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
  } = useKanbanBoard(initialColumns, initialTasks);

  const {
    isDragging,
    draggedTaskId,
    draggedFromColumn,
    dragOverColumn,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragAndDrop();

  const [selectedTask, setSelectedTask] = useState<KanbanTask | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createTaskStatus, setCreateTaskStatus] = useState<TaskStatus>('todo');

  const filteredTasks = getFilteredTasks();

  const handleTaskEdit = useCallback((task: KanbanTask) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  }, []);

  const handleAddTask = useCallback((status: TaskStatus) => {
    setSelectedTask(null);
    setCreateTaskStatus(status);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTask(null);
  }, []);

  const handleDrop = useCallback(
    (toColumnId: string, toIndex: number) => {
      if (!draggedTaskId || !draggedFromColumn) return;

      const fromColumn = columns.find((col) => col.id === draggedFromColumn);
      const toColumn = columns.find((col) => col.id === toColumnId);

      if (!fromColumn || !toColumn) return;

      const fromIndex = fromColumn.taskIds.indexOf(draggedTaskId);
      if (fromIndex === -1) return;

      moveTask(draggedTaskId, draggedFromColumn, toColumnId, fromIndex, toIndex);
      handleDragEnd();
    },
    [draggedTaskId, draggedFromColumn, columns, moveTask, handleDragEnd]
  );

  // Keyboard navigation
  useKeyboardNavigation({
    columns,
    tasks,
    onTaskEdit: handleTaskEdit,
    onCloseModal: handleModalClose,
    isModalOpen,
    selectedTaskIds,
    selectAllTasks,
    clearSelection,
    bulkDeleteTasks,
  });

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Kanban Board</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your tasks efficiently
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-64"
                  aria-label="Search tasks"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as any)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring appearance-none w-full sm:w-40"
                  aria-label="Filter by priority"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Board */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="h-full container mx-auto px-6 py-6">
          <div className="flex gap-4 h-full pb-6">
            {columns.map((column) => {
              const columnTasks = column.taskIds
                .map((id) => filteredTasks[id])
                .filter(Boolean);

              return (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  tasks={columnTasks}
                  selectedTaskIds={selectedTaskIds}
                  onTaskEdit={handleTaskEdit}
                  onTaskDelete={deleteTask}
                  onTaskDuplicate={duplicateTask}
                  onToggleSelect={toggleTaskSelection}
                  onAddTask={handleAddTask}
                  onDragStart={(taskId, columnId, index) => handleDragStart(taskId, columnId)}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                  onDrop={handleDrop}
                  isDraggingOver={isDragging && dragOverColumn === column.id}
                  draggedTaskId={draggedTaskId}
                />
              );
            })}
          </div>
        </div>
      </main>

      {/* Bulk Action Toolbar */}
      {selectedTaskIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-card border border-border rounded-lg shadow-lg px-4 py-3 flex items-center gap-4 animate-fade-in">
          <span className="text-sm font-medium">
            {selectedTaskIds.size} task{selectedTaskIds.size > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm(`Delete ${selectedTaskIds.size} selected task(s)?`)) {
                  bulkDeleteTasks(Array.from(selectedTaskIds));
                }
              }}
              className="px-3 py-1.5 text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md transition-colors"
            >
              Delete All
            </button>
            <button
              onClick={clearSelection}
              className="px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Task Modal */}
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={updateTask}
        onDelete={deleteTask}
        onCreate={addTask}
        initialStatus={createTaskStatus}
      />
    </div>
  );
};
