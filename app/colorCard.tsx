"use client";
import {ColorProps} from "@/types/colorTypes";
import {getColor} from "@/lib/colors";
import Image from "next/image";
import plus from "@/public/plus.svg";
import visibility from "@/public/visibility.svg";
import {useContext} from "react";
import {ColorsContext} from "@/app/contexts/ColorsContext";

export const ColorCard = ({color}: { color?: ColorProps }) => {
  const {setSelectedColor} = useContext(ColorsContext);

  const handleDetailsColor = async (colorName: string, colorGroup: string) => {
    if (colorGroup !== 'custom') {
      const {data}: { data: ColorProps } = await getColor(colorName);
      setSelectedColor(data);
    }

    color && setSelectedColor(color);
  };

  const handleAddColor = () => setSelectedColor({name: '', hex: '', group: ''});

  return (
    color ?
      <li
        key={color.name}
        className="group flex flex-col items-center gap-y-2 cursor-pointer"
        onClick={handleDetailsColor.bind(null, color.name.toLowerCase(), color.group)}
      >
        <div className="relative p-2 border-4 border-solid border-white rounded-full">
          <span className="block w-24 h-24 rounded-full group-hover:!bg-gray-500 duration-200" style={{backgroundColor: `#${color.hex}`}}/>
          <Image
            priority
            src={visibility}
            className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-14 opacity-0 group-hover:opacity-100 duration-200"
            alt="See Color Details"
          />
        </div>
        <p className="font-semibold">{color.name}</p>
        <p className="font-semibold">#{color.hex}</p>
      </li>
      :
      <li
        className="group flex flex-col items-center gap-y-2 cursor-pointer"
        onClick={handleAddColor}
      >
        <div className="relative p-2 border-4 border-solid border-white rounded-full">
          <span className="block w-24 h-24 rounded-full bg-white group-hover:bg-gray-500 duration-200"/>
          <Image
            priority
            src={plus}
            className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-16"
            alt="Add new color"
          />
        </div>
        <p className="font-medium">Add New Color</p>
      </li>
  );
}