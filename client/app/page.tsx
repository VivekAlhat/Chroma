import WigglyLines from "@/components/Wiggly";
import Arrow from "@/components/Arrow";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <div className="max-w-2xl my-12 mb-8 mx-auto flex flex-col text-center items-center gap-6">
        <p className="text-5xl md:text-6xl tracking-normal font-black text-gray-300">
          Turn Pictures into
          <br />
          Color&nbsp;
          <span className="text-violet-500 relative z-50">
            Palettes
            <WigglyLines />
          </span>
        </p>
        <p className="text-xl text-gray-400">
          Unlock the potential of your images with Chroma. Effortlessly generate
          unique color palettes, turning your photos into a symphony of colors
          ready for creative use.
        </p>
        <Link href="/palette/generate">
          <button className="capitalize text-gray-300 text-lg bg-violet-700 hover:bg-violet-800 px-8 py-2 rounded-md">
            Try for free
          </button>
        </Link>
      </div>
      <div className="border border-dashed border-gray-500 rounded-md p-1 relative">
        <Arrow />
        <div
          style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
        >
          <iframe
            src="https://www.loom.com/embed/27cb3b52ab794cecb3691ab167bc8d8c?sid=f07d8fde-4fbb-490b-8acb-a61c897561f2"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </div>
      </div>
    </section>
  );
}
