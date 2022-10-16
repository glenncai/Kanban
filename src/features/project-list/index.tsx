import { useDebounce } from 'hooks/useDebounce';
import SearchPanel from './components/SearchPanel';
import List from './components/List';
import styled from '@emotion/styled';
import { Button, Typography } from 'antd';
import { Row } from 'lib/custom';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useTitle } from 'hooks/useTitle';
import { useProjectSearchParams } from './hooks/useProjectSearchParams';
import { useDispatch } from 'react-redux';
import { projectListActons } from 'features/project-list/slices/index';

const ProjectList = () => {
  useTitle('Jira Software | Project');

  const dispatch = useDispatch();
  const [param, setParam] = useProjectSearchParams();
  const {
    data: list,
    error,
    isLoading,
    retry
  } = useProjects(useDebounce(param, 500));
  const { data: users } = useUsers();

  return (
    <Container>
      <Typography.Title level={2}>Project Lists</Typography.Title>
      <Row between={true} marginBottom={2}>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {error ? (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        ) : null}
        <Button onClick={() => dispatch(projectListActons.openProjectModal())}>
          Create New Project
        </Button>
      </Row>
      <List
        refresh={retry}
        users={users || []}
        dataSource={list || []}
        loading={isLoading}
      />
    </Container>
  );
};

ProjectList.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectList;
