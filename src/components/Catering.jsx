function Catering() {
  return (
    <div className=" flex flex-col  py-16 items-center px-2">
      <div className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-2xl shadow md:h-[400px] flex flex-col md:flex-row">
        <img
          src="/foodimages/Tortillas_with_chicken.webp"
          alt="Tortillas with chicken"
          className="w-full md:w-1/2 h-56 md:h-auto object-cover object-center"
          loading="lazy"
        />

        <div className="w-full md:w-1/2 bg-khaki p-6 md:p-8 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold">CATERING</h1>
          <p className="mt-4 text-sm md:text-base leading-relaxed ">
            Bring the taste of Kapatsos to your next event. We offer all of our
            dishes for larger orders, making it easy to enjoy our food outside
            the restaurant. Whether it’s company meals, school lunches, family
            gatherings, or big celebrations, we are here to make it special.
            <br /> Our team is happy to help you plan and choose the dishes that
            best fit your occasion, so you and your guests can enjoy a delicious
            and stress-free experience.
            <br />
            For orders send us an email to{" "}
            <span>
              <a href="mailto:info@kapatsos.com">info@kapatsos.com</a>
            </span>{" "}
            or call us on{" "}
            <span>
              <a href="tel:+35725585897">+357 25 585897</a>
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Catering;
