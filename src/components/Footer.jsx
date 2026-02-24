function Footer() {
  return (
    <div className="w-full  bg-[#1b464a] mt-32 flex flex-col items-center text-center gap-10 py-10 p-2 ">
      <img
        src="/kapatsoslogo.webp"
        alt="Kapatsos logo"
        className="h-30"
        loading="lazy"
      />
      <div>
        PSISTARIES KAPATSOS |{" "}
        <a
          href="https://maps.app.goo.gl/Kapatsos"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Georgiou Griva Digeni 46, Limassol 3101, Cyprus
        </a>{" "}
        |{" "}
        <a href="tel:+35725585897" className="hover:underline">
          +357 25 585897
        </a>
      </div>
    </div>
  );
}

export default Footer;
