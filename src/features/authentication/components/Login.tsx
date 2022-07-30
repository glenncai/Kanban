import { useAuth } from 'hooks/useAuth';
import { Form, Input } from 'antd';
import { AuthForm } from 'types/auth';
import { LongButton } from '..';
import { useAsync } from 'hooks/useAsync';
import { useTitle } from 'hooks/useTitle';

const Login = ({ onError }: { onError: (error: Error) => void }) => {
  useTitle('Jira Software | Login');

  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = (values: AuthForm) => {
    run(login(values)).catch((error) => onError(error));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          Log in
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default Login;
