import { cn } from "@/lib/utils";
import { techStack, type TechItem } from "@/lib/tech-stack-data";

type TileData = {
	row: number;
	col: number;
	tech?: TechItem;
};

export function Integrations() {
	return (
		<div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 p-4 md:grid-cols-2 md:items-center">
			{/* Left Content */}
			<div className="max-w-xl space-y-5">
				<h2 className="font-medium text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl">
					The Stack We Build With
				</h2>
				<p className="text-lg text-muted-foreground leading-8">
					No hype-chasing — just the languages and frameworks we&apos;ve
					shipped real, production client work with.
				</p>
			</div>

			{/* Right Content - Visual */}
			<div className="place-items-end">
				<div className="mask-[radial-gradient(ellipse_at_center,black,black,transparent)] relative size-90">
					{tiles.map((tile) => (
						<IntegrationCard key={`${tile.row}_${tile.col}`} {...tile} />
					))}
				</div>
			</div>
		</div>
	);
}

function IntegrationCard({ row, col, tech }: TileData) {
	const Icon = tech?.icon;
	return (
		<div
			className={cn(
				"absolute flex size-18 items-center justify-center rounded-md border",
				tech
					? "bg-card shadow-xs dark:bg-card/60"
					: "bg-secondary/30 dark:bg-background" // Styling for empty tiles
			)}
			style={{
				left: col * 72, // 72px cell
				top: row * 72,
			}}
		>
			{Icon && tech && (
				<Icon
					aria-label={tech.name}
					className={cn(
						"pointer-events-none size-8 select-none",
						tech.color === "#000000" && "dark:invert"
					)}
					style={{ color: tech.color }}
				/>
			)}
		</div>
	);
}

// Coordinate mapping to approximate the "scattered" look, using Agape
// Works' actual tech stack (see src/lib/tech-stack-data.ts) instead of
// generic third-party integration logos.
const tiles: TileData[] = [
	// Row 0
	{ row: 0, col: 1 }, // Empty
	{ row: 0, col: 3, tech: techStack[0] }, // Next.js

	// Row 1
	{ row: 1, col: 0 }, // Empty
	{ row: 1, col: 2, tech: techStack[1] }, // React
	{ row: 1, col: 4, tech: techStack[2] }, // React Native

	// Row 2
	{ row: 2, col: 1, tech: techStack[3] }, // Flutter
	{ row: 2, col: 3, tech: techStack[4] }, // Laravel

	// Row 3
	{ row: 3, col: 0 }, // Empty
	{ row: 3, col: 2, tech: techStack[5] }, // PHP
	{ row: 3, col: 4, tech: techStack[6] }, // WordPress

	// Row 4
	{ row: 4, col: 1, tech: techStack[7] }, // WooCommerce
	{ row: 4, col: 3, tech: techStack[8] }, // MySQL
];

export default Integrations;
