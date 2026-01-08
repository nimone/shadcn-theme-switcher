import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useThemeMode from "@/hooks/use-theme-mode";
import type { ThemeMode } from "@/types";
import { cn } from "@/utils";
import { ComputerIcon, type LucideIcon, MoonIcon, SunIcon } from "lucide-react";

const MODES: Record<ThemeMode, { icon: LucideIcon; label: string }> = {
	light: {
		icon: SunIcon,
		label: "Light",
	},
	dark: {
		icon: MoonIcon,
		label: "Dark",
	},
	system: {
		icon: ComputerIcon,
		label: "System",
	},
};

export interface ModeSwitcherProps {
	className?: string;
	defaultMode?: ThemeMode;
}

export default function ModeSwitcher({
	className,
	defaultMode = "system",
}: ModeSwitcherProps) {
	const { mode, setMode } = useThemeMode({ defaultMode });
	const currentMode = MODES[mode];

	return (
		<div className={cn("shadcn-theme-switcher", className)}>
			<Select value={mode} onValueChange={setMode}>
				<SelectTrigger className="w-fit">
					<SelectValue placeholder="Select Mode">
						<span className="flex items-center gap-2">
							<currentMode.icon /> {currentMode.label}
						</span>
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					{Object.entries(MODES).map(([id, mode]) => (
						<SelectItem key={id} value={id}>
							<span className="flex items-center gap-2">
								<mode.icon /> {mode.label}
							</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
