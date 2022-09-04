import { useUsers } from 'utils/user';
import { IdSelector } from 'components/IdSelector';
import React from 'react';

export const UserSelector = (
  props: React.ComponentProps<typeof IdSelector>
) => {
  const { data: users } = useUsers();

  return <IdSelector options={users || []} {...props} />;
};
