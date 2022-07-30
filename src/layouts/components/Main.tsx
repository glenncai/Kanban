import styled from '@emotion/styled';
import { ReactElement } from 'react';

const Main = ({ children }: { children: ReactElement }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

export default Main;
