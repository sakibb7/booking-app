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
    <div>
      <ul>
        {pageNumber.map((number, idx) => (
          <li
            key={idx}
            onClick={() => onPageChange(number)}
            className={`${page === number ? "" : ""}`}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
}
