import * as React from "react";
import {  DEFAULT_STYLE } from "../../const";

const ComponentWrapper: React.FC<ComponentWrapperInterface> = (props) => {
  const lastScrolled = React.useRef(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

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
  });

  const scrollToBottom = () => {
    if (containerRef && containerRef.current) {
      if (
        !props?.minScroll ||
        (typeof props.minScroll === "number" &&
          lastScrolled.current < props.minScroll)
      ) {
        if (props.smoothBehavior) {
          bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
        } else {
          containerRef.current.scrollTop =
            containerRef.current.scrollHeight -
            containerRef.current.clientHeight;
        }
      }
    }
  };

  return (
    <div ref={containerRef} style={props?.css ? {overflowY:'scroll', ...props.css} : DEFAULT_STYLE}>
      {props.children}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ComponentWrapper;

interface ComponentWrapperInterface {
  css?: any;
  minScroll?: number;
  smoothBehavior?: boolean;
}
