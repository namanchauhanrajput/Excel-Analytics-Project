import { Github, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 to-purple-900 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center md:text-left">
          © 2025 <span className="font-semibold">naman-chauhan-rajput</span>. All rights reserved.
        </p>

        <div className="flex gap-6">
          <a
            href="https://www.instagram.com/naman_chauhan_rajput/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition duration-300 "
          >
            <Instagram size={25} />
          </a>

          <a
            href="https://linkedin.com/in/naman-chauhan-6b8243252"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300"
          >
            <Linkedin size={25} />
          </a>

          <a
            href="https://github.com/namanchauhanrajput"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition duration-300"
          >
            <Github size={25} />
          </a>
        </div>
      </div>
    </footer>
  );
};
