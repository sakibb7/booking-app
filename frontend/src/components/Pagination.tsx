import { PiCaretLeft, PiCaretRight } from "react-icons/pi";

export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, pages, onPageChange }: Props) {
  const pageNumber = [];
  for (let i = 1; i <= pages; i++) {
    pageNumber.push(i);
  }
  return (
    <div className="pt-10">
      <ul className="flex justify-center items-center gap-4">
        <li>
          <button className="bg-slate-300 size-9 rounded-full text-xl flex justify-center items-center hover:bg-p1 hover:text-white duration-300">
            <PiCaretLeft />
          </button>
        </li>
        {pageNumber.map((number, idx) => (
          <li key={idx} onClick={() => onPageChange(number)}>
            <button
              className={`${
                page === number ? "bg-p1 text-white" : "bg-slate-300"
              }  size-9 rounded-full flex justify-center items-center hover:bg-p1 hover:text-white duration-300`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button className="bg-slate-300 size-9 rounded-full text-xl flex justify-center items-center hover:bg-p1 hover:text-white duration-300">
            <PiCaretRight />
          </button>
        </li>
      </ul>
    </div>
  );
}
