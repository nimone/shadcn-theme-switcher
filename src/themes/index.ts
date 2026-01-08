import type { ThemeConfig } from "@/types";
import "./themes.css";

export const defaultThemes: ThemeConfig[] = [
	{
		name: "default",
		title: "Default",
		description: "The default shadcn/ui theme",
	},
	{
		name: "modern-minimal",
		title: "Modern Minimal",
		description: "A clean and modern minimalist theme",
		fonts: [
			{ name: "Inter" },
			{ name: "JetBrains Mono" },
			{ name: "Source Serif 4" },
		],
	},
	{
		name: "violet-bloom",
		title: "Violet Bloom",
		description: "A vibrant violet and purple palette",
		fonts: [
			{ name: "Plus Jakarta Sans" },
			{ name: "IBM Plex Mono" },
			{ name: "Lora" },
		],
	},
	{
		name: "t3-chat",
		title: "T3 Chat",
		description: "Chat-inspired warm tones",
		fonts: [{ name: "Roboto" }],
	},
	{
		name: "twitter",
		title: "Twitter",
		description: "Classic Twitter blue theme",
		fonts: [{ name: "Open Sans" }],
	},
	{
		name: "mocha-mousse",
		title: "Mocha Mousse",
		description: "Warm coffee-inspired browns",
		fonts: [{ name: "DM Sans" }],
	},
	{
		name: "bubblegum",
		title: "Bubblegum",
		description: "Playful pink and pastel colors",
		fonts: [{ name: "Poppins" }, { name: "Fira Code" }, { name: "Lora" }],
	},
	{
		name: "amethyst-haze",
		title: "Amethyst Haze",
		description: "Mystical purple haze",
		fonts: [{ name: "Geist" }, { name: "Fira Code" }, { name: "Lora" }],
	},
	{
		name: "graphite",
		title: "Graphite",
		description: "Sleek graphite gray tones",
		fonts: [{ name: "Inter" }, { name: "Fira Code" }],
	},
	{
		name: "cosmic-night",
		title: "Cosmic Night",
		description: "Deep cosmic purple palette",
		fonts: [{ name: "Inter" }, { name: "JetBrains Mono" }],
	},
	{
		name: "mono",
		title: "Mono",
		description: "Pure monochrome design",
		fonts: [{ name: "Geist Mono" }],
	},
	{
		name: "notebook",
		title: "Notebook",
		description: "Paper-like notebook aesthetic",
		fonts: [{ name: "Architects Daughter" }, { name: "Fira Code" }],
	},
	{
		name: "doom-64",
		title: "Doom 64",
		description: "Retro gaming-inspired colors",
		fonts: [{ name: "Oxanium" }, { name: "Source Code Pro" }],
	},
	{
		name: "catppuccin",
		title: "Catppuccin",
		description: "Pastel soothing color scheme",
		fonts: [{ name: "Montserrat" }, { name: "Fira Code" }],
	},
	{
		name: "perpetuity",
		title: "Perpetuity",
		description: "Terminal-style teal theme",
		fonts: [{ name: "Source Code Pro" }],
	},
	{
		name: "tangerine",
		title: "Tangerine",
		description: "Warm tangerine orange accents",
		fonts: [
			{ name: "Inter" },
			{ name: "JetBrains Mono" },
			{ name: "Source Serif 4" },
		],
	},
];
