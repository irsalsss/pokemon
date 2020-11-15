import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Loading from './components/shared/Loading';
import './index.css'
import ErrorPage from './pages/ErrorPage';

const HomePage = lazy(() => import('./pages/HomePage'))

const App = () => {

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </ErrorBoundary>
      </BrowserRouter>
    </Suspense>
  )
}

export default App;