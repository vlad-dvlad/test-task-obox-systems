import HeroLaunch from './components/hero-launch';
import MainSection from './components/main-section';
import { Route, Routes } from 'react-router';
import { RoutesE } from './routes';
import InspirationGarden from './inspiration-garden/inspiration-garden';
import FindYourGift from './find-your-gift/find-your-gift';
import TheLibrary from './pages/the-library/the-library';
import OriginStory from './pages/origin-story/origin-story';
import ZeroSugar from './pages/zero-sugar/zero-sugar';

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
      <Route path={RoutesE.THE_LIBRARY} element={<TheLibrary />} />
      <Route path={RoutesE.ORIGIN_STORIES} element={<OriginStory />} />
      <Route path={RoutesE.SPRITE_ZERO_SUGAR} element={<ZeroSugar />} />
    </Routes>
  );
};

export default App;
