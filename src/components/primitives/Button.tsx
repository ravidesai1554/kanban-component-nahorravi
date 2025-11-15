import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { ButtonProps as ShadcnButtonProps } from '@/components/ui/button';

/**
 * Primitive Button component - wrapper around shadcn Button
 * Provides a consistent button interface across the application
 */
export interface ButtonProps extends ShadcnButtonProps {
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <ShadcnButton ref={ref} {...props}>
        {children}
      </ShadcnButton>
    );
  }
);

Button.displayName = 'Button';
