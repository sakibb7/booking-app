import heroBgImg from "../../assets/images/hero-bg.jpg";

function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <section className=" container">
        <img src={heroBgImg} alt="" className="absolute inset-0" />
        <div className="bg-gray-950 opacity-30 absolute inset-0 z-10"></div>

        <div className="relative z-20 max-w-[500px]">
          <p className="text-5xl text-white font-bold">
            A piece of <span className="text-yellow-400">paradise</span> just
            for you
          </p>
          <p className="text-2xl text-white  pt-3">
            Book entire houses, villas, cabins and more
          </p>
        </div>
      </section>
    </section>
  );
}

export default HeroSection;
