type RGB = {
  R: number;
  G: number;
  B: number;
};

type Palette = {
  rgb: RGB;
  hex: string;
  percentage: number;
};

type ColorInfoProps = {
  color: Palette;
};

type PaletteProps = {
  palette: Palette[];
};
