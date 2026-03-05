import { useEffect, useRef, useState } from 'react';
import { Apple, ArrowRight, ChevronDown, Plus, Minus } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('why');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['why', 'features', 'platform', 'faq'];
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(section),
        onEnterBack: () => setActiveSection(section),
      });
    });
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Navigation Pill */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-black/90 backdrop-blur-xl rounded-full px-2 py-2 flex items-center gap-1 border border-white/10">
          <button
            onClick={() => scrollToSection('why')}
            className={`px-4 py-2 text-xs font-medium tracking-wider transition-colors rounded-full ${
              activeSection === 'why' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white'
            }`}
          >
            WHY?
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className={`px-4 py-2 text-xs font-medium tracking-wider transition-colors rounded-full ${
              activeSection === 'features' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white'
            }`}
          >
            FEATURES
          </button>
          <button
            onClick={() => scrollToSection('platform')}
            className={`px-4 py-2 text-xs font-medium tracking-wider transition-colors rounded-full ${
              activeSection === 'platform' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white'
            }`}
          >
            PLATFORM
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className={`px-4 py-2 text-xs font-medium tracking-wider transition-colors rounded-full ${
              activeSection === 'faq' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white'
            }`}
          >
            F.A.Q
          </button>
        </div>
      </div>

      {/* Top Bar - visible at top */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-black">
              <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 8L16 16L22 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-black font-semibold tracking-wider text-sm">LEGEND</span>
          </div>
          <div className="hidden md:flex items-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-black/80 flex items-center gap-2 border border-black/10">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Waitlist removed — Legend is out on iOS.
              <ArrowRight size={14} className="text-black/60" />
            </div>
          </div>
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-black/90 transition-colors flex items-center gap-2"
          >
            <Apple size={16} />
            DOWNLOAD
          </a>
        </div>
      </div>

      {/* Logo - visible when scrolled */}
      <div
        className={`fixed top-4 left-6 z-50 transition-all duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white">
          <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 8L16 16L22 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Download button - visible when scrolled */}
      <div
        className={`fixed top-4 right-6 z-50 transition-all duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <a
          href="https://apps.apple.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors flex items-center gap-2"
        >
          <Apple size={16} />
          DOWNLOAD
        </a>
      </div>
    </>
  );
}

