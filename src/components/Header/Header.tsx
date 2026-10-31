import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { UseAuth } from "../../context/AuthContext";

type NavLink = {
  href: string;
  label: string;
  requiredScope?: string;
};

const navLinks: NavLink[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/admin/server", label: "Server & Players", requiredScope: "server:read" },
  { href: "/admin/accounts", label: "Accounts", requiredScope: "players:read" },
  { href: "/admin/tokens", label: "API Tokens", requiredScope: "tokens:manage" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { account, logout, hasScope } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const visibleLinks = navLinks.filter(({ requiredScope }) => requiredScope === undefined || hasScope(requiredScope));

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${isMenuOpen ? styles.menuOpen : ""}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src="/images/Letter_W.webp" alt="Revive101 Logo" className={styles.logoImg} />
          Revive101
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {visibleLinks.map(({ href, label }) => (
            <Link key={href} to={href}>
              {label}
            </Link>
          ))}
          {account ? (
            <a onClick={handleLogout} data-discover="true">
              Log out
            </a>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        <button
          className={styles.burger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <nav id="mobile-nav" className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ""}`} aria-label="Mobile" aria-hidden={!isMenuOpen}>
        {visibleLinks.map(({ href, label }) => (
          <Link key={href} to={href} onClick={() => setIsMenuOpen(false)} tabIndex={isMenuOpen ? 0 : -1}>
            {label}
          </Link>
        ))}
        {account ? (
          <div className={styles.userMenu}>
            <p>
              {account.username} - {account.authLevel}
            </p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
