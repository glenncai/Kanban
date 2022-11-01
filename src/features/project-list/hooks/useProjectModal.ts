import { useUrlQueryParam } from 'hooks/useUrlQueryParam';
import { useProject } from 'utils/project';
import { useSearchParams } from 'react-router-dom';

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId'
  ]);

  const [_, setUrlParams] = useSearchParams();
  const { data: editingProject, isLoading } = useProject(+editingProjectId);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () =>
    setUrlParams({
      projectCreate: '',
      editingProjectId: ''
    });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === 'true' || !!editingProjectId,
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  };
};
