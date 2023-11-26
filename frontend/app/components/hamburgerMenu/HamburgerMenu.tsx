'use client';

import { useState } from "react";
import Link from 'next/link';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-0 left-0 z-50 p-4">
      <div onClick={toggleMenu} className="cursor-pointer">
        <svg width="30" height="25" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2h19M2.003 8.75h19M2.003 15.75h19" stroke="#040E15" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-lg w-40">
          <div className="menu">
            <Link href="/">Home</Link>
            <Link href="/addclothes">Add clothes</Link>
            <Link href="/wardrobe">Wardrobe</Link>
            <Link href="/storage">Storage</Link>
            <Link href="/settings">Settings</Link>
          </div>
          </div>
      )}
    </div>
  );
};

export default HamburgerMenu;