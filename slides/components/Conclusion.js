import React from 'react';
import styled from 'styled-components';

const Heading = styled.h2`
  font-size: 48px;
  height: 100%;
  width: 100%;
  max-width: 740px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  text-align: center;
  color: #769343;
`;

export default ({ children }) => <Heading>{children}</Heading>;
