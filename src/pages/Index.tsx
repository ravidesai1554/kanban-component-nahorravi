import { KanbanBoard } from '@/components/KanbanBoard';
import { mockColumns, mockTasks } from '@/data/mockData';
import { Helmet } from 'react-helmet';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Kanban Board - Task Management System</title>
        <meta name="description" content="Modern kanban board for efficient task management with drag-and-drop functionality, priority tracking, and team collaboration." />
      </Helmet>
      <KanbanBoard initialColumns={mockColumns} initialTasks={mockTasks} />
    </>
  );
};

export default Index;
