"use client";
import {ColorProps} from "@/types/colorTypes";
import {getColor} from "@/lib/colors";
import Image from "next/image";
import plus from "@/public/plus.svg";
import visibility from "@/public/visibility.svg";
import {useContext} from "react";
import {ColorsContext} from "@/app/contexts/ColorsContext";

const ColorCard = ({color}: { color?: ColorProps }) => {
  const {setSelectedColor, setLoading} = useContext(ColorsContext);

  const handleDetailsColor = async (colorName: string, colorGroup: string) => {
    if (colorGroup !== "Custom") {
      setLoading(true);
      const data = await getColor(colorName);
      data && setSelectedColor(data.data);
      setLoading(false);
    } else {
      color && setSelectedColor(color);
    }
  };

  const handleAddColor = () => setSelectedColor({name: "", hex: "", group: ""});

  return (
    color ?
      <li key={color.name} className="flex justify-center">
        <div className="group flex flex-col items-center gap-y-2 cursor-pointer"
             onClick={handleDetailsColor.bind(null, color.name.toLowerCase(), color.group)}>
          <div className="relative p-2 border-2 border-white rounded-full">
            <span className="block w-16 h-16 rounded-full group-hover:!bg-gray-500 duration-200 xl:w-28 xl:h-28"
                style={{backgroundColor: `#${color.hex}`}}/>
            <Image
              priority
              src={visibility}
              className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-8 opacity-0 group-hover:opacity-100 duration-200 xl:w-14"
              alt="See Color Details"
            />
          </div>
          <p className="font-semibold break-all text-center xl:text-xl">{color.name}</p>
          <p className="font-semibold xl:text-lg">#{color.hex}</p>
        </div>
      </li>
      :
      <li
        className="group flex flex-col items-center gap-y-2 cursor-pointer"
        onClick={handleAddColor}
      >
        <div className="relative p-2 border-2 border-white rounded-full">
          <span className="block w-16 h-16 rounded-full bg-white group-hover:bg-gray-500 duration-200 xl:w-28 xl:h-28"/>
          <Image
            priority
            src={plus}
            className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-8 xl:w-14"
            alt="Plus"
          />
        </div>
        <p className="font-semibold text-lg">Add new Custom Color</p>
      </li>
  );
}

export default ColorCard;