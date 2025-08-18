
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const PageTransition = ({ children, className, delay = 0 }: PageTransitionProps) => {
  return (
    <div 
      className={cn(
        "animate-fade-in opacity-0",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards"
      }}
    >
      {children}
    </div>
  );
};

export const StaggeredContainer = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <PageTransition key={index} delay={index * 100}>
              {child}
            </PageTransition>
          ))
        : <PageTransition>{children}</PageTransition>
      }
    </div>
  );
};
