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
    <div className="border border-slate-300 p-6 rounded-xl">
      <h4 className="text-lg text-neutral-900 font-semibold pb-3">
        Hotel facilities
      </h4>
      <div className=" flex flex-wrap justify-start items-center gap-3">
        {hotelFacilities.map((facility, idx) => (
          <label htmlFor="" key={idx}>
            <input
              type="checkbox"
              className="rounded"
              value={facility}
              checked={selectedFacilities.includes(facility)}
              onChange={onChange}
            />
            <span className="pl-2">{facility}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
