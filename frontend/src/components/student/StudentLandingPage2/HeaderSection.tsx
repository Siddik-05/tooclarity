 "use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Phone, Mail, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [showTopHeader, setShowTopHeader] = useState(true);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "why-us", label: "Why Us" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    setActiveLink(id);
    setIsMenuOpen(false);
  };

  // 🌀 Hide top header on scroll down
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        // User scrolling down
        setShowTopHeader(false);
      } else {
        // User scrolling up
        setShowTopHeader(false);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ===== Top Blue Header (Info Bar) ===== */}
      <header
        className={`w-full bg-[#0222D7] text-white text-sm py-1 transition-transform duration-500 fixed top-0 left-0 right-0 z-40 ${
          showTopHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 overflow-hidden">
          {/* Left Section - Logo + Contact Info */}
          <div className="flex items-center gap-6 sm:gap-12 flex-nowrap overflow-x-auto">

            {/* Phone */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Phone className="md:w-4 w-2 h-4 text-white" />
              <a href="tel:+911234567890" className="md:text-[16px] text-[8px] hover:underline whitespace-nowrap">
                +91 93911 60205
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Mail className="md:w-4 w-2 h-4 text-white" />
              <a
                href="mailto:info@tooclarity.com"
                className="md:text-[16px] text-[8px] hover:underline whitespace-nowrap"
              >
                tooclarity0@gmail.com
              </a>
            </div>
          </div>

          {/* Right Section - Social Links */}
          <div className="flex items-center gap-4 mt-2 sm:mt-0 flex-shrink-0">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* ===== Main White Header (Fixed Navbar) ===== */}
      <header
        className={`fixed top-0 left-0  right-0 z-50 bg-white shadow-sm transition-all duration-500 ${
          showTopHeader ? "mt-[48px]" : "mt-0"
        }`}
      >
        <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-1 overflow-hidden">
          {/* ===== Logo Section ===== */}
          <div className="flex items-center">
            {/* Desktop Logo */}
            <div className="hidden md:block px-10">
              <Image
                src="/TCNewLogo.jpg"
                alt="TC Logo"
                width={75}
                height={75}
                className="px-1 float-left"
              />
             
<Image
  src="/Images/TCheader.svg"
  alt="GraduateCap-image"
  width={0}
  height={0}
  sizes="100vw"
  style={{ width: "auto", height: "auto" }}
/>

            </div>

            {/* Mobile Logo + Button */}
            <div className="md:hidden mb-2 flex items-center justify-center gap-4 py-3">
              <Image
                src="/TCNewLogo.jpg"
                alt="TC Logo"
                width={50}
                height={40}
                className="object-contain"
              />
    
<Image
  src="/Images/TCheader.svg"
  alt="GraduateCap-image"
  width={125}
  height={26}
  sizes="100vw"
  
/>

              <Button
                onClick={() => router.push("/contactUs")}
                className="bg-blue-800 top-[20px] text-white text-[15px] px-6 py-4 rounded-lg whitespace-nowrap"
              >
                Book a Demo
              </Button>
            </div>
          </div>

          {/* ===== Desktop Navigation ===== */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <div
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative font-montserrat text-[24px] lg:text-[18px] font-medium cursor-pointer group transition-colors duration-100 ${
                  activeLink === link.id
                    ? "text-blue-800"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-blue-700 transition-all duration-300 ${
                    activeLink === link.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </div>
            ))}
            {/* Buttons */}
            <div className="flex gap-3 lg:gap-4 flex-shrink-0">
              <Button 
              onClick={() => router.push("/student/signup")}
              className="cursor-pointer min-w-[90px] sm:min-w-[100px] md:min-w-[110px] h-[40px] sm:h-[44px] bg-[#0222D7] hover:bg-[#0222D7]/90 text-white rounded-[10px] font-montserrat font-semibold text-[14px] sm:text-[16px] shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                Register
              </Button>
              <Button 
              onClick={() => router.push("/student/login")}
              className="cursor-pointer min-w-[90px] sm:min-w-[100px] md:min-w-[110px] h-[40px] sm:h-[44px] bg-[#0222D7] hover:bg-[#0222D7]/90 text-white rounded-[10px] font-montserrat font-semibold text-[14px] sm:text-[16px] shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                Login
              </Button>
            </div>
          </div>

          {/* ===== Mobile Menu Button ===== */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 transition-transform"
            aria-label="Toggle menu"
          >
            <span
              className={`w-7 h-[3px] bg-blue-700 rounded transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-7 h-[3px] bg-blue-700 rounded transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-7 h-[3px] bg-blue-700 rounded transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </nav>

        {/* ===== Mobile Menu ===== */}
        <div
          className={`md:hidden bg-white border-t transition-all duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 p-6 overflow-hidden">
            {navLinks.map((link) => (
              <div
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`font-montserrat text-[18px] font-medium py-3 px-4 rounded-lg cursor-pointer transition-colors ${
                  activeLink === link.id
                    ? "text-blue-700 bg-blue-50"
                    : "text-[#000000] hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {link.label}
              </div>
            ))}
            <Button onClick={() => router.push("/student/signup")} className="bg-blue-800 text-white rounded-[10px] mt-4 h-[45px] font-semibold md:text-[16px] text-[24px]">
              Register
            </Button>
            <Button 
            onClick={() => router.push("/student/login")}
            className="bg-blue-800  text-white rounded-[10px] mt-3 h-[45px] font-semibold md:text-[16px] text-[24px]">
              Login
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}

 