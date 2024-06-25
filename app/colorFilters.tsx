"use client";
import {useContext, useState} from "react";
import {ColorsContext} from "@/app/contexts/ColorsContext";

const ColorFilters = ({colorGroups}: { colorGroups: string[] }) => {
  const {filteringColors} = useContext(ColorsContext);
  const [filterName, setFilterValue] = useState<string>("");

  const handleFilterColors = (name: string) => {
    const filterValue = name === filterName ? "" : name;
    setFilterValue(filterValue);
    filteringColors(filterValue);
  };

  return (
    <>
      <h2 className="mt-5 mb-3 font-bold text-xl uppercase lg:text-2xl">Color Filters</h2>
      <div className="px-2 py-4 border-2 rounded shadow-md">
        <h3 className="mb-3 font-bold text-center text-xl lg:text-2xl">Group Colors</h3>
        <ul className="grid grid-cols-6 gap-y-3 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-3">
          {colorGroups.map(group => (
            <li key={group} className="flex justify-center">
              <button
                onClick={handleFilterColors.bind(null, group)}
                className={`${filterName === group ? "font-bold" : "font-normal"} group flex flex-col items-center transition-[font-weight] duration-200`}>
                <div
                  className={`${filterName === group ? "border-white" : ""} p-1 border-2 border-transparent rounded-full transition-[border-color] lg:group-hover:border-white duration-200`}
                >
                  <span className="block w-6 h-6 rounded-full" style={{backgroundColor: group}}/>
                </div>
                <p className="text-xs uppercase xl:text-base">{group}</p>
              </button>
            </li>
          ))}
          <li className="flex justify-center">
            <button
              onClick={handleFilterColors.bind(null, "Custom")}
              className={`${filterName === "Custom" ? "font-bold" : "font-normal"} relative group flex flex-col items-center transition-[font-weight] duration-200`}>
              <div
                className={`${filterName === "Custom" ? "border-white" : ""} p-1 border-2 border-transparent rounded-full transition-[border-color] lg:group-hover:border-white duration-200`}>
                <span className="block w-6 h-6 rounded-full"
                      style={{
                        background: `conic-gradient(#e81877, #dd1d8c, #6d57b1, #2a78c1, #018dcb, 
                #bec900, #9ec80a, #71b93d, #35a48f, #018fca, 
                #c1cc00, #dfcd00, #f0cc00, #fd8c08, #f25c13, #e81877)`
                      }}/>
              </div>
              <p className="text-xs uppercase xl:text-base">Custom</p>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ColorFilters;