// Logo system type definitions
export type ImageKey = "image1" | "image2" | "image3" | "image4";
export type StyleId = "monogram" | "abstract" | "mascot" | "no-style";
export type StyleName = "Monogram" | "Abstract" | "Mascot" | "No Style";
export type LogoSize = "small" | "large";

// Type guards
export const isValidImageKey = (key: unknown): key is ImageKey => {
  return (
    typeof key === "string" &&
    ["image1", "image2", "image3", "image4"].includes(key)
  );
};

export const isValidStyleId = (id: unknown): id is StyleId => {
  return (
    typeof id === "string" &&
    ["monogram", "abstract", "mascot", "no-style"].includes(id)
  );
};

// Convert unknown values to safe defaults
export const toImageKey = (key: unknown): ImageKey => {
  return isValidImageKey(key) ? key : "image1";
};

export const toStyleId = (id: unknown): StyleId => {
  return isValidStyleId(id) ? id : "no-style";
};
