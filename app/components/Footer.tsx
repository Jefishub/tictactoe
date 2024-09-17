import { FaGithub } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { FooterCopyright } from "flowbite-react";

export default function CustomFooter() {
    return (

        <footer className="p-4 flex gap-2 flex-col items-center justify-center">
            <div className="flex flex-row flex-wrap gap-4">

                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://github.com/Jefishub/tictactoe"
                >
                    <FaGithub className="size-8" />
                    <span className="hidden sm:flex">Github</span>
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://www.linkedin.com/in/jeremanni/"
                >
                    <CiLinkedin className="size-8" />
                    <span className="hidden sm:flex">LinkedIn</span>

                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://jeremanni.com"
                >
                    <CiGlobe className="size-8" />
                    <span className="hidden sm:flex">Go to my website →</span>

                </a>
            </div>
            <FooterCopyright by="Jere Manni" year={2024} />
        </footer>
    );
}
