import { Button, Divider, List, Popover, Typography } from 'antd';
import { useProjects } from 'utils/project';
import { NavTitle } from 'layouts/components/Navbar';
import styled from '@emotion/styled';
import { useProjectModal } from 'features/project-list/hooks/useProjectModal';

export const ProjectPopOver = () => {
  const { open } = useProjectModal();
  const { data: projects } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <ContentTitle type="secondary">Pinned Projects</ContentTitle>
      <List>
        {pinnedProjects?.map((project) => (
          <ListItem key={project.id}>
            <List.Item.Meta title={project.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <CreateProjectButton type="link" onClick={open}>
        Create Project
      </CreateProjectButton>
    </ContentContainer>
  );

  return (
    <Popover placement="bottom" content={content}>
      <NavTitle>Projects</NavTitle>
    </Popover>
  );
};

const CommonPadding = '1rem';

const ContentContainer = styled.div`
  min-width: 30rem;
`;

const ContentTitle = styled(Typography.Text)`
  padding: ${CommonPadding};
`;

const ListItem = styled(List.Item)`
  cursor: pointer;
  padding: ${CommonPadding};
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CreateProjectButton = styled(Button)`
  padding: 0 ${CommonPadding};
`;
