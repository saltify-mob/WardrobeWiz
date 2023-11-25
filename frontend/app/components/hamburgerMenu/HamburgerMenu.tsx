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
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
  
        {isOpen && (
          <div className="menu">
            <Link href="/home">
            <a className="menu-item">Home</a>
            </Link>
            <Link href="/addclothes">
                <a className="menu-item">Wardrobe</a>
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
