"use client";
import {useContext} from "react";
import {ColorsContext} from "@/app/contexts/ColorsContext";
import Image from "next/image";
import close from "@/public/close.svg";
import bin from "@/public/bin.svg";
import {AddColor} from "@/app/addColor";

export const ColorModal = () => {
  const {selectedColor, setSelectedColor, removeColor} = useContext(ColorsContext);
  const onClose = () => setSelectedColor(null);

  const onRemoveColor = (colorName: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${colorName} color?`);

    if (confirmed) {
      removeColor(colorName);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="relative p-4 w-[400px] rounded-md bg-black">
        <button onClick={onClose} className="absolute top-[15px] right-[15px]">
          <Image
            priority
            src={close}
            className="w-8"
            alt="Close Modal"
          />
        </button>
        {selectedColor?.name ?
          <>
            <h1 className="mb-4 text-xl text-center">Selected Color:</h1>
            <div className="flex flex-col items-center gap-y-2">
              <h2 className="text-lg font-bold">{selectedColor?.name}</h2>
              <div style={{backgroundColor: `#${selectedColor?.hex}`}} className="w-32 h-32"></div>
              <p className="font-bold">#{selectedColor?.hex}</p>
              <p>rgb({selectedColor?.rgb})</p>
              <p>Group: {selectedColor?.group}</p>
              <p>Theme: {selectedColor?.theme}</p>
            </div>
            <div className="text-center">
              <button onClick={selectedColor ? onRemoveColor.bind(null, selectedColor.name) : undefined}
                      className="mt-3 px-4 py-2 rounded bg-red-500 transition-[background-color] duration-[0.5s] hover:bg-red-700">
                <Image
                  priority
                  src={bin}
                  className="w-8"
                  alt="Delete Color"
                />
              </button>
            </div>
          </>
          :
          <AddColor/>
        }
      </div>
    </div>
  );
}