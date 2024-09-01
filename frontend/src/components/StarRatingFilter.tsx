type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StarRatingFilter({ selectedStars, onChange }: Props) {
  return (
    <div className="border border-slate-300 pb-5">
      <h4 className="text-2x font-semibold">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star, idx) => (
        <label htmlFor="" key={idx}>
          <input
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <span>{star} Stars</span>
        </label>
      ))}
    </div>
  );
}
