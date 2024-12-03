const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Website. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href="#"
            className="hover:text-white transition"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="#"
            className="hover:text-white transition"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="hover:text-white transition"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
