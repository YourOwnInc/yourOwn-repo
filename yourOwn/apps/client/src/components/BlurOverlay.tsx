import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BlurOverlayProps {
  children: ReactNode;
  isBlurred: boolean;
  blurAmount?: number;
  transitionDuration?: number;
  className?: string;
}

/**
 * BlurOverlay component - Applies blur effect with smooth transitions
 * Used for the portfolio builder to create the "dream to reality" effect
 */
export default function BlurOverlay({
  children,
  isBlurred,
  blurAmount = 8,
  transitionDuration = 0.6,
  className = '',
}: BlurOverlayProps) {
  return (
    <motion.div
      animate={{
        filter: isBlurred ? `blur(${blurAmount}px)` : 'blur(0px)',
        opacity: isBlurred ? 0.5 : 1,
      }}
      transition={{
        duration: transitionDuration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ProgressiveBlurProps {
  children: ReactNode;
  blurLevel: number; // 0-1, where 0 is no blur and 1 is full blur
  maxBlur?: number;
  transitionDuration?: number;
  className?: string;
}

/**
 * ProgressiveBlur - Allows gradual blur control
 * Useful for progressive unblurring of content
 */
export function ProgressiveBlur({
  children,
  blurLevel,
  maxBlur = 8,
  transitionDuration = 0.6,
  className = '',
}: ProgressiveBlurProps) {
  const currentBlur = blurLevel * maxBlur;
  const opacity = 1 - blurLevel * 0.5; // Fade out as blur increases

  return (
    <motion.div
      animate={{
        filter: `blur(${currentBlur}px)`,
        opacity,
      }}
      transition={{
        duration: transitionDuration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

