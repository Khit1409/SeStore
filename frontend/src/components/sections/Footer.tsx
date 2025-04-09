import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <section className="container-lg bg-gray-800 mt-1">
      <div className="w-full flex flex-col py-6">
        <div className="text-center">
          <h1 className="text-5xl text-white font-bold">SE Store</h1>
          <p className="text-xl text-white italic">Shop everything you want!</p>
        </div>

        {/* Các liên kết */}
        <div className="flex md:flex-row flex-col items-center justify-around mt-6">
          <div className="text-white text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-semibold">Quick Links</h2>
            <ul className="list-none space-y-2 mt-2">
              <li>
                <a href="/home" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Mạng xã hội */}
          <div className="text-white text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-semibold">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-6 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={["fab", "facebook-f"]}
                  className="text-2xl text-gray-400 hover:text-white"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={["fab", "twitter"]}
                  className="text-2xl text-gray-400 hover:text-white"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={["fab", "instagram"]}
                  className="text-2xl text-gray-400 hover:text-white"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={["fab", "linkedin"]}
                  className="text-2xl text-gray-400 hover:text-white"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            © 2025 SE Store. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
