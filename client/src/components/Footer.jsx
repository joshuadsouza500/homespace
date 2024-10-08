import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-light_gray text-[#4d5461] border-t py-8 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <a href="/" className="flex items-center mb-4">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-purple-600"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
              <span className="ml-2 text-xl font-bold ">Homescape</span>
            </a>
            <div className="space-y-2 pl-1">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#000929] " />
                <span>support@homescape.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-[#000929]" />
                <span>+91 945 658 3256</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-[#000929]" />
                <span>61-A, Elm street, Awali, Bahrain.</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-[#000929] mb-3">Homespace</h3>
            <ul className="space-y-2 pl-1">
              <li>
                <a href="/" className="hover:text-gray-800">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-800">
                  Browse Properties
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-gray-800">
                  Profile
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#000929] mb-3">Resources</h3>
            <ul className="space-y-2 pl-1">
              <li>
                <a href="/faqs" className="hover:text-gray-800">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/quick-start" className="hover:text-gray-800">
                  Quick Start
                </a>
              </li>
              <li>
                <a href="/documentation" className="hover:text-gray-800">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[#000929] mb-3">Support</h3>
            <ul className="space-y-2 pl-1">
              <li>
                <a href="/customer-support" className="hover:text-gray-800">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="/license" className="hover:text-gray-800">
                  License
                </a>
              </li>
              <li>
                <a href="/terms-conditions" className="hover:text-gray-800">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center">
          <p>&copy; Homescape 2024, All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
