import React from "react";

function InfoTwo() {
  return (
    <div className="flex justify-center">
      <div className=" md:w-[1200px] flex flex-col md:flex-row items-center md:h-[400px] h-[550px] bg-khaki mt-8 rounded-2xl shadow ">
        <div className="md:w-[800px] p-8 flex flex-col items-center gap-8">
          <h1 className="md:text-2xl font-extrabold mb-4">CONTACT US</h1>
          <div className="flex justify-around w-full">
            <div className="text-center m-1">
              <h2 className="md:text-xl font-bold mb-2">CONTACT</h2>
              <p className="text-sm md:text-base font-light">
                <span>
                  <a href="tel:+35725585897">+357 25 585897</a>
                </span>{" "}
                <br />{" "}
                <span>
                  <a href="mailto:info@kapatsos.com">info@kapatsos.com</a>
                </span>
              </p>
            </div>
            <div className="text-center m-1">
              <h2 className="md:text-xl font-bold mb-2">ADDRESS</h2>
              <p className="text-sm md:text-base font-light">
                Georgiou Griva Digeni 46,
                <br /> Limassol 3101, Cyprus
              </p>
            </div>
          </div>
          <div className="text-center m-1">
            <h2 className="md:text-xl font-bold mb-2">OPENING HOURS</h2>
            <p className="text-sm md:text-base font-light">
              Open Daily (except Tuesdays)
              <br /> 10 am - 6 pm
            </p>
          </div>
        </div>

        <div className="bg-cover bg-center h-full w-full ">
          <iframe
            title="Kapatsos Griva Digeni"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.6065873130524!2d33.056714911323176!3d34.6898773728106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e73341a17b6c85%3A0xfee32fd7eeb63902!2sKapatsos!5e0!3m2!1sen!2sse!4v1755378406437!5m2!1sen!2sse"
            className="w-full h-full md:rounded-r-xl rounded-b-xl md:rounded-b-none md:rounded-br-xl "
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

export default InfoTwo;
