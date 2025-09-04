import { motion, MotionConfig } from "framer-motion";
import gemista from "../assets/Stuffed vegetables gray.jpg";
import kapatsoslogo from "../assets/kapatsoslogo.png";
import facebook from "../assets/icons8-facebook-96.png";
import instagram from "../assets/icons8-instagram-96.png";
import tiktok from "../assets/icons8-tiktok-96.png";
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
  return (
    <MotionConfig reducedMotion="user">
      <div
        style={{ backgroundImage: `url(${gemista})` }}
        className="h-screen w-full bg-cover bg-center flex flex-col items-center text-white"
      >
        <div className="flex justify-start">
          <Navbar />
        </div>

        <div className="flex flex-col flex-grow items-center justify-center mb-22">
          <img
            src={kapatsoslogo}
            alt="Kapatsos logo"
            className="w-[230px] md:w-[300px] lg:w-[350px] mb-10 mt-4"
          />
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-black drop-shadow-lg mb-1 text-center">
            WELCOME TO KAPATSOS
          </h1>
          <h2 className="text-lg md:text-3xl drop-shadow-black drop-shadow font-light">
            The largest rotisserie buffet in Cyprus
          </h2>

          <div className="bg-white h-[1px] w-[60px] m-3" />

          {/* Social + Delivery icons with motion */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Social */}
            <IconLink
              href="#"
              label="Facebook"
              src={facebook}
              className="h-[26px] md:h-[40px]"
              whileHover={iconHover}
              whileTap={iconTap}
            />
            <IconLink
              href="#"
              label="Instagram"
              src={instagram}
              className="h-[26px] md:h-[40px]"
              whileHover={iconHover}
              whileTap={iconTap}
            />
            <IconLink
              href="#"
              label="TikTok"
              src={tiktok}
              className="h-[26px] md:h-[40px]"
              whileHover={iconHover}
              whileTap={iconTap}
            />

            <div className="bg-white h-[29px] w-[1px] mx-2" />

            {/* Delivery */}
            <IconLink
              href="#"
              label="Order on Wolt"
              src={wolt}
              className="h-[20px] md:h-[27px] ml-1 md:ml-2 mr-1 md:mr-2"
              whileHover={deliveryHover}
              whileTap={deliveryTap}
            />
            <IconLink
              href="#"
              label="Order on Foody"
              src={foody}
              className="h-[20px] md:h-[27px]"
              whileHover={deliveryHover}
              whileTap={deliveryTap}
            />
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

export default Home;
