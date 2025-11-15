# Kanban Board - Task Management System

A modern, production-grade Kanban board component built with React, TypeScript, and Tailwind CSS. Features drag-and-drop functionality, priority management, search & filtering, and responsive design.

## Features

### Core Functionality
- **Drag & Drop**: Native HTML5 drag-and-drop with smooth visual feedback
- **Task Management**: Create, edit, and delete tasks with detailed information
- **Priority Levels**: Low, Medium, High, and Urgent with color coding
- **Status Columns**: To Do, In Progress, Review, and Done
- **Search & Filter**: Real-time search and priority filtering
- **WIP Limits**: Work-in-progress limits with visual indicators
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### Task Features
- Title and description
- Priority indicators with colored borders
- Assignee with avatar initials
- Tags/labels (up to 3 visible)
- Due dates with overdue highlighting
- Status management

### UI/UX
- Clean, modern design inspired by Linear and Asana
- Sky blue primary color scheme
- Smooth animations and transitions
- Hover effects and visual feedback
- Card shadows and border highlights
- Empty state messages

## 🛠 Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Vite** - Fast build tooling
- **Storybook** - Component development and documentation
- **date-fns** - Date manipulation
- **Lucide React** - Beautiful icons
- **Shadcn UI** - Base UI component primitives

##  Design System

The application uses a comprehensive design system defined in `src/styles/globals.css` and `tailwind.config.ts`:

### Colors
- **Primary**: Sky blue (#0ea5e9) for main actions and branding
- **Priority Colors**:
  - Low: Blue
  - Medium: Yellow
  - High: Orange
  - Urgent: Red
- **Status Colors**:
  - To Do: Gray
  - In Progress: Blue
  - Review: Purple
  - Done: Green

### Typography
- Clean, modern sans-serif font
- Hierarchical text sizes and weights
- Proper line heights for readability

### Spacing
- Consistent 4px base unit
- Tailwind's spacing scale

## Project Structure

```
kanban-component/
│
├── README.md                # Documentation
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind customization
├── .storybook/              # Storybook configuration
│   ├── main.ts
│   └── preview.ts
│
└── src/
    ├── components/
    │   ├── KanbanBoard/
    │   │   ├── KanbanBoard.tsx           # Main component
    │   │   ├── KanbanBoard.stories.tsx   # Storybook stories
    │   │   ├── KanbanBoard.types.ts      # Type definitions
    │   │   ├── KanbanColumn.tsx          # Column with drag-drop
    │   │   ├── KanbanCard.tsx            # Task card
    │   │   ├── TaskModal.tsx             # Task modal
    │   │   └── index.ts                  # Component exports
    │   │
    │   ├── primitives/                    # Reusable UI elements
    │   │   ├── Button.tsx
    │   │   ├── Modal.tsx
    │   │   ├── Avatar.tsx
    │   │   └── index.ts
    │   │
    │   └── ui/                            # Shadcn UI components
    │
    ├── hooks/
    │   ├── useDragAndDrop.ts              # Drag & drop logic
    │   └── useKanbanBoard.ts              # Board state management
    │
    ├── utils/
    │   ├── task.utils.ts                  # Task utilities
    │   └── column.utils.ts                # Column utilities
    │
    ├── data/
    │   └── mockData.ts                    # Sample data
    │
    ├── styles/
    │   └── globals.css                    # Global styles & design system
    │
    └── pages/
        └── Index.tsx                      # Main page
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view the application.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Storybook

Run Storybook for component development and documentation:

```bash
npm run storybook
```

Build Storybook for deployment:

```bash
npm run build-storybook
```

##  Key Implementation Details

### Custom Drag & Drop
- Built with native HTML5 Drag & Drop API
- No external drag-and-drop libraries
- Custom visual feedback and ghost elements
- Smooth animations during drag operations

### State Management
- Custom React hooks for clean separation of concerns
- `useKanbanBoard` - Manages columns, tasks, and operations
- `useDragAndDrop` - Handles drag-and-drop state

### Performance Optimizations
- `React.memo` for expensive components
- `useCallback` for stable function references
- Efficient task filtering and searching
- Minimal re-renders

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader friendly

## Assignment Requirements

This project was built as a hiring assignment for a Frontend Developer position. Key requirements met:

✅ Production-quality code architecture  
✅ Enterprise-grade UI/UX patterns  
✅ TypeScript with strict mode  
✅ Tailwind CSS for styling  
✅ Custom drag-and-drop implementation  
✅ Responsive design  
✅ Accessible components  
✅ Clean component structure  
✅ Custom hooks pattern  
✅ Comprehensive type definitions  
✅ Storybook for component documentation  
✅ Organized folder structure with primitives

### Forbidden Libraries (Not Used)
❌ UI Component Libraries (Pre-built Kanban boards)  
❌ CSS-in-JS (styled-components, emotion)  
❌ Drag Libraries (react-beautiful-dnd, dnd-kit pre-built)  
❌ Pre-built Kanban components  

**Note**: Shadcn UI is used as a primitive base for building custom components, which is allowed per assignment guidelines.

## Responsive Behavior

- **Desktop (1024px+)**: Full multi-column layout with horizontal scrolling
- **Tablet (768px-1023px)**: Optimized column sizing
- **Mobile (<768px)**: Responsive cards with adapted layouts

## Type Safety

The project uses strict TypeScript configuration:
- No implicit `any` types
- Strict null checks
- Comprehensive type definitions for all data structures
- Interface definitions for all props

## License

This project is part of a hiring assignment and is intended for evaluation purposes.

## Contributing

This is an assignment project, but suggestions and feedback are welcome!

## Contact

For questions about this assignment, please refer to your Internshala application details.
