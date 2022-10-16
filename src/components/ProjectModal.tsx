import { Button, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  projectListActons,
  selectProjectModalOpen
} from 'features/project-list/slices';

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);

  return (
    <Drawer
      onClose={() => dispatch(projectListActons.closeProjectModal())}
      visible={projectModalOpen}
      width={'100%'}
    >
      <h1>Project Modal</h1>
      <Button onClick={() => dispatch(projectListActons.closeProjectModal())}>
        Close
      </Button>
    </Drawer>
  );
};
