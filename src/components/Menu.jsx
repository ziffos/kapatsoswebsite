import React, { useState, useMemo, useEffect } from "react";
import englishMenu from "../data/englishmenu.json";
import greekmenu from "../data/greekmenu.json";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function Menu() {
  // language + data
  const [language, setLanguage] = useState("en");
  const menus = { en: englishMenu, el: greekmenu };
  const [menu, setMenu] = useState(menus[language]);

  // recompute categories whenever the menu changes
  const eCategories = useMemo(
    () => [...new Set(menu.map((item) => item.category))],
    [menu]
  );

  // make sure activeCategory is valid for the current language/menu
  const [activeCategory, setActiveCategory] = useState(eCategories[0]);
  useEffect(() => {
    setMenu(menus[language]); // swap the data set
  }, [language]);

  useEffect(() => {
    // reset to first category whenever the menu dataset changes
    if (eCategories.length) setActiveCategory(eCategories[0]);
  }, [eCategories]);

  const prefersReduced = useReducedMotion();

  const visibleItems = useMemo(
    () => menu.filter((i) => i.category === activeCategory),
    [menu, activeCategory] // depend on both!
  );

  // simple label dictionary
  const t = {
    en: { title: "MENU", one: "1 portion", half: "½ portion" },
    el: { title: "ΜΕΝΟΥ", one: "1 μερίδα", half: "½ μερίδα" },
  };

  // Variants
  const containerVariants = {
    hidden: { opacity: 0, y: -8, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: prefersReduced ? 0 : 0.25,
        when: "beforeChildren",
        staggerChildren: prefersReduced ? 0 : 0.04,
      },
    },
    exit: {
      opacity: 0,
      y: 8,
      filter: "blur(3px)",
      transition: { duration: 0.18 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.12 } },
  };

  const handleChange = (e) => {
    const nextLang = e.target.value; // "en" or "el"
    setLanguage(nextLang); // triggers the effects above
    console.log("Language changed to:", nextLang);
  };

  return (
    <>
      <div className="flex flex-col items-center py-16">
        <div className="w-full md:w-[1200px] p-4 flex justify-end items-center mb-8">
          <h1 className="mx-auto text-4xl font-bold text-center  relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:bg-teal-600 after:mx-auto after:mt-2">
            {t[language].title}
          </h1>
          <div>
            <select
              id="language"
              className="bg-[#1b464a] text-white rounded-2xl p-1 cursor-pointer"
              value={language}
              onChange={handleChange}
            >
              <option value="en">EN</option>
              <option value="el">ΕΛ</option>
            </select>
          </div>
        </div>

        <div className="w-full md:w-[1200px] md:grid flex flex-col md:grid-cols-[1fr_5fr] md:gap-8 gap-4 ">
          {/* CATEGORY STRIP */}
          <div
            className="sticky top-[80px] md:top-[85px] z-40 relative flex md:flex-col gap-2 md:gap-4 overflow-x-auto whitespace-nowrap snap-x snap-mandatory
           [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2"
          >
            {eCategories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  className={`relative first:ml-2 last:mr-2 md:first:ml-0 md:last:mr-0 flex py-2 px-4 items-center justify-center cursor-pointer rounded-full text-white shadow-[0_4px_0_rgba(0,0,0)] transition duration-150
                    ${
                      isActive
                        ? "font-bold"
                        : "font-light opacity-95 hover:opacity-80"
                    }
                    bg-[#1b464a]`}
                  style={{ zIndex: 1 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="cat-pill"
                      className="absolute inset-0 rounded-full bg-teal-700"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                      }}
                      aria-hidden
                    />
                  )}
                  <span className="relative">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT: CATEGORY CONTENT */}
          <div className="flex flex-col p-4">
            <motion.h2
              key={`title-${activeCategory}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 0.7, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: prefersReduced ? 0 : 0.2 }}
              className="text-2xl font-bold"
            >
              {visibleItems[0]?.category}
            </motion.h2>

            <motion.div
              layout
              className="grid grid-cols-[2.5fr_1fr_1fr] md:grid-cols-[5fr_1fr_1fr] items-center mb-4 font-bold"
            >
              <div className="w-full border-t-2 border-black border-dotted" />
              <div className="text-end mr-1">
                <span className="inline md:hidden">1</span>
                <span className="hidden md:inline">{t[language].one}</span>
              </div>
              <div className="text-end">
                <span className="inline md:hidden">½</span>
                <span className="hidden md:inline">{t[language].half}</span>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="contents"
              >
                {visibleItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id ?? `${item.category}-${item.foodItem}`}
                    variants={itemVariants}
                    className="grid grid-cols-[2.5fr_1fr_1fr] md:grid-cols-[5fr_1fr_1fr] mb-1 font-light hover:font-medium cursor-pointer md:text-lg"
                    whileHover={{ scale: prefersReduced ? 1 : 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <div>{item.foodItem}</div>

                    <div className="flex justify-end items-end">
                      <div className="text-xs mr-1 font-medium">
                        {item.sizeOne !== "1" && item.sizeOne}
                      </div>
                      <div>€{item.priceOne}</div>
                    </div>

                    <div className="flex justify-end items-end">
                      <div className="text-xs mr-1 font-medium">
                        {item.sizeHalf !== "½" && item.sizeHalf}
                      </div>
                      <div>
                        {item.priceHalf ? "€" : ""}
                        {item.priceHalf}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
