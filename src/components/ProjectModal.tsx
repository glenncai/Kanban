import styled from '@emotion/styled';
import { Button, Drawer, Form, Input } from 'antd';
import { Loading } from 'components/Loading';
import { UserSelector } from 'components/UserSelector';
import { ErrorBox } from 'components/ErrorBox';
import { useProjectModal } from 'features/project-list/hooks/useProjectModal';
import { useProjectQueryKey } from 'features/project-list/hooks/useProjectQueryKey';
import { useAddProject, useEditProject } from 'utils/project';
import { useEffect } from 'react';

export const ProjectModal = () => {
  const [form] = Form.useForm();
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading
  } = useMutateProject(useProjectQueryKey());
  const title = editingProject ? 'Edit Project' : 'Create New Project';

  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const onclose = () => {
    form.resetFields();
    close();
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={onclose}
      visible={projectModalOpen}
      width={'100%'}
      zIndex={2000}
    >
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} type="TEXT" />
            <ModalForm form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Project Name"
                name="name"
                rules={[
                  { required: true, message: 'Please input project name' }
                ]}
              >
                <Input placeholder="Project name..." />
              </Form.Item>
              <Form.Item
                label="Organization Name"
                name="organization"
                rules={[
                  { required: true, message: 'Please input organization name' }
                ]}
              >
                <Input placeholder="Organization name..." />
              </Form.Item>
              <Form.Item label="Leader" name="personId">
                <UserSelector defaultOptionName="Leader" />
              </Form.Item>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
                <Button
                  loading={mutateLoading}
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: '1.5rem' }}
                >
                  Submit
                </Button>
              </Form.Item>
            </ModalForm>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalForm = styled(Form)`
  width: 45rem;
`;
