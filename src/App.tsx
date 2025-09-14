import { Route, Routes } from 'react-router';
import { Suspense, lazy } from 'react';
import { RoutesE } from './routes';
import { LoadingSpinner, GlobalLoader } from './shared';
import { useGlobalLoader } from './hooks/useGlobalLoader';

const Home = lazy(() => import('./pages/home/home'));
const InspirationGarden = lazy(
  () => import('./pages/inspiration-garden/inspiration-garden')
);
const FindYourGift = lazy(
  () => import('./pages/find-your-gift/find-your-gift')
);
const TheLibrary = lazy(() => import('./pages/the-library/the-library'));
const OriginStory = lazy(() => import('./pages/origin-story/origin-story'));
const ZeroSugar = lazy(() => import('./pages/zero-sugar/zero-sugar'));

const App = () => {
  const { isLoading, stopLoading } = useGlobalLoader(true);

  return (
    <>
      <GlobalLoader isLoading={isLoading} onComplete={stopLoading} />
      <Suspense
        fallback={<LoadingSpinner fullScreen text='Loading experience...' />}
      >
        <Routes>
          <Route path={RoutesE.HOME} element={<Home />} />
          <Route
            path={RoutesE.INSPIRATION_GARDEN}
            element={<InspirationGarden />}
          />
          <Route path={RoutesE.FIND_YOUR_GIFT} element={<FindYourGift />} />
          <Route path={RoutesE.THE_LIBRARY} element={<TheLibrary />} />
          <Route path={RoutesE.ORIGIN_STORIES} element={<OriginStory />} />
          <Route path={RoutesE.SPRITE_ZERO_SUGAR} element={<ZeroSugar />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
