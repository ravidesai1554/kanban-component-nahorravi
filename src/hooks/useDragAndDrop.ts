import { useState, useCallback } from 'react';

export interface DragState {
  isDragging: boolean;
  draggedTaskId: string | null;
  draggedFromColumn: string | null;
  dragOverColumn: string | null;
  dragOverIndex: number | null;
}

export const useDragAndDrop = () => {
  const [state, setState] = useState<DragState>({
    isDragging: false,
    draggedTaskId: null,
    draggedFromColumn: null,
    dragOverColumn: null,
    dragOverIndex: null,
  });

  const handleDragStart = useCallback((taskId: string, columnId: string) => {
    setState({
      isDragging: true,
      draggedTaskId: taskId,
      draggedFromColumn: columnId,
      dragOverColumn: null,
      dragOverIndex: null,
    });
  }, []);

  const handleDragOver = useCallback((columnId: string, index: number) => {
    setState((prev) => ({
      ...prev,
      dragOverColumn: columnId,
      dragOverIndex: index,
    }));
  }, []);

  const handleDragEnd = useCallback(() => {
    setState({
      isDragging: false,
      draggedTaskId: null,
      draggedFromColumn: null,
      dragOverColumn: null,
      dragOverIndex: null,
    });
  }, []);

  const resetDrag = useCallback(() => {
    setState({
      isDragging: false,
      draggedTaskId: null,
      draggedFromColumn: null,
      dragOverColumn: null,
      dragOverIndex: null,
    });
  }, []);

  return {
    ...state,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    resetDrag,
  };
};
