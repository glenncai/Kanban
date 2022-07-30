import './App.css';
import { useAuth } from 'hooks/useAuth';
import MainPage from 'pages/MainPage';
import AuthPage from 'pages/AuthPage';
import { FallbackError } from 'components/FallbackError';
import { ErrorBoundary } from 'components/ErrorBoundary';

function App() {
	const { user } = useAuth();

	return (
		<div className='App'>
			<ErrorBoundary fallbackRender={FallbackError}>{user ? <MainPage /> : <AuthPage />}</ErrorBoundary>
		</div>
	);
}

export default App;
