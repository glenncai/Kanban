import styled from '@emotion/styled';
import { ListProps } from '../types';
import { Table, Dropdown, Menu, Button } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Pin } from 'components/Pin';
import { useEditProject } from 'utils/project';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { useProjectModal } from '../hooks/useProjectModal';

const List = ({ users, ...props }: ListProps) => {
  const { open } = useProjectModal();
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);

  const menuItems = [
    {
      key: 'edit',
      label: <ButtonItem type="link">Edit</ButtonItem>,
      icon: <EditOutlinedIcon />,
      onClick: open
    },
    {
      key: 'delete',
      label: <ButtonItem type="link">Delete</ButtonItem>,
      icon: <DeleteOutlinedIcon />
    }
  ];

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
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={<Menu items={menuItems} />}
                trigger={['click']}
              >
                <MoreOutlinedIcon />
              </Dropdown>
            );
          }
        }
      ]}
      {...props}
    ></Table>
  );
};

const IconSize = '1.8rem';
const IconColor = '#0052cc;';
const HoverColor = '#2b68c5;';

const ButtonItem = styled(Button)`
  padding: 0;
  &:hover {
    color: ${HoverColor};
  }
`;

const MoreOutlinedIcon = styled(MoreOutlined)`
  font-size: 2.5rem;
  cursor: pointer;
`;

const EditOutlinedIcon = styled(EditOutlined)`
  font-size: ${IconSize};
  color: ${IconColor};
  &:hover {
    color: ${HoverColor};
  }
`;

const DeleteOutlinedIcon = styled(DeleteOutlined)`
  font-size: ${IconSize};
  color: ${IconColor};
  &:hover {
    color: ${HoverColor};
  }
`;

export default List;
