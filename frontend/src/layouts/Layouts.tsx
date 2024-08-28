import Header from "../components/global/Header";
import SearchBar from "../components/SearchBar";

export default function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="container">
        <SearchBar />
      </div>
      {children}
    </>
  );
}
