import * as React from "react";
import { DEFAULT_STYLE, TOP_DIV_ID, BOTTOM_DIV_ID } from "../../const";

const ComponentWrapper: React.FC<ComponentWrapperInterface> = ({
  wrapperStyle,
  minScroll,
  smoothBehavior,
  topCallback,
  bottomCallback,
  children,
}) => {
  const lastScrolled = React.useRef(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const topDivRef = React.useRef<HTMLDivElement>(null);
  const bottomDivRef = React.useRef<HTMLDivElement>(null);
  const scrollToBottomStatus = React.useRef(false);

  React.useLayoutEffect(() => {
    scrollToBottom();
  }, []);

  React.useLayoutEffect(() => {
    if (containerRef && containerRef.current) {
      lastScrolled.current =
        containerRef.current.scrollHeight -
        containerRef.current.clientHeight -
        containerRef.current.scrollTop;
    }
    scrollToBottom();

    let scrollComponentObserver: IntersectionObserver;
    if (bottomCallback || topCallback) {
      scrollComponentObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.id === TOP_DIV_ID) {
              triggerTopCallback();
            }
            if (entry.isIntersecting && entry.target.id === BOTTOM_DIV_ID) {
              if (bottomCallback && typeof bottomCallback === "function")
                bottomCallback();
            }
          });
        },
        {}
      );
      if (topCallback && topDivRef.current)
        scrollComponentObserver.observe(topDivRef.current);
      if (bottomCallback && bottomDivRef.current)
        scrollComponentObserver.observe(bottomDivRef.current);
    }
    return () => {
      if (scrollComponentObserver) {
        scrollComponentObserver.disconnect();
      }
    };
  });

  const triggerTopCallback = () => {
    if (
      topCallback &&
      typeof topCallback === "function" &&
      scrollToBottomStatus.current
    )
      topCallback();
  };

  const scrollToBottom = () => {
    if (containerRef && containerRef.current) {
      if (
        !minScroll ||
        (typeof minScroll === "number" && lastScrolled.current < minScroll)
      ) {
        if (smoothBehavior) {
          bottomDivRef?.current?.scrollIntoView({ behavior: "smooth" });
          if (!scrollToBottomStatus.current)
            setTimeout(() => {
              scrollToBottomStatus.current = true;
            }, 100);
        } else {
          containerRef.current.scrollTop =
            containerRef.current.scrollHeight -
            containerRef.current.clientHeight;
          if (!scrollToBottomStatus.current)
            scrollToBottomStatus.current = true;
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      style={
        wrapperStyle ? { overflowY: "scroll", ...wrapperStyle } : DEFAULT_STYLE
      }
    >
      {topCallback && <div id={TOP_DIV_ID} ref={topDivRef}></div>}
      {children}
      {(bottomCallback || smoothBehavior) && (
        <div id={BOTTOM_DIV_ID} ref={bottomDivRef}></div>
      )}
    </div>
  );
};

export default ComponentWrapper;

interface ComponentWrapperInterface {
  wrapperStyle?: any;
  minScroll?: number;
  smoothBehavior?: boolean;
  topCallback?: () => void;
  bottomCallback?: () => void;
}
