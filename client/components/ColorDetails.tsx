export default function ColorDetails({ name, value }: ColorDetailsProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="font-semibold">{name}</p>
      <p>{value}</p>
    </div>
  );
}
