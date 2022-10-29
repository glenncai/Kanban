import { Typography } from 'antd';

const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({
  error,
  type
}: {
  error: unknown;
  type: 'TEXT' | 'TITLE';
}) => {
  if (isError(error)) {
    switch (type) {
      case 'TEXT':
        return <Typography.Text type="danger">{error.message}</Typography.Text>;
      case 'TITLE':
        return (
          <Typography.Title level={3} type="danger">
            {error?.message}
          </Typography.Title>
        );
      default:
        return null;
    }
  }
  return null;
};
