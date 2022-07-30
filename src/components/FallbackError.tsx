import styled from '@emotion/styled';
import { Typography } from 'antd';
import errorLogo from 'assets/error.svg';
import { DevTools } from 'jira-dev-tool';

export const FallbackError = ({ error }: { error: Error | null }) => {
  return (
    <Container>
      <DevTools />
      <ErrorIcon />
      <Typography.Title level={3} type="danger">
        {error?.message}
      </Typography.Title>
      <Typography.Title level={3} type="danger">
        Please try to contact support.
      </Typography.Title>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const ErrorIcon = styled.div`
  background: url(${errorLogo}) no-repeat center;
  padding: 7rem 0;
  background-size: 14rem;
  width: 100%;
  margin-bottom: 8rem;
`;
