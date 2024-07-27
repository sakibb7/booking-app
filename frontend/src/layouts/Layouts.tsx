import Header from "../components/global/Header";

export default function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
