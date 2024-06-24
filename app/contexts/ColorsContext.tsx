"use client";
import {ColorProps} from "@/types/colorTypes";
import {createContext, ReactNode, useState} from "react";
import Color from "@/app/models/color";

type ColorsContextObj = {
  colors: ColorProps[];
  selectedColor: ColorProps | null,
  filteredColors: ColorProps[];
  setSelectedColor: (color: ColorProps | null) => void;
  addColor: (name: string, hex: string) => void;
  removeColor: (name: string) => void;
  filterColors: (filterName: string) => void;
};

export const ColorsContext = createContext<ColorsContextObj>({
  colors: [],
  selectedColor: null,
  filteredColors: [],
  setSelectedColor: () => {
  },
  addColor: () => {
  },
  removeColor: () => {
  },
  filterColors: () => {
  }
});

export const ColorsContextProvider = ({children, initialColors}: {
  children: ReactNode,
  initialColors: ColorProps[]
}) => {
  const [colors, setColors] = useState<ColorProps[]>(initialColors || []);
  const [selectedColor, setSelectedColor] = useState<ColorProps | null>(null);
  const [filterName, setFilterName] = useState<string>('');
  const [filteredColors, setFilteredColors] = useState<ColorProps[]>(colors || []);

  const setSelectedColorHandler = (color: ColorProps | null) => setSelectedColor(color);

  const addColorHandler = (name: string, hex: string) => {
    setColors((prevState) => [{name, hex, group: 'custom'}, ...prevState]);
  };

  const removeColorHandler = (colorName: string) => {
    let filteredColors = colors.filter(({name}) => name !== colorName);
    setColors(filteredColors);

    if (filterName) {
      filteredColors = filteredColors.filter(({group}) => group === filterName);
      setFilteredColors(filteredColors);
    }
  };

  const filterColorsHandler = (filterNameProps: string) => {
    setFilterName(filterNameProps);

    if (filterNameProps) {
      const filteredColors = colors.filter(({group}) => group === filterNameProps);
      setFilteredColors(filteredColors);
    } else {
      setFilteredColors(colors);
    }
  };

  const contextValue: ColorsContextObj = {
    colors,
    selectedColor,
    filteredColors,
    setSelectedColor: setSelectedColorHandler,
    addColor: addColorHandler,
    removeColor: removeColorHandler,
    filterColors: filterColorsHandler
  };

  return (
    <ColorsContext.Provider value={contextValue}>
      {children}
    </ColorsContext.Provider>
  );
};

