import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: ${(p) => p.top};
  left: ${(p) => p.left};
  transform: rotate(${(p) => p.rotate || 0});
  font-size: 32px;
  color: #769343;
`;

export default ({ children, top, left, rotate }) => (
  <Container top={top} left={left} rotate={rotate}>
    {children}
  </Container>
);
