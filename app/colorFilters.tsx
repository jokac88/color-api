"use client";
import {useContext, useEffect, useState} from "react";
import {ColorsContext} from "@/app/contexts/ColorsContext";
import Image from "next/image";
import test from "@/public/next.svg";
import {ColorProps} from "@/types/colorTypes";

export const ColorFilters = ({colorGroups}: { colorGroups: string[] }) => {
  const {colors, filterColors} = useContext(ColorsContext);
  const [filterName, setFilterValue] = useState<string>('');
  const [customColorsGroup, setCustomColorsGroup] = useState<boolean>(false)

  useEffect(() => {
    const customColor = colors.find(({group}) => group === 'custom')
    setCustomColorsGroup(!!customColor);
  }, [colors]);

  const handleFilterColors = (name: string) => {
    const filterValue = name === filterName ? '' : name;
    setFilterValue(filterValue);
    filterColors(filterValue);
  };

  return (
    <>
      <h1 className="text-2xl font-bold uppercase mb-3">Color Filters</h1>
      <div className="p-3 border-2 rounded">
        <p className="text-xl font-bold mb-5">Group Colors</p>
        <ul className="flex flex-col gap-y-4">
          {colorGroups.map(group => (
            <li key={group}>
              <button
                onClick={handleFilterColors.bind(null, group)}
                className={`group flex items-center gap-x-3 transition-[font-weight] duration-200 ${filterName === group ? 'font-bold' : 'font-normal'}`}>
                <div
                  className={`p-1 border-2 border-solid border-transparent rounded-full transition-[border-color] duration-200 group-hover:border-white ${filterName === group ? 'border-white' : ''}`}
                >
                  <span className="block w-6 h-6 rounded-full" style={{backgroundColor: group}}/>
                </div>
                <p className="uppercase">{group}</p>
              </button>
            </li>
          ))}
          {customColorsGroup && <li>
            <button
                onClick={handleFilterColors.bind(null, 'custom')}
                className={`flex items-center gap-x-3 transition-[font-weight] duration-200 ${filterName === 'custom' ? 'font-bold' : 'font-normal'}`}>
              <div
                  className={`p-1 border-2 border-solid rounded-full transition-[border-color] duration-200 ${filterName === 'custom' ? 'border-white' : 'border-transparent'}`}
              >
                <span className="block w-6 h-6 rounded-full" style={{backgroundColor: 'custom'}}/>
              </div>
              <p className="uppercase">Custom Colors</p>
            </button>
          </li>
          }
        </ul>
      </div>
      {/*<div className="p-3 border-2 rounded">*/}
      {/*  <p className="mb-2">Theme colors</p>*/}
      {/*  <ul className="flex flex-col gap-y-3">*/}
      {/*    <button className="flex items-center gap-x-2">*/}
      {/*      <Image*/}
      {/*        priority*/}
      {/*        src={test}*/}
      {/*        alt="Follow us on Twitter"*/}
      {/*      />*/}
      {/*      <p>Light</p>*/}
      {/*    </button>*/}
      {/*    <button className="flex items-center gap-x-2">*/}
      {/*      <p>Dark</p>*/}
      {/*    </button>*/}
      {/*  </ul>*/}
      {/*</div>*/}
    </>
  )
}