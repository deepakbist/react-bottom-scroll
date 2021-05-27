# react-bottom-scroll

A simple **React component** that wraps the content and automatically scrolls to the bottom of the content.

## Installation

```bash
npm install react-bottom-scroll
```

## Upgrade

```bash
npm install react-bottom-scroll@latest
```

## Usage

use the component to wrap the content which you want to scroll to the bottom

```jsx
import { ScrollWrapper } from "react-botttom-scroll";

const wraperstyle = {
  width: 550,
  height: 550,
  overflowY: "auto",
};

const topCallback = () => {
  // callback to load new content at the top of the wrapper. eg loading more chat at the top
  console.log("Reached top of container");
};

const bottomCallback = () => {
  //callback to handle reaching bottom of the page eg. setting read status to true
  console.log("Reached bottom of container");
};

<ScrollWrapper
  wrapperStyle={wrapperStyle}
  minScroll={100}
  smoothBehavior
  topCallback={topCallback}
  bottomCallback={bottomCallback}
>
  {contents}
</ScrollWrapper>;
```

here contents can be a list of div's or any other html elements.

**Props**


| Property       | Type     | Default                                   | Description                                                                                                                                                  |
|----------------|----------|-------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| wrapperStyle   | object   | {width:500,height:500,overflowY:'scroll'} | CSS properties that will be set on scroll wrapper component. NOTE: CSS should be passed in react style.                                                      |
| minScroll      | number   | null                                      | minimum scroll from bottom in pixels that should stop autoscroll to bottom if content is changed.                                                            |
| smoothBehavior | boolean  | false                                     | if smoothBehavior is true scrollBehavior is set to smooth                                                                                                    |
| topCallback    | function | null                                      | callback function that will be executed once content is scrolled to top of the wrapper. Eg. can be used to load more content on reaching top of the wrapper. |
| bottomCallback | function | null                                      | callback function that will be executed once content is scrolled to bottom of the wrapper. Eg. can be used to set read status of chat to true or false.      |
