"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  Calendar,
  Bell,
  X,
  Menu,
  User,
  ClipboardList,
  Settings,
  LogOut,
  MessageSquareWarning,
} from "lucide-react";
import {
  ProfileDropdown,
  NotificationsDropdown,
} from "@/components/ui/overlays";
import {
  CalendarModal,
  LogoutModal,
  MentorSupervisionRequestsModal,
  ProjectProposalDetailsModal,
  ReportIssueModal,
} from "@/components/ui/modals";
import { Container } from "@/components/layout";
import {
  MOCK_USER,
  DASHBOARD_NAV_LINKS,
  MOCK_SUPERVISION_REQUESTS,
  type MockSupervisionRequest,
} from "@/mock/Dashboard";

const DashboardHeader = () => {
  const pathname = usePathname();

  /* ── search ── */
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  /* ── profile dropdown ── */
  const [profileOpen, setProfileOpen] = useState(false);
  const profileBtnRef = useRef<HTMLButtonElement>(null);

  /* ── notifications ── */
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsBtnRef = useRef<HTMLButtonElement>(null);

  /* ── calendar modal ── */
  const [calendarOpen, setCalendarOpen] = useState(false);

  /* ── mentor supervision flow ── */
  const isMentor = MOCK_USER.userRole === "mentor";
  const [supervisionRequestsOpen, setSupervisionRequestsOpen] = useState(false);
  const [proposalDetailsOpen, setProposalDetailsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MockSupervisionRequest | null>(null);

  /* ── mobile drawer ── */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  /* ── notification mock ── */
  const [hasNotification] = useState(true);

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [reportIssueModalOpen, setReportIssueModalOpen] = useState(false);

  /* ── nav pill hover ── */
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchOpen) return;
    const t = setTimeout(() => searchInputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [searchOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsRendered(true)),
      );
    }
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const openSupervisionRequests = () => {
    setSupervisionRequestsOpen(true);
    setProposalDetailsOpen(false);
  };

  const openProposalDetails = (request: MockSupervisionRequest) => {
    setSelectedRequest(request);
    setSupervisionRequestsOpen(false);
    setProposalDetailsOpen(true);
  };

  const closeMentorModals = () => {
    setSupervisionRequestsOpen(false);
    setProposalDetailsOpen(false);
    setSelectedRequest(null);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-20 bg-primary
        shadow-[0_2px_12px_rgba(37,99,235,0.25)]"
      >
        <Container className="h-full flex items-center justify-between gap-4">
          {/* ── Logo ── */}
          <Link
            href="/dashboard"
            onClick={() => isMenuOpen && closeMenu()}
            className="select-none flex-shrink-0"
            aria-label="TeamUp home"
          >
            <div className="relative w-[88px] h-6">
              <Image
                src="/images/Teamup.svg"
                alt="TeamUp"
                fill
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
            <div
              ref={pillRef}
              className="absolute h-8 bg-white/15 rounded-full
              transition-all duration-200 ease-out opacity-0 pointer-events-none top-1/2 -translate-y-1/2"
            />
            {DASHBOARD_NAV_LINKS.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`relative z-10 px-3 py-1.5 text-sm rounded-full
                    transition-colors duration-200 font-primary
                    ${isActive ? "text-white font-semibold" : "text-white/80 hover:text-white"}`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search — desktop only */}
            <div className="hidden md:flex items-center">
              <div
                className={`flex items-center overflow-hidden rounded-md bg-white
                transition-all duration-300 ease-in-out
                ${searchOpen ? "w-56 lg:w-72 shadow-sm" : "w-0"}`}
              >
                <Search
                  size={15}
                  className="ml-3 text-content-muted flex-shrink-0"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search About..."
                  aria-label="Search"
                  className="flex-1 bg-transparent px-3 py-3 text-xs font-primary
                    text-content placeholder:text-content-muted focus:outline-none min-w-0"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={closeSearch}
                    aria-label="Clear search"
                    className="pr-2.5 text-content-muted hover:text-content transition-colors"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() =>
                  searchOpen ? closeSearch() : setSearchOpen(true)
                }
                aria-label={searchOpen ? "Close search" : "Open search"}
                className="w-9 h-9 flex items-center justify-center rounded-lg ml-2
                  text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 flex-shrink-0"
              >
                <Search size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Calendar — all breakpoints (was desktop-only; mobile users need the same entry) */}
            <button
              type="button"
              onClick={() => setCalendarOpen(true)}
              aria-label="Open calendar"
              className="hidden h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg
                text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white md:flex"
            >
              <Calendar size={18} aria-hidden="true" />
            </button>

            {/* ── Notifications — icon + “Alerts” label on small screens for discoverability ── */}
            <div className="relative">
              <button
                ref={notificationsBtnRef}
                type="button"
                onClick={() => setNotificationsOpen((p) => !p)}
                aria-expanded={notificationsOpen}
                aria-label="Notifications"
                className={`relative flex h-9 min-w-0 max-w-[7rem] shrink-0 items-center gap-1 rounded-lg
                  px-1.5 text-white/80 transition-all duration-200 hover:text-white
                  sm:max-w-none md:w-9 md:justify-center md:px-0
                  ${notificationsOpen ? "bg-white/20" : "hover:bg-white/10"}`}
              >
                <Bell size={18} aria-hidden="true" className="shrink-0" />
                <span className="hidden truncate font-primary text-xs font-semibold text-white/95 sm:inline md:hidden">
                  Alerts
                </span>
                {hasNotification && (
                  <span
                    className="absolute right-0.5 top-1 h-2 w-2 rounded-full bg-error ring-2 ring-primary
                      md:right-1.5 md:top-1.5"
                    aria-hidden="true"
                  />
                )}
              </button>
              <NotificationsDropdown
                isOpen={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
                anchorRef={notificationsBtnRef}
              />
            </div>

            {/* Profile pill — desktop only */}
            <div className="hidden md:block relative">
              <button
                ref={profileBtnRef}
                type="button"
                onClick={() => setProfileOpen((p) => !p)}
                aria-expanded={profileOpen}
                aria-haspopup="true"
                aria-label="Open profile menu"
                className={`flex items-center gap-2.5 pl-3 pr-1.5 py-1.5 rounded-lg
                  transition-all duration-200 cursor-pointer
                  ${profileOpen ? "bg-white/20" : "hover:bg-white/10"}`}
              >
                <div className="hidden lg:flex flex-col items-end">
                  <span className="font-primary text-sm font-semibold text-white leading-tight">
                    {MOCK_USER.name}
                  </span>
                  <span className="font-primary text-[0.7rem] text-white/70 leading-tight">
                    {MOCK_USER.role}
                  </span>
                </div>
                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/40">
                  <Image
                    src="/images/user.jpg"
                    alt={MOCK_USER.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </button>
              <ProfileDropdown
                isOpen={profileOpen}
                onClose={() => setProfileOpen(false)}
                anchorRef={profileBtnRef}
                onLogoutRequest={() => setLogoutModalOpen(true)}
                onReportIssueRequest={() => {
                  setReportIssueModalOpen(true);
                }}
                isMentor={isMentor}
                onSupervisionRequestsRequest={openSupervisionRequests}
              />
            </div>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={isMenuOpen ? closeMenu : openMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="md:hidden relative w-9 h-9 flex items-center justify-center
                rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
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
        <div className="h-px w-full bg-white/10" />
      </header>

      {/* ── Mobile Drawer ── */}
      {(isMenuOpen || isClosing) && (
        <div
          className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300
          ${isRendered ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
            onClick={closeMenu}
          />

          <div
            className={`absolute top-0 left-0 right-0 bg-white rounded-b-[28px]
            shadow-[0_20px_60px_rgba(37,99,235,0.15)]
            transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
            max-h-[100dvh] overflow-y-auto overscroll-contain
            ${isRendered ? "translate-y-0" : "-translate-y-full"}`}
          >
            <div className="max-w-[1280px] mx-auto px-4 py-4">
              {/* top row */}
              <div className="flex items-center justify-between mb-5">
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="select-none"
                >
                  <div className="relative w-[80px] h-6">
                    <Image
                      src="/images/logo.png"
                      alt="TeamUp"
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
                  aria-label="Close menu"
                  className="w-9 h-9 flex items-center justify-center rounded-xl
                    text-content hover:text-primary hover:bg-primary-light transition-all duration-200"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Search */}
              <div
                className={`mb-4 transition-all duration-300 delay-75 pt-4
                ${isRendered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}`}
              >
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-50 border border-gray-100">
                  <Search
                    size={16}
                    className="text-content-muted flex-shrink-0"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    placeholder="Search About..."
                    aria-label="Search"
                    className="flex-1 bg-transparent text-sm font-primary
                      text-content placeholder:text-content-muted focus:outline-none"
                  />
                </div>
              </div>

              {/* Nav links */}
              {(() => {
                const delays = ["delay-100", "delay-150", "delay-200"];
                return (
                  <nav
                    className="flex flex-col gap-0.5"
                    aria-label="Mobile dashboard navigation"
                  >
                    {DASHBOARD_NAV_LINKS.map((link, i) => {
                      const isActive = pathname === link.href;
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

                    <div
                      className={`my-1 h-px bg-gray-100 transition-all duration-300
                      ${isRendered ? "opacity-100 delay-[220ms]" : "opacity-0"}`}
                    />

                    <Link
                      href="/dashboard/profile"
                      onClick={closeMenu}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium
                        transition-all duration-300
                        ${isRendered ? "opacity-100 translate-x-0 delay-[240ms]" : "opacity-0 -translate-x-5"}
                        text-content hover:text-primary hover:bg-primary-light/60`}
                    >
                      <User
                        size={16}
                        aria-hidden="true"
                        className="flex-shrink-0 ml-[2px]"
                      />
                      <span className="ml-[2px]">{MOCK_USER.name}</span>
                    </Link>

                    {isMentor ? (
                      <button
                        type="button"
                        onClick={() => {
                          closeMenu();
                          openSupervisionRequests();
                        }}
                        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium
                          transition-all duration-300
                          ${isRendered ? "opacity-100 translate-x-0 delay-[255ms]" : "opacity-0 -translate-x-5"}
                          text-content hover:bg-primary-light/60 hover:text-primary`}
                      >
                          <ClipboardList size={16} aria-hidden="true" className="ml-[2px] flex-shrink-0" />
                        <span className="ml-[2px]">Supervision requests</span>
                      </button>
                    ) : (
                      <Link
                        href="/dashboard/activity"
                        onClick={closeMenu}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium
                          transition-all duration-300
                          ${isRendered ? "opacity-100 translate-x-0 delay-[255ms]" : "opacity-0 -translate-x-5"}
                          text-content hover:text-primary hover:bg-primary-light/60`}
                      >
                        <Settings
                          size={16}
                          aria-hidden="true"
                          className="flex-shrink-0 ml-[2px] opacity-0"
                        />
                        <span className="ml-[2px]">My Activity</span>
                      </Link>
                    )}

                    <Link
                      href="/dashboard/settings"
                      onClick={closeMenu}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium
                        transition-all duration-300
                        ${isRendered ? "opacity-100 translate-x-0 delay-[270ms]" : "opacity-0 -translate-x-5"}
                        text-content hover:text-primary hover:bg-primary-light/60`}
                    >
                      <Settings
                        size={16}
                        aria-hidden="true"
                        className="flex-shrink-0 ml-[2px]"
                      />
                      <span className="ml-[2px]">Settings</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        closeMenu();
                        setReportIssueModalOpen(true);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium
                        w-full text-left transition-all duration-300
                        ${isRendered ? "opacity-100 translate-x-0 delay-[285ms]" : "opacity-0 -translate-x-5"}
                        text-content hover:text-primary hover:bg-primary-light/60`}
                    >
                      <MessageSquareWarning
                        size={16}
                        aria-hidden="true"
                        className="flex-shrink-0 ml-[2px]"
                      />
                      <span className="ml-[2px]">Report an Issue</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        closeMenu();
                        setLogoutModalOpen(true);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium
                        w-full text-left transition-all duration-300
                        ${isRendered ? "opacity-100 translate-x-0 delay-300" : "opacity-0 -translate-x-5"}
                        text-error hover:bg-error/10`}
                    >
                      <LogOut
                        size={16}
                        aria-hidden="true"
                        className="flex-shrink-0 ml-[2px]"
                      />
                      <span className="ml-[2px]">Log out</span>
                    </button>
                  </nav>
                );
              })()}

              {/* Calendar icon row — Bell removed, it lives in header bar now */}
              <div
                className={`flex items-center gap-3 mt-5 pt-5 border-t border-gray-100
                transition-all duration-300
                ${isRendered ? "opacity-100 translate-y-0 delay-[320ms]" : "opacity-0 translate-y-3"}`}
              >
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    setCalendarOpen(true);
                  }}
                  aria-label="Calendar"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-light text-primary"
                >
                  <Calendar size={18} aria-hidden="true" />
                </button>

              </div>

              {/* Footer: avatar */}
              <div
                className={`flex items-center gap-3 mt-5 pt-5 border-t border-gray-100
                transition-all duration-300
                ${isRendered ? "opacity-100 translate-y-0 delay-[350ms]" : "opacity-0 translate-y-3"}`}
              >
                <Link
                  href="/dashboard/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 group"
                  aria-label="Go to profile"
                >
                  <div
                    className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0
                    ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-200"
                  >
                    <Image
                      src="/images/user.jpg"
                      alt={MOCK_USER.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="font-primary text-sm font-semibold text-content
                      group-hover:text-primary transition-colors duration-150 leading-tight"
                    >
                      {MOCK_USER.name}
                    </span>
                    <span className="font-primary text-xs text-content-light leading-tight">
                      {MOCK_USER.role}
                    </span>
                  </div>
                </Link>
              </div>

              <p className="text-center text-[11px] text-content-muted mt-4 mb-1 font-primary">
                © 2026 TeamUp — Al-Azhar University
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Calendar modal */}
      <CalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />

      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={() => {
          console.log("logout (mock)");
        }}
      />

      <ReportIssueModal
        isOpen={reportIssueModalOpen}
        onClose={() => setReportIssueModalOpen(false)}
        onSubmit={(data) => {
          console.log("report issue (mock):", data);
          setReportIssueModalOpen(false);
        }}
      />

      <MentorSupervisionRequestsModal
        open={supervisionRequestsOpen}
        requests={MOCK_SUPERVISION_REQUESTS}
        onClose={closeMentorModals}
        onReviewRequest={openProposalDetails}
        onAcceptRequest={(request) => {
          console.log("accept supervision request (mock)", request.id);
        }}
        onRejectRequest={(request) => {
          console.log("reject supervision request (mock)", request.id);
        }}
      />

      <ProjectProposalDetailsModal
        open={proposalDetailsOpen}
        request={selectedRequest}
        onClose={closeMentorModals}
        onBack={openSupervisionRequests}
        onAccept={(request) => {
          console.log("accept proposal (mock)", request.id);
        }}
        onReject={(request) => {
          console.log("reject proposal (mock)", request.id);
        }}
      />
    </>
  );
};

export default DashboardHeader;
