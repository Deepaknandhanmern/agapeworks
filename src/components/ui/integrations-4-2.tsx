import { Marquee } from "@/components/ui/marquee";
import { toolsWeUse } from "@/lib/tech-stack-data";

export function Integrations() {
	return (
		<div className="mx-auto flex max-w-5xl flex-col items-center gap-10 p-4 text-center">
			<div className="max-w-xl space-y-5">
				<h2 className="font-medium text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl">
					The Stack We Build With
				</h2>
				<p className="text-lg text-muted-foreground leading-8">
					No hype-chasing — just the tools and platforms we&apos;ve
					shipped real, production client work with.
				</p>
			</div>

			<Marquee speed={30} pauseOnHover className="w-full mt-0 sm:mt-0">
				{toolsWeUse.map(({ name, icon: Icon, color }) => (
					<div key={name} className="flex shrink-0 items-center gap-3 px-8">
						<Icon className="size-7" style={{ color }} aria-hidden="true" />
						<span className="text-base font-medium whitespace-nowrap text-foreground">
							{name}
						</span>
					</div>
				))}
			</Marquee>
		</div>
	);
}

export default Integrations;
