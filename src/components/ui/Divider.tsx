import "primeicons/primeicons.css";
import { Divider } from "primereact/divider";

export default function FancyDivider({ icon = "pi pi-star" }) {
  return (
    <Divider className=" mx-auto border rounded-full max-w-7xl bg-indigo-500 flex justify-center items-center ">
      <span
        className="flex items-center gap-2 px-4 py-1 
        shadow-sm"
      >
        <i className={`${icon} text-indigo-500`} />
      </span>
    </Divider>
  );
}
