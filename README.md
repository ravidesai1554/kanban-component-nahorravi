# Kanban Board Component

A modern, production-grade Kanban board component built with React, TypeScript, and Tailwind CSS. Features drag-and-drop functionality, priority management, search & filtering, and responsive design.

##Live Storybook

**[Storybook Stories](https://ravidesai1554.github.io/kanban-component-nahorravi)** - Interactive component documentation and examples

## Installation

```bash
npm install
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view Storybook stories.

## Architecture

### Custom Drag & Drop Implementation
- **Native HTML5 API**: No external drag libraries (forbidden per requirements)
- **Visual Feedback**: Ghost elements, drop zones, and smooth animations
- **State Management**: `useDragAndDrop` hook handles all drag operations
- **Collision Detection**: Smart column detection and visual indicators

### State Management Pattern
- **useKanbanBoard**: Manages columns, tasks, CRUD operations, and filtering
- **useDragAndDrop**: Handles drag state, source/target tracking, and animations
- **Custom Hooks**: Separation of concerns for clean, testable code

### Component Structure
- **KanbanBoard**: Main container component
- **KanbanColumn**: Droppable column with WIP limits
- **KanbanCard**: Draggable task card with metadata
- **TaskModal**: Edit/create task modal
- **Primitives**: Reusable Button, Modal, Avatar components
- **UI Components**: Shadcn UI base components (checkbox, dialog, etc.)

### Performance Optimizations
- React.memo for expensive components
- useCallback for stable function references
- Efficient filtering and search algorithms
- Minimal re-renders through proper state isolation

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

## Technology Stack

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

## Storybook Stories

The component includes comprehensive Storybook stories for testing and documentation:

- **Default Board** - Standard Kanban board with sample tasks
- **Empty State** - Board with no tasks
- **Large Dataset** - Performance testing with 100+ tasks
- **Mobile View** - Responsive design demonstration
- **Interactive Playground** - Interact with all features in real-time
- **Drag & Drop Demo** - Drag interactions and animations
- **Task Creation** - Modal for adding new tasks
- **Priority Filtering** - Filter by task priority

Run Storybook to explore all stories:
```bash
npm run storybook
```

## Getting Started

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

### Build Storybook for Deployment

```bash
npm run build-storybook
```

## Technologies

- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development with strict mode
- **Tailwind CSS** - Utility-first styling with custom design system
- **Vite** - Lightning-fast build tooling
- **Storybook 8** - Component documentation and testing
- **date-fns** - Date manipulation and formatting
- **Lucide React** - Beautiful SVG icons
- **Shadcn UI** - Base UI component primitives
- **React Router** - Client-side routing
- **Zod** - Runtime type validation

## Accessibility Features

- **ARIA Labels & Roles** - Semantic HTML and ARIA attributes
- **Keyboard Navigation** - Full keyboard support with custom hooks
- **Focus Management** - Logical tab order and focus trapping
- **Screen Reader Friendly** - Proper semantic structure
- **Color Contrast** - WCAG AA compliant color ratios

## Assignment Requirements

This project was built as a hiring assignment for a Frontend Developer position. Key requirements met:

Production-quality code architecture  
Enterprise-grade UI/UX patterns  
TypeScript with strict mode  
Tailwind CSS for styling  
Custom drag-and-drop implementation  
Responsive design  
Accessible components  
Clean component structure  
Custom hooks pattern  
Comprehensive type definitions  
Storybook for component documentation  
ganized folder structure with primitives

### Forbidden Libraries (Not Used)
UI Component Libraries (Pre-built Kanban boards)  
CSS-in-JS (styled-components, emotion)  
Drag Libraries (react-beautiful-dnd, dnd-kit pre-built)  
Pre-built Kanban components  

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

- **Email**:ravidesai1555@gmail.com
- **GitHub**: [ravidesai1554](https://github.com/ravidesai1554)
- **Repository**: [kanban-component-nahorravi](https://github.com/ravidesai1554/kanban-component-nahorravi)

For questions about this project, feel free to open an issue or contact via GitHub.
