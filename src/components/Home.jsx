import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import facebook from "../assets/icons8-facebook-96.png";
import instagram from "../assets/icons8-instagram-96.png";
import foody from "../assets/foody.png";
import wolt from "../assets/wolt.png";

import Navbar from "./Navbar";

const iconHover = { y: -2, scale: 1.12 };
const iconTap = { scale: 0.9 };
const deliveryHover = { y: -1, scale: 1.08 };
const deliveryTap = { scale: 0.92 };

function IconLink({ href, label, src, className, whileHover, whileTap }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={{ type: "spring", stiffness: 600, damping: 35 }}
      className="inline-flex"
    >
      <img
        src={src}
        alt={label}
        className={`${className} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded`}
      />
    </motion.a>
  );
}

const Home = () => {
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative h-screen w-full flex flex-col items-center text-white overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          style={{ y: yRange }}
          className="absolute inset-0 w-full h-[120%] z-0"
        >
          <img
            src="/foodimages/Stuffed_vegetables.webp"
            alt="Stuffed vegetables"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="flex justify-start w-full">
          <Navbar />
        </div>

        <div className="flex flex-col flex-grow items-center justify-center mb-22 z-10">
          <img
            src="/kapatsoslogo.webp"
            alt="Kapatsos logo"
            className="w-[230px] md:w-[300px] lg:w-[350px] mb-10 mt-4 drop-shadow-2xl"
          />
          <h1 className="text-4xl md:text-6xl font-bold [text-shadow:0_4px_24px_rgba(0,0,0,0.6)] mb-1 text-center">
            WELCOME TO KAPATSOS
          </h1>
          <h2 className="text-lg md:text-3xl [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] font-light mb-6">
            The largest rotisserie buffet in Cyprus
          </h2>

          {/* Social + Delivery icons with motion */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
            {/* Social */}
            <div className="flex gap-1">
              <IconLink
                href="https://www.facebook.com/betty.crispy.chicken"
                label="Facebook"
                src={facebook}
                className="h-[40px] drop-shadow-lg"
                whileHover={iconHover}
                whileTap={iconTap}
              />
              <IconLink
                href="https://www.instagram.com/betty.crispy.chicken"
                label="Instagram"
                src={instagram}
                className="h-[40px] drop-shadow-lg"
                whileHover={iconHover}
                whileTap={iconTap}
              />
            </div>

            <div className=" bg-white w-[29px] h-[1px] md:h-[29px] md:w-[1px] mx-2 shadow-lg" />

            {/* Delivery */}
            <div className="flex gap-2 mt-2 md:mt-0">
              <IconLink
                href="https://bit.ly/3VH7xXf"
                label="Order on Wolt"
                src={wolt}
                className="h-[27px] ml-1 md:ml-2 mr-1 md:mr-2 drop-shadow-lg"
                whileHover={deliveryHover}
                whileTap={deliveryTap}
              />
              <IconLink
                href="https://bit.ly/3ZW5roJ"
                label="Order on Foody"
                src={foody}
                className="h-[27px] drop-shadow-lg"
                whileHover={deliveryHover}
                whileTap={deliveryTap}
              />
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

export default Home;