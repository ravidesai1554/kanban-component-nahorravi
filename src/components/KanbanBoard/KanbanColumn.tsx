import React, { useRef } from 'react';
import { KanbanColumn as Column, KanbanTask } from './KanbanBoard.types';
import { KanbanCard } from './KanbanCard';
import { Plus } from 'lucide-react';
import { getStatusColor } from '@/utils/task.utils';

interface KanbanColumnProps {
  column: Column;
  tasks: KanbanTask[];
  selectedTaskIds: Set<string>;
  onTaskEdit: (task: KanbanTask) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskDuplicate: (taskId: string) => void;
  onToggleSelect: (taskId: string) => void;
  onAddTask: (status: Column['status']) => void;
  onDragStart: (taskId: string, columnId: string, index: number) => void;
  onDragOver: (columnId: string, index: number) => void;
  onDragEnd: () => void;
  onDrop: (columnId: string, index: number) => void;
  isDraggingOver: boolean;
  draggedTaskId: string | null;
}

export const KanbanColumn = React.memo<KanbanColumnProps>(
  ({
    column,
    tasks,
    selectedTaskIds,
    onTaskEdit,
    onTaskDelete,
    onTaskDuplicate,
    onToggleSelect,
    onAddTask,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDrop,
    isDraggingOver,
    draggedTaskId,
  }) => {
    const columnRef = useRef<HTMLDivElement>(null);
    const isNearWIPLimit = column.maxTasks && tasks.length >= column.maxTasks * 0.8;
    const isAtWIPLimit = column.maxTasks && tasks.length >= column.maxTasks;

    return (
      <div
        ref={columnRef}
        className="flex flex-col h-full min-w-[320px] max-w-[320px] bg-secondary/30 rounded-lg"
        role="region"
        aria-label={`${column.title} column with ${tasks.length} tasks`}
      >
        {/* Column Header */}
        <div className={`p-4 border-b border-border ${getStatusColor(column.status)} rounded-t-lg`}>
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-sm uppercase tracking-wide">
              {column.title}
            </h2>
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-background/20">
              {tasks.length}
              {column.maxTasks && ` / ${column.maxTasks}`}
            </span>
          </div>
          {column.maxTasks && (
            <>
              <div className="mt-2">
                <div className="h-1 bg-background/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isAtWIPLimit
                        ? 'bg-destructive'
                        : isNearWIPLimit
                        ? 'bg-priority-high'
                        : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min((tasks.length / column.maxTasks) * 100, 100)}%` }}
                  />
                </div>
              </div>
              {/* WIP Limit Warning */}
              {isAtWIPLimit && (
                <div className="mt-2 text-xs text-destructive font-medium flex items-center gap-1">
                  <span>⚠️</span>
                  <span>WIP limit reached!</span>
                </div>
              )}
              {!isAtWIPLimit && isNearWIPLimit && (
                <div className="mt-2 text-xs text-priority-high font-medium flex items-center gap-1">
                  <span>⚠</span>
                  <span>Approaching WIP limit</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Tasks Container */}
        <div
          className={`
            flex-1 p-3 space-y-3 overflow-y-auto
            ${isDraggingOver ? 'bg-primary/5 ring-2 ring-primary/20 ring-inset' : ''}
          `}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDrop(column.id, tasks.length);
          }}
        >
          {tasks.length === 0 ? (
            <div
              className="flex items-center justify-center h-32 text-muted-foreground text-sm border-2 border-dashed border-border rounded-lg"
              onDragOver={(e) => {
                e.preventDefault();
                onDragOver(column.id, 0);
              }}
              onDrop={(e) => {
                e.preventDefault();
                onDrop(column.id, 0);
              }}
            >
              Drop tasks here or click + to add
            </div>
          ) : (
            tasks.map((task, index) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move';
                  onDragStart(task.id, column.id, index);
                }}
                onDragEnd={onDragEnd}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDragOver(column.id, index);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDrop(column.id, index);
                }}
                className="relative"
                data-task-id={task.id}
              >
                {/* Drop indicator */}
                {isDraggingOver && draggedTaskId !== task.id && (
                  <div className="absolute -top-1.5 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
                <KanbanCard
                  task={task}
                  isDragging={draggedTaskId === task.id}
                  isSelected={selectedTaskIds.has(task.id)}
                  onEdit={onTaskEdit}
                  onDelete={onTaskDelete}
                  onDuplicate={onTaskDuplicate}
                  onToggleSelect={onToggleSelect}
                />
              </div>
            ))
          )}
        </div>

        {/* Add Task Button */}
        <div className="p-3 border-t border-border">
          <button
            onClick={() => onAddTask(column.status)}
            disabled={isAtWIPLimit}
            className={`
              w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg
              text-sm font-medium transition-colors
              ${
                isAtWIPLimit
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary-hover'
              }
            `}
            aria-label={`Add task to ${column.title}`}
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
          {isAtWIPLimit && (
            <p className="text-xs text-destructive text-center mt-1">WIP limit reached</p>
          )}
        </div>
      </div>
    );
  }
);

KanbanColumn.displayName = 'KanbanColumn';
