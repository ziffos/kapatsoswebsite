import React from "react";
import kapatsoslogo from "../assets/kapatsoslogo.png";

function Footer() {
  return (
    <div className="w-full  bg-[#1b464a] mt-32 flex flex-col items-center text-center gap-10 py-10 p-2 ">
      <img src={kapatsoslogo} alt="" className="h-30" />
      <div>
        PSISTARIES KAPATSOS | Georgiou Griva Digeni 46, Limassol 3101, Cyprus |
        +357 25 585897
      </div>
    </div>
  );
}

export default Footer;
