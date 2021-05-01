import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import CarouselItem from './item/CarouselItem';
import CarouselPage from './page/CarouselPage';
const Carousel = /*#__PURE__*/forwardRef(({
  children,
  slideToScroll = 1,
  animationType = 'ease',
  speed = 500,
  defaultArrow = false,
  defaultPaging = false,
  setCurrentIndex
}, ref) => {
  const [locationX, setLocationX] = useState(0);
  const [currIdx, setCurrIdx] = useState(0);
  const [leftItem, setLeftItem] = useState();
  const [itemWidth, setItemWidth] = useState();
  const [animation, setAnimation] = useState();
  const carouselContainerRef = useRef();

  const isCarouselWidth = () => carouselContainerRef.current && itemWidth;

  const containerWidth = isCarouselWidth() && carouselContainerRef.current.offsetWidth;
  const slideToShow = isCarouselWidth() && Math.floor(containerWidth / itemWidth);
  const marginRigthForItem = isCarouselWidth() && (containerWidth - slideToShow * itemWidth) / (slideToShow - 1); //초기 설정

  useEffect(() => {
    setAnimation(`${speed / 1000}s ${animationType}`);
  }, [infinity, slideToScroll, speed, animationType]);

  const setAnimationType = (animationSpeed, type) => {
    setAnimation(`${animationSpeed / 1000}s ${type}`);
  };

  const handleClickPrev = () => {
    let possibleMove = currIdx >= slideToScroll ? slideToScroll : currIdx;
    setLocationX(locationX + (itemWidth + marginRigthForItem) * possibleMove);
    setCurrentIndex && setCurrentIndex(currIdx - possibleMove);
    setCurrIdx(currIdx - possibleMove);
    setLeftItem(leftItem + possibleMove);
  };

  const handleClickNext = () => {
    const totalItemCount = children.length;
    const newLeftItem = totalItemCount - (currIdx + slideToShow);
    let possibleMove = newLeftItem >= slideToScroll ? slideToScroll : newLeftItem;
    setLocationX(locationX - (itemWidth + marginRigthForItem) * possibleMove);
    setCurrentIndex && setCurrentIndex(currIdx + possibleMove);
    setCurrIdx(currIdx + possibleMove);
    setLeftItem(newLeftItem - possibleMove);
  };

  useImperativeHandle(ref, () => ({
    handleClickPrev,
    handleClickNext,
    currentIdx: currIdx
  }));
  const carouselItemList = children && children.map((item, idx) => {
    if (idx === 0) return /*#__PURE__*/React.createElement(CarouselItem, {
      key: idx,
      item,
      idx,
      setItemWidth,
      marginRigthForItem
    });
    return /*#__PURE__*/React.createElement(CarouselItem, {
      key: idx,
      item,
      idx,
      marginRigthForItem
    });
  });
  return /*#__PURE__*/React.createElement(StyledCarousel, {
    locationX: locationX,
    animation: animation,
    currIdx: currIdx,
    leftItem: leftItem
  }, /*#__PURE__*/React.createElement("div", {
    className: "carouselWrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "carouselList",
    ref: carouselContainerRef
  }, carouselItemList)), defaultArrow && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IoChevronBackSharp, {
    onClick: handleClickPrev,
    className: "leftArrow arrow"
  }), /*#__PURE__*/React.createElement(IoChevronForwardSharp, {
    onClick: handleClickNext,
    className: "rightArrow arrow"
  })), defaultPaging && /*#__PURE__*/React.createElement(CarouselPage, {
    current: currIdx + slideToShow,
    total: children && children.length
  }), PagingComp && /*#__PURE__*/React.createElement(PagingComp, {
    current: currIdx + slideToShow,
    total: children && children.length
  }));
});
export default Carousel;
export const StyledCarousel = styled.div`
  position: relative;
  .carouselWrapper {
    overflow: hidden;
  }
  .carouselList {
    display: flex;
    transition: ${({
  animation
}) => `transform ${animation}`};
    transform: ${({
  locationX
}) => `translateX(${locationX}px)`};
  }
  .arrow {
    position: absolute;
    font-size: 2rem;
    top: 40%;
    cursor: pointer;
  }
  .leftArrow {
    left: -50px;
    opacity: ${({
  currIdx
}) => currIdx === 0 ? '0.3' : '1'};
  }
  .leftArrow:hover {
    color: ${({
  currIdx
}) => currIdx === 0 ? '' : 'red'};
  }
  .rightArrow {
    right: -50px;
    opacity: ${({
  leftItem
}) => leftItem === 0 ? '0.3' : '1'};
  }
  .rightArrow :hover {
    color: ${({
  leftItem
}) => leftItem === 0 ? '' : 'red'};
  }
`;