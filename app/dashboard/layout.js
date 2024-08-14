import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col gap-8 px-8 pb-8 max-md:px-4">
        <div className="sticky top-0 mt-5 ">
          <Header />
        </div>
        <div className="flex w-full">
          <Sidebar />
          {children}
        </div>
    </div>
  );
}
