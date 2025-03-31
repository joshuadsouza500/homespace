import { Mail, Phone, MapPin, MapPinHouseIcon } from "lucide-react";

export default function Footer() {
  //text-[#4d5461]
  return (
    <footer className="text-white border-t py-8  bg-text ">
      <div
        className="container mx-auto px-4 w-full h-auto bg-no-repeat"
        //  style={{ backgroundImage: "url(/footer-bg.jpg)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2 ">
            <a href="/" className="flex items-center mb-4">
              <MapPinHouseIcon className="size-5" />
              <span className="ml-2 text-xl font-bold  ">Homescape</span>
            </a>
            <div className="space-y-2 pl-1 text-white">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2  " />
                <span>support@homescape.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 " />
                <span>+91 945 658 3256</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 " />
                <span>61-A, Elm street, Awali, Bahrain.</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Homespace</h3>
            <ul className="space-y-2 pl-1 text-light_gray">
              <li>
                <a href="/" className="hover:text-white/70 ">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white/70">
                  Browse Properties
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-white/70">
                  Profile
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold  mb-3">Resources</h3>
            <ul className="space-y-2 pl-1 text-light_gray">
              <li>
                <a href="/faqs" className="hover:text-gray-300">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/quick-start" className="hover:text-white/70">
                  Quick Start
                </a>
              </li>
              <li>
                <a href="/documentation" className="hover:text-white/70">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Support</h3>
            <ul className="space-y-2 pl-1">
              <li>
                <a href="/customer-support" className="hover:text-white/70">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="/license" className="hover:text-white/70">
                  License
                </a>
              </li>
              <li>
                <a href="/terms-conditions" className="hover:text-white/70">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-light_gray/70">
          <p>&copy; Homescape 2024, All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
