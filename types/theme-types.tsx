type ThemeColors = "Zinc" | "Orange" | "Blue" | "Green" | "Rose";
interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
}