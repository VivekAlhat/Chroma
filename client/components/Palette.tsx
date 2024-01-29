"use client";

import * as Popover from "@radix-ui/react-popover";
import ColorInfo from "@/components/ColorInfo";
import { useState } from "react";

export default function Palette({ palette }: PaletteProps) {
  const [selectedColor, setSelectedColor] = useState<Palette>();

  return (
    <div className="p-2">
      <div className="flex h-[50px] w-full">
        {palette.map((color, id) => (
          <Popover.Root key={id}>
            <Popover.Trigger asChild>
              <div
                className={`flex items-center justify-center text-white flex-auto cursor-pointer ${
                  id === 0 && "rounded-l-md"
                } ${id === palette.length - 1 && "rounded-r-md"}`}
                style={{
                  backgroundColor: `rgb(${color.rgb.R},${color.rgb.G},${color.rgb.B})`,
                  width: `${color.percentage}%`,
                }}
                onClick={() => setSelectedColor(color)}
              ></div>
            </Popover.Trigger>
            {selectedColor && <ColorInfo color={selectedColor} />}
          </Popover.Root>
        ))}
      </div>
    </div>
  );
}
