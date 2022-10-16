import { ReactElement } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import { ProjectModal } from 'components/ProjectModal';

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <ProjectModal />
      <Navbar />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
