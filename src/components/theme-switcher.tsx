import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useTheme, { applyThemeFonts } from "@/hooks/use-theme";
import useThemeMode from "@/hooks/use-theme-mode";
import type { ThemeConfig, ThemeMode } from "@/types";
import { cn } from "@/utils";
import { useEffect } from "react";

export interface ThemeSwitcherProps {
	themes: ThemeConfig[];
	className?: string;
	defaultTheme?: ThemeMode;
}

export default function ModeSwitcher({
	themes,
	className,
	defaultTheme,
}: ThemeSwitcherProps) {
	const { theme, setTheme } = useTheme({ defaultTheme });
	const { effectiveMode } = useThemeMode();

	const currentThemeConfig = themes.find((t) => t.name === theme);

	useEffect(() => {
		const fonts = currentThemeConfig?.fonts;
		if (fonts) applyThemeFonts(fonts);
	}, [currentThemeConfig]);

	return (
		<div className={cn("shadcn-theme-switcher", className)}>
			<Select value={theme} onValueChange={setTheme}>
				<SelectTrigger className="w-fit">
					<SelectValue placeholder="Select Theme">
						<span className="flex items-center gap-2">
							<ColorPalette themeMode={effectiveMode} themeName={theme} />

							{currentThemeConfig?.title || theme}
						</span>
					</SelectValue>
				</SelectTrigger>
				<SelectContent className="shadcn-theme-switcher">
					{themes.map((theme) => (
						<SelectItem key={theme.name} value={theme.name}>
							<span className="flex items-center gap-2">
								<ColorPalette
									themeMode={effectiveMode}
									themeName={theme.name}
								/>
								{theme.title}
							</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

const COLOR_PALETTE_VARS = ["--primary", "--secondary", "--accent", "--muted"];

function ColorPalette({
	themeName,
	themeMode,
}: {
	themeName: string;
	themeMode: ThemeMode;
}) {
	return (
		<div
			className={cn("flex items-center gap-0.5", themeMode)}
			data-theme={themeName}
		>
			{COLOR_PALETTE_VARS.map((cvar) => (
				<span
					key={cvar}
					className="size-3 rounded border border-border/50"
					style={{ background: `var(${cvar})` }}
				/>
			))}
		</div>
	);
}
