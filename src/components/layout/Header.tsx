"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Features", href: "/#features" },
  { label: "Our Vision", href: "/#vision" },
  { label: "Our Process", href: "/#process" },
  { label: "Contact Us", href: "/#contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>("/");
  const pillRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  /* ── scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── active section via IntersectionObserver ── */
  useEffect(() => {
    const sectionIds = ["features", "vision", "process", "contact"];
    const observers: IntersectionObserver[] = [];

    // Home is active when at the very top
    const onScroll = () => {
      if (window.scrollY < 80) setActiveSection("/");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(`/#${id}`);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  /* ── open animation ── */
  useEffect(() => {
    if (isMenuOpen) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsRendered(true)),
      );
    }
  }, [isMenuOpen]);

  /* ── body lock ── */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /* ── sliding pill on hover ── */
  useEffect(() => {
    if (!navRef.current || activeIndex === null) return;
    const links = navRef.current.querySelectorAll("a");
    const target = links[activeIndex] as HTMLElement;
    if (!target || !pillRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = target.getBoundingClientRect();
    pillRef.current.style.width = `${linkRect.width + 20}px`;
    pillRef.current.style.left = `${linkRect.left - navRect.left - 10}px`;
    pillRef.current.style.opacity = "1";
  }, [activeIndex]);

  const openMenu = () => {
    setIsClosing(false);
    setIsMenuOpen(true);
  };
  const closeMenu = () => {
    setIsClosing(true);
    setIsRendered(false);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${
            isScrolled
              ? "bg-white/90 backdrop-blur-md shadow-[0_4px_24px_rgba(37,99,235,0.10)]"
              : "bg-white"
          }`}
      >
        <Container className="py-4 md:py-6">
          <div className="flex items-center justify-between gap-6">
            {/* ── Logo ── */}
            <Link
              href="/"
              onClick={() => isMenuOpen && closeMenu()}
              className="select-none flex-shrink-0 group"
              aria-label="TeamUp home"
            >
              <div className="relative w-[88px] h-6">
                <Image
                  src="/images/logo.png"
                  alt="TeamUp Logo"
                  fill
                  quality={100}
                  unoptimized
                  className="object-contain"
                />
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div
              ref={navRef}
              className="hidden md:flex items-center gap-1 relative"
              onMouseLeave={() => {
                setActiveIndex(null);
                if (pillRef.current) pillRef.current.style.opacity = "0";
              }}
            >
              {/* sliding hover pill */}
              <div
                ref={pillRef}
                className="absolute h-8 bg-primary-light rounded-full
                  transition-all duration-200 ease-out opacity-0 pointer-events-none top-1/2 -translate-y-1/2"
              />

              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`relative z-10 px-3 py-1.5 text-sm rounded-full
                      transition-colors duration-200 font-primary
                      ${
                        isActive
                          ? "text-primary font-semibold"
                          : "text-content hover:text-primary"
                      }`}
                  >
                    {link.label}
                    {/* active dot */}
                    {isActive && (
                      <span
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2
                        w-1 h-1 rounded-full bg-primary"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ── Desktop Auth Buttons ── */}
            <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
              <Link
                href="/auth?mode=signin"
                className="px-5 py-2 text-sm font-medium font-primary
                  text-primary border border-primary/30 rounded-lg
                  hover:border-primary hover:bg-primary-light
                  transition-all duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/auth?mode=signup"
                className="inline-flex items-center justify-center h-9 px-5 text-sm font-medium font-primary border border-primary/30
                  text-white bg-primary rounded-lg
                  hover:bg-primary-dark transition-all duration-200
                  shadow-[0_2px_12px_rgba(37,99,235,0.35)]
                  hover:shadow-[0_4px_18px_rgba(37,99,235,0.45)]"
              >
                <span className="relative z-10">Sign Up</span>
              </Link>
            </div>

            {/* ── Mobile Toggle ── */}
            <button
              type="button"
              onClick={isMenuOpen ? closeMenu : openMenu}
              className="md:hidden relative w-9 h-9 flex items-center justify-center
                rounded-lg text-content hover:text-primary hover:bg-primary-light
                transition-all duration-200"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              <span
                className={`absolute transition-all duration-300
                ${isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"}`}
              >
                <X size={20} aria-hidden="true" />
              </span>
              <span
                className={`absolute transition-all duration-300
                ${isMenuOpen ? "opacity-0 -rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}
              >
                <Menu size={20} aria-hidden="true" />
              </span>
            </button>
          </div>
        </Container>

        {/* ── progress line ── */}
        <div
          className={`h-px w-full transition-all duration-500
          ${isScrolled ? "bg-gradient-to-r from-transparent via-primary/20 to-transparent" : "bg-transparent"}`}
        />
      </header>

      {/* ── Mobile Drawer ── */}
      {(isMenuOpen || isClosing) && (
        <div
          className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300
          ${isRendered ? "opacity-100" : "opacity-0"}`}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
            onClick={closeMenu}
          />

          {/* drawer panel */}
          <div
            id="mobile-nav"
            className={`absolute top-0 left-0 right-0
              bg-white rounded-b-[28px]
              shadow-[0_20px_60px_rgba(37,99,235,0.15)]
              transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
              ${isRendered ? "translate-y-0" : "-translate-y-full"}`}
          >
            <Container className="py-4">
              {/* drawer top row */}
              <div className="flex items-center justify-between mb-5">
                <Link href="/" onClick={closeMenu} className="select-none">
                  <div className="relative w-[80px] h-6">
                    <Image
                      src="/images/logo.png"
                      alt="TeamUp Logo"
                      fill
                      quality={100}
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="w-9 h-9 flex items-center justify-center
                    rounded-xl text-content hover:text-primary hover:bg-primary-light
                    transition-all duration-200"
                  aria-label="Close menu"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* nav links — staggered */}
              {/* delay classes: index 0→100ms, 1→150ms, 2→200ms, 3→250ms, 4→300ms */}
              {(() => {
                const delays = [
                  "delay-100",
                  "delay-150",
                  "delay-200",
                  "delay-[250ms]",
                  "delay-300",
                ];
                return (
                  <nav
                    className="flex flex-col gap-0.5"
                    aria-label="Mobile navigation"
                  >
                    {NAV_LINKS.map((link, i) => {
                      const isActive = activeSection === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeMenu}
                          className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium
                            transition-all duration-300
                            ${isRendered ? `opacity-100 translate-x-0 ${delays[i]}` : "opacity-0 -translate-x-5"}
                            ${
                              isActive
                                ? "text-primary bg-primary-light font-semibold"
                                : "text-content hover:text-primary hover:bg-primary-light/60"
                            }`}
                        >
                          {isActive && (
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          <span className={isActive ? "" : "ml-[18px]"}>
                            {link.label}
                          </span>
                        </Link>
                      );
                    })}
                  </nav>
                );
              })()}

              {/* auth buttons */}
              <div
                className={`flex flex-col gap-3 mt-5 pt-5 border-t border-gray-100
                  transition-all duration-300
                  ${isRendered ? "opacity-100 translate-y-0 delay-[320ms]" : "opacity-0 translate-y-3"}`}
              >
                <Link
                  href="/auth?mode=signin"
                  onClick={closeMenu}
                  className="w-full text-center py-3 text-sm font-semibold font-primary
                    text-primary border border-primary/30 rounded-lg
                    hover:bg-primary-light hover:border-primary
                    transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth?mode=signup"
                  onClick={closeMenu}
                  className="w-full text-center py-3 text-sm font-semibold font-primary
                    text-white bg-primary rounded-lg
                    shadow-[0_2px_12px_rgba(37,99,235,0.35)]
                    hover:bg-primary-dark transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>

              <p className="text-center text-[11px] text-content-muted mt-5 mb-1 font-primary">
                © 2026 TeamUp — Al-Azhar University
              </p>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
