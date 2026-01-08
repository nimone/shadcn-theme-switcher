import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function loadGoogleFont(fontName: string, weights: number[] = []) {
	const formattedFont = fontName.replace(/\\s/g, "+");
	const weightStr = weights.length > 0 ? `:wght@${weights.join(";")}` : "";

	const fontUrl = `https://fonts.googleapis.com/css2?family=${formattedFont}${weightStr}&display=swap`;

	const existingLink = Array.from(
		document.head.getElementsByTagName("link"),
	).find((link) => link.href === fontUrl);
	if (existingLink) return;

	const link = document.createElement("link");
	link.href = fontUrl;
	link.rel = "stylesheet";
	document.head.appendChild(link);
}
