import React, { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'operator' | 'action' | 'scientific';
};

export function Button({ className, variant = 'default', children, onClick, ...props }: ButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipples((prev) => [...prev, { x, y, id: Date.now() }]);
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95, y: 2 }}
      onClick={handleClick}
      className={cn(
        'relative flex items-center justify-center rounded-2xl text-2xl font-medium transition-all duration-100',
        'overflow-hidden shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:shadow-[0_0px_0_0_rgba(0,0,0,0.1)]',
        {
          'bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-[0_4px_0_0_rgba(234,88,12,0.3)] dark:bg-none dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[0_4px_0_0_rgba(0,0,0,0.3)]': variant === 'default',
          'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-[0_4px_0_0_rgba(234,88,12,0.4)] dark:bg-gradient-to-br dark:from-orange-400 dark:to-red-500 dark:shadow-[0_4px_0_0_rgba(234,88,12,0.4)]': variant === 'operator',
          'bg-zinc-200 text-zinc-800 shadow-[0_4px_0_0_rgba(0,0,0,0.1)] dark:bg-none dark:bg-zinc-600 dark:text-zinc-100 dark:shadow-[0_4px_0_0_rgba(0,0,0,0.3)]': variant === 'action',
          'bg-gradient-to-br from-orange-400 to-red-500 text-white text-lg shadow-[0_4px_0_0_rgba(234,88,12,0.3)] dark:bg-none dark:bg-zinc-700 dark:text-zinc-200 dark:shadow-[0_4px_0_0_rgba(0,0,0,0.3)]': variant === 'scientific',
        },
        className
      )}
      {...props}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
            }}
            className="absolute bg-white rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 100,
              height: 100,
              marginLeft: -50,
              marginTop: -50,
            }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
