export const Home = () => {
    return (
        <>
            {/* Full screen purple background */}
            <div className="min-h-screen bg-gradient-to-br from-purple-400 to-purple-200 relative flex flex-col items-center justify-center text-center px-4">

                {/* Sign In button on top-right */}
                <div className="absolute top-6 right-6">
                    <a href="/login">
                        <button className="bg-white text-purple-700 font-semibold px-5 py-2 rounded-xl shadow hover:bg-purple-100 transition">
                            Sign In
                        </button>
                    </a>
                </div>

                {/* Logo and Heading */}
                <div className="z-10 max-w-2xl">
                    {/* Optional logo */}
                    {/* <img src="/images/logo.png" alt="logo" className="mx-auto mb-4 w-16 h-16" /> */}

                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow">
                        Sheet<span className="text-purple-900">Viz</span>
                    </h1>

                    <p className="text-white text-lg md:text-xl mb-8 drop-shadow">
                        Upload and visualize Excel files with interactive charts and smart insights
                    </p>

                    <a href="/dashboard">
                        <button className="bg-white text-purple-700 font-bold px-6 py-3 rounded-xl hover:bg-purple-100 transition shadow-lg">
                            Get Started
                        </button>
                    </a>
                </div>

                {/* Bottom curved white wave */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg
                        className="relative block w-[calc(100%+1.3px)] h-[350px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="#ffffff"
                            d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,197.3C672,213,768,235,864,224C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </div>
        </>
    );
};
