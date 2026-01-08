import type { ThemeFont } from "@/types";
import { loadGoogleFont } from "@/utils";
import { useEffect, useState } from "react";

const STORAGE_KEY = "app-theme";
const THEME_CHANGE_EVENT = "theme-change-event";

export const applyTheme = (themeName: string) => {
	document.documentElement.setAttribute("data-theme", themeName);
};

export const applyThemeFonts = (fonts: ThemeFont[]) => {
	fonts.forEach((font) => loadGoogleFont(font.name, font.weights));
};

export default function useTheme({
	defaultTheme = "",
}: {
	defaultTheme?: string;
} = {}) {
	const [theme, setThemeState] = useState<string>(() => {
		if (typeof window === "undefined") return defaultTheme;
		return localStorage.getItem(STORAGE_KEY) || defaultTheme;
	});

	useEffect(() => {
		applyTheme(theme);
	}, [theme]);

	useEffect(() => {
		const onSync = (e: Event) => {
			if (e.type === THEME_CHANGE_EVENT) {
				const newTheme = (e as CustomEvent<string>).detail;
				if (newTheme) setThemeState(newTheme);
			} else if (e.type === "storage") {
				const storageEvent = e as StorageEvent;

				if (storageEvent.key === STORAGE_KEY && storageEvent.newValue) {
					setThemeState(storageEvent.newValue);
				}
			}
		};
		window.addEventListener(THEME_CHANGE_EVENT, onSync);
		window.addEventListener("storage", onSync);

		return () => {
			window.removeEventListener(THEME_CHANGE_EVENT, onSync);
			window.removeEventListener("storage", onSync);
		};
	}, []);

	const setTheme = (newTheme: string) => {
		setThemeState(newTheme);

		if (typeof window !== "undefined") {
			localStorage.setItem(STORAGE_KEY, newTheme);
			window.dispatchEvent(
				new CustomEvent(THEME_CHANGE_EVENT, { detail: newTheme }),
			);
		}
	};
	return { theme, setTheme };
}
