import Footer from "../components/global/Footer";
import Header from "../components/global/Header";
// import SearchBar from "../components/SearchBar";
import { useAppContext } from "../context/AppContext";

export default function Layouts({ children }: { children: React.ReactNode }) {
  const { isPending } = useAppContext();
  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Header />
      <div className="container">{/* <SearchBar /> */}</div>
      {children}
      <Footer />
    </>
  );
}
