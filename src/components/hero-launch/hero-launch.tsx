import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HeroLaunch = () => {

    return (
        <div  className="fixed inset-0 w-full h-full overflow-hidden">
            <video
                
                className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            >
                <source src="/bg-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <h1>HALL OF ZERO LIMITS</h1>
            <span>Explore new paths. Find your gift</span>
        </div>
    );
};

export default HeroLaunch;