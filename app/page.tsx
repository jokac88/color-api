import {ColorProps} from "@/types/colorTypes";
import {getColors} from "@/lib/colors";
import ColorFilters from "@/app/colorFilters";
import ColorsGrid from "@/app/colorsGrid";
import {ColorsContextProvider} from "@/app/contexts/ColorsContext";
import {Suspense} from "react";
import Loading from "@/app/loading";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function Colors({colors}: { colors: ColorProps[] }) {
  const colorGroups = Array.from(new Set(colors?.map(({group}: { group: string }) => group)));
  const sortedColorGroups = colorGroups.sort((a, b) => a < b ? -1 : 1);

  return (
    <section
      className="h-full flex flex-col pt-5 px-5 lg:grid lg:grid-cols-3 lg:max-w-7xl lg:mx-auto lg:items-start lg:gap-10 lg:p-10">
      <header className="lg:col-span-3">
        <h1 className="font-bold text-2xl text-center xl:text-3xl">Welcome to the Colors API Application.</h1>
      </header>
      <aside className="lg:sticky lg:top-0 lg:h-fit lg:min-w-[300px]">
        <ColorFilters colorGroups={sortedColorGroups}/>
      </aside>
      <main
        className="flex flex-col flex-1 overflow-y-auto gap-y-10 p-5 my-5 bg-slate-800 rounded shadow-md lg:col-span-2 lg:mb-0">
        <ColorsGrid/>
      </main>
    </section>
  );
}

export default async function Home() {
  const data = await getColors();

  return (
    <ColorsContextProvider initialColors={data?.colors}>
      <Suspense fallback={<Loading/>}>
        <Colors colors={data?.colors}/>
      </Suspense>
      <ToastContainer
        position="bottom-left"
        theme="dark"
        className="!p-3 xl:!p-0"
      />
    </ColorsContextProvider>
  );
}
