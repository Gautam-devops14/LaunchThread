import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bolt, 
  Smartphone, 
  Brain, 
  Search, 
  MessageSquare, 
  CheckCircle, 
  Star, 
  ArrowRight,
  Menu,
  X,
  Zap,
  ShieldCheck,
  Layers,
  Layout,
  Code,
  Play,
  ArrowUp,
  Twitter,
  Instagram,
  Linkedin,
  Github
} from "lucide-react";

// Placeholder Image Keys
const IMAGES = {
  profile: "https://ais-pre-gdro6syiiinbxhal3qcwgg-104603966045.run.app/api/artifacts/8617f694-8178-4389-9800-47b1c3132e0e", // Updated with user provided image
  projects: {
    gym: {
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      features: ["Class Scheduling", "Member Dashboard", "Payment Integration", "Progress Tracking"]
    },
    salon: {
      url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
      features: ["Stylist Selection", "Service Menu", "Online Deposit", "Auto-Reminders"]
    },
    cafe: {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
      features: ["Digital Menu", "Order for Pickup", "Reward Points", "Live Chat"]
    },
    saas: {
      url: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
      features: ["Waitlist Form", "Product Roadmap", "Integration List", "Usage Charts"]
    }
  }
};

const SectionReveal = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

interface Project {
  title: string;
  cat: string;
  tags: string[];
  img: string;
  features: string[];
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showLeadMagnet, setShowLeadMagnet] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const openWhatsApp = () => {
    window.open("https://wa.me/918849422544?text=Hi, I want to discuss a project with LaunchThread!", "_blank");
  };

  const openCalendly = () => {
    window.open("https://calendly.com", "_blank");
    setBookingConfirmed(true);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects: Project[] = [
    {
      title: "FitForge Gym",
      cat: "Fitness & Wellness",
      tags: ["Booking System", "Mobile App", "Payments"],
      img: IMAGES.projects.gym.url,
      features: IMAGES.projects.gym.features
    },
    {
      title: "Luxe Salon Studio",
      cat: "Beauty & Lifestyle",
      tags: ["Appointments", "Gallery", "Reviews"],
      img: IMAGES.projects.salon.url,
      features: IMAGES.projects.salon.features
    },
    {
      title: "Brew & Bean Café",
      cat: "Food & Beverage",
      tags: ["Online Orders", "Menu", "Loyalty"],
      img: IMAGES.projects.cafe.url,
      features: IMAGES.projects.cafe.features
    },
    {
      title: "LaunchPad SaaS",
      cat: "Tech Startup",
      tags: ["Landing Page", "Waitlist", "Analytics"],
      img: IMAGES.projects.saas.url,
      features: IMAGES.projects.saas.features
    }
  ];

  return (
    <div className="min-h-screen selection:bg-indigo-100">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-dark-bg/80 backdrop-blur-md border-b border-white/5 py-4 shadow-sm" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-container-max mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/20 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col -gap-1">
              <span className="text-xl font-black tracking-tight leading-none text-white whitespace-nowrap">LaunchThread</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {["Work", "Process", "Pricing", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-bold text-slate-400 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={openWhatsApp}
              className="hidden sm:block btn-primary text-sm py-2.5 px-8 cursor-pointer"
            >
              Get Started
            </button>
            <button 
              className="md:hidden text-white p-2 cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-dark-bg pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {["Work", "Process", "Pricing", "Contact"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-black text-white hover:text-indigo-400 transition-colors"
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => { openWhatsApp(); setMobileMenuOpen(false); }}
                className="w-full btn-primary py-4 text-xl"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Matching Reference Image */}
      <header className="relative pt-48 pb-32 overflow-hidden bg-midnight-grid min-h-screen flex items-center">
        <div className="max-w-container-max mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 mb-10 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  Available for new projects
                </div>
                <h1 className="text-[3.5rem] md:text-[5.5rem] font-black tracking-tight mb-8 leading-[1.1] text-white">
                  I Build Websites <br /> That <span className="text-gradient">Get You <br /> Customers</span>
                </h1>
                <p className="text-xl text-slate-400 mb-12 max-w-xl leading-relaxed font-medium">
                  Premium booking & landing pages for businesses — designed with AI, delivered in 48–72 hours. Stop losing customers to bad websites.
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <button 
                    onClick={openCalendly}
                    className="btn-primary text-lg px-12 py-5 flex items-center gap-3 cursor-pointer"
                  >
                    Start Your Project <ArrowRight className="w-5 h-5" />
                  </button>
                  <a href="#work" className="btn-ghost flex items-center gap-3 cursor-pointer group">
                    <Layout className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" /> View My Work
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 flex justify-center"
              >
                {/* Hero Photo with Concentric Glowing Circles */}
                <div className="relative">
                  {/* Decorative Glows */}
                  <div className="absolute -inset-20 bg-indigo-600/10 rounded-full blur-[100px] -z-10 animate-pulse" />
                  <div className="absolute inset-0 border-2 border-white/5 rounded-full -m-10" />
                  <div className="absolute inset-0 border border-white/10 rounded-full -m-20" />
                  
                  <div className="w-[340px] h-[340px] md:w-[440px] md:h-[440px] rounded-full overflow-hidden border-[10px] border-dark-surface shadow-2xl relative bg-dark-bg">
                    <img 
                      src={IMAGES.profile} 
                      alt="Founder" 
                      className="w-full h-full object-cover transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Floating Badges from image */}
                  <div className="absolute top-1/4 -right-8 glass-card p-4 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Delivery in</div>
                    <div className="text-lg font-bold text-indigo-400">48-72 Hours</div>
                  </div>
                  
                  <div className="absolute bottom-1/4 -left-8 glass-card p-4 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Satisfaction</div>
                    <div className="text-lg font-bold text-purple-400">100% ✦</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </header>


      {/* Portfolio - LIGHT SECTION */}
      <section id="work" className="py-32 bg-white">
        <div className="max-w-container-max mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-24">
              <span className="text-indigo-600 font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Portfolio</span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Work <span className="text-indigo-600/20 px-4 py-1 rounded-2xl border border-indigo-100 italic">That Speaks</span></h2>
              <p className="text-slate-500 mt-6 text-xl max-w-2xl mx-auto font-medium">Click on any project to see conversion-focused features and design details.</p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -12 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(proj)}
              >
                <div className="relative overflow-hidden rounded-[40px] bg-slate-50 border border-slate-100 shadow-2xl mb-8">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={proj.img} 
                      alt={proj.title} 
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-sm">
                    <div className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
                      View Project <Zap className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </div>
                <div className="px-4">
                  <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em] mb-3">{proj.cat}</div>
                  <h3 className="text-4xl font-black text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors">{proj.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {proj.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-900 hover:bg-white shadow-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-3/5 bg-slate-100 overflow-y-auto custom-scrollbar text-center">
                <img 
                  src={selectedProject.img} 
                  alt={selectedProject.title} 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-8 text-slate-400 text-xs italic">
                  Scroll for full design preview
                </div>
              </div>

              <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto bg-white">
                <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-3">{selectedProject.cat}</div>
                <h2 className="text-4xl font-black text-slate-900 mb-6">{selectedProject.title}</h2>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Core Features</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedProject.features.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center">
                            <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />
                          </div>
                          <span className="text-sm font-bold text-slate-700">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100">
                    <button 
                      onClick={() => { setSelectedProject(null); setShowLeadMagnet(true); }}
                      className="w-full btn-primary py-4 flex items-center justify-center gap-3"
                    >
                      Audit My Current Site <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lead Magnet Modal */}
      <AnimatePresence>
        {showLeadMagnet && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowLeadMagnet(false); setLeadCaptured(false); }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl p-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
              <button 
                onClick={() => { setShowLeadMagnet(false); setLeadCaptured(false); }}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

                  {leadCaptured ? (
                <div className="text-center py-12">
                   <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 mb-4 font-space-grotesk">Done</h3>
                  <button 
                    onClick={() => { setShowLeadMagnet(false); setLeadCaptured(false); }}
                    className="mt-8 text-indigo-600 font-bold uppercase tracking-widest text-xs hover:underline"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Search className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-2">Free Website Audit</h3>
                    <p className="text-slate-500 font-medium">Enter your details and I'll send you a 5-minute video teardown of how to increase your conversion rate.</p>
                  </div>

                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setLeadCaptured(true); }}>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Full Name</label>
                      <input type="text" required placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none font-medium transition-all" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Email Address</label>
                      <input type="email" required placeholder="john@example.com" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none font-medium transition-all" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Website URL (Optional)</label>
                      <input type="url" placeholder="https://yourwebsite.com" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none font-medium transition-all" />
                    </div>
                    <button type="submit" className="w-full btn-primary py-5 text-lg mt-4 flex items-center justify-center gap-3">
                      Send My Free Audit <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                  <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6">No spam. Only high-value insights.</p>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Calendly Confirmation Modal */}
      <AnimatePresence>
        {bookingConfirmed && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingConfirmed(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-10 overflow-hidden text-center"
            >
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">Meeting Requested!</h3>
              <p className="text-slate-500 font-medium mb-10">
                If you successfully booked on Calendly, you'll receive a confirmation email shortly. I'm looking forward to our call!
              </p>
              <button 
                onClick={() => setBookingConfirmed(false)}
                className="w-full btn-primary py-4"
              >
                Back to Site
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Calendly CTA Section */}
      <section className="py-24 bg-indigo-600 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2" />
        <div className="max-w-container-max mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Not sure what you need? <br />
                <span className="text-indigo-200">Let's hop on a call.</span>
              </h2>
              <p className="text-indigo-100 text-lg font-medium opacity-90 mb-8">
                Book a free 15-minute consultation to discuss your business goals and see if we're a good fit. No pressure, just strategy.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button 
                  onClick={openCalendly}
                  className="bg-white text-indigo-600 font-black px-10 py-5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
                >
                  Book on Calendly <Star className="w-5 h-5 fill-current" />
                </button>
                <div className="flex -space-x-3 items-center">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-indigo-100 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                    </div>
                  ))}
                  <span className="ml-4 text-xs font-bold text-indigo-100 tracking-wider uppercase">10+ slots booked this week</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3 w-full">
              <div className="glass-card bg-white/10 backdrop-blur-xl border-white/20 p-8 rounded-[32px] shadow-2xl">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600">
                    <Bolt className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white font-bold">LaunchThread Strategy</div>
                    <div className="text-xs text-indigo-200 uppercase font-medium tracking-widest">15 Min Call</div>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {["Analyze current bottlenecks", "Map out conversion funnel", "Cost & Timeline estimation"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-white font-medium">
                      <CheckCircle className="w-4 h-4 text-indigo-300" />
                      {item}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setShowLeadMagnet(true)}
                  className="w-full py-4 text-center text-xs font-bold uppercase tracking-widest text-indigo-100 hover:text-white transition-colors cursor-pointer"
                >
                  Or Get a Free Website Audit First →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process - LIGHT SECTION */}
      <section id="process" className="py-32 bg-white">
        <div className="max-w-container-max mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-20">
              <span className="text-indigo-600 font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Proven Methodology</span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Fast <span className="text-gradient">By Design.</span></h2>
              <p className="text-slate-500 mt-6 text-xl max-w-2xl mx-auto font-medium">A battle-tested workflow to get your premium site from idea to launch in record time.</p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Strategy", icon: Layers, desc: "We deep-dive into your USP and conversion goals to map out a high-performance site structure.", delay: 0 },
              { num: "02", title: "Build", icon: Bolt, desc: "Rapid prototyping and precision development using our curated modern tech stack.", delay: 0.2 },
              { num: "03", title: "Launch", icon: Zap, desc: "Final stress tests, SEO review, and immediate Go-Live. We don't believe in delays.", delay: 0.4 }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.delay }}
                className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 group hover:shadow-2xl transition-all"
              >
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform"
                >
                  <step.icon className="w-8 h-8 text-indigo-600" />
                </motion.div>
                <div className="text-sm font-bold text-indigo-600/50 mb-3 tracking-widest">{step.num}</div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - DARK/GRADIENT MIX */}
      <section className="py-24 bg-midnight-grid relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-10 leading-tight">Ready to build <br /><span className="text-gradient italic">The Best Version</span> of your brand?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button 
              onClick={openCalendly}
              className="btn-primary text-xl px-14 py-6 w-full sm:w-auto"
            >
              Start My Project <ArrowRight className="w-6 h-6" />
            </button>
            <button 
              onClick={openWhatsApp}
              className="btn-ghost px-14 py-6 text-xl w-full sm:w-auto hover:bg-white hover:text-dark-bg"
            >
              Contact on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Quick Contact Form - LIGHT */}
      <section id="contact" className="py-32 bg-white">
        <div className="max-w-container-max mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-indigo-600 font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Get In Touch</span>
            <h2 className="text-5xl font-black text-slate-900 mb-6">Drop a Message</h2>
            <p className="text-slate-500 font-medium">Have a specific request or question? Fill out the form below and I'll get back to you within 12 hours.</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto p-12 bg-slate-50 rounded-[48px] border border-slate-100"
          >
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent! I'll be in touch shortly."); (e.target as HTMLFormElement).reset(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 mb-2 block">Name</label>
                  <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:border-indigo-500 transition-all font-medium" placeholder="Your Name" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 mb-2 block">Email</label>
                  <input type="email" required className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:border-indigo-500 transition-all font-medium" placeholder="Email Address" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 mb-2 block">Company / Business</label>
                <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:border-indigo-500 transition-all font-medium" placeholder="Your Business Name" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 mb-2 block">Message</label>
                <textarea rows={4} required className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:border-indigo-500 transition-all font-medium resize-none" placeholder="How can I help you?"></textarea>
              </div>
              <button type="submit" className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-3">
                Send Message <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Price section modified to Dark/Light mix */}
      <section id="pricing" className="py-32 bg-slate-50">
        <div className="max-w-container-max mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Transparent & Fair</span>
              <h2 className="text-4xl md:text-5xl font-bold">Simple <span className="text-gradient">Payment Process</span></h2>
              <p className="text-on-surface-variant mt-4 max-w-2xl mx-auto italic opacity-70">
                No large upfront payments. We split it into three milestones — so you only pay as we deliver value.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { pct: "20%", title: "Advance Payment", icon: Layout, detail: "To kick off your project and secure your slot in our 48-72hr timeline." },
              { pct: "30%", title: "After Designs", icon: Code, detail: "Once mockup views are approved and we move into final technical assembly." },
              { pct: "50%", title: "On Completion", icon: ShieldCheck, detail: "The final step once your premium site is fully built, tested, and ready to go live." }
            ].map((m, i) => (
              <div key={i} className="p-8 glass-card rounded-3xl border border-outline relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-1/2 -translate-y-1/2 scale-150">
                  <m.icon className="w-16 h-16 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-4">{m.pct}</div>
                <h3 className="text-xl font-bold mb-3">{m.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="text-xs font-bold text-on-surface-variant uppercase text-center mb-4 tracking-widest opacity-60">Total project value breakdown</div>
            <div className="h-6 bg-surface-muted rounded-full overflow-hidden flex border border-outline p-1">
              <div className="h-full bg-blue-500 rounded-l-full w-[20%]" />
              <div className="h-full bg-purple-500 w-[30%]" />
              <div className="h-full bg-indigo-500 rounded-r-full w-[50%]" />
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-2">
              <span>Advance</span>
              <span>After Designs</span>
              <span>On Completion</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - DARK SECTION */}
      <section id="pricing" className="py-32 bg-midnight-grid border-y border-white/5">
        <div className="max-w-container-max mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="text-indigo-400 font-bold text-sm tracking-[0.2em] uppercase mb-6 block">Transparent Pricing</span>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">One Price. <br /><span className="text-gradient">Zero Bullshit.</span></h2>
              <p className="text-slate-400 text-xl font-medium leading-relaxed mb-10">
                Forget complicated tiers. I provide a premium, conversion-optimized website with everything you need to grow your business for a fixed investment.
              </p>
              
              <div className="space-y-6">
                {[
                  "Premium Custom Design (No Templates)",
                  "Mobile & Tablet Responsive",
                  "WhatsApp / Booking Integration",
                  "Basic SEO Optimization",
                  "Hosting Setup & Launch Support"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white font-bold">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="glass-card p-12 rounded-[48px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[80px] -z-10 group-hover:bg-indigo-500/20 transition-all" />
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-6">Founders Special</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-7xl font-black text-white">₹9,999</span>
                </div>
                <div className="text-green-500 font-bold text-lg mb-10 flex items-center gap-2">
                  <Zap className="w-5 h-5 fill-current" /> Save ₹15,000 Today
                </div>
                
                <button 
                  onClick={openWhatsApp}
                  className="w-full btn-primary py-6 text-xl flex items-center justify-center gap-3 cursor-pointer"
                >
                  Book via WhatsApp <MessageSquare className="w-6 h-6" />
                </button>
                
                <div className="mt-8 flex items-center justify-center gap-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">Join 50+ businesses <br /> launching this month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - LIGHT SECTION */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-container-max mx-auto px-6">
          <div className="relative glass-card-light rounded-[60px] p-12 md:p-24 overflow-hidden text-center border-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 -z-10" />
            <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">Ready to <br /><span className="text-indigo-600">Scale Up?</span></h2>
            <p className="text-xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Stop losing customers to outdated websites. Let's build something premium that converts visitors into paying customers — in just 48-72 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={openCalendly}
                className="btn-primary px-12 py-6 text-xl w-full sm:w-auto"
              >
                Schedule Free Call
              </button>
              <button 
                onClick={openWhatsApp}
                className="btn-ghost !bg-white !text-slate-900 !border-slate-200 px-12 py-6 text-xl w-full sm:w-auto hover:!bg-slate-50"
              >
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - DARK */}
      <footer className="py-20 bg-dark-bg border-t border-white/5 text-white">
        <div className="max-w-container-max mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-indigo-500" />
              <span className="text-2xl font-black text-white">LaunchThread</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-10 text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">
              <a href="#work" className="hover:text-white transition-colors">Work</a>
              <a href="#process" className="hover:text-white transition-colors">Process</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-6">
              {[
                { Icon: Twitter, color: "hover:text-[#1DA1F2]", href: "#" },
                { Icon: Instagram, color: "hover:text-[#E4405F]", href: "#" },
                { Icon: Linkedin, color: "hover:text-[#0077B5]", href: "#" },
                { Icon: Github, color: "hover:text-white", href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  className={`text-slate-500 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                >
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
              
               <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white transition-all cursor-pointer ml-4"
               >
                 <ArrowUp className="w-5 h-5" />
               </button>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">&copy; 2026 LaunchThread. Premium Fast. All Rights Reserved.</p>
            <div className="flex items-center gap-8">
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.3em]">Crafted for Founders</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
