function Catering() {
  return (
    <div className=" flex flex-col  py-16 items-center px-2">
      <div className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-2xl shadow md:h-[400px] flex flex-col md:flex-row">
        <div
          className="w-full md:w-1/2 h-56 md:h-auto bg-cover bg-center"
          style={{
            backgroundImage: "url('/foodimages/Tortillas_with_chicken.webp')",
          }}
          role="img"
          aria-label="Tortillas_with_chicken"
        ></div>

        <div className="w-full md:w-1/2 bg-khaki p-6 md:p-8 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold">CATERING</h1>
          <p className="mt-4 text-sm md:text-base leading-relaxed ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore a
            eius maxime amet asperiores, dolorum delectus aliquam in molestiae
            temporibus, nemo alias ducimus? Nostrum adipisci beatae voluptatibus
            libero molestiae maxime!Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolore a eius maxime amet asperiores, dolorum
            delectus aliquam in molestiae temporibus, nemo alias ducimus?
            Nostrum adipisci beatae voluptatibus libero molestiae maxime!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Catering;
