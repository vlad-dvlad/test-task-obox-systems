import HeroLaunch from './components/hero-launch';
import MainSection from './components/main-section';
import HexagonalMenuDemo from './components/hexagonal-menu-demo';
import { Route, Routes } from 'react-router';
import { RoutesE } from './routes';

const App = () => {
  return (
    <Routes>
      <Route
        path={RoutesE.HOME}
        element={
          <>
            <HeroLaunch />
            <MainSection />
            <HexagonalMenuDemo />
          </>
        }
      />
    </Routes>
  );
};

export default App;
