import Image from "next/image";
import NeonText from "../utils/NeonText";

const GGDay = () => {
  return (
    <section className="relative flex flex-col items-center justify-start px-8 py-12 lg:py-24 gap-y-4 lg:grid lg:grid-cols-2">
      <div
        style={{
          backgroundImage: "url(/assets/GGDay.png)",
          //   backgroundPosition: "left",
          //   backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="absolute inset-y-0 left-0 right-0 aspect-auto bg-no-repeat bg-center lg:bg-left blur-[2px]"
      ></div>
      <div className="absolute inset-0 bg-tertiary bg-gg-day lg:text-5xl z-0 opacity-70 lg:opacity-100"></div>
      <div className="lg:row-span-2 lg:h-full lg:grid lg:place-items-center">
        <h1
          data-text={"GG Day"}
          className="font-ranger lg:hidden text-center neon-text text-4xl z-10 relative before:contents lg:text-6xl w-content"
        >
          GG Day
        </h1>
        <div className="relative hidden lg:inline lg:text-7xl xl:text-9xl font-ranger text-center">
          <NeonText nofg>GG Day</NeonText>
        </div>
      </div>
      <h2 className="text-3xl lg:text-5xl font-bebas tracking-wide z-10">
        This 19th September @ IT KMITL
      </h2>
      <div className="z-10 col-start-2">
        <p className="font-kanit font-light text-sm lg:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ipsa
          recusandae molestiae sunt, esse incidunt quo aliquam aspernatur fugit
          ad id. Incidunt fugiat sunt ut quo libero officia obcaecati est? Lorem
          ipsum dolor sit amet consectetur?
        </p>
        <br />
        <p className="font-kanit font-light text-sm lg:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
          temporibus illum porro maiores officiis possimus debitis illo
          blanditiis quaerat quo. Modi placeat dolores facilis. Quam neque enim
          beatae distinctio nisi. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Animi cum aperiam excepturi beatae iure dicta iusto
          labore fugiat! Molestiae sed non doloremque possimus esse expedita
          totam aliquid tenetur quidem.
        </p>
      </div>
    </section>
  );
};

export default GGDay;
