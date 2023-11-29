'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const HamburgerMenu = () => {
  const { user } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = (event: MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest('.dropdown')) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('click', closeDropdown);
    }

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [dropdownOpen]);

  const pathname = usePathname();

  const addIndicator = (path: string) => {
    return path === pathname ? ' bg-neutral-200 font-bold' : '';
  };

  return (
    <div className="fixed top-0 z-50 w-full bg-[oklch(0.191629 0 0 / 0.1)]">
      <div className="drawer lg:hidden">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle lg:hidden"
        />
        <div className="drawer-content m-4">
          <label htmlFor="my-drawer" className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-7 h-7 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="drawer-side lg:hidden">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="w-full menu flex-row justify-evenly bg-base-100">
            <li className="text-sm">
              <Link href="/" className={'p-3' + addIndicator('/')}>
                Home
              </Link>
            </li>
            <li className="text-sm">
              <Link
                href="/addclothing"
                className={'p-3' + addIndicator('/addclothing')}
              >
                Add
              </Link>
            </li>
            <li className="text-sm">
              <Link
                href="/wardrobe"
                className={'p-3' + addIndicator('/wardrobe')}
              >
                Wardrobe
              </Link>
            </li>
            <li className="text-sm">
              <Link
                href="/storage"
                className={'p-3' + addIndicator('/storage')}
              >
                Storage
              </Link>
            </li>
            <li className="text-sm">
              <Link
                href="/settings"
                className={'p-3' + addIndicator('/settings')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="navbar bg-base-100 p-0">
          <div className="navbar-start pl-8">
            <svg
              width="100"
              height="50"
              viewBox="0 0 254 125"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.008 69.728L30.42 95H22.968L18.936 78.368L14.76 95H7.308L0.9 69.728H7.488L11.124 88.124L15.624 69.728H22.392L26.712 88.124L30.384 69.728H37.008ZM38.8713 84.92C38.8713 82.856 39.2553 81.044 40.0233 79.484C40.8153 77.924 41.8833 76.724 43.2273 75.884C44.5713 75.044 46.0713 74.624 47.7273 74.624C49.1433 74.624 50.3793 74.912 51.4353 75.488C52.5153 76.064 53.3433 76.82 53.9193 77.756V74.912H60.0753V95H53.9193V92.156C53.3193 93.092 52.4793 93.848 51.3993 94.424C50.3433 95 49.1073 95.288 47.6913 95.288C46.0593 95.288 44.5713 94.868 43.2273 94.028C41.8833 93.164 40.8153 91.952 40.0233 90.392C39.2553 88.808 38.8713 86.984 38.8713 84.92ZM53.9193 84.956C53.9193 83.42 53.4873 82.208 52.6233 81.32C51.7833 80.432 50.7513 79.988 49.5273 79.988C48.3033 79.988 47.2593 80.432 46.3953 81.32C45.5553 82.184 45.1353 83.384 45.1353 84.92C45.1353 86.456 45.5553 87.68 46.3953 88.592C47.2593 89.48 48.3033 89.924 49.5273 89.924C50.7513 89.924 51.7833 89.48 52.6233 88.592C53.4873 87.704 53.9193 86.492 53.9193 84.956ZM70.6849 78.26C71.4049 77.156 72.3049 76.292 73.3849 75.668C74.4649 75.02 75.6649 74.696 76.9849 74.696V81.212H75.2929C73.7569 81.212 72.6049 81.548 71.8369 82.22C71.0689 82.868 70.6849 84.02 70.6849 85.676V95H64.5289V74.912H70.6849V78.26ZM78.7033 84.92C78.7033 82.856 79.0873 81.044 79.8553 79.484C80.6473 77.924 81.7153 76.724 83.0593 75.884C84.4033 75.044 85.9033 74.624 87.5593 74.624C88.8793 74.624 90.0793 74.9 91.1593 75.452C92.2633 76.004 93.1273 76.748 93.7513 77.684V68.36H99.9073V95H93.7513V92.12C93.1753 93.08 92.3473 93.848 91.2673 94.424C90.2113 95 88.9753 95.288 87.5593 95.288C85.9033 95.288 84.4033 94.868 83.0593 94.028C81.7153 93.164 80.6473 91.952 79.8553 90.392C79.0873 88.808 78.7033 86.984 78.7033 84.92ZM93.7513 84.956C93.7513 83.42 93.3193 82.208 92.4553 81.32C91.6153 80.432 90.5833 79.988 89.3593 79.988C88.1353 79.988 87.0913 80.432 86.2273 81.32C85.3873 82.184 84.9673 83.384 84.9673 84.92C84.9673 86.456 85.3873 87.68 86.2273 88.592C87.0913 89.48 88.1353 89.924 89.3593 89.924C90.5833 89.924 91.6153 89.48 92.4553 88.592C93.3193 87.704 93.7513 86.492 93.7513 84.956ZM110.517 78.26C111.237 77.156 112.137 76.292 113.217 75.668C114.297 75.02 115.497 74.696 116.817 74.696V81.212H115.125C113.589 81.212 112.437 81.548 111.669 82.22C110.901 82.868 110.517 84.02 110.517 85.676V95H104.361V74.912H110.517V78.26ZM128.903 95.288C126.935 95.288 125.159 94.868 123.575 94.028C122.015 93.188 120.779 91.988 119.867 90.428C118.979 88.868 118.535 87.044 118.535 84.956C118.535 82.892 118.991 81.08 119.903 79.52C120.815 77.936 122.063 76.724 123.647 75.884C125.231 75.044 127.007 74.624 128.975 74.624C130.943 74.624 132.719 75.044 134.303 75.884C135.887 76.724 137.135 77.936 138.047 79.52C138.959 81.08 139.415 82.892 139.415 84.956C139.415 87.02 138.947 88.844 138.011 90.428C137.099 91.988 135.839 93.188 134.231 94.028C132.647 94.868 130.871 95.288 128.903 95.288ZM128.903 89.96C130.079 89.96 131.075 89.528 131.891 88.664C132.731 87.8 133.151 86.564 133.151 84.956C133.151 83.348 132.743 82.112 131.927 81.248C131.135 80.384 130.151 79.952 128.975 79.952C127.775 79.952 126.779 80.384 125.987 81.248C125.195 82.088 124.799 83.324 124.799 84.956C124.799 86.564 125.183 87.8 125.951 88.664C126.743 89.528 127.727 89.96 128.903 89.96ZM148.837 77.756C149.413 76.82 150.241 76.064 151.321 75.488C152.401 74.912 153.637 74.624 155.029 74.624C156.685 74.624 158.185 75.044 159.529 75.884C160.873 76.724 161.929 77.924 162.697 79.484C163.489 81.044 163.885 82.856 163.885 84.92C163.885 86.984 163.489 88.808 162.697 90.392C161.929 91.952 160.873 93.164 159.529 94.028C158.185 94.868 156.685 95.288 155.029 95.288C153.613 95.288 152.377 95.012 151.321 94.46C150.265 93.884 149.437 93.128 148.837 92.192V95H142.681V68.36H148.837V77.756ZM157.621 84.92C157.621 83.384 157.189 82.184 156.325 81.32C155.485 80.432 154.441 79.988 153.193 79.988C151.969 79.988 150.925 80.432 150.061 81.32C149.221 82.208 148.801 83.42 148.801 84.956C148.801 86.492 149.221 87.704 150.061 88.592C150.925 89.48 151.969 89.924 153.193 89.924C154.417 89.924 155.461 89.48 156.325 88.592C157.189 87.68 157.621 86.456 157.621 84.92ZM186.051 84.632C186.051 85.208 186.015 85.808 185.943 86.432H172.011C172.107 87.68 172.503 88.64 173.199 89.312C173.919 89.96 174.795 90.284 175.827 90.284C177.363 90.284 178.431 89.636 179.031 88.34H185.583C185.247 89.66 184.635 90.848 183.747 91.904C182.883 92.96 181.791 93.788 180.471 94.388C179.151 94.988 177.675 95.288 176.043 95.288C174.075 95.288 172.323 94.868 170.787 94.028C169.251 93.188 168.051 91.988 167.187 90.428C166.323 88.868 165.891 87.044 165.891 84.956C165.891 82.868 166.311 81.044 167.151 79.484C168.015 77.924 169.215 76.724 170.751 75.884C172.287 75.044 174.051 74.624 176.043 74.624C177.987 74.624 179.715 75.032 181.227 75.848C182.739 76.664 183.915 77.828 184.755 79.34C185.619 80.852 186.051 82.616 186.051 84.632ZM179.751 83.012C179.751 81.956 179.391 81.116 178.671 80.492C177.951 79.868 177.051 79.556 175.971 79.556C174.939 79.556 174.063 79.856 173.343 80.456C172.647 81.056 172.215 81.908 172.047 83.012H179.751ZM224.074 69.728L217.486 95H210.034L206.002 78.368L201.826 95H194.374L187.966 69.728H194.554L198.19 88.124L202.69 69.728H209.458L213.778 88.124L217.45 69.728H224.074ZM230.258 72.824C229.178 72.824 228.29 72.512 227.594 71.888C226.922 71.24 226.586 70.448 226.586 69.512C226.586 68.552 226.922 67.76 227.594 67.136C228.29 66.488 229.178 66.164 230.258 66.164C231.314 66.164 232.178 66.488 232.85 67.136C233.546 67.76 233.894 68.552 233.894 69.512C233.894 70.448 233.546 71.24 232.85 71.888C232.178 72.512 231.314 72.824 230.258 72.824ZM233.318 74.912V95H227.162V74.912H233.318ZM243.539 89.924H252.251V95H236.663V90.104L245.015 79.988H236.735V74.912H252.071V79.808L243.539 89.924Z"
                fill="black"
              />
              <path
                d="M148.5 24.18L129 66H122.88L119.1 32.34L103.14 66L97.02 66.06L92.7 24.18H98.58L101.46 59.52L117.72 24.18H123.9L127.26 59.4L142.62 24.18H148.5Z"
                fill="black"
              />
              <path
                d="M177.5 24.18L158 66H151.88L148.1 32.34L132.14 66L126.02 66.06L121.7 24.18H127.58L130.46 59.52L146.72 24.18H152.9L156.26 59.4L171.62 24.18H177.5Z"
                fill="black"
              />
              <path
                d="M153.5 24.18L134 66H127.88L124.1 32.34L108.14 66L102.02 66.06L97.7 24.18H103.58L106.46 59.52L122.72 24.18H128.9L132.26 59.4L147.62 24.18H153.5Z"
                fill="#EEF6FC"
              />
              <path
                d="M182.5 24.18L163 66H156.88L153.1 32.34L137.14 66L131.02 66.06L126.7 24.18H132.58L135.46 59.52L151.72 24.18H157.9L161.26 59.4L176.62 24.18H182.5Z"
                fill="#EEF6FC"
              />
            </svg>
          </div>

          <div className="navbar-center">
            <ul className="menu menu-horizontal p-0">
              <li className="text-sm">
                <Link href="/" className={'p-3' + addIndicator('/')}>
                  Home
                </Link>
              </li>
              <li className="text-sm">
                <Link
                  href="/addclothing"
                  className={'p-3' + addIndicator('/addclothing')}
                >
                  Add Clothing
                </Link>
              </li>
              <li className="text-sm">
                <Link
                  href="/wardrobe"
                  className={'p-3' + addIndicator('/wardrobe')}
                >
                  Wardrobe
                </Link>
              </li>
              <li className="text-sm">
                <Link
                  href="/storage"
                  className={'p-3' + addIndicator('/storage')}
                >
                  Storage
                </Link>
              </li>
            </ul>
          </div>

          <div className="navbar-end pr-8">
            <div
              className="dropdown dropdown-end"
              style={{ position: 'relative' }}
            >
              <div
                onClick={toggleDropdown}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {user?.picture ? (
                    <Image
                      src={user.picture}
                      alt="Profile Picture"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {dropdownOpen && (
                <ul
                  className="shadow menu menu-sm bg-base-100 rounded-box"
                  style={{
                    position: 'absolute',
                    top: '115%',
                    right: -25,
                    zIndex: 50,
                  }}
                >
                  <li>
                    <Link href="/settings" className="justify-center">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link href="/api/auth/logout" className="justify-center">
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
