import HeroLaunch from './components/hero-launch';
import MainSection from './components/main-section';
import VideoPlayer from './shared/ui/video-player/video-player';

const App = () => {
  return (
    <div className='relative w-full h-full'>
      <HeroLaunch />

      <div
        style={{
          padding: '2rem',
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        <h2
          style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}
        >
          Video Player Examples
        </h2>
        <MainSection />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#555' }}>
              Big Buck Bunny (MP4)
            </h3>
            <VideoPlayer
              src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
              title='Big Buck Bunny - Open Source Animation'
            />
          </div>

          <div>
            <h3 style={{ marginBottom: '1rem', color: '#555' }}>
              Tears of Steel (MP4)
            </h3>
            <VideoPlayer
              src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
              title='Tears of Steel - Open Source Sci-Fi Film'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
