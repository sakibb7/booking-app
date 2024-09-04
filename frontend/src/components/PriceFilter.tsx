type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

export default function PriceFilter({ selectedPrice, onChange }: Props) {
  return (
    <div className="border border-slate-300 p-6 rounded-xl">
      <h4 className="text-lg text-neutral-900 font-semibold pb-3">
        Your budget (per night)
      </h4>
      <select
        value={selectedPrice}
        onChange={(e) => {
          onChange(e.target.value ? parseInt(e.target.value) : undefined);
        }}
      >
        <option value="">Select Max Price</option>{" "}
        {[50, 100, 150, 200, 250, 300].map((price, idx) => (
          <option value={price} key={idx}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
}
