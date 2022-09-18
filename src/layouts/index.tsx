import { ReactElement, useState } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import { ProjectModal } from 'components/ProjectModal';

const Layout = ({ children }: { children: ReactElement }) => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      ></ProjectModal>
      <Navbar setProjectModalOpen={setProjectModalOpen} />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
