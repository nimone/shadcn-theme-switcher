export interface ThemeConfig {
	name: string;
	title: string;
	description?: string;
	fonts?: ThemeFont[];
}
export type ThemeFont = {
	name: string;
	weights?: number[];
};
export type ThemeMode = "light" | "dark" | "system";