// Hero Section
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [coordinates, setCoordinates] = useState({ lat: '47.0514° N', lng: '9.0678° E' });

  useEffect(() => {
    const coords = [
      { lat: '47.0514° N', lng: '9.0678° E' },
      { lat: '51.5074° N', lng: '0.1278° W' },
      { lat: '40.7128° N', lng: '74.0060° W' },
      { lat: '35.6762° N', lng: '139.6503° E' },
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % coords.length;
      setCoordinates(coords[index]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });
      gsap.from('.hero-earn', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
      });
      gsap.from('.hero-desc', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.7,
        ease: 'power3.out',
      });
      gsap.from('.hero-phone', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.4,
        ease: 'power3.out',
      });
      gsap.from('.hero-partners', {
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#e8e8e8]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src="/hero-bg-new.jpg" alt="Misty landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#e8e8e8]/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        {/* Coordinates */}
        <div className="flex justify-between items-center w-full max-w-4xl mx-auto mb-8">
          <span className="font-mono text-xs text-black/50 tracking-widest">{coordinates.lat}</span>
          <span className="font-mono text-xs text-black/50 tracking-widest">{coordinates.lng}</span>
        </div>

        {/* Main Title */}
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-light text-black mb-4 tracking-tight">
          Own your future.
        </h1>

        {/* Earn Rate */}
        <div className="hero-earn flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#7c3aed] rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
          <span className="text-4xl md:text-5xl lg:text-6xl font-light">
            <span className="text-[#22c55e]">Earn</span>
            <span className="text-black"> up to 6.27%</span>
          </span>
        </div>

        {/* Description */}
        <p className="hero-desc text-black/60 text-lg md:text-xl max-w-xl mx-auto mb-12">
          Legend is an onchain money superapp, built to make your assets work for you.
        </p>

        {/* Phone Mockup */}
        <div className="hero-phone relative mx-auto w-72 md:w-80 lg:w-96 mb-16">
          <img src="/phone-mockup-1.png" alt="Legend App" className="w-full h-auto drop-shadow-2xl" />
        </div>

        {/* Explore Button */}
        <button
          onClick={() => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 mx-auto text-black/60 hover:text-black transition-colors group mb-16"
        >
          <ChevronDown className="group-hover:translate-y-1 transition-transform" size={20} />
          <span className="text-sm tracking-widest font-medium">EXPLORE</span>
        </button>

        {/* Partner Logos */}
        <div className="hero-partners flex items-center justify-center gap-8 md:gap-12 opacity-50">
          <span className="text-black/60 text-sm font-medium">Compound</span>
          <span className="text-black/60 text-sm font-medium tracking-wider">ACROSS</span>
          <span className="text-black/60 text-sm font-medium">Aave</span>
          <span className="text-black/60 text-sm font-medium">0x</span>
        </div>
      </div>
    </section>
  );
}

// Statement Section (01 & 02)
function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Phone scroll animation
      gsap.to(phoneRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        y: -200,
        ease: 'none',
      });

      // Text animations
      gsap.from('.statement-01-text', {
        scrollTrigger: {
          trigger: '.statement-01',
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
      });

      gsap.from('.statement-02-text', {
        scrollTrigger: {
          trigger: '.statement-02',
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why" className="relative bg-[#e8e8e8] min-h-[200vh]">
      {/* Sticky Phone */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-10 pointer-events-none">
        <div ref={phoneRef} className="w-72 md:w-80">
          <img src="/phone-mockup-1.png" alt="Phone" className="w-full h-auto" />
        </div>
      </div>

      {/* Statement 01 */}
      <div className="statement-01 absolute top-[10vh] left-0 right-0 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs text-black/40 tracking-widest mb-8 block">01</span>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="statement-01-text">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black leading-tight">
                The <span className="text-black/30">old</span>
                <br />
                <span className="text-black/30">financial</span>
                <br />
                <span className="text-black/30">system</span>
                <br />
                worked
                <br />
                for itself.
              </h2>
            </div>
            <div className="flex items-start gap-4 justify-end">
              <ArrowRight className="text-black/40 mt-2" size={32} />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black/30 leading-tight">
                The
                <br />
                upgraded
                <br />
                version
                <br />
                works
                <br />
                for you.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Statement 02 */}
      <div className="statement-02 absolute top-[110vh] left-0 right-0 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs text-black/40 tracking-widest mb-8 block">02</span>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="statement-02-text">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black leading-tight">
                With
                <br />
                Legend,
                <br />
                your
                <br />
                digital
                <br />
                assets
                <br />
                don't sit idle.
              </h2>
            </div>
            <div className="flex items-start gap-4 justify-end">
              <ArrowRight className="text-black/40 mt-2" size={32} />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black/30 leading-tight">
                It's
                <br />
                time to
                <br />
                own
                <br />
                your
                <br />
                future.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Core Actions Section
function CoreActionsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.core-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
      });

      gsap.from('.core-phone', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: 1,
        },
        opacity: 0,
        y: 100,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-32">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="text-xs text-white/40 tracking-widest mb-4 block">Core Actions</span>
          <h2 className="core-title text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6">
            Your money,
            <br />
            Your move.
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            No middlemen, no problems. Put your assets to work, 24/7, from your phone. Welcome to the future of
            finance.
          </p>
        </div>

        <div className="core-phone flex justify-center">
          <div className="relative">
            <img src="/phone-mockup-2.png" alt="Legend App" className="w-72 md:w-80 h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Feature Section
function FeatureSection({
  number,
  title,
  description,
  image,
  reverse = false,
  showLogos = false,
}: {
  number: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  showLogos?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        },
        opacity: 0,
        x: reverse ? 50 : -50,
      });

      gsap.from('.feature-image', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        },
        opacity: 0,
        x: reverse ? -50 : 50,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reverse]);

  const protocols = [
    'Morpho',
    'Uniswap',
    'Compound',
    'Across',
    'Aave',
    '0x',
    'Base',
    'Optimism',
    'Arbitrum',
    'Polygon',
    'Unichain',
    'World',
  ];

  return (
    <section ref={sectionRef} className="relative bg-black py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-8">
        <div className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
          <div className={`feature-content ${reverse ? 'md:order-2' : ''}`}>
            <span className="text-xs text-white/40 tracking-widest mb-4 block">FEATURE {number}</span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">{title}</h3>
            <p className="text-white/60 text-lg leading-relaxed mb-8">{description}</p>

            {showLogos && (
              <div className="grid grid-cols-3 gap-4">
                {protocols.map((protocol) => (
                  <div key={protocol} className="flex items-center gap-2 text-white/40 text-sm">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-xs">{protocol[0]}</span>
                    </div>
                    {protocol}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={`feature-image flex ${reverse ? 'md:order-1 justify-start' : 'justify-end'}`}>
            <img src={image} alt={title} className="w-64 md:w-72 lg:w-80 h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Access Cash Section
function AccessCashSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.access-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#b8b8b8] py-24 md:py-32 overflow-hidden">
      {/* Hand Background */}
      <div className="absolute inset-0">
        <img src="/hand-bg.jpg" alt="" className="w-full h-full object-cover opacity-30" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="access-content">
            <span className="text-xs text-black/40 tracking-widest mb-4 block">FEATURE 05</span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-2 leading-tight">
              Access Cash
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <ArrowRight className="text-black/60" size={32} />
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-black/60 leading-tight">
                without selling.
              </h3>
            </div>
            <p className="text-black/60 text-lg leading-relaxed">
              Unlock the potential of the assets you already own. Borrow against your assets to access USDC on demand.
            </p>
          </div>
          <div className="flex justify-end">
            <img src="/phone-mockup-4.png" alt="Access Cash" className="w-64 md:w-72 lg:w-80 h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Platform Section
function PlatformSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.platform-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
      });

      gsap.from('.platform-card', {
        scrollTrigger: {
          trigger: '.platform-grid',
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      number: '01',
      title: 'Cash in, cash out.',
      description:
        'Hold dollars onchain as USDC and cash out to your bank anytime, powered by Coinbase Onramp.',
      image: '/platform-1.jpg',
    },
    {
      number: '02',
      title: 'Use your assets everywhere.',
      description:
        'Legend leverages Across to bridge assets between chains as needed based on the transaction. Get to where you want to end up, no more bridge-first UX.',
      image: '/platform-2.jpg',
    },
    {
      number: '03',
      title: 'Manage your positions from anywhere.',
      description:
        "Total visibility for your assets, whether they're held in your wallet or active in DeFi. Never lose track of your assets when you put them to work.",
      image: '/platform-3.jpg',
    },
    {
      number: '04',
      title: 'Notifications, so you never miss a signal.',
      description:
        'Your onchain activity is finally supported by push notifications that actually work. Know when you start earning interest and never miss a beat.',
      image: '/platform-4.jpg',
    },
  ];

  return (
    <section ref={sectionRef} id="platform" className="relative bg-[#d8d8d8] py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-8">
        <div className="platform-title text-center mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-black mb-6">
            Your money at
            <br />
            internet speed.
          </h2>
          <div className="flex justify-center mb-8">
            <ArrowRight className="text-black/40" size={40} />
          </div>
          <p className="text-black/60 text-lg md:text-xl max-w-3xl mx-auto">
            Legend solved crypto's UX problem by integrating DeFi natively into the experience. View asset and protocol
            balances from your phone. No wallet connect, no browser tabs, no friction.
          </p>
        </div>

        <div className="platform-grid grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div key={feature.number} className="platform-card bg-white/50 rounded-2xl p-6 overflow-hidden">
              <div className="aspect-square mb-6 rounded-xl overflow-hidden bg-gray-100">
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
              </div>
              <div className="text-black/40 text-sm mb-2">{feature.number}</div>
              <h3 className="text-xl md:text-2xl font-medium text-black mb-4">{feature.title}</h3>
              <p className="text-black/60 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Secure Section
function SecureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.secure-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: 'Onchain smart wallets',
      content:
        'Your wallet is secured by smart contracts on the blockchain, giving you programmable security and recovery options.',
    },
    {
      title: 'Passkey-based signing',
      content:
        'Sign transactions securely using modern passkey technology, eliminating the need for seed phrases.',
    },
    {
      title: 'Biometric authentication',
      content: 'Access your wallet with Face ID or fingerprint, ensuring only you can authorize transactions.',
    },
    {
      title: 'Hardware wallet support',
      content: 'Connect your existing hardware wallets for an additional layer of security.',
    },
    {
      title: 'Account recovery',
      content: 'Recover your account securely using social recovery or other trusted methods.',
    },
  ];

  return (
    <section ref={sectionRef} id="features" className="relative bg-black py-32 md:py-40">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="secure-content">
            <span className="text-xs text-white/40 tracking-widest mb-4 block">FEATURE 06</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8">
              Secure
              <br />
              <span className="inline-flex items-center gap-4">
                <ArrowRight className="text-white/60" size={40} />
                by design.
              </span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Your funds are completely under your control and secured by your biometrics. No one else can touch them,
              not even us.
            </p>
          </div>

          <div className="space-y-0">
            {features.map((feature, index) => (
              <div key={index} className="border-b border-white/10">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full py-4 flex items-center justify-between text-left hover:text-white/80 transition-colors group"
                >
                  <span className="text-white/70">{feature.title}</span>
                  <span className="text-white/40 text-xl transition-transform">
                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="pb-4 text-white/50 leading-relaxed">{feature.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <img src="/phone-mockup-5.png" alt="Secure Wallet" className="w-64 md:w-72 lg:w-80 h-auto" />
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
      });

      gsap.from('.faq-item', {
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      question: 'What does "no wallet connect" mean?',
      answer:
        'Legend has a set of supported assets, protocols, and blockchains. Each of these items is natively integrated into the system, creating a composable grid of interactions. Everything works perfectly together, but that does mean Legend does not support any and all onchain products.',
    },
    {
      question: 'How does earning interest work?',
      answer:
        'Legend connects your assets to leading DeFi protocols like Aave and Compound. Your assets are lent out to borrowers, and you earn interest based on market demand. Rates vary depending on the asset and market conditions.',
    },
    {
      question: 'Is Legend only available on iOS?',
      answer:
        'Currently, Legend is available exclusively on iOS. We are working on an Android version and plan to release it in the near future. Join our waitlist to be notified when it launches.',
    },
    {
      question: 'What countries are supported by Legend?',
      answer:
        'Legend is available in most countries worldwide. However, due to regulatory restrictions, some countries may have limited functionality. Check the app for availability in your region.',
    },
    {
      question: 'What blockchains, assets, or protocols does Legend support?',
      answer:
        'Legend supports major blockchains including Ethereum, Base, and Arbitrum. We support popular assets like ETH, USDC, USDT, and WBTC, with more being added regularly.',
    },
    {
      question: 'What does non-custodial mean?',
      answer:
        'Non-custodial means you maintain full control of your assets. Legend never holds your private keys or has access to your funds. Your wallet is secured by your device and biometrics.',
    },
  ];

  return (
    <section ref={sectionRef} id="faq" className="relative bg-black py-32 md:py-40">
      <div className="max-w-4xl mx-auto px-8">
        <h2 className="faq-title text-4xl md:text-5xl lg:text-6xl font-light text-white mb-16 text-center">
          Your Guide to
          <br />
          finance.
        </h2>

        <div className="faq-list space-y-0">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item border-b border-white/10">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-start justify-between text-left group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-white/40 text-sm mt-1">Q</span>
                  <span className="text-lg md:text-xl text-white/80 group-hover:text-white transition-colors">
                    {faq.question}
                  </span>
                </div>
                <span className="text-white/40 text-xl ml-4 flex-shrink-0">
                  {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="flex items-start gap-4 pb-6">
                  <span className="text-white/40 text-sm mt-1 opacity-0">Q</span>
                  <p className="text-white/50 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer Section
function FooterSection() {
  return (
    <footer className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src="/footer-bg.jpg" alt="Night landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-12">
        <div className="max-w-6xl mx-auto px-8 w-full">
          {/* Links */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h4 className="text-white/40 text-xs tracking-widest mb-4">COMPANY</h4>
              <div className="space-y-2">
                <a
                  href="https://jobs.ashbyhq.com/legend-xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  Careers
                </a>
                <a href="mailto:contact@legend.xyz" className="block text-white/70 hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white/40 text-xs tracking-widest mb-4">RESOURCES</h4>
              <div className="space-y-2">
                <a href="/privacy" className="block text-white/70 hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="/terms" className="block text-white/70 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white/40 text-xs tracking-widest mb-4">SOCIAL</h4>
              <div className="flex gap-4">
                <a
                  href="https://warpcast.com/joinlegend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/legendapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-center mb-12">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-xl hover:bg-white/90 transition-colors"
            >
              <Apple size={24} />
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-lg font-semibold leading-none">App Store</div>
              </div>
            </a>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-12">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 32 32" fill="none" className="text-black">
                <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M16 8L16 16L22 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-white/40 font-mono">
            <div className="mb-4 md:mb-0">A: SAN FRANCISCO, CA</div>
            <div className="mb-4 md:mb-0">E: CONTACT@LEGEND.XYZ</div>
            <div>© 2025 LEGEND LABS, INC. ALL RIGHTS RESERVED.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <HeroSection />
      <StatementSection />
      <CoreActionsSection />
      <FeatureSection
        number="02"
        title="Everything you need, all in one place."
        description="Earn, Trade, and Borrow, all in one place. Legend brings you the best of onchain finance in one convenient, easy to use experience."
        image="/phone-mockup-2.png"
        showLogos={true}
      />
      <FeatureSection
        number="03"
        title="Always earn the best rate on your USDC."
        description="Earn interest on stablecoins and other digital assets with access to market-leading DeFi yields. Easily migrate to the best available rate with automated prompts."
        image="/phone-mockup-2.png"
        reverse
      />
      <FeatureSection
        number="04"
        title="Trade 24/7"
        description="Swap supported assets 24 hours a day, with instant liquidity and real-time settlement."
        image="/phone-mockup-3.png"
      />
      <AccessCashSection />
      <PlatformSection />
      <SecureSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
}

export default App;
