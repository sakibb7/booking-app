import { hotelTypes } from "../config/hotel-options-config";

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function HotelTypeFilter({
  selectedHotelTypes,
  onChange,
}: Props) {
  return (
    <div className="border border-slate-300 pb-5">
      <h4 className="text-2x font-semibold">Hotel Type</h4>
      {hotelTypes.map((type, idx) => (
        <label htmlFor="" key={idx}>
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedHotelTypes.includes(type)}
            onChange={onChange}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
}
