# React Cool Kyle Carousel

# Documentation

### Important

This package was created during the learning process. We will continue to update features and make changes. If an error occurs, please register an issue or pull request.

## Installation

### npm

> npm install react-cool-kyle-carousel

## PlayGround

You need a container which has width to use the carousel.

### View

![React](https://user-images.githubusercontent.com/67357426/116787915-dbfbae00-aae1-11eb-8ad5-6fe39cf3ceab.gif)

### Example

```javascript
import Carousel from 'react-cool-kyle-carousel';
function CarouselTest() {
  const containerStyle = {
    margin: '100px',
    width: '500px',
  };

  const itemStyle = {
    width: '90px',
    height: '100px',
    border: '1px solid black',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'font-size': '3rem',
  };

  const settings = {
    slideToScroll: 3,
    speed: 500,
    defaultArrow: true,
    defaultPaging: true,
  };

  return (
    <div style={containerStyle}>
      <Carousel {...settings}>
        <div style={itemStyle}>1</div>
        <div style={itemStyle}>2</div>
        <div style={itemStyle}>3</div>
        <div style={itemStyle}>4</div>
        <div style={itemStyle}>5</div>
        <div style={itemStyle}>6</div>
        <div style={itemStyle}>7</div>
        <div style={itemStyle}>8</div>
        <div style={itemStyle}>9</div>
        <div style={itemStyle}>10</div>
      </Carousel>
    </div>
  );
}
```

## props

| Name            |  Value   | Description                                                |  Default  |
| --------------- | :------: | ---------------------------------------------------------- | :-------: |
| slideToScroll   |  Number  | Number of items that can be passed at once                 |     1     |
| animationType   |  String  | Animation type                                             |   ease    |
| speed           |  Number  | Animation speed                                            |    500    |
| defaultArrow    | Boolean  | Create controllable arrows on both sides of the container. |   false   |
| defaultPaging   | Boolean  | Create a paging bar on the top right of the container.     |   false   |
| setCurrentIndex | Function | set current item index                                     | undefined |

## Customizing Arrow

You can pass a ref to get a function to control the carousel.

Then you can use functions (`handleClickPrev`,`handleClickNext`) to control your carousel.

### example

```jsx
import { useRef } from 'react';
import Carousel from 'react-cool-kyle-carousel';
function CarouselTest() {
  const carouselRef = useRef();

  const settings = {
    //here you can add ref
    ref: carouselRef,
    slideToScroll: 3,
    speed: 500,
    defaultArrow: true,
    defaultPaging: true,
  };

  return (
    <div>
      <Carousel {...settings}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>
      <div onClick={()=>{carouselRef.current.handleClickPrev()}}><</div>
      <div onClick={()=>{carouselRef.current.handleClickNext()}}>></div>
    </div>
  );
}
```

## If you want to get the current index

If you put setCurrentIndex which is `setFunction` of `useState` to props , you can get `currentIndex`

### example

```jsx
import { useState, useRef } from 'react';
import Carousel from 'react-cool-kyle-carousel';
function CarouselTest() {
  const [currentIndex, setCurrentIndex] = useState();

  // If you put setCurrentIndex here, the current index comes in whenever the carousel changes.
  const settings = {
    setCurrentIndex: setCurrentIndex,
    slideToScroll: 3,
    speed: 500,
    defaultArrow: true,
    defaultPaging: true,
  };

  return (
    <div>
      <Carousel {...settings}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>
      <div>current showing index is {currentIndex}</div>
    </div>
  );
}
```
