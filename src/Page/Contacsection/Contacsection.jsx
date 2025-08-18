import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import Swal from "sweetalert2";

function Contacsection() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "b9563cb5-f125-4f7a-a23b-8a1809ae2520");
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Message sent!",
        text: "Thank you for your message. I'll get back to you soon.",
        showConfirmButton: false,
        timer: 2000,
      });
      event.target.reset();
    }
  };

  return (
    <section id="contact" className="pt-24 py-4 px-4 bg-gradient-to-b from-gray-900/70 to-gray-800/80 text-gray-200">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-4">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center bg-gray-800/50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-3 rounded-full bg-primary/20">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-lg">Email</h4>
                <a href="mailto:trmtanjil02@gmail.com" className="hover:text-primary transition-colors">
                  trmtanjil02@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center bg-gray-800/50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-3 rounded-full bg-primary/20">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-lg">Phone</h4>
                <a href="tel:+8801867913057" className="hover:text-primary transition-colors">
                  +880 1867913057
                </a>
              </div>
            </div>

            <div className="flex items-center bg-gray-800/50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-3 rounded-full bg-primary/20">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-lg">Location</h4>
                <p>Narsingdi, Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="p-6 bg-gray-800/50 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="font-medium mb-3">Connect With Me</h4>
              <div className="flex space-x-4 text-primary">
                <a href="https://www.linkedin.com/in/trm-tanjil/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/trmtanjil" target="_blank" rel="noopener noreferrer">
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={onSubmit}>
              <input type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 rounded-md bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none" />
              <input type="email" name="email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-md bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none" />
              <textarea name="message" placeholder="Your Message" required className="w-full px-4 py-3 rounded-md bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none resize-none h-32"></textarea>
              <button type="submit" className="w-full py-3 bg-primary text-gray-900 font-semibold rounded-md flex justify-center items-center gap-2 hover:bg-primary/90 transition-colors">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacsection;
