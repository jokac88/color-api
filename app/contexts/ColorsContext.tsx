"use client";
import {ColorProps} from "@/types/colorTypes";
import {createContext, ReactNode, useState} from "react";

type ColorsContextObj = {
  colors: ColorProps[];
  selectedColor: ColorProps | null,
  filteredColors: ColorProps[];
  filterName: string;
  isLoading: boolean;
  setSelectedColor: (color: ColorProps | null) => void;
  addColor: (name: string, hex: string, rgb: string) => void;
  removeColor: (name: string) => void;
  filteringColors: (filterName: string) => void;
  setLoading: (value: boolean) => void;
};

export const ColorsContext = createContext<ColorsContextObj>({
  colors: [],
  selectedColor: null,
  filteredColors: [],
  filterName: "",
  isLoading: false,
  setSelectedColor: () => {
  },
  addColor: () => {
  },
  removeColor: () => {
  },
  filteringColors: () => {
  },
  setLoading: () => {
  }
});

export const ColorsContextProvider = ({children, initialColors}: {
  children: ReactNode,
  initialColors: ColorProps[]
}) => {
  const [colors, setColors] = useState<ColorProps[]>(initialColors || []);
  const [selectedColor, setSelectedColor] = useState<ColorProps | null>(null);
  const [filterName, setFilterName] = useState<string>("");
  const [filteredColors, setFilteredColors] = useState<ColorProps[]>(colors || []);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setSelectedColorHandler = (color: ColorProps | null) => setSelectedColor(color);

  const addColorHandler = (name: string, hex: string, rgb: string) => {
    const newColors = [{name, hex, group: "Custom", rgb}, ...colors];
    setColors(newColors)

    if (filterName) {
      const filteredColors = newColors.filter(({group}) => group === filterName);
      setFilteredColors(filteredColors);
    }
  };

  const removeColorHandler = (colorName: string) => {
    let filteredColors = colors.filter(({name}) => name !== colorName);
    setColors(filteredColors);

    if (filterName) {
      filteredColors = filteredColors.filter(({group}) => group === filterName);
      setFilteredColors(filteredColors);
    }
  };

  const filteringColorsHandler = (filterNameProps: string) => {
    setFilterName(filterNameProps);

    if (filterNameProps) {
      const filteredColors = colors.filter(({group}) => group === filterNameProps);
      setFilteredColors(filteredColors);
    } else {
      setFilteredColors(colors);
    }
  };

  const setLoadingHandler = (value: boolean) => setIsLoading(value);

  const contextValue: ColorsContextObj = {
    colors,
    selectedColor,
    filteredColors,
    filterName,
    isLoading,
    setSelectedColor: setSelectedColorHandler,
    addColor: addColorHandler,
    removeColor: removeColorHandler,
    filteringColors: filteringColorsHandler,
    setLoading: setLoadingHandler
  };

  return (
    <ColorsContext.Provider value={contextValue}>
      {children}
    </ColorsContext.Provider>
  );
};

