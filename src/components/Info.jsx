import { useRef, useEffect } from "react";
import arrow from "../assets/icons8-arrow-30.png";

const foodItems = [
  { id: "BBQ pork souvla", url: "BBQ_pork_souvla.jpg" },
  { id: "Moussaka", url: "Moussaka.jpg" },
  { id: "Pork streaky bacon", url: "Pork_streaky_bacon.jpg" },
  { id: "Bulgur wheat", url: "Bulgur_wheat.jpg" },
  { id: "Chicken Korma", url: "Chicken_Korma.jpg" },
  { id: "Tahini", url: "Tahini.jpg" },
  { id: "Whole barbeque chicken", url: "Whole_barbeque_chicken.jpg" },
  {
    id: "Potatoes with wine & coriander",
    url: "Potatoes_with_wine_&_coriander.jpg",
  },
  { id: "Pork diane", url: "Pork_diane.jpg" },
  { id: "Peas", url: "Peas.jpg" },
  { id: "Beans in tomato sauce", url: "Beans_in_tomato_sauce.jpg" },
  { id: "Fried mushrooms", url: "Fried_mushrooms.jpg" },
  { id: "Village salad", url: "Village_salad.jpg" },
  { id: "Sea bream", url: "Sea_bream.jpg" },
  { id: "Pork souvlaki", url: "Pork_souvlaki.jpg" },
  { id: "Koupepia", url: "Koupepia.jpg" },
  { id: "Dry black eyed beans", url: "Dry_black_eyed_beans.jpg" },
  { id: "Pork chop", url: "Pork_chop.jpg" },
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
      } catch {}
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
      } catch {}
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
          <div
            className="w-full md:w-1/2 h-56 md:h-auto bg-cover bg-center"
            style={{ backgroundImage: "url('/foodimages/Pastitsio.jpg')" }}
            role="img"
            aria-label="Pastitsio"
          ></div>

          <div className="w-full md:w-1/2 bg-khaki p-6 md:p-8 flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-extrabold">ABOUT US</h1>
            <p className="mt-4 text-sm md:text-base leading-relaxed ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore a
              eius maxime amet asperiores, dolorum delectus aliquam in molestiae
              temporibus, nemo alias ducimus? Nostrum adipisci beatae
              voluptatibus libero molestiae maxime!Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dolore a eius maxime amet
              asperiores, dolorum delectus aliquam in molestiae temporibus, nemo
              alias ducimus? Nostrum adipisci beatae voluptatibus libero
              molestiae maxime!
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-2xl shadow md:h-[400px] flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-1/2 bg-khaki p-6 md:p-8 flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-extrabold">
              CYPRIOT KITCHEN
            </h1>
            <p className="mt-4 text-sm md:text-base leading-relaxed ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore a
              eius maxime amet asperiores, dolorum delectus aliquam in molestiae
              temporibus, nemo alias ducimus? Nostrum adipisci beatae
              voluptatibus libero molestiae maxime!Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dolore a eius maxime amet
              asperiores, dolorum delectus aliquam in molestiae temporibus, nemo
              alias ducimus? Nostrum adipisci beatae voluptatibus libero
              molestiae maxime!
            </p>
          </div>
          <div
            className="w-full md:w-1/2 h-56 md:h-auto bg-cover bg-center"
            style={{ backgroundImage: "url('/foodimages/Keftedes.jpg')" }}
            role="img"
            aria-label="Keftedes"
          ></div>
        </div>
      </div>

      <h2 className="text-center text-3xl md:text-5xl font-bold">
        Dive Into Our Delicious Dishes
      </h2>

      <div className="flex justify-center items-center gap-1 mb-6 font-light">
        <p>Drag to scroll </p>
        <img src={arrow} alt="" className="h-4" />
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
            className={`bg-cover bg-center p-2 flex items-end justify-end text-white text-xs md:text-sm ${
              i % 2 === 1
                ? "size-[200px] md:size-[400px]"
                : "size-[150px] md:size-[300px]"
            } shrink-0 rounded-lg border border-gray-500`}
            style={{ backgroundImage: `url(/foodimages/${item.url})` }}
          >
            {item.id}
          </div>
        ))}
      </div>
    </>
  );
}
