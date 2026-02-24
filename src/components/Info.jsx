import { useRef, useEffect } from "react";
import arrow from "../assets/icons8-arrow-30.png";

const foodItems = [
  { id: "BBQ pork souvla", url: "BBQ_pork_souvla.webp" },
  { id: "Moussaka", url: "Moussaka.webp" },
  { id: "Pork streaky bacon", url: "Pork_streaky_bacon.webp" },
  { id: "Bulgur wheat", url: "Bulgur_wheat.webp" },
  { id: "Chicken Korma", url: "Chicken_Korma.webp" },
  { id: "Tahini", url: "Tahini.webp" },
  { id: "Whole barbeque chicken", url: "Whole_barbeque_chicken.webp" },
  {
    id: "Potatoes with wine & coriander",
    url: "Potatoes_with_wine_&_coriander.webp",
  },
  { id: "Pork diane", url: "Pork_diane.webp" },
  { id: "Peas", url: "Peas.webp" },
  { id: "Beans in tomato sauce", url: "Beans_in_tomato_sauce.webp" },
  { id: "Fried mushrooms", url: "Fried_mushrooms.webp" },
  { id: "Village salad", url: "Village_salad.webp" },
  { id: "Sea bream", url: "Sea_bream.webp" },
  { id: "Pork souvlaki", url: "Pork_souvlaki.webp" },
  { id: "Koupepia", url: "Koupepia.webp" },
  { id: "Dry black eyed beans", url: "Dry_black_eyed_beans.webp" },
  { id: "Pork chop", url: "Pork_chop.webp" },
];

export default function Info() {
  const scrollContainerRef = useRef(null);
  const pauseRef = useRef(false); // paused during hover/drag
  const rafRef = useRef(null); // requestAnimationFrame id
  const stateRef = useRef({
    isDragging: false,
    startX: 0,
    scrollLeftStart: 0,
    pointerId: null,
  });

  // ==== auto-scroll loop ====
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const pxPerSecond = 60; // adjust speed here
    let lastTs = 0;

    const loop = (ts) => {
      if (!lastTs) lastTs = ts;
      const dt = ts - lastTs;
      lastTs = ts;

      const { isDragging } = stateRef.current;
      if (!pauseRef.current && !isDragging) {
        container.scrollLeft += (pxPerSecond * dt) / 1000;
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll - 1) {
          container.scrollLeft = 0; // loop back to start
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ==== pointer/hover handlers (works for mouse + touch + pen) ====
  const handlePointerEnter = () => {
    pauseRef.current = true; // pause auto-scroll on hover
  };

  const handlePointerLeave = () => {
    // if drag leaves the container, end it and resume scrolling
    const container = scrollContainerRef.current;
    const st = stateRef.current;
    if (st.isDragging && st.pointerId !== null && container) {
      try {
        container.releasePointerCapture(st.pointerId);
      } catch {
        /* empty */
      }
    }
    stateRef.current.isDragging = false;
    stateRef.current.pointerId = null;
    pauseRef.current = false;
  };

  const handlePointerDown = (e) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // allow dragging without browser scroll interfering
    container.setPointerCapture?.(e.pointerId);

    pauseRef.current = true;
    stateRef.current.isDragging = true;
    stateRef.current.pointerId = e.pointerId;
    stateRef.current.startX = e.pageX - container.offsetLeft;
    stateRef.current.scrollLeftStart = container.scrollLeft;
  };

  const handlePointerMove = (e) => {
    const container = scrollContainerRef.current;
    const st = stateRef.current;
    if (!container || !st.isDragging) return;

    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - st.startX) * 1; // multiplier = scroll sensitivity
    container.scrollLeft = st.scrollLeftStart - walk;
  };

  const endDrag = () => {
    const container = scrollContainerRef.current;
    const st = stateRef.current;
    if (container && st.pointerId !== null) {
      try {
        container.releasePointerCapture(st.pointerId);
      } catch {
        /* empty */
      }
    }
    stateRef.current.isDragging = false;
    stateRef.current.pointerId = null;
    pauseRef.current = false; // resume auto-scroll after interaction
  };

  const handlePointerUp = () => endDrag();
  const handlePointerCancel = () => endDrag();

  return (
    <>
      <div className=" flex flex-col gap-4 md:gap-12 py-16 px-2 items-center">
        <div className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-2xl shadow md:h-[400px] flex flex-col md:flex-row">
          <img
            src="/foodimages/Pastitsio.webp"
            alt="Pastitsio"
            className="w-full md:w-1/2 h-56 md:h-auto object-cover object-center"
            loading="lazy"
          />

          <div className="w-full md:w-1/2 bg-khaki p-6 md:p-8 flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-extrabold">ABOUT US</h1>
            <p className="mt-4 text-sm md:text-base leading-relaxed ">
              Founded in 2000, Kapatsos has become a favorite destination for
              food lovers in Limassol. For over two decades, we have proudly
              served our guests a wide variety of dishes through our generous
              buffet, offering something for every taste and occasion. <br />{" "}
              Our passion and experience lie in Cypriot cuisine, and we are
              dedicated to sharing the authentic flavors and traditions of our
              island with every visitor. Whether you are a local or a traveler
              discovering Cyprus, our goal is to make you feel at home and give
              you a memorable experience.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-2xl shadow md:h-[400px] flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-1/2 bg-khaki p-6 md:p-8 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-extrabold">OUR FOOD</h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed ">
              At Kapatsos, food is more than just a meal — it is a celebration
              of Cypriot culture. Our buffet highlights the very best of the
              Cypriot kitchen, from timeless recipes passed down through
              generations to dishes prepared with a modern touch.
              <br />
              While our heart belongs to Cyprus, our buffet also offers a
              variety of Mediterranean and international flavors. This way,
              every guest can discover something they love — whether it’s a
              traditional Cypriot specialty or a new taste from abroad.
            </p>
          </div>
          <img
            src="/foodimages/Keftedes.webp"
            alt="Keftedes"
            className="w-full md:w-1/2 h-56 md:h-auto object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>

      <h2 className="text-center text-3xl md:text-5xl font-bold">
        Dive Into Our Delicious Dishes
      </h2>

      <div className="flex justify-center items-center gap-1 mb-6 font-light">
        <p>Drag to scroll </p>
        <img src={arrow} alt="Scroll arrow" className="h-4" loading="lazy" />
      </div>

      <div
        ref={scrollContainerRef}
        className="no-scrollbar flex flex-nowrap gap-6 overflow-x-auto cursor-grab select-none items-center"
        style={{ touchAction: "none" }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave} // optional polish: ensures drag doesn't get stuck
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {foodItems.map((item, i) => (
          <div
            key={item.id}
            className={`relative p-2 flex items-end justify-end text-white text-xs md:text-sm ${
              i % 2 === 1
                ? "size-[200px] md:size-[400px]"
                : "size-[150px] md:size-[300px]"
            } shrink-0 rounded-lg border border-gray-500`}
          >
            <img
              src={`/foodimages/${item.url}`}
              alt={item.id}
              className="absolute inset-0 h-full w-full object-cover rounded-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
            <span className="relative z-10 [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">{item.id}</span>
          </div>
        ))}
      </div>
    </>
  );
}
