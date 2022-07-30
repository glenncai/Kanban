import Navbar from './components/Navbar';
import Main from './components/Main';
import { ReactElement } from 'react';

const Layout = ({ children }: { children: ReactElement }) => {
	return (
		<>
			<Navbar />
			<Main>{children}</Main>
		</>
	);
};

export default Layout;
