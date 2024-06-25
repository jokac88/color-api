import Image from "next/image";
import spinner from "@/public/spinner.svg";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-start rounded overflow-hidden">
      <div className="w-full h-full bg-black opacity-50"/>
      <Image
        priority
        src={spinner}
        className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-20 xl:w-30"
        alt="Loader"
      />
    </div>
  );
};