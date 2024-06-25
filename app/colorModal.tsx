"use client";
import {useContext} from "react";
import {ColorsContext} from "@/app/contexts/ColorsContext";
import Image from "next/image";
import close from "@/public/close.svg";
import bin from "@/public/bin.svg";
import AddColor from "@/app/addColor";
import {toast} from "react-toastify";

export default function ColorModal() {
  const {selectedColor, setSelectedColor, removeColor} = useContext(ColorsContext);

  const onRemoveColor = (colorName: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${colorName} color?`);

    if (confirmed) {
      removeColor(colorName);
      onClose();
      toast.success("You successfully deleted color.");
    }
  };

  const onClose = () => setSelectedColor(null);

  return (
    <div className="fixed p-5 h-full inset-0 flex justify-center items-center bg-gray-700 bg-opacity-70">
      <div className="relative p-4 w-[450px] rounded bg-gray-900 shadow-md">
        <button onClick={onClose} className="group absolute top-[15px] right-[15px]">
          <Image
            priority
            src={close}
            className="w-6 duration-200 group-hover:opacity-80"
            alt="Close Modal"
          />
        </button>
        {selectedColor?.name ?
          <>
            <h1 className="mb-4 font-semibold text-xl text-center">Selected Color:</h1>
            <div className="flex flex-col items-center gap-y-2">
              <h2 className="text-lg font-bold">{selectedColor?.name}</h2>
              <div className="p-2 border-2 rounded">
                <div className="w-32 h-32 rounded"
                     style={{backgroundColor: `#${selectedColor?.hex}`}}/>
              </div>
              <p className="font-bold">#{selectedColor?.hex}</p>
              <p>rgb({selectedColor?.rgb})</p>
              <p>Group: {selectedColor?.group}</p>
              {selectedColor?.theme && <p>Theme: <span className="capitalize">{selectedColor?.theme}</span></p>}
            </div>
            <div className="text-center">
              <button onClick={selectedColor ? onRemoveColor.bind(null, selectedColor.name) : undefined}
                      className="mt-3 px-4 py-2 rounded bg-red-500 transition-[background-color] duration-200 hover:bg-red-600">
                <Image
                  priority
                  src={bin}
                  className="w-6"
                  alt="Remove Color"
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