import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Heading = styled.h2`
  font-size: 28px;
`;

const Img = styled.img`
  height: 200px;
  width: auto;
  margin-bottom: 40px;
`;

export default ({ title, src }) => (
  <Wrapper>
    <Img src={src} />
    <Heading>{title}</Heading>
  </Wrapper>
);
