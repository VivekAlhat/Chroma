import WigglyLines from "@/components/Wiggly";
import Arrow from "@/components/Arrow";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <div className="max-w-2xl my-12 mx-auto flex flex-col text-center items-center gap-6">
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
        <Image
          src="/example.png"
          alt="preview"
          width={3000}
          height={3000}
          className="w-full md:h-[450px] object-cover rounded-md"
          priority
        />
      </div>
    </section>
  );
}
