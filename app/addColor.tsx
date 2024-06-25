"use client";
import {useContext, useState, ChangeEvent, FormEvent} from "react";
import {ColorsContext} from "@/app/contexts/ColorsContext";
import {toast} from "react-toastify";

export default function AddColor() {
  const {colors, addColor, setSelectedColor} = useContext(ColorsContext);

  const [colorName, setColorName] = useState<string>("");
  const [colorHex, setColorHex] = useState<string>("");
  const [colorNameError, setColorNameError] = useState<boolean>(false);
  const [colorHexError, setColorHexError] = useState<boolean>(false);
  const handleColorName = (event: ChangeEvent<HTMLInputElement>) => {
    colorNameError && setColorNameError(false);
    setColorName(event.target.value);
  };

  const handleColorHex = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setColorHex(value.toUpperCase());
  };

  const hex2rgb = (hex: string) => {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 7), 16);

    return `${r},${g},${b}`;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const colorNameExist = colors.find(({name}) => name === colorName);

    if (colorNameExist) {
      return setColorNameError(true);
    }

    const hexRegExp = /^[0-9A-Fa-f]{6}$/;

    if (!hexRegExp.test(colorHex)) {
      return setColorHexError(true);
    }

    addColor(colorName, colorHex, hex2rgb(colorHex));
    setSelectedColor(null);

    toast.success("You successfully added Custom Color.");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
      <h1 className="font-semibold text-xl text-center">Add new Custom Color</h1>
      <div className="relative">
        <input
          type="text"
          className={`${colorNameError ? "border-red-500" : ""} w-full p-2 text-black border-gray-300 rounded font-medium focus:outline-none placeholder:italic placeholder:text-slate-400 duration-200`}
          onChange={handleColorName} placeholder="Color Name" required
        />
        {colorNameError &&
            <p className="absolute bottom-[-23px] text-sm text-red-500 duration-200">
              This color name already exists.
            </p>}
      </div>
      <div className="relative">
        <div className={`${colorHexError ? "border-red-500" : ""} flex border-gray-300 rounded overflow-hidden`}>
          <span className="flex items-center px-3 font-bold bg-gray-200 text-gray-600">#</span>
          <input
            type="text"
            className="w-full p-2 p-1 border-none text-black placeholder:italic placeholder:text-slate-400 font-medium focus:outline-none"
            minLength={6}
            maxLength={6}
            value={colorHex}
            onChange={handleColorHex} placeholder="Color HEX (RRGGBB)" required
          />
        </div>
        {colorHexError &&
            <p className="absolute bottom-[-23px] text-sm text-red-500 duration-200">
              Invalid HEX color code format.
            </p>}
      </div>
      <button
        className="px-4 py-2 rounded bg-blue-800 font-semibold transition-[background-color] duration-200 hover:bg-blue-900 disabled:bg-neutral-900 disabled:cursor-not-allowed">
        Add Color
      </button>
    </form>
  );
}