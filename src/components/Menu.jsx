import React, { useState, useMemo, useEffect } from "react";
import englishMenu from "../data/englishmenu.json";
import greekmenu from "../data/greekmenu.json";
import { AnimatePresence, motion } from "framer-motion";

// --- Sub-component for a single category section ---
const MenuCategory = ({ title, items, t, isOpen, onToggle, isDesktop }) => {
  // On desktop, we force it open. On mobile, we respect the state.
  const showContent = isDesktop || isOpen;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      {/* Header - Clickable on Mobile */}
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-center p-4 text-left transition-colors duration-200 
          ${isDesktop ? "cursor-default bg-[#1b464a] text-white" : "cursor-pointer bg-gray-50 hover:bg-gray-100"}`}
        aria-expanded={showContent}
      >
        <h2
          className={`text-xl md:text-2xl font-bold font-heading tracking-wide 
          ${isDesktop ? "text-white" : "text-[#1b464a]"}`}
        >
          {title}
        </h2>
        {/* Chevron only on mobile */}
        {!isDesktop && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-[#1b464a]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        )}
      </button>

      {/* Content - Collapsible on Mobile, Static on Desktop */}
      <AnimatePresence initial={false}>
        {showContent && (
          <motion.div
            initial={isDesktop ? false : { height: 0, opacity: 0 }}
            animate={isDesktop ? false : { height: "auto", opacity: 1 }}
            exit={isDesktop ? false : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-4 pt-2 bg-white flex flex-col gap-3">
              {/* Legend for sizes (only show once per card for cleaner look) */}
              <div className="flex justify-end text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 border-b border-gray-100 pb-1">
                <span className="w-16 text-right">{t.one}</span>
                <span className="w-16 text-right">{t.half}</span>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_auto_auto] gap-2 items-baseline group"
                >
                  {/* Name */}
                  <div className="relative overflow-hidden">
                    <span className="text-gray-800 font-medium md:text-lg group-hover:text-[#ed1c23] transition-colors">
                      {item.foodItem}
                    </span>
                    {/* Dotted leader visual hack */}
                    <span className="absolute bottom-1 ml-1 text-gray-300 w-full whitespace-nowrap overflow-hidden">
                      ........................................................................
                    </span>
                  </div>

                  {/* Price 1 (Full) */}
                  <div className="text-right font-bold text-gray-700 flex items-baseline justify-end">
                    <span>{item.priceOne ? `€${item.priceOne}` : "-"}</span>
                    <span className="w-5 text-left text-[10px] font-normal text-gray-400 ml-0.5">
                      {item.sizeOne === "/kg" ? "/kg" : ""}
                    </span>
                  </div>

                  {/* Price 1/2 (Half) */}
                  <div className="w-16 text-right font-medium text-gray-500 text-sm">
                    {item.priceHalf ? `€${item.priceHalf}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function Menu() {
  const [language, setLanguage] = useState("en");
  // Simple check for desktop viewport (hook-based for reactivity)
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const menus = { en: englishMenu, el: greekmenu };
  const currentMenu = menus[language];

  // Group items by category: { "STARTERS": [items...], "GRILL": [items...] }
  const groupedMenu = useMemo(() => {
    const groups = {};
    // Preserve order from JSON by using a Set for keys first
    const uniqueCategories = [...new Set(currentMenu.map((i) => i.category))];
    
    uniqueCategories.forEach(cat => {
      groups[cat] = currentMenu.filter(i => i.category === cat);
    });
    return groups;
  }, [currentMenu]);

  // Accordion state (for mobile) - default to all categories closed
  const [openCategory, setOpenCategory] = useState(null);

  const t = {
    en: { title: "OUR MENU", one: "Full", half: "Half" },
    el: { title: "ΤΟ ΜΕΝΟΥ ΜΑΣ", one: "Μερίδα", half: "Μισή" },
  };

  const handleChange = (e) => setLanguage(e.target.value);

  return (
    <div className="w-full bg-platinum py-16 px-4 flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-8">
        
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-300 pb-6">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1b464a] font-heading uppercase">
              {t[language].title}
            </h1>
            <div className="h-1.5 w-24 bg-[#ed1c23] mt-2 rounded-full"></div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Language:</span>
            <div className="relative">
              <select
                id="language"
                className="appearance-none bg-white border-2 border-[#1b464a] text-[#1b464a] font-bold rounded-lg py-2 pl-4 pr-10 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ed1c23]"
                value={language}
                onChange={handleChange}
              >
                <option value="en">ENGLISH</option>
                <option value="el">ΕΛΛΗΝΙΚΑ</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#1b464a]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Grid / Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
          {Object.entries(groupedMenu).map(([category, items]) => (
            <MenuCategory
              key={category}
              title={category}
              items={items}
              t={t[language]}
              isOpen={openCategory === category}
              isDesktop={isDesktop}
              onToggle={() => setOpenCategory(openCategory === category ? null : category)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Menu;
