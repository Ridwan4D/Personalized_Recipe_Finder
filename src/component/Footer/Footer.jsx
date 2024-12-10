import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">About</h3>
            <p className="text-sm">
              A personalized recipe finder that helps you make the most out of
              your ingredients.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul>
              <li>
                <Link href="/">
                  <span className="text-sm hover:text-green-400 cursor-pointer">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/allRecipePage">
                  <span className="text-sm hover:text-green-400 cursor-pointer">
                    All Recipe
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/my-favorite">
                  <span className="text-sm hover:text-green-400 cursor-pointer">
                    Favorite
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-sm hover:text-green-400 cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
            <ul>
              <li>
                <a
                  href="https://facebook.com"
                  className="text-sm hover:text-green-400"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  className="text-sm hover:text-green-400"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  className="text-sm hover:text-green-400"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Newsletter
            </h3>
            <p className="text-sm mb-4">
              Subscribe to get the latest recipe suggestions and tips.
            </p>
            <form action="#" method="POST">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mb-2 text-gray-700 rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Personalized Recipe Finder. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
