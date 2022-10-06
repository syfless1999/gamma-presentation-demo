import React, { useEffect, useRef, useState } from "react";
import SlideScrollManager from "./SlideScrollManager";
import { debounce, throttle } from 'lodash-es';

const WheelThreshold = 800;

export default function useSlideScroll(containerRef: React.MutableRefObject<HTMLDivElement | null>) {
  const [curPage, setCurPage] = useState(0);
  const [wheelCount, setWheelCount] = useState(0);
  const scrollManagerRef = useRef<SlideScrollManager | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    scrollManagerRef.current = new SlideScrollManager(container);
    const containerHeight = container.clientHeight;

    function clearWheelCount() {
      setWheelCount(0);
    }
    const debounceClear = debounce(clearWheelCount, 100);

    function changePage(index: number) {
      setCurPage(index);
    }
    const throttleChangePage = throttle(changePage, 1000);

    function handleWheel(e: WheelEvent) {
      const { deltaY } = e;
      const manager = scrollManagerRef.current;
      if (!container || !manager) return;

      const { scrollTop, scrollHeight } = container;
      console.log(`=== wheel deltaY: ${deltaY}`);

      if (deltaY > 0 && scrollTop + containerHeight + deltaY >= scrollHeight) {
        setWheelCount((cur) => {
          const newCount = cur + deltaY;
          if (newCount >= WheelThreshold) {
            console.log(`=== next wheelCount: ${newCount}`);
            throttleChangePage(manager.getNextIndex());
            return 0;
          }
          return newCount;
        });
      }

      if (deltaY < 0 && scrollTop + deltaY <= 0) {
        setWheelCount((cur) => {
          const newCount = cur - deltaY;
          if (newCount >= WheelThreshold) {
            throttleChangePage(manager.getPrevIndex());
            return 0;
          }
          return newCount;
        });
      }

      debounceClear();
    }

    container.addEventListener('wheel', handleWheel);
    return () => {
      container.removeEventListener('wheel', handleWheel);
    }
  }, [containerRef]);

  useEffect(() => {
    const manager = scrollManagerRef.current;
    if (!manager) return;
    console.log(`==== curPage`);
    manager.updateIndex(curPage);
  }, [curPage]);

  return (
    <div className="wheel-count">wheel count: {wheelCount}</div>
  );
}