"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignInForm, SignUpForm } from "../sections/auth";
import { UniversityAuthModal } from "../sections/auth";
import { ForgotPasswordModal } from "../sections/auth";
import { Heading } from "../ui/typography";

const AUTH_MODE_STORAGE_KEY = "teamup-auth-mode";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isModeReady, setIsModeReady] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const [uniModalOpen, setUniModalOpen] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotModalInitialStep, setForgotModalInitialStep] = useState<
    "email" | "verify" | "reset"
  >("email");
  const [forgotModalInitialEmail, setForgotModalInitialEmail] = useState("");
  const formScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const queryMode = new URLSearchParams(window.location.search).get("mode");
    if (queryMode === "signin" || queryMode === "signup") {
      setIsSignUp(queryMode === "signup");
    } else {
      const savedMode = window.localStorage.getItem(AUTH_MODE_STORAGE_KEY);
      setIsSignUp(savedMode === "signup");
    }

    const params = new URLSearchParams(window.location.search);
    const uniStepParam = params.get("uniStep");
    const forgotStepParam = params.get("forgotStep");
    const sharedEmailParam = params.get("email") ?? "";

    if (uniStepParam === "login") {
      setUniModalOpen(true);
    }

    if (
      forgotStepParam === "email" ||
      forgotStepParam === "verify" ||
      forgotStepParam === "reset"
    ) {
      setForgotModalInitialStep(forgotStepParam);
      setForgotModalInitialEmail(sharedEmailParam);
      setForgotModalOpen(true);
    }

    setIsModeReady(true);
    const raf = window.requestAnimationFrame(() => setCanAnimate(true));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!isModeReady || typeof window === "undefined") return;
    window.localStorage.setItem(
      AUTH_MODE_STORAGE_KEY,
      isSignUp ? "signup" : "signin",
    );
  }, [isSignUp, isModeReady]);

  const handleModeChange = (nextIsSignUp: boolean) => {
    if (nextIsSignUp === isSignUp) return;
    setIsSignUp(nextIsSignUp);
  };

  const handleFormWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = formScrollRef.current;
    if (!el) return;
    if (el.scrollHeight <= el.clientHeight) return;
    el.scrollTop += e.deltaY;
    e.preventDefault();
    e.stopPropagation();
  };

  const openUniModal = () => {
    setUniModalOpen(true);
  };

  const openForgotModal = () => {
    setForgotModalInitialStep("email");
    setForgotModalInitialEmail("");
    setForgotModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* ════════════════════
          MOBILE — stacked
      ════════════════════ */}
      <div
        className={`flex md:hidden flex-col w-full min-h-screen px-4 py-10 transition-opacity duration-200 ${
          isModeReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <Link href="/" aria-label="TeamUp home" className="mb-9">
          <div className="relative w-[90px] h-6 ml-4">
            <Image
              src="/images/logo.png"
              alt="TeamUp"
              fill
              unoptimized
              quality={100}
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex-1 flex flex-col justify-center">
          {isSignUp ? (
            <SignUpForm onSwitchToSignIn={() => setIsSignUp(false)} />
          ) : (
            <SignInForm
              onSwitchToSignUp={() => setIsSignUp(true)}
              onUniversityClick={openUniModal}
              onForgotPasswordClick={openForgotModal}
            />
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          DESKTOP
      ══════════════════════════════════════════════════════ */}
      <div className="hidden md:block relative h-screen overflow-hidden">
        {/* Logo */}
        <Link
          href="/"
          aria-label="TeamUp home"
          className="absolute top-2 left-20 md:left-12 z-30 w-28 h-28"
        >
          <div
            className={`absolute inset-0 transition-all duration-400 ease-in-out
              ${!isSignUp ? "opacity-100 scale-100" : "opacity-0 scale-[0.85] pointer-events-none"}`}
          >
            <Image
              src="/images/Teamup.svg"
              alt="TeamUp"
              fill
              unoptimized
              quality={100}
              className="object-contain"
            />
          </div>
          <div
            className={`absolute inset-0 transition-all duration-400 ease-in-out
              ${isSignUp ? "opacity-100 scale-100" : "opacity-0 scale-[0.85] pointer-events-none"}`}
          >
            <Image
              src="/images/logo.png"
              alt="TeamUp"
              fill
              unoptimized
              quality={100}
              className="object-contain"
            />
          </div>
        </Link>

        {/* ── Form area (2/3) ── */}
        <div
          className={`absolute top-12 pb-5 left-0 h-full w-2/3
            ${canAnimate ? "transition-transform duration-700 ease-in-out" : "transition-none"}
            ${isSignUp ? "translate-x-0" : "translate-x-1/2"}
            ${isModeReady ? "opacity-100" : "opacity-0"}`}
        >
          <div
            ref={formScrollRef}
            onWheel={handleFormWheel}
            className="auth-scroll-area h-full overflow-y-auto flex items-start justify-center px-10 lg:px-16 py-10 lg:py-12"
          >
            <div className="relative w-full max-w-[520px]">
              <div
                className={`transition-opacity duration-500
                  ${isSignUp ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none absolute inset-0"}`}
              >
                <SignUpForm onSwitchToSignIn={() => setIsSignUp(false)} />
              </div>
              <div
                className={`transition-opacity duration-500
                  ${!isSignUp ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none absolute inset-0"}`}
              >
                <SignInForm
                  onSwitchToSignUp={() => setIsSignUp(true)}
                  onUniversityClick={openUniModal}
                  onForgotPasswordClick={openForgotModal}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Blue sliding panel (1/3) ── */}
        <div
          className={`absolute top-0 left-0 h-full z-20 w-1/3
            ${canAnimate ? "transition-transform duration-700 ease-in-out" : "transition-none"}
            ${isSignUp ? "translate-x-[200%]" : "translate-x-0"}
            ${isModeReady ? "opacity-100" : "opacity-0"}`}
        >
          <div className="h-full w-full bg-primary-lightbg overflow-hidden flex flex-col justify-center p-10">
            <div
              className="absolute top-0 right-0 w-0 h-0 border-t-[160px] border-r-[160px] border-t-white/20 border-r-transparent animate-auth-float-slow"
              aria-hidden="true"
            />
            <div
              className="absolute top-14 right-28 w-0 h-0 border-l-[22px] border-r-[22px] border-b-[38px] border-l-transparent border-r-transparent border-b-white/25 animate-auth-float-fast"
              aria-hidden="true"
            />
            <div
              className="absolute top-[38%] left-8 w-8 h-8 rounded-sm bg-white/20 animate-auth-float-diamond"
              aria-hidden="true"
            />
            <div
              className="absolute top-[55%] right-10 w-12 h-12 rounded-full bg-white/20 animate-auth-float-reverse"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-32 right-10 w-8 h-14 rounded-md bg-white/25 animate-auth-float-rect"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/15"
              aria-hidden="true"
            />

            <div className="flex flex-col items-center text-center gap-6 z-10 px-4">
              <div
                className={`flex flex-col items-center gap-6 transition-all duration-500
                  ${!isSignUp ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none absolute"}`}
              >
                <Heading
                  level="h3"
                  className="font-medium text-white leading-snug"
                >
                  Create your Account
                </Heading>
                <p className="font-primary text-white/80 text-lg leading-relaxed max-w-[300px]">
                  Join Teamup to manage your graduation project efficiently
                </p>
                <button
                  type="button"
                  onClick={() => handleModeChange(true)}
                  className="mt-2 px-12 py-3 border-2 border-white rounded-lg font-primary font-semibold text-white text-sm hover:bg-white hover:text-primary transition-all duration-200"
                >
                  Sign Up
                </button>
              </div>

              <div
                className={`flex flex-col items-center gap-6 transition-all duration-500 delay-200
                  ${isSignUp ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none absolute"}`}
              >
                <Heading
                  level="h3"
                  className="font-medium text-white leading-snug"
                >
                  Welcome Back!
                </Heading>
                <p className="font-primary text-white/80 text-lg leading-relaxed max-w-[300px]">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  type="button"
                  onClick={() => handleModeChange(false)}
                  className="mt-2 px-12 py-3 border-2 border-white rounded-lg font-primary font-semibold text-white text-sm hover:bg-white hover:text-primary transition-all duration-200"
                >
                  Sign In
                </button>
              </div>
            </div>

            <div />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          UNIVERSITY AUTH MODAL — page root, covers everything
      ══════════════════════════════════════════════════════ */}
      <UniversityAuthModal
        isOpen={uniModalOpen}
        onClose={() => setUniModalOpen(false)}
      />
      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        initialStep={forgotModalInitialStep}
        initialEmail={forgotModalInitialEmail}
        onClose={() => setForgotModalOpen(false)}
      />
    </div>
  );
};

export default Auth;
