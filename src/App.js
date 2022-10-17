import Main from './pages/Main/Main';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary'
import './App.css';

function App() {
  return (
    <div className='App'>
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    </div>
  );
}

export default App;
