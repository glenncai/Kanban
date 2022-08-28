import { Input, Select, Form } from 'antd';
import { ChangeEvent } from 'react';
import { SearchPanelProps } from '../types';
import styled from '@emotion/styled';

const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  console.log('Users: ', users);

  return (
    <SearchForm layout="inline">
      <Form.Item>
        <Input.Search
          type="text"
          placeholder="Project name..."
          value={param.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setParam({
              ...param,
              name: e.target.value
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          showSearch
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          value={param.personId}
          onChange={(value: string) =>
            setParam({
              ...param,
              personId: value
            })
          }
        >
          <Select.Option value={''}>Manager</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id.toString()}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </SearchForm>
  );
};

const SearchForm = styled(Form)`
  margin-bottom: 2rem;
`;

export default SearchPanel;
