import { TableProps } from 'antd';
import { User } from 'types/project';
import { Project } from 'types/project';

export interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

export interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, 'name' | 'personId'>>;
  setParam: (param: SearchPanelProps['param']) => void;
}
