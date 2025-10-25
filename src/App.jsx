import React, { useState } from 'react';
import { 
  Stethoscope, 
  Heart, 
  User, 
  Star,
  PlusSquare,
  Bone,
  Brain,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Calendar,
  Menu, // Added for mobile menu
  X     // Added for mobile menu
} from 'lucide-react';

// --- Reusable Section Title ---
const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{title}</h2>
    <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

// --- Reusable Service Card ---
const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg border border-slate-100">
    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

// --- Reusable Testimonial Card ---
const TestimonialCard = ({ quote, author, rating, isHighlight = false }) => (
  <div className={`bg-white p-8 rounded-lg shadow-lg ${isHighlight ? '' : 'border border-slate-100'}`}>
    <div className="flex mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={20} className="text-yellow-400 fill-current" />
      ))}
      {[...Array(5 - rating)].map((_, i) => (
        <Star key={i} size={20} className="text-slate-300 fill-current" />
      ))}
    </div>
    <p className="text-slate-600 italic text-lg mb-6">"{quote}"</p>
    <p className="font-semibold text-slate-800 text-right">- {author}</p>
  </div>
);

// --- Reusable Form Components ---
const FormGroup = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
    {children}
  </div>
);

const FormInput = ({ type, placeholder, icon }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon && React.cloneElement(icon, { className: 'h-5 w-5 text-slate-400' })}
    </div>
    <input 
      type={type} 
      placeholder={placeholder}
      className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
      required 
    />
  </div>
);

// --- Reusable NavLink ---
const NavLink = ({ onNavigate, pageName, children }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onNavigate(pageName);
    }}
    className="text-slate-600 hover:text-blue-600 transition duration-300 font-medium"
  >
    {children}
  </a>
);

// --- Layout: Header ---
const Header = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to handle navigation and close the mobile menu
  const handleMobileNav = (pageName) => {
    onNavigate(pageName);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Main Nav Bar */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <PlusSquare className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-slate-800">Shree Sai Clinic</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink onNavigate={onNavigate} pageName="home">Home</NavLink>
          <NavLink onNavigate={onNavigate} pageName="treatments">Treatments</NavLink>
          <NavLink onNavigate={onNavigate} pageName="testimonials">Testimonials</NavLink>
        </div>

        {/* Desktop Book Appointment Button */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigate('appointment'); }}
          className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Book Appointment
        </a>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-slate-800"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-slate-200">
          <nav className="flex flex-col p-4 space-y-4">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleMobileNav('home'); }} 
              className="text-slate-700 hover:text-blue-600 font-medium p-2 rounded-md"
            >
              Home
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleMobileNav('treatments'); }} 
              className="text-slate-700 hover:text-blue-600 font-medium p-2 rounded-md"
            >
              Treatments
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleMobileNav('testimonials'); }} 
              className="text-slate-700 hover:text-blue-600 font-medium p-2 rounded-md"
            >
              Testimonials
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleMobileNav('appointment'); }}
              className="bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Book Appointment
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

// --- Layout: Footer ---
const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-800 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Shree Sai Clinic</h3>
          <p className="text-sm">
            Providing compassionate and comprehensive healthcare for you and your family.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-white">Home</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('treatments'); }} className="hover:text-white">Treatments</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('testimonials'); }} className="hover:text-white">Testimonials</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('appointment'); }} className="hover:text-white">Book Appointment</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> <span>(123) 456-7890</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> <span>info@careclinic.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> <span>123 Health St, Medtown, USA</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
      <div className="text-center text-slate-400 text-sm mt-12 border-t border-slate-700 pt-8">
        © {new Date().getFullYear()} Shree Sai Clinic. All rights reserved.
      </div>
    </footer>
  );
};

// --- Page: Home ---
const HomePage = ({ onNavigate }) => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-blue-50 pt-16 pb-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Your Health, <br />Our Priority.
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto md:mx-0">
              Welcome to Shree Sai Clinic, where our experienced team is dedicated to providing you with the highest quality medical care in a warm and welcoming environment.
            </p>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('appointment'); }}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Book an Appointment
            </a>
          </div>
          <div>
            <img 
              src="https://placehold.co/600x400/3B82F6/FFFFFF?text=Your+Photos+Here"
              alt="Friendly doctor" 
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="container mx-auto px-6">
        <SectionTitle 
          title="Our Treatments"
          subtitle="We offer a wide range of services to meet your health needs. From routine check-ups to specialized care."
        />
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Stethoscope size={32} className="text-blue-600" />}
            title="General Checkup"
            description="Comprehensive physical exams and preventive care to keep you healthy."
          />
          <ServiceCard 
            icon={<Heart size={32} className="text-blue-600" />}
            title="Cardiology"
            description="Expert care for your heart, including diagnosis, treatment, and monitoring."
          />
          <ServiceCard 
            icon={<User size={32} className="text-blue-600" />}
            title="Pediatrics"
            description="Compassionate care for infants, children, and adolescents."
          />
        </div>
        <div className="text-center mt-12">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('treatments'); }}
            className="text-blue-600 font-medium text-lg hover:text-blue-700 transition duration-300"
          >
            See All Treatments &rarr;
          </a>
        </div>
      </section>

      {/* Testimonials Overview */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="What Our Patients Say"
            subtitle="Your trust is our most valued asset. See what our patients have to say about their experience."
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TestimonialCard 
              quote="The most caring and professional staff I have ever encountered. Dr. Smith took the time to listen and explained everything clearly."
              author="Sarah J."
              rating={5}
              isHighlight={true}
            />
            <TestimonialCard 
              quote="Booking an appointment was seamless, and I was seen right on time. A fantastic experience from start to finish."
              author="Michael B."
              rating={5}
              isHighlight={true}
            />
          </div>
          <div className="text-center mt-12">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('testimonials'); }}
              className="text-blue-600 font-medium text-lg hover:text-blue-700 transition duration-300"
            >
              Read More Testimonials &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 text-center">
        <div className="bg-blue-600 text-white rounded-lg shadow-xl p-12 md:p-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Our team is here to support you. Schedule your appointment today and take the first step towards a healthier tomorrow.
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('appointment'); }}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-slate-100 transition duration-300"
          >
            Book Appointment Now
          </a>
        </div>
      </section>
    </div>
  );
};

