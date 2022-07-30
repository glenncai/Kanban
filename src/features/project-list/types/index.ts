import { TableProps } from 'antd';
import { User } from 'types/project';
import { Project } from 'types/project';

export interface ListProps extends TableProps<Project> {
	users: User[];
}

export interface SearchPanelProps {
	users: User[];
	param: {
		name: string;
		personId: string;
	};
	setParam: (param: SearchPanelProps['param']) => void;
}
