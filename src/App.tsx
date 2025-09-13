import HeroLaunch from './components/hero-launch';
import MainSection from './components/main-section';
import { Route, Routes } from 'react-router';
import { RoutesE } from './routes';
import InspirationGuide from './inspiration-garden/inspiration-garden';

const App = () => {
  return (
    <Routes>
      <Route
        path={RoutesE.HOME}
        element={
          <>
            <HeroLaunch />
            <MainSection />
          </>
        }
      />
      <Route path={RoutesE.INSPIRATION_GARDEN} element={<InspirationGuide />} />
    </Routes>
  );
};

export default App;
