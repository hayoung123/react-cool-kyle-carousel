import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';

const Carousel = forwardRef(
  (
    {
      children,
      slideToScroll = 1,
      animationType = 'ease',
      speed = 500,
      defaultArrow = false,
      defaultPaging = false,
      setCurrentIndex,
    },
    ref
  ) => {
    const [locationX, setLocationX] = useState(0);
    const [currIdx, setCurrIdx] = useState(0);
    const [leftItem, setLeftItem] = useState();
    const [itemWidth, setItemWidth] = useState();
    const [animation, setAnimation] = useState();
    const carouselContainerRef = useRef();
    const isCarouselWidth = () => carouselContainerRef.current && itemWidth;
    const containerWidth = isCarouselWidth() && carouselContainerRef.current.offsetWidth;
    const slideToShow = isCarouselWidth() && Math.floor(containerWidth / itemWidth);
    const marginRigthForItem =
      isCarouselWidth() && (containerWidth - slideToShow * itemWidth) / (slideToShow - 1);

    //초기 설정
    useEffect(() => {
      setAnimation(`${speed / 1000}s ${animationType}`);
    }, [slideToScroll, speed, animationType]);

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
      currentIdx: currIdx,
    }));

    const carouselItemList =
      children &&
      children.map((item, idx) => {
        if (idx === 0)
          return <CarouselItem key={idx} {...{ item, idx, setItemWidth, marginRigthForItem }} />;
        return <CarouselItem key={idx} {...{ item, idx, marginRigthForItem }} />;
      });

    return (
      <StyledCarousel
        locationX={locationX}
        animation={animation}
        currIdx={currIdx}
        leftItem={leftItem}
      >
        <div className='carouselWrapper'>
          <div className='carouselList' ref={carouselContainerRef}>
            {carouselItemList}
          </div>
        </div>
        {defaultArrow && (
          <>
            <IoChevronBackSharp onClick={handleClickPrev} className='leftArrow arrow' />
            <IoChevronForwardSharp onClick={handleClickNext} className='rightArrow arrow' />
          </>
        )}
        {defaultPaging && (
          <CarouselPage current={currIdx + slideToShow} total={children && children.length} />
        )}
      </StyledCarousel>
    );
  }
);

export default Carousel;

export const StyledCarousel = styled.div`
  position: relative;
  .carouselWrapper {
    overflow: hidden;
  }
  .carouselList {
    display: flex;
    transition: ${({ animation }) => `transform ${animation}`};
    transform: ${({ locationX }) => `translateX(${locationX}px)`};
  }
  .arrow {
    position: absolute;
    font-size: 2rem;
    top: 40%;
    cursor: pointer;
  }
  .leftArrow {
    left: -50px;
    opacity: ${({ currIdx }) => (currIdx === 0 ? '0.3' : '1')};
  }
  .leftArrow:hover {
    color: ${({ currIdx }) => (currIdx === 0 ? '' : 'red')};
  }
  .rightArrow {
    right: -50px;
    opacity: ${({ leftItem }) => (leftItem === 0 ? '0.3' : '1')};
  }
  .rightArrow :hover {
    color: ${({ leftItem }) => (leftItem === 0 ? '' : 'red')};
  }
`;

const CarouselPage = ({ current, total }) => {
  return (
    <>
      <StyledPageContainer className='pageContainer'>
        <div className='currentPage'>{current}</div>
        <div className='pageDivider'>/</div>
        <div className='totalPage'>{total}</div>
      </StyledPageContainer>
    </>
  );
};

const StyledPageContainer = styled.div`
  position: absolute;
  top: -1.2rem;
  right: 1%;
  display: flex;
  .pageDivider {
    font-size: 0.9rem;
  }
`;

const CarouselItem = ({ item, idx, setItemWidth, marginRigthForItem }) => {
  const childRef = useRef();

  useEffect(() => {
    if (idx === 0) setItemWidth(childRef.current.offsetWidth);
  }, []);

  return (
    <StyledCarouselItem ref={childRef} marginRigthForItem={marginRigthForItem}>
      {item}
    </StyledCarouselItem>
  );
};

const StyledCarouselItem = styled.div`
  margin-right: ${({ marginRigthForItem }) => `${marginRigthForItem}px`};
`;
