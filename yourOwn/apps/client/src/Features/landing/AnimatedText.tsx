import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * AnimatedText component with Betwixt-style sequential text appearance
 * Text fades in one by one with soft transitions
 */
export function AnimatedText({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
}: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedText;

interface AnimatedTextSequenceProps {
  texts: string[];
  delayBetween?: number;
  duration?: number;
  className?: string;
  onComplete?: () => void;
}

/**
 * AnimatedTextSequence - Displays multiple text elements sequentially
 * Each text fades in one after another (Betwixt-style)
 */
export function AnimatedTextSequence({
  texts,
  delayBetween = 0.3,
  duration = 0.6,
  className = '',
  onComplete,
}: AnimatedTextSequenceProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {texts.map((text, index) => (
        <AnimatedText
          key={index}
          delay={index * delayBetween}
          duration={duration}
          className="text-center"
        >
          {text}
        </AnimatedText>
      ))}
      {onComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: texts.length * delayBetween + duration,
            duration: 0.3,
          }}
          onAnimationComplete={onComplete}
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
}

