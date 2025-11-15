import React from 'react';
import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

/**
 * Primitive Avatar component - wrapper around shadcn Avatar
 * Provides a consistent avatar interface across the application
 */
export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, className }) => {
  return (
    <ShadcnAvatar className={className}>
      {src && <AvatarImage src={src} alt={alt || 'Avatar'} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </ShadcnAvatar>
  );
};
