import { useEffect, useState } from "react"
import { Navbar, Typography, Button, IconButton, Collapse } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import AuthHook from "../hooks/AuthHook";

export default function StickyNavbar() {
    const { user, logout } = AuthHook();
    const [openNav, setOpenNav] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setOpenNav(false),
        );
      }, []);

      useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

      const navList = [
        { text: "หน้าหลัก", to: "#" },
        { text: "เกี่ยวกับ", to: "#" },
        { text: "บริการ", to: "#" },
        { text: "ติดต่อเรา", to: "#" },
      ];
    
  return (
      <Navbar className={`sticky border-0 top-0 z-10 mb-4 transition-all duration-300 ease-in-out ${isScrolled ? "max-w-full mx-auto rounded-none" : "max-w-[80rem] mx-auto rounded-md" } px-4 py-2 lg:px-6 lg:py-3`}>
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-medium">
            หน้าเว็บทดสอบ
          </Typography>
          <div className="flex items-center gap-4">
            <ul className="hidden md:flex gap-6">
              {navList.map((el, index) => (
                <li key={index}>
                  <a href={el.to} className="text-blue-gray-900 hover:text-blue-500">
                    {el.text}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-x-1">
              {user?.user_id ? (
                <>
                    <Button variant="gradient" size="sm" onClick={ () => logout() } className="hidden md:inline-block">
                        Log Out
                    </Button>
                </>
              ) : (
                <>
                    <Button variant="text" size="sm" className="hidden md:inline-block">
                        Log In
                    </Button>
                    <Button variant="gradient" size="sm" className="hidden md:inline-block">
                        Sign in
                    </Button>
                </>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto text-lg hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden transition-all ease-in-out duration-150"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}>
              {openNav ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
            <ul className="flex flex-col gap-4">
                {navList.map((el, index) => (
                <li key={index}>
                    <a href={el.to} className="block text-blue-gray-900 hover:text-blue-500">
                    {el.text}
                    </a>
                </li>
                ))}
            </ul>
            <div className="flex items-center mt-4 gap-x-1">
            {user?.user_id ? (
                <>
                    <Button fullWidth variant="gradient" size="md" onClick={ () => logout() } className="">
                        Log Out
                    </Button>
                </>
              ) : (
                <>
                    <Button fullWidth variant="text" size="md" className="">
                        Log In
                    </Button>
                    <Button fullWidth variant="gradient" size="md" className="">
                        Sign in
                    </Button>
                </>
              )}
            </div>
        </Collapse>
        </Navbar>
  )
}
