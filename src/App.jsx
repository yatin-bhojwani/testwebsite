import React, { useState } from 'react';
import { 
  Syringe, 
  Eye, 
  Zap, 
  Heart, 
  User, 
  Star,
  PlusSquare, 
  Sparkles, 
  Droplet, 
  Smile, 
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram, 
  Youtube, 
  Calendar,
  Menu,
  X     
} from 'lucide-react';

// --- Font Loader and Animation/Pattern Injector ---
const StyleInjector = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@400;500;700&display=swap');
      
      .font-serif { 
        font-family: 'Cormorant Garamond', serif; 
      }
      .font-sans { 
        font-family: 'Montserrat', sans-serif; 
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fade-in-up {
        opacity: 0; 
        animation: fadeInUp 0.8s ease-out forwards;
      }

      /* HOW-TO: ADD YOUR BACKGROUND IMAGE
        1. Replace the placeholder URL below with the path to your PNG.
        2. If you put your PNG in the 'public' folder in Vite, 
           the path will just be: url('/your-image-name.png')
      */
      .bg-hero-pattern {
        background-image: url('beauty.webp'); /* <-- REPLACE THIS URL */
        background-repeat: repeat;
        background-size: 150px; /* Adjust pattern size */
        opacity: 0.1; /* Adjust pattern transparency */
      }
    `}
  </style>
);


// --- Reusable Section Title ---
const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-serif">{title}</h2>
    <p className="text-lg text-slate-600 max-w-3xl mx-auto">{subtitle}</p>
  </div>
);

// --- Reusable Service Card ---
const TreatmentCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl">
    <div className="bg-violet-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-slate-800 mb-3 font-serif">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

// --- Reusable Testimonial Card ---
const TestimonialCard = ({ quote, author, rating }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl">
    <div className="flex mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={20} className="text-yellow-400 fill-current" />
      ))}
      {[...Array(5 - rating)].map((_, i) => (
        <Star key={i} size={20} className="text-slate-300 fill-current" />
      ))}
    </div>
    <p className="text-slate-700 italic text-lg mb-6">"{quote}"</p>
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
      className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500`}
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
    className="text-white hover:text-violet-200 transition duration-300 font-medium"
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
    <header className="bg-violet-600 shadow-md sticky top-0 z-50">
      {/* Main Nav Bar */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <PlusSquare className="h-8 w-8 text-white" /> 
          <span className="text-2xl font-bold text-white font-serif">The Nice Skin Clinic</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink onNavigate={onNavigate} pageName="home">HOME</NavLink>
          <NavLink onNavigate={onNavigate} pageName="treatments">TREATMENTS</NavLink>
          <NavLink onNavigate={onNavigate} pageName="testimonials">TESTIMONIALS</NavLink>
        </div>

        {/* Desktop Book Appointment Button */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onNavigate('appointment'); }}
          className="hidden md:block bg-white text-violet-600 px-6 py-2 rounded-lg font-medium shadow-lg hover:bg-violet-100 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Book An Appointment
        </a>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-violet-600 shadow-lg border-t border-violet-500">
          <nav className="flex flex-col p-4 space-y-4">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleMobileNav('home'); }} 
              className="text-white hover:text-violet-200 font-medium p-2 rounded-md"
            >
              Home
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleMobileNav('treatments'); }} 
              className="text-white hover:text-violet-200 font-medium p-2 rounded-md"
            >
              Treatments
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleMobileNav('testimonials'); }} 
              className="text-white hover:text-violet-200 font-medium p-2 rounded-md"
            >
              Testimonials
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleMobileNav('appointment'); }}
              className="bg-white text-violet-600 text-center px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-violet-100 transition duration-300"
            >
              Book An Appointment
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
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 font-serif">Aura Aesthetics</h3>
          <p className="text-sm">
            Empowering confidence through advanced skin, hair, and aesthetic solutions.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 font-serif">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-white">Home</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('treatments'); }} className="hover:text-white">Treatments</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('testimonials'); }} className="hover:text-white">Testimonials</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('appointment'); }} className="hover:text-white">Book Appointment</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 font-serif">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> <span>(123) 456-7890</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> <span>hello@auraaesthetics.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> <span>Plot 17, Lane No. 7, Kalyani Nagar, Pune</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 font-serif">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white"><Youtube size={20} /></a>
          </div>
        </div>
      </div>
      <div className="text-center text-slate-400 text-sm mt-12 border-t border-slate-700 pt-8">
        © {new Date().getFullYear()} Aura Aesthetics. All rights reserved.
      </div>
    </footer>
  );
};

