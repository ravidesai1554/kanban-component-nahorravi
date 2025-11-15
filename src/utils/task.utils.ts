import { format, isPast } from 'date-fns';
import { Priority, TaskStatus } from '@/components/KanbanBoard/KanbanBoard.types';

export const isOverdue = (dueDate?: Date): boolean => {
  if (!dueDate) return false;
  return isPast(dueDate) && !isToday(dueDate);
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd');
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getPriorityColor = (priority: Priority): string => {
  const colors = {
    low: 'border-l-4 border-priority-low bg-priority-low/5 text-priority-low',
    medium: 'border-l-4 border-priority-medium bg-priority-medium/5 text-priority-medium',
    high: 'border-l-4 border-priority-high bg-priority-high/5 text-priority-high',
    urgent: 'border-l-4 border-priority-urgent bg-priority-urgent/5 text-priority-urgent',
  };
  return colors[priority];
};

export const getPriorityLabel = (priority: Priority): string => {
  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  };
  return labels[priority];
};

export const getStatusColor = (status: TaskStatus): string => {
  const colors = {
    'todo': 'bg-status-todo text-foreground',
    'in-progress': 'bg-status-progress text-white',
    'review': 'bg-status-review text-white',
    'done': 'bg-status-done text-white',
  };
  return colors[status];
};

export const reorderTasks = (
  tasks: string[],
  startIndex: number,
  endIndex: number
): string[] => {
  const result = Array.from(tasks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const moveTaskBetweenColumns = (
  sourceColumn: string[],
  destColumn: string[],
  sourceIndex: number,
  destIndex: number
): { source: string[]; destination: string[] } => {
  const sourceClone = Array.from(sourceColumn);
  const destClone = Array.from(destColumn);
  const [removed] = sourceClone.splice(sourceIndex, 1);
  destClone.splice(destIndex, 0, removed);

  return {
    source: sourceClone,
    destination: destClone,
  };
};
