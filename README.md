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
import { ScrollWrapper } from 'react-botttom-scroll';

<ScrollWrapper>
    {contents}
</ScrollWrapper>

```

here contents can be a list of div's or any other html elements.


**Props**

| Property       | Type                   | Default                                   | Description                                                                                       |
|----------------|------------------------|-------------------------------------------|---------------------------------------------------------------------------------------------------|
| css            | react style css object | {width:500,height:500,overflowY:'scroll'} | css properties that will be set on scroll wrapper component                                       |
| minScroll      | number                 | null                                      | minimum scroll from bottom in pixels that should stop autoscroll to bottom if content is changed. |
| smoothBehavior | boolean                | false                                     | if smoothBehavior is true scrollBehavior is set to smooth                                         |

