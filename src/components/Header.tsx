import { IoIosMoon } from "react-icons/io";

function Header() {
  return (
    <div className="flex justify-between items-center bg-slate-500 px-4 py-7 text-white">
      <div>
        <h1 className="text-xl font-semibold">The world</h1>
      </div>

      <div className="flex items-center gap-3">
        <IoIosMoon size={"1.5rem"} color={"white"} />
        <p>Dark Mode</p>
      </div>
    </div>
  );
}

export default Header;
