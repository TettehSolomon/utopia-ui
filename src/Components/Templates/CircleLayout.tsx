import * as React from 'react';
import { useEffect, useRef } from 'react';

export const CircleLayout = ({ items,radius, fontSize }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const itemCount = items.length;

    if (container) {
      for (let i = 0; i < itemCount; i++) {
        const startAngle = (Math.PI) / 2;
        const angle = startAngle + (i / itemCount) * (2 * Math.PI); 
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const child = container.children[i] as HTMLElement;
        child.style.transform = `translate(${x}px, ${y}px)`;
      }
    }
  }, [items]);

  return (
    <div className="tw-absolute tw-mx-auto tw-flex tw-justify-center tw-items-center tw-h-full tw-w-full" ref={containerRef}>
      {items.map((item, index) => (
        <div key={index} className="tw-absolute" style={{fontSize: fontSize}}>
          {item}
        </div>
      ))}
    </div>
  );
};

