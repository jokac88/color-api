import {ColorProps} from "@/types/colorTypes";
import {getColors} from "@/lib/colors";
import {ColorFilters} from "@/app/colorFilters";
import {ColorsGrid} from "@/app/colorsGrid";
import {ColorsContextProvider} from "@/app/contexts/ColorsContext";
import {AddColor} from "@/app/addColor";
import {Suspense} from "react";
import Loading from "@/app/loading";

async function Colors({colors}: { colors: ColorProps[] }) {
  const colorGroups = Array.from(new Set(colors.map(({group}: { group: string }) => group)));
  const sortedColorGroups = colorGroups.sort((a, b) => a < b ? -1 : 1);

  return (
    <section className="flex gap-x-10">
      <aside className="sticky top-0 h-screen min-w-[300px]">
        <ColorFilters colorGroups={sortedColorGroups}/>
      </aside>
      <main className="flex flex-col flex-1 gap-y-12">
        <ColorsGrid/>
      </main>
    </section>
  );
}

export default async function Home() {
  const {colors}: { colors: ColorProps[] } = await getColors();

  const handleClose = () => {
    console.log('true')
  }

  return (
    <ColorsContextProvider initialColors={colors}>
      <section className="grid gap-y-10 mx-auto max-w-7xl py-10">
        <header className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">Welcome to the Colors API Application.</h1>
          {/*<AddColor/>*/}
        </header>
        <Suspense fallback={<Loading/>}>
          <Colors colors={colors}/>
        </Suspense>
      </section>
    </ColorsContextProvider>
  );
}
