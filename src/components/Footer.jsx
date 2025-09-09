import kapatsoslogo from "../assets/kapatsoslogo.png";

function Footer() {
  return (
    <div className="w-full  bg-[#1b464a] mt-32 flex flex-col items-center text-center gap-10 py-10 p-2 ">
      <img
        src={kapatsoslogo}
        alt="Kapatsos logo"
        className="h-30"
        loading="lazy"
      />
      <div>
        PSISTARIES KAPATSOS | Georgiou Griva Digeni 46, Limassol 3101, Cyprus |
        <span>+357 25 585897</span>
      </div>
    </div>
  );
}

export default Footer;
