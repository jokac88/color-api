"use client";
import {useContext, useEffect, useState} from "react";
import {ColorsContext} from "@/app/contexts/ColorsContext";
import ColorCard from "@/app/colorCard";
import ColorModal from "@/app/colorModal";
import {ColorProps} from "@/types/colorTypes";
import Loading from "@/app/loading";

export default function ColorsGrid() {
  const {colors, selectedColor, filteredColors, filterName, isLoading} = useContext(ColorsContext);
  const [colorsList, setColorsList] = useState<ColorProps[]>(colors);

  useEffect(() => {
    setColorsList(colors);
  }, [colors]);

  useEffect(() => {
    setColorsList(filteredColors);
  }, [filteredColors]);

  return (
    <>
      {(!filterName || filterName === "Custom") && <ul className="flex justify-center">
        <ColorCard/>
      </ul>
      }
      <h2
        className="text-2xl font-semibold text-center">{!filterName ? "All Colors" : `${filterName} Group Colors`} {colorsList.length ? `(${colorsList.length})` : ""}</h2>
      {colorsList.length ? <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:gap-10">
          {colorsList.map(color => <ColorCard color={color} key={color.name}/>)}
        </ul>
        :
        <p className="text-lg text-center">
          {`The list of ${!filterName ? "All Colors" : `${filterName} Group Colors`} is currently
          empty.`}
        </p>
      }
      {isLoading && <Loading/>}
      {selectedColor && <ColorModal/>}
    </>
  );
}