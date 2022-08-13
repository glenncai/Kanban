import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Kanban } from './components/Kanban';
import { Epic } from './components/Epic';

const Project = () => {
  return (
    <div>
      <h1>Project Screen</h1>
      <Link to="kanban">Kanban</Link>
      <Link to="epic">Task</Link>
      <Routes>
        <Route index element={<Navigate replace={true} to="kanban" />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/epic" element={<Epic />} />
      </Routes>
    </div>
  );
};

export default Project;
