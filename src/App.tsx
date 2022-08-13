import './App.css';
import { FallbackError } from 'components/FallbackError';
import { ErrorBoundary } from 'components/ErrorBoundary';
import MainPage from 'pages/MainPage';
import AuthPage from 'pages/AuthPage';
import { useAuth } from 'hooks/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FallbackError}>
        {user ? <MainPage /> : <AuthPage />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
