"use client"; // Add this line at the top

import { useState } from 'react';
import { Link } from "lucide-react"; // Ensure this is the correct import for internal links if needed
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./cart";
import Image from 'next/image';
import { Menu, X } from 'lucide-react'; // Ensure you have these icons for the mobile menu toggle

const Navbar = () => {
  const user = null;
  // conditional to make sure menu is correct for mobile view
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Debug: Log generated classes for ghost variant
  console.log(buttonVariants({ variant: "ghost" }));

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center justify-between">
              <div className="ml-4 flex lg:ml-0">
                <Image src="/logo.png" alt="Logo" className="h-20 w-20" width={50} height={50} />
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center">
                <button onClick={toggleMobileMenu} className="p-2 text-gray-500 hover:text-gray-700">
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              <div className={`hidden lg:ml-8 lg:block lg:self-stretch ${isMobileMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center`}>
                <NavItems />
              </div>

              <div className="ml-auto flex items-center lg:hidden">
                <div className="ml-4 flow-root lg:ml-6">
                  <Cart />
                </div>
              </div>

              <div className="ml-auto hidden lg:flex items-center lg:flex-1 lg:justify-end lg:space-x-6">
                {!user && (
                  <>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLScsEZe5aYaNsNPsLZtA0PUtnvQaut7TfoAkvYQUbZwJoxZl9A/viewform?usp=sf_link"
                      className={`${buttonVariants({
                        variant: "ghost",
                      })} text-black`}
                    >
                      Buy
                    </a>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSf6_oW5wdwHboGId0G3rXHbs9Ct0z0K8PXvEeIc5QE-fEFBFQ/viewform?usp=sf_link"
                      className={`${buttonVariants({
                        variant: "ghost",
                      })} text-black`}
                    >
                      Sell
                    </a>
                  </>
                )}
                <div className="ml-4 flow-root lg:ml-6">
                  <Cart />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu items */}
          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <div className="flex flex-col items-start p-4 space-y-4">
                <NavItems />
                {!user && (
                  <>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLScsEZe5aYaNsNPsLZtA0PUtnvQaut7TfoAkvYQUbZwJoxZl9A/viewform?usp=sf_link"
                      className={`${buttonVariants({
                        variant: "ghost",
                      })} text-black`}
                    >
                      Buy
                    </a>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSf6_oW5wdwHboGId0G3rXHbs9Ct0z0K8PXvEeIc5QE-fEFBFQ/viewform?usp=sf_link"
                      className={`${buttonVariants({
                        variant: "ghost",
                      })} text-black`}
                    >
                      Sell
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
