'use client';

import { useState } from "react";
import Link from 'next/link';

const HamburgerMenu = () => {

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle lg:hidden" />
      <div className="drawer-content m-4">
        <label htmlFor="my-drawer" className="lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-7 h-7 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
      <div className="drawer-side lg:hidden">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="w-full menu flex-row justify-evenly bg-base-100">
          <li className="text-sm"><Link href="/" className="p-3">Home</Link></li>
          <li className="text-sm"><Link href="/addclothing" className="p-3">Add</Link></li>
          <li className="text-sm"><Link href="/wardrobe" className="p-3">Wardrobe</Link></li>
          <li className="text-sm"><Link href="/storage" className="p-3">Storage</Link></li>
          <li className="text-sm">
            <Link href="/settings" className="p-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </Link></li>
        </ul>
      </div>
      <div className="hidden lg:flex w-full justify-evenly bg-base-100">
        <ul className="w-full menu flex-row justify-evenly bg-base-100">
          <li className="text-sm"><Link href="/" className="text-sm p-3">Home</Link></li>
          <li className="text-sm"><Link href="/addclothing" className="text-sm p-3">Add</Link></li>
          <li className="text-sm"><Link href="/wardrobe" className="text-sm p-3">Wardrobe</Link></li>
          <li className="text-sm"><Link href="/storage" className="text-sm p-3">Storage</Link></li>
          <li className="text-sm"><Link href="/settings" className="text-sm p-3">Settings</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