// --- Page: Home ---
const HomePage = ({ onNavigate }) => {
  return (
    <div className="space-y-28 pb-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-violet-600 py-24 md:py-32 flex items-center justify-center text-center min-h-[60vh]">
        {/* Background Pattern Layer */}
        <div className="hidden md:block absolute inset-0 z-0 bg-[url('/beuty.webp')] bg-no-repeat bg-right md:bg-contain"></div>
        
        {/* Content Layer */}
        <div className="container mx-auto px-6 relative z-10 max-w-3xl">
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-serif animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            Refined Beauty, <br className="hidden md:inline" />Expertly Yours.
          </h1>
          <p 
            className="text-lg text-violet-100 mb-8 max-w-lg mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            Welcome to Aura Aesthetics, where science and aesthetics converge to provide flawless skin, healthy hair, and renewed confidence.
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('appointment'); }}
            className="inline-block bg-white text-violet-600 px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-violet-100 transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            Book An Appointment
          </a>
        </div>
      </section>

      {/* Info Bar / Location & Hours */}
      <section className="container mx-auto px-6 -mt-32 relative z-20">
        <div className="bg-white rounded-xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center border border-slate-100">
          <div className="flex items-center space-x-4">
            <MapPin size={32} className="text-violet-600" />
            <div>
              <h4 className="font-semibold text-slate-800 text-lg font-serif">Our Location</h4>
              <p className="text-slate-600 text-sm">Plot 17, Lane No. 7, Kalyani Nagar, Pune</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Calendar size={32} className="text-violet-600" />
            <div>
              <h4 className="font-semibold text-slate-800 text-lg font-serif">Business Hours</h4>
              <p className="text-slate-600 text-sm">Thu - Tues (Wed Off) | 10AM to 8PM</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Phone size={32} className="text-violet-600" />
            <div>
              <h4 className="font-semibold text-slate-800 text-lg font-serif">Contact Us</h4>
              <p className="text-slate-600 text-sm">+91 9873858066</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Technology / Expertise */}
      <section className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 items-center gap-16">
          <div className="order-2 md:order-1">
            <img 
              src="thread.jpg" 
              alt="Advanced aesthetic technology" 
              className="rounded-xl shadow-xl w-full"
            />
          </div>
          <div className="order-1 md:order-2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 font-serif">
              Advanced Dermatology Technology
            </h2>
            <p className="text-lg text-slate-700 mb-8">
              We use globally recognized, FDA-approved technology to deliver safe and effective results. Our cutting-edge devices ensure precision and comfort for all our treatments.
            </p>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('treatments'); }}
              className="inline-block bg-slate-800 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-slate-900 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Explore Our Technologies
            </a>
          </div>
        </div>
      </section>

      {/* Featured Treatments */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Our Signature Treatments"
            subtitle="Discover our most popular and effective treatments designed to enhance your natural beauty and confidence."
          />
          <div className="grid md:grid-cols-3 gap-8">
            <TreatmentCard 
              icon={<Sparkles size={32} className="text-violet-600" />}
              title="Advanced Facials"
              description="Customized facials using medical-grade products to rejuvenate and perfect your skin tone and texture."
            />
            <TreatmentCard 
              icon={<Syringe size={32} className="text-violet-600" />}
              title="Botox & Fillers"
              description="Non-surgical solutions to reduce wrinkles, restore volume, and achieve a refreshed, youthful appearance."
            />
            <TreatmentCard 
              icon={<Zap size={32} className="text-violet-600" />}
              title="Laser Treatments"
              description="Targeted laser therapies for hair removal, pigmentation, acne scars, and skin resurfacing."
            />
          </div>
          <div className="text-center mt-12">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('treatments'); }}
              className="text-violet-600 font-medium text-lg hover:text-violet-700 transition duration-300"
            >
              View All Treatments &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Overview */}
      <section className="container mx-auto px-6">
        <SectionTitle 
          title="What Our Clients Say"
          subtitle="Real stories from real clients who found their confidence at Aura Aesthetics."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="Absolutely thrilled with my results! The team is incredibly professional and made me feel so comfortable."
            author="Priya S."
            rating={5}
          />
          <TestimonialCard 
            quote="The skin analysis was so thorough, and the recommended treatment worked wonders. My skin has never looked better!"
            author="Rohit M."
            rating={5}
          />
          <TestimonialCard 
            quote="A premium experience from start to finish. They truly understand aesthetics and deliver exceptional results."
            author="Ananya R."
            rating={5}
          />
        </div>
        <div className="text-center mt-12">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('testimonials'); }}
            className="text-violet-600 font-medium text-lg hover:text-violet-700 transition duration-300"
          >
            Read More Client Stories &rarr;
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 text-center">
        <div className="bg-violet-700 text-white rounded-xl shadow-xl p-12 md:p-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Ready for Your Aesthetic Transformation?</h2>
          <p className="text-lg text-violet-100 mb-8">
            Our expert team is here to guide you. Book your personalized consultation today.
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('appointment'); }}
            className="inline-block bg-white text-violet-600 px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-slate-100 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Schedule Consultation
          </a>
        </div>
      </section>
    </div>
  );
};

