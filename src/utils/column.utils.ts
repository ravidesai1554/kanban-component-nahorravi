import { KanbanColumn, KanbanTask } from '@/components/KanbanBoard/KanbanBoard.types';

/**
 * Calculate column progress percentage
 */
export const getColumnProgress = (column: KanbanColumn, taskCount: number): number => {
  if (!column.maxTasks) return 0;
  return Math.min((taskCount / column.maxTasks) * 100, 100);
};

/**
 * Check if column is near WIP limit (80% threshold)
 */
export const isNearWIPLimit = (column: KanbanColumn, taskCount: number): boolean => {
  if (!column.maxTasks) return false;
  return taskCount >= column.maxTasks * 0.8;
};

/**
 * Check if column has reached WIP limit
 */
export const isAtWIPLimit = (column: KanbanColumn, taskCount: number): boolean => {
  if (!column.maxTasks) return false;
  return taskCount >= column.maxTasks;
};

/**
 * Get column task count statistics
 */
export const getColumnStats = (
  column: KanbanColumn,
  tasks: Record<string, KanbanTask>
): {
  total: number;
  highPriority: number;
  urgent: number;
  overdue: number;
} => {
  const columnTasks = column.taskIds
    .map((id) => tasks[id])
    .filter(Boolean);

  return {
    total: columnTasks.length,
    highPriority: columnTasks.filter((t) => t.priority === 'high').length,
    urgent: columnTasks.filter((t) => t.priority === 'urgent').length,
    overdue: columnTasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date()).length,
  };
};

/**
 * Validate if task can be added to column based on WIP limits
 */
export const canAddTaskToColumn = (column: KanbanColumn, currentTaskCount: number): boolean => {
  if (!column.maxTasks) return true;
  return currentTaskCount < column.maxTasks;
};
