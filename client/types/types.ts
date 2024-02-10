type RGB = {
  R: number;
  G: number;
  B: number;
};

type Palette = {
  rgb: RGB;
  hex: string;
  percentage: string;
};

type ColorPalette = {
  name: string;
  palette: Palette[];
};

interface ColorInfoProps {
  color: Palette;
}

interface PaletteProps {
  palette: Palette[];
}

interface ColorDetailsProps {
  name: string;
  value: string;
}
