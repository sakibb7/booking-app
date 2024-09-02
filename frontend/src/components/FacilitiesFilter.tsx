import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function HotelFacilities({
  selectedFacilities,
  onChange,
}: Props) {
  return (
    <div className="border border-slate-300 pb-5">
      <h4 className="text-2x font-semibold">Hotel facilities</h4>
      {hotelFacilities.map((facility, idx) => (
        <label htmlFor="" key={idx}>
          <input
            type="checkbox"
            className="rounded"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
}
