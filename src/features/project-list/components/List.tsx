import { ListProps } from '../types';
import { Table } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Pin } from 'components/Pin';
import { useEditProject } from 'utils/project';

const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);

  return (
    <Table
      rowKey={'id'}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          }
        },
        {
          title: 'Title',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={`${String(project.id)}`}>{project.name}</Link>;
          }
        },
        {
          title: 'Organization',
          dataIndex: 'organization',
          sorter: (a, b) => a.organization.localeCompare(b.organization)
        },
        {
          title: 'Manager',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            );
          }
        },
        {
          title: 'Created At',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD HH:mm:ss')
                  : 'Null'}
              </span>
            );
          }
        }
      ]}
      {...props}
    ></Table>
  );
};

export default List;
