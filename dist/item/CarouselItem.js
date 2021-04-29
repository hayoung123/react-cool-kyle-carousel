import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CarouselItem = ({
  item,
  idx,
  setItemWidth,
  marginRigthForItem
}) => {
  const childRef = useRef();
  useEffect(() => {
    if (idx === 0) setItemWidth(childRef.current.offsetWidth);
  }, []);
  return /*#__PURE__*/React.createElement(StyledCarouselItem, {
    ref: childRef,
    marginRigthForItem: marginRigthForItem
  }, item);
};

const StyledCarouselItem = styled.div`
  margin-right: ${({
  marginRigthForItem
}) => `${marginRigthForItem}px`};
`;
export default CarouselItem;