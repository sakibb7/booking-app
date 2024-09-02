type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

export default function PriceFilter({ selectedPrice, onChange }: Props) {
  return (
    <div>
      PriceFilter
      <select
        value={selectedPrice}
        onChange={(e) => {
          onChange(e.target.value ? parseInt(e.target.value) : undefined);

          console.log(e.target.value);
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
