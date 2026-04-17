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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("fullName") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      subject: String(data.get("subject") || ""),
      message: String(data.get("message") || ""),
    };

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !result.ok) {
        throw new Error(result.error || "Failed to send message.");
      }
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. Our team will be in contact shortly.",
        duration: 5000,
      });
      form.reset();
    } catch (err) {
      toast({
        title: "Unable to send",
        description: err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Navigation */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/85 backdrop-blur-xl border-b border-border/70 py-3" 
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a 
            href="#hero" 
            onClick={(e) => smoothScroll(e, "hero")}
            className="font-display font-semibold text-[15px] uppercase text-primary flex items-center gap-3"
            style={{ letterSpacing: "0.14em" }}
          >
            <span
              aria-hidden
              className="inline-block w-[14px] h-[14px] border-[2px] border-[#1344D3] bg-transparent box-border rotate-45"
            />
            XARA CORTEX
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-9 text-[13px] font-medium tracking-wide text-primary/70">
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
              className="bg-[#1344D3] text-white hover:bg-[#103BB8] text-[13px] font-medium tracking-wide rounded-sm px-5"
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
      <section id="hero" className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden flex items-center min-h-[92vh] bg-white">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#1344D3]/[0.04] blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-[#1344D3]" />
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1344D3]">
                XARA CORTEX HOLDINGS INC.
              </p>
            </motion.div>

            <motion.h1 
              variants={fadeUp}
              className="font-display text-[44px] sm:text-[56px] md:text-[68px] font-semibold tracking-[-0.02em] text-primary leading-[1.05] mb-8"
            >
              Building the infrastructure <br className="hidden md:block" />behind intelligent systems.
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-xl text-primary/70 font-normal mb-5 max-w-3xl leading-[1.6]"
            >
              XARA CORTEX HOLDINGS INC. is a technology holding company that builds, owns, and stewards advanced platforms across AI, geospatial infrastructure, market intelligence, and digital trust.
            </motion.p>
            
            <motion.p 
              variants={fadeUp}
              className="text-base md:text-lg text-muted-foreground mb-12 max-w-3xl leading-[1.7]"
            >
              We develop proprietary systems designed to enable trusted decisions, reliable execution, and long-term strategic value in modern digital markets.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                className="text-[13px] tracking-wide font-medium px-7 h-12 bg-[#1344D3] text-white hover:bg-[#103BB8] rounded-sm"
                onClick={(e) => {
                  const event = e as unknown as React.MouseEvent<HTMLAnchorElement>;
                  smoothScroll(event, "platforms");
                }}
              >
                Explore Platforms
                <ArrowRight size={15} className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-[13px] tracking-wide font-medium px-7 h-12 border-primary/15 text-primary hover:bg-primary/[0.03] rounded-sm"
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
      <section className="py-24 md:py-32 bg-[#F5F7FB] border-y border-border">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 max-w-2xl"
          >
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1344D3] mb-4">Mission & Vision</p>
            <h2 className="text-3xl md:text-[40px] font-semibold text-primary leading-[1.15]">Purpose and direction for the long term.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="bg-white p-10 md:p-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1344D3]">01</span>
                <span className="h-px flex-1 bg-border" />
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary/50">Mission</span>
              </div>
              <p className="font-display text-2xl md:text-[28px] font-medium text-primary leading-[1.35]">
                To build and own world-class intelligence, geospatial, and digital infrastructure platforms that enable trusted decisions, efficient execution, and scalable innovation.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="bg-white p-10 md:p-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1344D3]">02</span>
                <span className="h-px flex-1 bg-border" />
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary/50">Vision</span>
              </div>
              <p className="font-display text-2xl md:text-[28px] font-medium text-primary leading-[1.35]">
                To become a globally recognized holding company for next-generation AI, spatial intelligence, and digital trust infrastructure.
              </p>
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
            className="mb-16 md:mb-20 max-w-2xl"
          >
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1344D3] mb-4">Values</p>
            <h2 className="text-3xl md:text-[40px] font-semibold text-primary leading-[1.15]">The principles guiding every platform we build.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
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
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }
                }}
                className="bg-white p-8 md:p-10 group hover:bg-[#F5F7FB] transition-colors"
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1344D3]">
                    0{i + 1}
                  </span>
                  <value.icon size={20} strokeWidth={1.4} className="text-primary/40 group-hover:text-[#1344D3] transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-3">{value.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.65]">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Platforms Section */}
      <section id="platforms" className="py-24 md:py-32 relative bg-primary text-white overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#1344D3]/20 blur-3xl pointer-events-none" />

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
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-[#5A7EF0]" />
                  <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#5A7EF0]">Platforms</p>
                </div>
                <h2 className="font-display text-3xl md:text-[40px] font-semibold mb-8 leading-[1.15]">A portfolio built for the next infrastructure layer.</h2>
                <p className="text-[15px] md:text-base text-white/65 leading-[1.7]">
                  Our portfolio reflects a clear view of the future: the world will increasingly depend on systems that make decisions more intelligent, location data more reliable, markets more understandable, and trust more verifiable.
                </p>
              </motion.div>
            </div>
            
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
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
                      hidden: { opacity: 0, y: 14 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }
                    }}
                    className="bg-primary group p-8 md:p-10 hover:bg-[#0A1228] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-12">
                      <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#5A7EF0]">
                        0{i + 1}
                      </span>
                      <platform.icon size={20} strokeWidth={1.3} className="text-white/40 group-hover:text-[#5A7EF0] transition-colors" />
                    </div>
                    <h3 className="font-display text-xl md:text-[22px] font-semibold mb-3 text-white">{platform.title}</h3>
                    <p className="text-[14px] text-white/60 leading-[1.7] mb-8">
                      {platform.desc}
                    </p>
                    <a href="#contact" onClick={(e) => smoothScroll(e, "contact")} className="inline-flex items-center text-[12px] font-medium tracking-[0.15em] uppercase text-white/80 hover:text-white transition-colors">
                      Learn More
                      <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 grid md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-5">
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1344D3] mb-4">What We Do</p>
              <h2 className="text-3xl md:text-[40px] font-semibold text-primary leading-[1.15]">Ownership, stewardship, and strategic direction.</h2>
            </div>
            <div className="md:col-span-7 md:pt-3">
              <p className="text-base md:text-lg text-muted-foreground leading-[1.7]">
                As the parent company, XARA CORTEX HOLDINGS INC. provides the ownership, structure, and stewardship required to build durable platform businesses.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border mt-12">
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
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }
                }}
                className="bg-white p-8 md:p-10 group hover:bg-[#F5F7FB] transition-colors"
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1344D3]">
                    0{i + 1}
                  </span>
                  <role.icon size={20} strokeWidth={1.4} className="text-primary/40 group-hover:text-[#1344D3] transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-3">{role.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.65]">{role.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-28 md:py-40 bg-[#0E1A33] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] bg-dots-faint" style={{ filter: "invert(1)" }} />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <span className="h-px w-8 bg-[#5A7EF0]" />
                <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#5A7EF0]">
                  Why It Matters
                </p>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-[48px] font-semibold mb-12 leading-[1.15]">
                Trusted infrastructure will define the next era.
              </motion.h2>

              <div className="space-y-7 max-w-3xl">
                <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/85 leading-[1.65]">
                  The future will depend on systems that make intelligence more usable, trust more verifiable, and execution more reliable. XARA CORTEX HOLDINGS INC. is building and owning the infrastructure behind that future.
                </motion.p>
                <motion.p variants={fadeUp} className="text-base md:text-lg text-white/55 leading-[1.7]">
                  Our work is guided by a simple belief: the most valuable businesses of the next era will not only deliver services, but provide the trusted systems on which others depend.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-[#F5F7FB] border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-[#1344D3]" />
                <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#1344D3]">
                  Contact
                </p>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-[44px] font-semibold text-primary mb-8 leading-[1.15]">
                Let's start the conversation.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base md:text-lg text-muted-foreground leading-[1.7] mb-10 max-w-md">
                To learn more about XARA CORTEX HOLDINGS INC., our platforms, or strategic partnership opportunities, please get in touch.
              </motion.p>

              <motion.div variants={fadeUp} className="border-t border-border pt-8 space-y-1">
                <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-primary/50 mb-3">Headquarters</p>
                <p className="font-display font-semibold text-primary text-lg">XARA CORTEX HOLDINGS INC.</p>
                <p className="text-sm text-muted-foreground">A technology holding company.</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <div className="bg-white border border-border p-8 md:p-10">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary/60">Full Name</Label>
                        <Input id="fullName" required placeholder="" className="bg-white border-border rounded-sm h-11" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary/60">Email Address</Label>
                        <Input id="email" type="email" required placeholder="" className="bg-white border-border rounded-sm h-11" />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary/60">Company Name</Label>
                        <Input id="company" placeholder="" className="bg-white border-border rounded-sm h-11" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary/60">Subject</Label>
                        <Input id="subject" required placeholder="" className="bg-white border-border rounded-sm h-11" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary/60">Message</Label>
                      <Textarea 
                        id="message" 
                        required 
                        placeholder="" 
                        className="min-h-[150px] bg-white border-border rounded-sm resize-y" 
                      />
                    </div>
                    
                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full text-[13px] tracking-wide font-medium py-6 h-12 bg-[#1344D3] text-white hover:bg-[#103BB8] rounded-sm disabled:opacity-70">
                      {isSubmitting ? "Sending…" : "Send Message"}
                      {!isSubmitting && <ArrowRight size={15} className="ml-2" />}
                    </Button>
                  </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white pt-20 pb-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-6">
              <div className="font-display font-semibold text-[15px] uppercase tracking-[0.14em] flex items-center gap-3 mb-5">
                <span aria-hidden className="inline-block w-[14px] h-[14px] border-[2px] border-[#5A7EF0] bg-transparent box-border rotate-45" />
                XARA CORTEX HOLDINGS INC.
              </div>
              <p className="text-white/55 max-w-md leading-[1.65] text-[15px]">
                Building the infrastructure behind intelligent systems.
              </p>
            </div>

            <div className="md:col-span-6 md:flex md:justify-end">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-white/40 mb-5">Navigate</p>
                <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-[14px] font-medium text-white/75">
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
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white/45 tracking-wide">
            <p>© 2026 XARA CORTEX HOLDINGS INC. All rights reserved.</p>
            <p className="font-medium">A technology holding company.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