// --- Page: Treatments ---
const TreatmentsPage = () => {
  return (
    <div className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Our Comprehensive Aesthetic Treatments"
          subtitle="Explore our full range of advanced skin, hair, and body treatments designed for optimal results."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TreatmentCard 
            icon={<Sparkles size={32} className="text-violet-600" />}
            title="Medical Facials & Peels"
            description="Personalized treatments for deep cleansing, exfoliation, hydration, and skin rejuvenation."
          />
          <TreatmentCard 
            icon={<Syringe size={32} className="text-violet-600" />}
            title="Anti-Wrinkle Injections"
            description="Botox treatments to reduce fine lines and wrinkles for a smoother, younger-looking appearance."
          />
          <TreatmentCard 
            icon={<Droplet size={32} className="text-violet-600" />}
            title="Dermal Fillers"
            description="Restore lost volume, enhance contours, and soften facial creases for natural-looking results."
          />
          <TreatmentCard 
            icon={<Zap size={32} className="text-violet-600" />}
            title="Laser Hair Reduction"
            description="Permanent hair reduction using advanced laser technology for smooth, clear skin."
          />
          <TreatmentCard 
            icon={<Eye size={32} className="text-violet-600" />}
            title="Pigmentation & Spot Removal"
            description="Effective treatments for sun spots, age spots, melasma, and uneven skin tone."
          />
          <TreatmentCard 
            icon={<Heart size={32} className="text-violet-600" />}
            title="Acne & Scar Management"
            description="Comprehensive solutions for active acne, acne scars, and overall skin texture improvement."
          />
          <TreatmentCard 
            icon={<User size={32} className="text-violet-600" />}
            title="Hair Restoration"
            description="Advanced therapies for hair loss, thinning hair, and scalp health, promoting regrowth."
          />
          <TreatmentCard 
            icon={<Smile size={32} className="text-violet-600" />}
            title="Lip Augmentation"
            description="Enhance lip volume and definition with natural-looking dermal fillers."
          />
          <TreatmentCard 
            icon={<Syringe size={32} className="text-violet-600" />}
            title="Body Contouring"
            description="Non-surgical treatments to reduce fat, tighten skin, and sculpt desired body areas."
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
          title="Our Client Success Stories"
          subtitle="Read what our valued clients have to say about their journey and results at Aura Aesthetics."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="The best decision I ever made for my skin. Dr. Sharma's expertise is unparalleled, and the results are fantastic!"
            author="Aisha K."
            rating={5}
          />
          <TestimonialCard 
            quote="I've struggled with acne for years. After a few sessions here, my skin is clear and I feel so much more confident."
            author="Karan J."
            rating={5}
          />
          <TestimonialCard 
            quote="The staff are incredibly welcoming, and the clinic feels luxurious. My filler results are subtle and perfect."
            author="Divya P."
            rating={5}
          />
          <TestimonialCard 
            quote="Highly recommend their laser treatments. Painless and very effective for hair reduction. Great service."
            author="Rahul V."
            rating={4}
          />
          <TestimonialCard 
            quote="They really listen to your concerns and provide honest, professional advice. So happy with my rejuvenated look."
            author="Shalini G."
            rating={5}
          />
          <TestimonialCard 
            quote="The attention to detail and personalized care is exceptional. I feel truly cared for and my skin glows!"
            author="Vikram D."
            rating={5}
          />
          <TestimonialCard 
            quote="As a first-timer for aesthetic treatments, I was nervous, but they made me feel completely at ease and informed."
            author="Meera H."
            rating={4}
          />
          <TestimonialCard 
            quote="My dark spots have faded significantly! Thank you, Aura Aesthetics, for giving me back my even skin tone."
            author="Arjun S."
            rating={5}
          />
          <TestimonialCard 
            quote="The clinic's atmosphere is so relaxing. Every visit feels like a treat, and I always leave feeling refreshed."
            author="Pooja T."
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
    <div className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Schedule Your Personal Consultation"
          subtitle="Begin your journey to enhanced confidence and radiant skin. Fill out the form below to request an appointment."
        />
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-slate-100">
          {submitted ? (
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-emerald-600 mb-4 font-serif">Consultation Request Received!</h3>
              <p className="text-slate-700">Thank you for reaching out. Our team will contact you within 24 hours to confirm your preferred date and time.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 bg-violet-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-violet-700 transition duration-300"
              >
                Schedule Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormGroup label="Full Name">
                <FormInput type="text" placeholder="Your Name" icon={<User />} />
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
              <FormGroup label="Area of Interest (Optional)">
                <textarea 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  rows="4"
                  placeholder="e.g., Anti-Wrinkle Injections, Laser Hair Removal, Skin Rejuvenation..."
                ></textarea>
              </FormGroup>
              <button 
                type="submit"
                className="w-full bg-violet-600 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-violet-700 transition-all duration-300 ease-in-out transform hover:scale-105"
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
  const [page, setPage] = useState('home'); 

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
      {/* This injects the custom fonts and animations */}
      <StyleInjector />
      
      <Header onNavigate={setPage} />
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={setPage} />
    </div>
  );
}


