import React from 'react';
import { KanbanTask } from './KanbanBoard.types';
import { formatDate, isOverdue, getInitials, getPriorityColor, getPriorityLabel } from '@/utils/task.utils';
import { Calendar, Tag, User, Edit2, Trash2, Copy } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface KanbanCardProps {
  task: KanbanTask;
  isDragging: boolean;
  isSelected: boolean;
  onEdit: (task: KanbanTask) => void;
  onDelete: (taskId: string) => void;
  onDuplicate: (taskId: string) => void;
  onToggleSelect: (taskId: string) => void;
}

export const KanbanCard = React.memo<KanbanCardProps>(({ 
  task, 
  isDragging, 
  isSelected,
  onEdit, 
  onDelete, 
  onDuplicate,
  onToggleSelect 
}) => {
  const handleQuickAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div
      className={`
        group relative bg-card rounded-lg p-4 border transition-all duration-200 cursor-pointer
        hover:shadow-lg hover:border-primary/50
        ${isDragging ? 'opacity-50 rotate-2 scale-95' : 'opacity-100'}
        ${isSelected ? 'ring-2 ring-primary border-primary' : 'border-border'}
        ${task.priority ? getPriorityColor(task.priority) : ''}
      `}
      onClick={() => onEdit(task)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onEdit(task);
        }
      }}
      aria-label={`Task: ${task.title}${isSelected ? ' (selected)' : ''}`}
    >
      {/* Checkbox - Always visible in top-left */}
      <div 
        className="absolute top-3 left-3 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(task.id)}
          aria-label="Select task"
          className="bg-background border-2"
        />
      </div>

      {/* Quick Actions */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={(e) => handleQuickAction(e, () => onEdit(task))}
          className="p-1.5 bg-background/90 hover:bg-primary hover:text-primary-foreground rounded-md transition-colors"
          aria-label="Edit task"
          title="Edit"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => handleQuickAction(e, () => onDuplicate(task.id))}
          className="p-1.5 bg-background/90 hover:bg-primary hover:text-primary-foreground rounded-md transition-colors"
          aria-label="Duplicate task"
          title="Duplicate"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => handleQuickAction(e, () => onDelete(task.id))}
          className="p-1.5 bg-background/90 hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors"
          aria-label="Delete task"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Priority Badge */}
      {task.priority && (
        <div className="absolute top-2 right-2 opacity-100 group-hover:opacity-0 transition-opacity">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm">
            {getPriorityLabel(task.priority)}
          </span>
        </div>
      )}

      {/* Title - Add left padding for checkbox */}
      <h3 className="font-semibold text-card-foreground mb-2 pl-7 pr-16 line-clamp-2">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-muted-foreground mb-3 pl-7 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        {/* Assignee */}
        <div className="flex items-center gap-2">
          {task.assignee ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                {getInitials(task.assignee)}
              </div>
              <span className="text-xs text-muted-foreground hidden sm:inline">
                {task.assignee.split(' ')[0]}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Unassigned</span>
            </div>
          )}
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div
            className={`
              flex items-center gap-1 text-xs px-2 py-1 rounded-md
              ${
                isOverdue(task.dueDate)
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-secondary text-secondary-foreground'
              }
            `}
          >
            <Calendar className="w-3 h-3" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
});

KanbanCard.displayName = 'KanbanCard';
