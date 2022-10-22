import { Button, Drawer } from 'antd';
import { useProjectModal } from 'features/project-list/hooks/useProjectModal';

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();

  return (
    <Drawer onClose={close} visible={projectModalOpen} width={'100%'}>
      <h1>Project Modal</h1>
      <Button onClick={close}>Close</Button>
    </Drawer>
  );
};
