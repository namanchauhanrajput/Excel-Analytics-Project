import { useAuth } from "../store/auth";


export const About = () => {
  const {user} = useAuth();
 

  return (
    <section className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-10 flex justify-center items-center">
      <div className="flex flex-col-reverse md:flex-row items-center gap-28 md:gap-52 max-w-6xl w-full mt-0 md:mt-[-100px]">
        {/* Left content */}
        <div className="flex-[1.4] space-y-6 text-center md:text-left md:pl-10">
          <p className="text-purple-700 font-semibold text-lg">
            Welcome, {user ? `${user.username} to our website`: `to our website`}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Why Choose <span className="text-purple-700">Us</span>?
          </h1>

          <p className="text-left text-gray-700 text-base md:text-lg space-y-2">
            Expertise: Our team consists of experienced IT professionals who are passionate about staying up-to-date
            with the latest industry trends. <br />
            Customization: We understand that every business is unique. That’s why we create solutions that are
            tailored to your specific needs and goals. <br />
            Customer-Centric Approach: We prioritize your satisfaction and provide top-notch support to address your IT concerns. <br />
            Affordability: We offer competitive pricing without compromising on the quality of our services. <br />
            Reliability: Count on us to be there when you need us. We’re committed to ensuring your IT environment is reliable
            and available 24/7. <br />
          </p>

          {/* Buttons */}
          <div className="flex flex-row gap-4 justify-center md:justify-start">
            <a href="/contact">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition shadow-md">
                Connect Now
              </button>
            </a>
            <a href="/about">
              <button className="bg-transparent text-purple-700 border border-purple-500 px-6 py-3 rounded-xl hover:bg-purple-50 transition shadow-md">
                Learn More
              </button>
            </a>
          </div>
        </div>

        {/* Right image */}
        <div className="flex-[0.9] flex justify-center">
          <img
            src="/images/about.png"
            alt="coding together"
            className="w-72 md:w-96 object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
