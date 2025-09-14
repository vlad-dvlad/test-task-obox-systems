import VideoGallery from '../../components/library-videos/video-gallery';
import { videos } from './config';

const TheLibrary = () => {
  return <VideoGallery items={videos} />;
};

export default TheLibrary;
