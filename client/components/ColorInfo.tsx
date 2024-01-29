import { X } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";

export default function ColorInfo({ color }: ColorInfoProps) {
  const { rgb, hex, percentage } = color;

  return (
    <Popover.Portal>
      <Popover.Content
        className="rounded p-5 w-[260px] bg-white text-secondary shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
        sideOffset={5}
      >
        <div className="flex flex-col gap-5">
          <p className="leading-[19px] font-bold mb-2.5">Color Details</p>
          <div
            className="h-[30px] w-full"
            style={{
              backgroundColor: `rgb(${rgb.R},${rgb.G},${rgb.B})`,
            }}
          ></div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">RGB</p>
            <p>
              rgb({rgb.R},{rgb.G},{rgb.B})
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Hex</p>
            <p>{hex}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Proportion</p>
            <p>{percentage}%</p>
          </div>
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
