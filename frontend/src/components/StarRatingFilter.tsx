type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StarRatingFilter({ selectedStars, onChange }: Props) {
  return (
    <div className="border border-slate-300 p-6 rounded-xl">
      <h4 className="text-lg text-neutral-900 font-semibold pb-3 ">
        Property Rating
      </h4>
      <div className="flex flex-col gap-3">
        {["5", "4", "3", "2", "1"].map((star, idx) => (
          <label htmlFor="" key={idx}>
            <input
              type="checkbox"
              className="rounded"
              value={star}
              checked={selectedStars.includes(star)}
              onChange={onChange}
            />
            <span className="pl-2">{star} Stars</span>
          </label>
        ))}
      </div>
    </div>
  );
}
