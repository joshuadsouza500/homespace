import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-white border-t pt-8 md:pt-12 pb-6 bg-gradient-to-br from-text  to-Bgpurple  text dark:bg-[#121212] dark:border-t-muted rounded-t-md">
      <div className="container mx-auto px-4 w-full h-auto bg-no-repeat">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info Section */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link
              className="flex items-center space-x-2 cursor-pointer"
              to={"/"}
            >
              <img
                alt="Homespace logo"
                height={24}
                width={24}
                className="size-8"
                src="/assets/Logo.svg"
              />
              <span className="font-serif tracking-wide pt-0.5 text-4xl font-bold text-zinc-50 dark:text-Primary">
                HomeSpace
              </span>
            </Link>
            <p className="text- text-white/75 w-3/4     text-left">
              Your trusted partner in real estate, helping you find your dream
              home.
            </p>
            <div className="space-y-3 text-white/75 cursor-pointer">
              <div className="flex items-center hover:text-white/50">
                <Phone className="size-5 " />
                <span className="ml-2">+973 3665256</span>
              </div>
              <div className="flex items-center hover:text-white/50">
                <Mail className="size-5 " />
                <span className="ml-2">support@homespace.com</span>
              </div>
            </div>
          </div>{" "}
          {/* Links */}
          <div className="flex justify-between items-center   md:col-span-3">
            <div>
              <h3 className="font-semibold mb-3 lg:mb-6 text-xl">
                Quick Links
              </h3>
              <ul className="space-y-3 pl-1">
                <li>
                  <a
                    href="/"
                    className="hover:text-white text-white/70 transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/property"
                    className="hover:text-white text-white/70 transition duration-300"
                  >
                    Properties
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-white text-white/70 transition duration-300"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 lg:mb-6 text-xl">Support</h3>
              <ul className="space-y-3 pl-1">
                <li>
                  <a
                    href="/contact"
                    className="hover:text-white text-white/70 transition duration-300"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-white text-white/70 transition duration-300"
                  >
                    Customer Support
                  </a>
                </li>
                <li>
                  <a
                    href="/terms-conditions"
                    className="hover:text-white text-white/70 transition duration-300"
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div className="hidden lg:block">
              <h3 className="font-semibold mb-3 lg:mb-6 text-xl">Resources</h3>
              <ul className="space-y-3 pl-1 text-light_gray ">
                <li>
                  <a
                    href="/faqs"
                    className="hover:text-white text-white/70 transition duration-300"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-white text-white/70 transition duration-300"
                  >
                    Help
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-white text-white/70 transition duration-300"
                  >
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-4 border-t border-white/40 text-center text-white/70">
          <p>© HomeSpace 2025, All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
