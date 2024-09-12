import { FaGithub } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";

export default function Footer() {
  return (

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Jefishub/tictactoe"
        >
          <FaGithub />
          Github
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/jeremanni/"
        >
          <CiLinkedin />
          LinkedIn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://jeremanni.info"
        >
          <CiGlobe />
          Go to my website →
        </a>
      </footer>
  );
}