// --- Page: Treatments ---
const TreatmentsPage = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Our Medical Treatments"
          subtitle="We provide a full spectrum of services to ensure you and your family receive the best possible care."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Stethoscope size={32} className="text-blue-600" />}
            title="General Checkup"
            description="Comprehensive physical exams, health screenings, and preventive care to keep you healthy year-round."
          />
          <ServiceCard 
            icon={<Heart size={32} className="text-blue-600" />}
            title="Cardiology"
            description="Expert care for your heart, including diagnosis, treatment, and monitoring of cardiovascular conditions."
          />
          <ServiceCard 
            icon={<User size={32} className="text-blue-600" />}
            title="Pediatrics"
            description="Compassionate care for infants, children, and adolescents, from wellness checks to sick visits."
          />
          <ServiceCard 
            icon={<Bone size={32} className="text-blue-600" />}
            title="Orthopedics"
            description="Specialized treatment for bone, joint, and muscle issues, helping you regain mobility and live pain-free."
          />
          <ServiceCard 
            icon={<Brain size={32} className="text-blue-600" />}
            title="Neurology"
            description="Advanced care for disorders of the nervous system, including the brain, spinal cord, and nerves."
          />
          <ServiceCard 
            icon={<MessageSquare size={32} className="text-blue-600" />}
            title="Mental Health"
            description="Confidential and supportive counseling and therapy services for your mental and emotional well-being."
          />
        </div>
      </div>
    </div>
  );
};

// --- Page: Testimonials ---
const TestimonialsPage = () => {
  return (
    <div className="bg-slate-50 py-20">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Patient Stories"
          subtitle="Hearing from our patients is our greatest reward. We are proud to have earned their trust."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="The most caring and professional staff I have ever encountered. Dr. Smith took the time to listen and explained everything clearly."
            author="Sarah J."
            rating={5}
          />
          <TestimonialCard 
            quote="Booking an appointment was seamless, and I was seen right on time. A fantastic experience from start to finish."
            author="Michael B."
            rating={5}
          />
          <TestimonialCard 
            quote="I was nervous about my procedure, but the entire team at CareClinic made me feel comfortable and safe. Highly recommend."
            author="David L."
            rating={5}
          />
          <TestimonialCard 
            quote="Dr. Chen is a wonderful pediatrician. She is so patient with my children and always addresses all my concerns."
            author="Emily K."
            rating={5}
          />
          <TestimonialCard 
            quote="Finally, a clinic that values your time. Efficient, clean, and everyone is incredibly friendly."
            author="Robert P."
            rating={4}
          />
          <TestimonialCard 
            quote="The front desk staff are always so helpful and welcoming. It makes a big difference. Thank you!"
            author="Maria G."
            rating={5}
          />
        </div>
      </div>
    </div>
  );
};

// --- Page: Appointment ---
const AppointmentPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-20 bg-blue-50">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Book Your Appointment"
          subtitle="We look forward to seeing you. Please fill out the form below to request an appointment."
        />
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl">
          {submitted ? (
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-green-600 mb-4">Thank You!</h3>
              <p className="text-slate-700">Your appointment request has been submitted. Our team will contact you shortly to confirm your date and time.</p>
              <button
                onClick={() => setSubmitted(false)}
                classsName="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
              >
                Book Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormGroup label="Full Name">
                <FormInput type="text" placeholder="John Doe" icon={<User />} />
              </FormGroup>
              <div className="grid md:grid-cols-2 gap-6">
                <FormGroup label="Phone Number">
                  <FormInput type="tel" placeholder="(123) 456-7890" icon={<Phone />} />
                </FormGroup>
                <FormGroup label="Email Address">
                  <FormInput type="email" placeholder="you@example.com" icon={<Mail />} />
                </FormGroup>
              </div>
              <FormGroup label="Preferred Date">
                <FormInput type="date" icon={<Calendar />} />
              </FormGroup>
              <FormGroup label="Reason for Visit">
                <textarea 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Briefly describe your symptoms or reason for visit..."
                ></textarea>
              </FormGroup>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Submit Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};


// --- Main App Component ---
// This is the main export that manages which page is visible.
export default function App() {
  const [page, setPage] = useState('home'); // 'home', 'treatments', 'testimonials', 'appointment'

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onNavigate={setPage} />;
      case 'treatments':
        return <TreatmentsPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'appointment':
        return <AppointmentPage />;
      default:
        return <HomePage onNavigate={setPage} />;
    }
  };

  return (
    <div className="font-sans antialiased text-slate-800 bg-white">
      <Header onNavigate={setPage} />
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={setPage} />
    </div>
  );
}

