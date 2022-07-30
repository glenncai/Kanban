import { useAuth } from 'hooks/useAuth';
import { AuthForm } from 'types/auth';
import { Form, Input } from 'antd';
import { LongButton } from '..';
import { useAsync } from 'hooks/useAsync';
import { useTitle } from 'hooks/useTitle';

const Register = ({ onError }: { onError: (error: Error) => void }) => {
  useTitle('Jira Software | Register');

  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = (values: AuthForm) => {
    run(register(values)).catch((error) => onError(error));
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
        hasFeedback
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please input your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            }
          })
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          Register
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default Register;
