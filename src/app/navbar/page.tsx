"use client";
import { useState } from "react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { LogIn, Search, ShoppingCart, Menu, LogOutIcon } from "lucide-react";
import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import "./tooltip.css";

const Navbar = () => {
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { user } = useUser();

  return (
    <nav className="bg-white shadow-sm py-3">
      <div className="container d-flex align-items-center justify-content-between flex-wrap gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="fw-bold fs-4 text-success text-decoration-none"
        >
          Amir-Store
        </Link>

        {/* Search Input */}
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            style={{ maxWidth: "200px", transition: "0.3s" }}
          />
        )}

        {/* Navbar Links */}
        <ul className="nav d-none d-lg-flex gap-4 align-items-center mb-0">
          <li className="nav-item">
            <Link
              href="/"
              className={`nav-link text-dark ${
                isActive("/") ? "border-bottom border-success border-2" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href="/shop"
              className={`nav-link text-dark ${
                isActive("/shop") ? "border-bottom border-success border-2" : ""
              }`}
            >
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href="/plant-care"
              className={`nav-link text-dark ${
                isActive("/plant-care")
                  ? "border-bottom border-success border-2"
                  : ""
              }`}
            >
              Plant Care
            </Link>
          </li>
        </ul>

        {/* ICONS */}
        {/* login icon bosilganda , /sign-inga o'tadi , admin emailini kiritadi va yana homega kelyapti adminga emas?? */}
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn"
            data-tooltip-id="searchTip"
            data-tooltip-content="Search"
            onClick={() => setShowSearch((prev) => !prev)}
          >
            <Search size={22} className="text-secondary" />
          </button>
          <ReactTooltip
            id="searchTip"
            place="bottom"
            offset={8}
            className="custom-tooltip"
          />

          <div className="d-none d-lg-flex align-items-center gap-2">
            <button
              onClick={() => redirect("/cart")}
              className="btn"
              data-tooltip-id="cartTip"
              data-tooltip-content="Shopping Cart"
            >
              <ShoppingCart size={22} className="text-primary" />
            </button>
            <ReactTooltip
              id="cartTip"
              place="bottom"
              offset={8}
              className="custom-tooltip"
            />

            {!user ? (
              <>
                <Link
                  href="/sign-in"
                  className="btn"
                  data-tooltip-id="loginTip"
                  data-tooltip-content="Login"
                >
                  <LogIn size={22} />
                </Link>
                <ReactTooltip
                  id="loginTip"
                  place="bottom"
                  offset={8}
                  className="custom-tooltip"
                />
              </>
            ) : (
              <SignOutButton>
                <button
                  className="btn"
                  data-tooltip-id="logoutTip"
                  data-tooltip-content="Sign Out"
                >
                  <LogOutIcon />
                </button>
              </SignOutButton>
            )}

            <ReactTooltip
              id="logoutTip"
              place="bottom"
              offset={8}
              className="custom-tooltip"
            />
          </div>

          {/* Hamburger icon on small screens */}
          <button
            className="d-lg-none btn"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/*  Menu */}
      <div className={`side-drawer ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>
          ×
        </button>
        <ul className="nav flex-column p-4">
          <li className="nav-item mb-3">
            <Link href="/" className="nav-link" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link href="/shop" className="nav-link" onClick={toggleMenu}>
              Shop
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link href="/plant-care" className="nav-link" onClick={toggleMenu}>
              Plant Care
            </Link>
          </li>
          <hr />
          <li className="nav-item mb-3 d-lg-none">
            <button
              className="btn nav-link d-flex align-items-center gap-2"
              onClick={toggleMenu}
            >
              <ShoppingCart size={20} className="text-primary" />
              Cart
            </button>
          </li>
          <li className="nav-item mb-3 d-lg-none">
            <Link
              href={"/sign-in"}
              className="btn nav-link d-flex align-items-center gap-2"
              onClick={toggleMenu}
            >
              <LogIn size={20} />
              Login
            </Link>
          </li>
          <li className="nav-item mb-3 d-lg-none">
            <SignOutButton>
              <button
                className="btn nav-link d-flex align-items-center gap-2"
                onClick={toggleMenu}
              >
                🚪 Sign Out
              </button>
            </SignOutButton>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
