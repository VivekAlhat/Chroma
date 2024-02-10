import { X } from "lucide-react";
import nearestColor from "nearest-color";
import colorNames from "color-name-list";
import * as Popover from "@radix-ui/react-popover";

import ColorDetails from "./ColorDetails";

export default function ColorInfo({ color }: ColorInfoProps) {
  const { rgb, hex, percentage } = color;

  const colors = colorNames.reduce(
    (o, { name, hex }) => Object.assign(o, { [name]: hex }),
    {}
  );
  const nearest = nearestColor.from(colors);

  return (
    <Popover.Portal>
      <Popover.Content
        className="rounded p-5 w-[260px] bg-white text-secondary shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
        sideOffset={5}
      >
        <div className="flex flex-col gap-5">
          <p className="leading-[19px] font-bold mb-2.5">Color Details</p>
          <div
            className="h-[30px] w-full"
            style={{
              backgroundColor: `rgb(${rgb.R},${rgb.G},${rgb.B})`,
            }}
          />
          <ColorDetails name="Name" value={`${nearest(hex)?.name}`} />
          <ColorDetails name="RGB" value={`rgb(${rgb.R},${rgb.G},${rgb.B})`} />
          <ColorDetails name="Hex" value={`#${hex}`} />
          <ColorDetails name="Proportion" value={`${percentage}%`} />
        </div>
        <Popover.Close
          className="rounded-full m-2 h-[18px] w-[18px] inline-flex items-center justify-center absolute top-[5px] right-[5px] outline-none cursor-pointer"
          aria-label="Close"
        >
          <X />
        </Popover.Close>
        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  );
}
