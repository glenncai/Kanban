import { ListProps } from '../types';
import { Table } from 'antd';
import dayjs from 'dayjs';

const List = ({ users, ...props }: ListProps) => {
	return (
		<Table
			rowKey={'id'}
			columns={[
				{
					title: 'Title',
					dataIndex: 'name',
					sorter: (a, b) => a.name.localeCompare(b.name)
				},
				{
					title: 'Organization',
					dataIndex: 'organization',
					sorter: (a, b) => a.organization.localeCompare(b.organization)
				},
				{
					title: 'Manager',
					render(value, project) {
						return <span>{users.find((user) => user.id === project.personId)?.name || '未知'}</span>;
					}
				},
				{
					title: 'Created At',
					render(value, project) {
						return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD HH:mm:ss') : 'Null'}</span>;
					}
				}
			]}
			{...props}
		></Table>
	);
};

export default List;
