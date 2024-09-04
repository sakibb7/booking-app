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
    <div className="border border-slate-300 p-6 rounded-xl">
      <h4 className="text-lg text-neutral-900 font-semibold pb-3">
        Hotel Type
      </h4>
      <div className="flex flex-col justify-start items-start gap-3 ">
        {hotelTypes.map((type, idx) => (
          <label htmlFor="" key={idx}>
            <input
              type="checkbox"
              className="rounded"
              value={type}
              checked={selectedHotelTypes.includes(type)}
              onChange={onChange}
            />
            <span className="pl-2">{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
