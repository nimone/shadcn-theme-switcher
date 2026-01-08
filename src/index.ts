import "./index.css";

export {
	default as ModeSwitcher,
	type ModeSwitcherProps,
} from "./components/theme-mode-switcher";
export {
	default as ThemeSwitcher,
	type ThemeSwitcherProps,
} from "./components/theme-switcher";
export {
	applyTheme,
	applyThemeFonts,
	default as useTheme,
} from "./hooks/use-theme";
export {
	applyMode,
	getEffectiveMode,
	getSystemTheme,
	default as useThemeMode,
} from "./hooks/use-theme-mode";
export type { ThemeConfig, ThemeFont, ThemeMode } from "./types";
