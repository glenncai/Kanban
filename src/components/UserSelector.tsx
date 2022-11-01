import React from 'react';
import { useUsers } from 'utils/user';
import { IdSelector } from 'components/IdSelector';

export const UserSelector = (
  props: React.ComponentProps<typeof IdSelector>
) => {
  const { data: users } = useUsers();

  console.log(users);

  return <IdSelector options={users || []} {...props} />;
};
