import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from 'layouts';
import ProjectList from 'features/project-list';
import Project from 'features/project';

const MainPage = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Navigate replace={true} to="projects" />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="projects/:projectId/*" element={<Project />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default MainPage;
