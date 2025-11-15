import type { Meta, StoryObj } from '@storybook/react';
import { KanbanBoard } from './KanbanBoard';
import { mockColumns, mockTasks } from '@/data/mockData';
import { KanbanColumn, KanbanTask } from './KanbanBoard.types';

const meta = {
  title: 'Components/KanbanBoard',
  component: KanbanBoard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof KanbanBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Kanban Board with sample data
 */
export const Default: Story = {
  args: {
    initialColumns: mockColumns,
    initialTasks: mockTasks,
  },
};

/**
 * Empty Kanban Board with no tasks
 */
export const Empty: Story = {
  args: {
    initialColumns: [
      {
        id: 'col-1',
        title: 'To Do',
        status: 'todo',
        taskIds: [],
        maxTasks: 10,
      },
      {
        id: 'col-2',
        title: 'In Progress',
        status: 'in-progress',
        taskIds: [],
        maxTasks: 5,
      },
      {
        id: 'col-3',
        title: 'Review',
        status: 'review',
        taskIds: [],
        maxTasks: 3,
      },
      {
        id: 'col-4',
        title: 'Done',
        status: 'done',
        taskIds: [],
      },
    ] as KanbanColumn[],
    initialTasks: {} as Record<string, KanbanTask>,
  },
};

/**
 * Kanban Board at WIP Limit
 */
export const AtWIPLimit: Story = {
  args: {
    initialColumns: [
      {
        id: 'col-1',
        title: 'To Do',
        status: 'todo',
        taskIds: ['task-1', 'task-2', 'task-3'],
        maxTasks: 3,
      },
      {
        id: 'col-2',
        title: 'In Progress',
        status: 'in-progress',
        taskIds: ['task-4', 'task-5'],
        maxTasks: 2,
      },
      {
        id: 'col-3',
        title: 'Review',
        status: 'review',
        taskIds: [],
        maxTasks: 1,
      },
      {
        id: 'col-4',
        title: 'Done',
        status: 'done',
        taskIds: [],
      },
    ] as KanbanColumn[],
    initialTasks: {
      'task-1': {
        id: 'task-1',
        title: 'Task 1',
        status: 'todo',
        priority: 'high',
        createdAt: new Date(),
      },
      'task-2': {
        id: 'task-2',
        title: 'Task 2',
        status: 'todo',
        priority: 'medium',
        createdAt: new Date(),
      },
      'task-3': {
        id: 'task-3',
        title: 'Task 3',
        status: 'todo',
        priority: 'urgent',
        createdAt: new Date(),
      },
      'task-4': {
        id: 'task-4',
        title: 'Task 4',
        status: 'in-progress',
        priority: 'high',
        createdAt: new Date(),
      },
      'task-5': {
        id: 'task-5',
        title: 'Task 5',
        status: 'in-progress',
        priority: 'medium',
        createdAt: new Date(),
      },
    } as Record<string, KanbanTask>,
  },
};

/**
 * Kanban Board with High Priority Tasks
 */
export const HighPriorityTasks: Story = {
  args: {
    initialColumns: mockColumns,
    initialTasks: {
      'task-1': {
        id: 'task-1',
        title: 'Critical Bug Fix',
        description: 'Fix production bug affecting users',
        status: 'todo',
        priority: 'urgent',
        assignee: 'Sarah Chen',
        tags: ['bug', 'urgent'],
        createdAt: new Date(),
        dueDate: new Date(Date.now() + 86400000), // Tomorrow
      },
      'task-2': {
        id: 'task-2',
        title: 'Security Patch',
        description: 'Apply security updates',
        status: 'in-progress',
        priority: 'urgent',
        assignee: 'Alex Johnson',
        tags: ['security', 'urgent'],
        createdAt: new Date(),
        dueDate: new Date(Date.now() + 86400000),
      },
      'task-3': {
        id: 'task-3',
        title: 'Performance Optimization',
        description: 'Optimize slow queries',
        status: 'review',
        priority: 'high',
        assignee: 'Maria Garcia',
        tags: ['performance'],
        createdAt: new Date(),
      },
    } as Record<string, KanbanTask>,
  },
};
