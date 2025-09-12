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
            <div  className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Welcome to Our
                        <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Future Platform
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 opacity-90">
                        Experience the future with our cutting-edge technology and innovative solutions
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroLaunch;