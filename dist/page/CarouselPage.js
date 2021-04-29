import React from 'react';
import styled from 'styled-components';

const CarouselPage = ({
  current,
  total
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StyledPageContainer, {
    className: "pageContainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "currentPage"
  }, current), /*#__PURE__*/React.createElement("div", {
    className: "pageDivider"
  }, "/"), /*#__PURE__*/React.createElement("div", {
    className: "totalPage"
  }, total)));
};

const StyledPageContainer = styled.div`
  position: absolute;
  top: -7%;
  right: 1%;
  display: flex;
  .pageDivider {
    font-size: 0.9rem;
  }
`;
export default CarouselPage;