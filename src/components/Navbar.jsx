import { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

import phone from "../assets/icons8-phone-100.png";
import plate from "../assets/icons8-plate-100.png";

// Helper to check if open (10:00 - 18:00, Closed Tuesdays)
function useIsOpen() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      // Always use Cyprus time regardless of visitor's timezone
      const now = new Date();
      const cyprusTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Nicosia",
        hour: "numeric",
        hour12: false,
        weekday: "short",
      }).formatToParts(now);

      const day = cyprusTime.find((p) => p.type === "weekday")?.value;
      const hour = parseInt(
        cyprusTime.find((p) => p.type === "hour")?.value,
        10
      );

      // Closed on Tuesdays
      if (day === "Tue") {
        setIsOpen(false);
        return;
      }

      // Open 11:00 to 20:00
      if (hour >= 11 && hour < 20) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return isOpen;
}

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    filter: "blur(3px)",
    transition: { duration: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const isShopOpen = useIsOpen();

  // Define nav links -> these match section IDs in App.jsx
  const navLinks = [
    { name: "HOME", id: "home" },
    { name: "ABOUT", id: "about" },
    { name: "CATERING", id: "catering" },
    { name: "CONTACT", id: "contact" },
  ];

  // Smooth scroll handler
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpenMenu(false); // close mobile menu
    }
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* Desktop */}
      <motion.nav
        role="navigation"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="mx-auto max-w-[1200px] text-white md:flex hidden justify-between items-center p-2 glass-nav m-2 rounded-full"
      >
        {/* Left chip -> scroll to menu */}
        <motion.div
          onClick={() => handleScroll("menu")}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96, y: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className="px-6 py-2 rounded-full flex gap-2 items-center bg-redcmyk cursor-pointer relative"
        >
          <img src={plate} alt="Menu" className="h-[20px]" />
          FOOD MENU
        </motion.div>

        {/* Center links with shared underline */}
        <div className="relative flex text-sm justify-between gap-4">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              onClick={() => handleScroll(link.id)}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="relative cursor-pointer [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]"
            >
              {link.name}
              {hoveredLink === link.name && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-redcmyk rounded-full"
                  transition={{ type: "spring", stiffness: 600, damping: 40 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Right chip (phone) with LIVE indicator */}
        <a href="tel:25585897" className="block">
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="px-6 py-2 rounded-full flex gap-2 items-center bg-redcmyk cursor-pointer relative"
          >
            <div className="relative flex items-center justify-center w-[12px] h-[12px] mr-1">
              {isShopOpen && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isShopOpen ? 'bg-green-400' : 'bg-red-400'}`}></span>
            </div>
            <img src={phone} alt="Phone" className="h-[20px]" />
            25 585897
          </motion.div>
        </a>
      </motion.nav>

      {/* Mobile toggle (animated wrapper) */}
      <div className="md:hidden flex justify-end">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9, rotate: -5 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Hamburger
            toggled={isOpenMenu}
            toggle={setIsOpenMenu}
            size={32}
            rounded
            distance="sm"
            label={isOpenMenu ? "Close menu" : "Open menu"}
            color="white"
          />
        </motion.div>
      </div>

      {/* Mobile dropdown with animation */}
      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            key="dropdown"
            role="menu"
            aria-label="Mobile navigation"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="md:hidden glass-nav-mob rounded-2xl m-2 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-3 space-y-2">
              <div className="flex flex-nowrap justify-between gap-2 mb-4 mt-2">
                {/* Mobile FOOD MENU */}
                <motion.div
                  variants={itemVariants}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleScroll("menu")}
                  className="flex-1 px-2 py-2 rounded-full flex gap-1 justify-center items-center bg-redcmyk cursor-pointer whitespace-nowrap"
                >
                  <img src={plate} alt="Menu" className="h-[18px]" />
                  <span className="text-sm font-bold">FOOD MENU</span>
                </motion.div>

                {/* Mobile phone with LIVE indicator */}
                <a href="tel:25585897" className="flex-1 block">
                  <motion.div
                    variants={itemVariants}
                    whileTap={{ scale: 0.96 }}
                    className="w-full px-2 py-2 rounded-full flex gap-1 justify-center items-center bg-redcmyk cursor-pointer whitespace-nowrap"
                  >
                     <div className="relative flex items-center justify-center w-[10px] h-[10px] mr-1">
                      {isShopOpen && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                      )}
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${isShopOpen ? 'bg-green-400' : 'bg-red-400'}`}></span>
                    </div>
                    <img src={phone} alt="Phone" className="h-[18px]" />
                    <span className="text-sm font-bold">25 585897</span>
                  </motion.div>
                </a>
              </div>

              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={itemVariants}
                  onClick={() => handleScroll(link.id)}
                  whileTap={{ scale: 0.98, x: 2 }}
                  className="block text-white cursor-pointer [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]"
                >
                  {link.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
