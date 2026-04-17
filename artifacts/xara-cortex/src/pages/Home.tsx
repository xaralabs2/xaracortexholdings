import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  BrainCircuit, 
  Map, 
  BarChart4, 
  Landmark, 
  Scale, 
  ArrowRight,
  FileText,
  Briefcase,
  Layers,
  Fingerprint,
  Lightbulb,
  Building,
  Menu,
  X,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
  e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", target: "about" },
    { name: "Platforms", target: "platforms" },
    { name: "What We Do", target: "what-we-do" },
    { name: "Contact", target: "contact" }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. Our team will be in contact shortly.",
      duration: 5000,
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Navigation */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-md border-border shadow-sm py-4" 
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a 
            href="#hero" 
            onClick={(e) => smoothScroll(e, "hero")}
            className="font-semibold text-[18px] uppercase text-[#1344D3] flex items-center gap-2.5"
            style={{ letterSpacing: "0.02em" }}
          >
            <span
              aria-hidden
              className="inline-block w-[18px] h-[18px] border-[4px] border-[#1344D3] bg-transparent box-border"
            />
            XARA CORTEX
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={`#${link.target}`}
                    onClick={(e) => smoothScroll(e, link.target)}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <Button 
              onClick={(e) => {
                const event = e as unknown as React.MouseEvent<HTMLAnchorElement>;
                smoothScroll(event, "contact");
              }}
              className="bg-[#1344D3] text-white hover:bg-[#103BB8]"
            >
              Contact Us
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-border shadow-lg py-4 px-6 md:hidden flex flex-col gap-4">
            <ul className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={`#${link.target}`}
                    onClick={(e) => {
                      smoothScroll(e, link.target);
                      setMobileMenuOpen(false);
                    }}
                    className="block py-2 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <Button 
              onClick={(e) => {
                const event = e as unknown as React.MouseEvent<HTMLAnchorElement>;
                smoothScroll(event, "contact");
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#1344D3] text-white hover:bg-[#103BB8]"
            >
              Contact Us
            </Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden flex items-center min-h-[90vh]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/images/hero-bg.png" 
            alt="Abstract geometric grid" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#1344D3] mb-6"
            >
              XARA CORTEX HOLDINGS INC.
            </motion.p>

            <motion.h1 
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.1] mb-6"
            >
              Building the Infrastructure <br className="hidden md:block" />Behind Intelligent Systems
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              className="text-xl md:text-2xl text-muted-foreground font-medium mb-4 max-w-3xl leading-relaxed"
            >
              XARA CORTEX HOLDINGS INC. is a technology holding company that builds, owns, and stewards advanced platforms across AI, geospatial infrastructure, market intelligence, and digital trust.
            </motion.p>
            
            <motion.p 
              variants={fadeUp}
              className="text-lg text-muted-foreground/80 mb-10 max-w-3xl leading-relaxed"
            >
              We develop proprietary systems designed to enable trusted decisions, reliable execution, and long-term strategic value in modern digital markets.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-base px-8 py-6 h-auto bg-[#1344D3] text-white hover:bg-[#103BB8]"
                onClick={(e) => {
                  const event = e as unknown as React.MouseEvent<HTMLAnchorElement>;
                  smoothScroll(event, "platforms");
                }}
              >
                Explore Platforms
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6 h-auto border-primary/20 hover:bg-primary/5"
                onClick={(e) => {
                  const event = e as unknown as React.MouseEvent<HTMLAnchorElement>;
                  smoothScroll(event, "contact");
                }}
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-5">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
              >
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1344D3] mb-4">About</p>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">A Holding Company Focused on Foundational Digital Infrastructure</h2>
                <div className="w-12 h-1 bg-[#1344D3] mb-8 rounded-full"></div>
              </motion.div>
            </div>
            
            <div className="md:col-span-7">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="space-y-6 text-lg text-muted-foreground leading-relaxed"
              >
                <motion.p variants={fadeUp}>
                  XARA CORTEX HOLDINGS INC. is a parent technology holding company focused on building and owning foundational digital infrastructure businesses. Our portfolio is centered on high-value platforms in artificial intelligence, spatial intelligence, market intelligence, and digital trust.
                </motion.p>
                <motion.p variants={fadeUp}>
                  We provide strategic direction, intellectual property stewardship, and long-term capital alignment across the group. By combining strong ownership with disciplined platform development, we aim to build durable businesses that can become core infrastructure for the future.
                </motion.p>
                <motion.p variants={fadeUp} className="font-medium text-primary">
                  We are not simply building software products. We are building platforms designed to become trusted operating layers for intelligence, verification, and execution in a changing world.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Mission & Vision</h2>
            <div className="w-12 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >
              <Card className="h-full border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 bg-primary/5 rounded-lg text-primary">
                      <ShieldCheck size={28} />
                    </div>
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To build and own world-class intelligence, geospatial, and digital infrastructure platforms that enable trusted decisions, efficient execution, and scalable innovation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
              }}
            >
              <Card className="h-full border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 bg-primary/5 rounded-lg text-primary">
                      <Map size={28} />
                    </div>
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To become a globally recognized holding company for next-generation AI, spatial intelligence, and digital trust infrastructure.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Stand For Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 md:mb-24 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What We Stand For</h2>
            <div className="w-12 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Intelligence",
                icon: BrainCircuit,
                desc: "Better systems begin with better reasoning, better data, and stronger decision support."
              },
              {
                title: "Infrastructure",
                icon: Layers,
                desc: "We build durable platforms designed to serve as foundational layers across industries and markets."
              },
              {
                title: "Trust",
                icon: Fingerprint,
                desc: "We believe trust must be engineered into systems through verification, structure, and disciplined execution."
              },
              {
                title: "Long-Term Value",
                icon: Landmark,
                desc: "We are committed to building and owning strategic technology assets with enduring relevance and commercial strength."
              }
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }
                }}
              >
                <div className="h-full group">
                  <div className="mb-6 p-4 inline-flex bg-secondary/50 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <value.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Platforms Section */}
      <section id="platforms" className="py-24 md:py-32 relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <img 
            src="/images/platforms-bg.png" 
            alt="Network background" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="sticky top-32"
              >
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 mb-4">Platforms</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">A Portfolio Built for the Next Infrastructure Layer</h2>
                <div className="w-12 h-1 bg-white/30 mb-8 rounded-full"></div>
                <p className="text-lg text-white/80 leading-relaxed mb-8">
                  Our portfolio reflects a clear view of the future: the world will increasingly depend on systems that make decisions more intelligent, location data more reliable, markets more understandable, and trust more verifiable.
                </p>
              </motion.div>
            </div>
            
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Xara Cortex",
                    icon: BrainCircuit,
                    desc: "AI orchestration, reasoning, and execution infrastructure designed to support intelligent systems at scale."
                  },
                  {
                    title: "Xara Geospatial Engine",
                    icon: Map,
                    desc: "Spatial intelligence and location-truth infrastructure providing reliable geographic foundations for modern systems."
                  },
                  {
                    title: "MacroLens",
                    icon: BarChart4,
                    desc: "A macro, corridor, and market intelligence platform built to support structured insight and better decision-making."
                  },
                  {
                    title: "SoliDeo",
                    icon: ShieldCheck,
                    desc: "A digital trust and property intelligence platform focused on verification, confidence, and marketplace enablement."
                  }
                ].map((platform, i) => (
                  <motion.div
                    key={platform.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.15 } }
                    }}
                  >
                    <Card className="h-full bg-white/5 border-white/10 text-white backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <CardHeader>
                        <div className="p-3 bg-white/10 inline-flex rounded-lg mb-4 text-white">
                          <platform.icon size={24} strokeWidth={1.5} />
                        </div>
                        <CardTitle className="text-2xl">{platform.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white/70 leading-relaxed">
                          {platform.desc}
                        </p>
                        <div className="mt-6 flex items-center text-sm font-medium text-white/90 hover:text-white transition-colors cursor-pointer group">
                          Learn More 
                          <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-12 text-center max-w-3xl mx-auto"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1344D3] mb-4">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">Ownership, Stewardship, and Strategic Direction</h2>
            <div className="w-12 h-1 bg-[#1344D3] mx-auto rounded-full mb-8"></div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              As the parent company, XARA CORTEX HOLDINGS INC. provides the ownership, structure, and stewardship required to build durable platform businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              {
                title: "IP Ownership",
                icon: FileText,
                desc: "We protect and manage the group's intellectual property and strategic technology assets."
              },
              {
                title: "Strategic Direction",
                icon: Lightbulb,
                desc: "We guide the long-term positioning, development, and growth of the portfolio."
              },
              {
                title: "Capital Stewardship",
                icon: Landmark,
                desc: "We align investment priorities, expansion opportunities, and long-term value creation across the group."
              },
              {
                title: "Commercial Support",
                icon: Briefcase,
                desc: "We help create the structure required to scale platforms into durable, high-value businesses."
              }
            ].map((role, i) => (
              <motion.div
                key={role.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }
                }}
              >
                <Card className="h-full border-border bg-white shadow-sm hover:shadow-md transition-shadow group">
                  <CardHeader>
                    <div className="p-3 bg-secondary/50 text-primary w-fit rounded-lg mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
                      <role.icon size={24} strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {role.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-24 md:py-32 bg-white border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1344D3] mb-4">
                Why It Matters
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-primary mb-8 leading-tight">
                Trusted Infrastructure Will Define the Next Era
              </motion.h2>
              <motion.div variants={fadeUp} className="w-12 h-1 bg-[#1344D3] mx-auto rounded-full mb-12"></motion.div>
              
              <div className="space-y-8 text-xl md:text-2xl font-medium text-primary/80 leading-relaxed">
                <motion.p variants={fadeUp}>
                  The future will depend on systems that make intelligence more usable, trust more verifiable, and execution more reliable. XARA CORTEX HOLDINGS INC. is building and owning the infrastructure behind that future.
                </motion.p>
                <motion.p variants={fadeUp} className="text-muted-foreground">
                  Our work is guided by a simple belief: the most valuable businesses of the next era will not only deliver services, but provide the trusted systems on which others depend.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1344D3] mb-4">
                Contact
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                Let's Start the Conversation
              </motion.h2>
              <motion.div variants={fadeUp} className="w-12 h-1 bg-[#1344D3] rounded-full mb-8"></motion.div>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-8">
                To learn more about XARA CORTEX HOLDINGS INC., our platforms, or strategic partnership opportunities, please get in touch.
              </motion.p>
              
              <motion.div variants={fadeUp} className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-lg text-primary shadow-sm">
                    <Building size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Headquarters</h4>
                    <p className="text-muted-foreground">XARA CORTEX HOLDINGS INC.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <Card className="border-border shadow-md">
                <CardContent className="p-8">
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" required placeholder="John Doe" className="bg-secondary/20" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" required placeholder="john@example.com" className="bg-secondary/20" />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input id="company" placeholder="Acme Corp" className="bg-secondary/20" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" required placeholder="Partnership Inquiry" className="bg-secondary/20" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        required 
                        placeholder="How can we help you?" 
                        className="min-h-[150px] bg-secondary/20 resize-y" 
                      />
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full text-base py-6 h-auto bg-[#1344D3] text-white hover:bg-[#103BB8]">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="font-bold text-xl tracking-wider flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-sm"></div>
                </div>
                XARA CORTEX HOLDINGS INC.
              </div>
              <p className="text-white/70 max-w-sm">
                Building the infrastructure behind intelligent systems.
              </p>
            </div>
            
            <div className="md:text-right">
              <ul className="flex flex-wrap md:justify-end gap-6 text-sm font-medium text-white/80">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={`#${link.target}`}
                      onClick={(e) => smoothScroll(e, link.target)}
                      className="hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>© 2026 XARA CORTEX HOLDINGS INC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
