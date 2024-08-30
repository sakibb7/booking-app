import { useSearchContext } from "../context/SearchContext";

export default function SearchPage() {
  const search = useSearchContext();
  console.log(search);
  return <div>SearchPage</div>;
}
