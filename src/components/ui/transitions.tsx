
import { ReactNode, useState, useEffect } from "react";

interface FadeProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export const FadeIn = ({ 
  children, 
  duration = 500, 
  delay = 0, 
  className = "" 
}: FadeProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity duration-${duration} ${className}`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
      }}
    >
      {children}
    </div>
  );
};

export const SlideIn = ({ 
  children, 
  duration = 500, 
  delay = 0, 
  className = "" 
}: FadeProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-${duration} ${className}`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
      }}
    >
      {children}
    </div>
  );
};

export const ScaleIn = ({ 
  children, 
  duration = 500, 
  delay = 0, 
  className = "" 
}: FadeProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-${duration} ${className}`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      {children}
    </div>
  );
};

export const StaggeredChildren = ({ 
  children, 
  staggerDelay = 100,
  initialDelay = 0,
  className = "" 
}: {
  children: ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}) => {
  return (
    <div className={className}>
      {Array.isArray(children) && children.map((child, index) => (
        <FadeIn key={index} delay={initialDelay + index * staggerDelay}>
          {child}
        </FadeIn>
      ))}
    </div>
  );
};
