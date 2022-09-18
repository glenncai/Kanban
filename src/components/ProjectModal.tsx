import { ProjectModalProps } from 'types/project-modal';
import { Button, Drawer } from 'antd';

export const ProjectModal = (props: ProjectModalProps) => {
  return (
    <Drawer
      onClose={props.onClose}
      visible={props.projectModalOpen}
      width={'100%'}
    >
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}>Close</Button>
    </Drawer>
  );
};
