"use client";
import {useContext, useEffect, useState} from "react";
import {ColorsContext} from "@/app/contexts/ColorsContext";
import {ColorCard} from "@/app/colorCard";
import {ColorModal} from "@/app/colorModal";
import {ColorProps} from "@/types/colorTypes";

export const ColorsGrid = () => {
  const {colors, selectedColor, filteredColors} = useContext(ColorsContext);
  const [colorsList, setColorsList] = useState<ColorProps[]>(colors);

  useEffect(() => {
    setColorsList(colors);
  }, [colors]);

  useEffect(() => {
    setColorsList(filteredColors);
  }, [filteredColors]);

  return (
    <>
      <div className="flex justify-center">
        <ColorCard/>
      </div>
      <ul className="grid grid-cols-4 gap-12">
        {colorsList.map(color => <ColorCard color={color} key={color.name}/>)}
      </ul>
      {selectedColor && <ColorModal/>}
    </>
  );
}