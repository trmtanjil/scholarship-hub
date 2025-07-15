import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary mb-4">ScholarshipFinder</h3>
            <p className="text-gray-300">
              Connecting students with the best scholarship opportunities worldwide. Our mission is to make education accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/allscholarships" className="text-gray-300 hover:text-primary transition-colors">All Scholarships</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Scholarship Categories */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/scholarships/merit-based" className="text-gray-300 hover:text-primary transition-colors">Merit-Based</Link>
              </li>
              <li>
                <Link to="/scholarships/need-based" className="text-gray-300 hover:text-primary transition-colors">Need-Based</Link>
              </li>
              <li>
                <Link to="/scholarships/athletic" className="text-gray-300 hover:text-primary transition-colors">Athletic</Link>
              </li>
              <li>
                <Link to="/scholarships/minority" className="text-gray-300 hover:text-primary transition-colors">Minority</Link>
              </li>
              <li>
                <Link to="/scholarships/international" className="text-gray-300 hover:text-primary transition-colors">International</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <p className="text-gray-300">123 Education Ave, Scholar City, SC 12345</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" />
                <a href="mailto:info@scholarshipfinder.com" className="text-gray-300 hover:text-primary transition-colors">
                  info@scholarshipfinder.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <a href="tel:+11234567890" className="text-gray-300 hover:text-primary transition-colors">
                  +1 (123) 456-7890
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gray-800 rounded-lg p-6 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Get the latest scholarship updates, tips, and news delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} ScholarshipFinder. All rights reserved. | 
            <Link to="/privacy" className="hover:text-primary transition-colors ml-2">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-primary transition-colors ml-2">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;