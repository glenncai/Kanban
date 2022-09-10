import { PinProps } from 'types/pin';
import { Rate } from 'antd';

export const Pin = (props: PinProps) => {
  const { checked, onCheckedChange, ...restProps } = props;

  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  );
};
