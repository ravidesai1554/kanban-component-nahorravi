export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: Priority;
  assignee?: string;
  tags?: string[];
  createdAt: Date;
  dueDate?: Date;
}

export interface KanbanColumn {
  id: string;
  title: string;
  status: TaskStatus;
  taskIds: string[];
  maxTasks?: number;
}

export interface KanbanBoardState {
  columns: KanbanColumn[];
  tasks: Record<string, KanbanTask>;
}
