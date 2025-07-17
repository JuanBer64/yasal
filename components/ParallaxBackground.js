function ParallaxBackground() {
    try {
        React.useEffect(() => {
            const elements = document.querySelectorAll('.parallax-element');
            if (window.simpleParallax && elements.length > 0) {
                new simpleParallax(elements, {
                    delay: 0.6,
                    transition: 'cubic-bezier(0,0,0,1)'
                });
            }
        }, []);

        return (
            <div className="parallax-container" data-name="parallax-background" data-file="components/ParallaxBackground.js">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="parallax-element absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
                    <div className="parallax-element absolute top-40 right-20 w-24 h-24 bg-blue-300 bg-opacity-20 rounded-full blur-lg"></div>
                    <div className="parallax-element absolute bottom-32 left-1/4 w-40 h-40 bg-purple-300 bg-opacity-15 rounded-full blur-2xl"></div>
                    <div className="parallax-element absolute bottom-20 right-10 w-28 h-28 bg-pink-300 bg-opacity-20 rounded-full blur-xl"></div>
                    <div className="parallax-element absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-300 bg-opacity-10 rounded-full blur-3xl"></div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ParallaxBackground component error:', error);
        reportError(error);
    }
}
