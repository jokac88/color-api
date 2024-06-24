"use client";
import {useFormStatus} from "react-dom";
import {useContext, useState, ChangeEvent, FormEvent} from "react";
import {ColorFormSubmit} from "@/app/colorFormSubmit";
import {ColorsContext} from "@/app/contexts/ColorsContext";

export const AddColor = () => {
  const {pending} = useFormStatus();
  const {addColor, setSelectedColor} = useContext(ColorsContext);

  const [colorName, setColorName] = useState<string>('');
  const [colorHex, setColorHex] = useState<string>('');
  const handleColorName = (event: ChangeEvent<HTMLInputElement>) => setColorName(event.target.value);
  const handleColorHex = (event: ChangeEvent<HTMLInputElement>) => setColorHex(event.target.value);


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    addColor(colorName, colorHex);
    setSelectedColor(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
      <h1 className="text-xl text-center">Add New Color</h1>
      <input
        type="text"
        className="p-2 text-black border border-slate-300 rounded-md focus:outline-none placeholder:italic placeholder:text-slate-400"
        onChange={handleColorName} placeholder="Color Name" required
      />
      <input
        type="text"
        className="p-2 text-black placeholder:italic placeholder:text-slate-400 p-1 border border-slate-300 rounded-md focus:outline-none"
        onChange={handleColorHex} placeholder="Color HEX" required
      />
      <button
        className="px-4 py-2 rounded-md bg-blue-500 font-semibold transition-[background-color] duration-[0.5s] hover:bg-blue-700 disabled:bg-neutral-900 disabled:cursor-not-allowed">
        Add Color
      </button>
    </form>
  );
}