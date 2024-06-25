import {toast} from "react-toastify";

export const getColors = async () => {
  try {
    const res = await fetch("https://www.csscolorsapi.com/api/colors");

    if (!res.ok) {
      toast.error("Failed to fetch colors.");
      throw new Error("Failed to fetch colors.");
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getColor = async (colorName: string) => {
  try {
    const res = await fetch(`https://www.csscolorsapi.com/api/colors/${colorName}`);

    if (!res.ok) {
      toast.error("Failed to fetch color.");
      throw new Error("Failed to fetch color.");
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
};