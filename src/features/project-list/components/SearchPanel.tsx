import { Input, Form } from 'antd';
import { ChangeEvent } from 'react';
import { SearchPanelProps } from '../types';
import { UserSelector } from 'components/UserSelector';
import styled from '@emotion/styled';

const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
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
        <UserSelector
          showSearch
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          defaultOptionName="負責人"
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value
            })
          }
        />
      </Form.Item>
    </SearchForm>
  );
};

const SearchForm = styled(Form)`
  margin-bottom: 2rem;
`;

export default SearchPanel;
