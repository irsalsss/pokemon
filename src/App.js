import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Loading from './components/shared/Loading';
import ErrorPage from './pages/ErrorPage';
import { PokemonProvider } from './context/PokemonContext';
import './style.scss';

const HomePage = lazy(() => import('./pages/HomePage'))
const DetailPage = lazy(() => import('./pages/DetailPage'))
const MyPokemonPage = lazy(() => import('./pages/MyPokemonPage'))
const Navbar = lazy(() => import('./components/navbar/Navbar'))

const App = () => {

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Navbar />
          <Switch>
            <PokemonProvider>
              <Redirect to={{pathname: "/"}} />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/pokemon-detail/:id" component={DetailPage} />
              <Route exact path="/my-pokemon" component={MyPokemonPage} />
            </PokemonProvider>
          </Switch>
        </ErrorBoundary>
      </BrowserRouter>
    </Suspense>
  )
}

export default App;