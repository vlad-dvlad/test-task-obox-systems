import HeroLaunch from './components/hero-launch';
import MainSection from './components/main-section';
import { Route, Routes } from 'react-router';
import { RoutesE } from './routes';
import InspirationGarden from './inspiration-garden/inspiration-garden';
import FindYourGift from './find-your-gift/find-your-gift';

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
      <Route
        path={RoutesE.INSPIRATION_GARDEN}
        element={<InspirationGarden />}
      />
      <Route path={RoutesE.FIND_YOUR_GIFT} element={<FindYourGift />} />
    </Routes>
  );
};

export default App;
