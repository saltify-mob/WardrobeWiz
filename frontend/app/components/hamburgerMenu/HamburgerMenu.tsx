'use client';

import { useState } from "react";
import Link from 'next/link';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div>
        <div onClick={toggleMenu}>
          <svg width="23" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2h19M2.003 8.75h19M2.003 15.75h19" stroke="#000" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </div>
  
        {isOpen && (
          <div className="menu">
            <Link href="/">Home</Link>
            <Link href="/addclothing">Add clothes</Link>
            <Link href="/wardrobe">Wardrobe</Link>
            <Link href="/storage">Storage</Link>
            <Link href="/settings">Settings</Link>
          </div>
        )}
      </div>
    );
  };
  
  export default HamburgerMenu;
