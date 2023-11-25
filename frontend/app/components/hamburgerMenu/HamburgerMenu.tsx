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
            <path d="M2 2h19M2.003 8.75h19M2.003 15.75h19" stroke="#000" stroke-width="4" stroke-linecap="round"/>
          </svg>
        </div>
  
        {isOpen && (
          <div className="menu">
            <Link href="/home">
            <a className="menu-item">Home</a>
            </Link>
            <Link href="/addclothes">
                <a className="menu-item">Add clothes</a>
            </Link>
            <Link href="/wardrobe">
                <a className="menu-item">Wardrobe</a>
            </Link>
            <Link href="/storage">
                <a className="menu-item">Storage</a>
            </Link>
            <Link href="/settings">
                <a className="menu-item">Settings</a>
            </Link>
          </div>
        )}
      </div>
    );
  };
  
  export default HamburgerMenu;
