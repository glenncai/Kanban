import React from 'react';
import { Raw } from 'types/global';
import { Select } from 'antd';

type SelectProps = React.ComponentProps<typeof Select>;

export interface IdSelectorProps extends Omit<SelectProps, keyof SelectProps> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}
