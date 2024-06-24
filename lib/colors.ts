export const getColors = async () => {
  const res = await fetch("https://www.csscolorsapi.com/api/colors");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getColor = async (colorName: string) => {
  const res = await fetch(`https://www.csscolorsapi.com/api/colors/${colorName}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};