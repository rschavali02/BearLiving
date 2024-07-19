import { Link } from "lucide-react"; // Ensure this is the correct import for internal links if needed
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./cart";
import Image from 'next/image';

const Navbar = () => {
  const user = null;

  // Debug: Log generated classes for ghost variant
  console.log(buttonVariants({ variant: "ghost" }));

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* ToDo MobileNav */}

              <div className="ml-4 flex lg:ml-0">
                <Image src="/logo.png" alt="Logo" className="h-20 w-20" />
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
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
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
