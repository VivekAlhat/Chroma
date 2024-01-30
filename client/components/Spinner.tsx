import { MagicSpinner } from "react-spinners-kit";

export default function Spinner() {
  return (
    <div className="h-[500px] flex flex-col items-center justify-center gap-4">
      <MagicSpinner />
      <p className="text-lg">Generating Palettes</p>
    </div>
  );
}
