import type { ThemeMode } from "@/types";
import { useEffect, useState } from "react";

const STORAGE_KEY = "app-theme-mode";
const MODE_CHANGE_EVENT = "theme-mode-change-event";

export const getSystemTheme = (): "light" | "dark" => {
	if (typeof window !== "undefined") {
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	}
	return "light";
};

export const getEffectiveMode = (mode: ThemeMode): "light" | "dark" => {
	return mode === "system" ? getSystemTheme() : mode;
};

export const applyMode = (themeMode: ThemeMode) => {
	const effectiveMode = getEffectiveMode(themeMode);
	document.documentElement.classList.toggle("dark", effectiveMode === "dark");
};

export default function useThemeMode({
	defaultMode = "system",
}: {
	defaultMode?: ThemeMode;
} = {}) {
	const [mode, setModeState] = useState<ThemeMode>(() => {
		if (typeof window === "undefined") return defaultMode;
		return (localStorage.getItem(STORAGE_KEY) as ThemeMode) || defaultMode;
	});

	useEffect(() => {
		applyMode(mode);

		const onChange = () => mode === "system" && applyMode("system");
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		mq.addEventListener("change", onChange);

		return () => {
			mq.removeEventListener("change", onChange);
		};
	}, [mode]);

	useEffect(() => {
		const onSync = (e: Event) => {
			if (e.type === MODE_CHANGE_EVENT) {
				const newMode = (e as CustomEvent<ThemeMode>).detail;
				if (newMode) setModeState(newMode);
			} else if (e.type === "storage") {
				const storageEvent = e as StorageEvent;

				if (storageEvent.key === STORAGE_KEY && storageEvent.newValue) {
					setModeState(storageEvent.newValue as ThemeMode);
				}
			}
		};
		window.addEventListener(MODE_CHANGE_EVENT, onSync);
		window.addEventListener("storage", onSync);

		return () => {
			window.removeEventListener(MODE_CHANGE_EVENT, onSync);
			window.removeEventListener("storage", onSync);
		};
	}, []);

	const setMode = (newMode: ThemeMode) => {
		setModeState(newMode);

		if (typeof window !== "undefined") {
			localStorage.setItem(STORAGE_KEY, newMode);
			window.dispatchEvent(
				new CustomEvent(MODE_CHANGE_EVENT, { detail: newMode }),
			);
		}
	};
	return { mode, setMode, effectiveMode: getEffectiveMode(mode) };
}
