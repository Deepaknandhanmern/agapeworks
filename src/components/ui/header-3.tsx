'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { NotificationAlertDialog } from '@/components/ui/notification-alert-dialog';
import { SiteBanner } from '@/components/sections/site-banner';
import { createPortal } from 'react-dom';
import { Menu, MenuItem, HoveredLink } from '@/components/ui/navbar-menu';
import { NavigationMenu, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { LucideIcon } from 'lucide-react';
import {
	GlobeIcon,
	SmartphoneIcon,
	LayersIcon,
	BotIcon,
	MegaphoneIcon,
	Users,
	Star,
	Handshake,
} from 'lucide-react';

// Floating pill nav: pinned/expanded at all times on desktop (md+) — mobile
// keeps the plain sticky bar + full-screen drawer below.
const containerVariants = {
	hidden: { y: -80, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring' as const,
			damping: 20,
			stiffness: 300,
			staggerChildren: 0.07,
			delayChildren: 0.15,
		},
	},
};

const fadeVariants = {
	hidden: { opacity: 0, x: -16 },
	visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, damping: 15 } },
};

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
};

function DesktopNavLinks({ dark = false }: { dark?: boolean }) {
	const [active, setActive] = React.useState<string | null>(null);

	return (
		<Menu setActive={setActive}>
			<MenuItem setActive={setActive} active={active} item="Capabilities" dark={dark}>
				<div className="w-72">
					<p className={cn('mb-2 px-1 text-xs font-semibold uppercase tracking-wide', dark ? 'text-white/50' : 'text-muted-foreground')}>
						Main Services
					</p>
					<div className="flex flex-col gap-1">
						{mainServiceLinks.map((item) => (
							<HoveredLink key={item.title} href={item.href} dark={dark} className="flex items-center gap-2 rounded-md px-1 py-1.5">
								<item.icon className={cn('size-4 shrink-0', dark ? 'text-white/70' : 'text-foreground')} />
								<span className={cn('text-sm font-medium', dark ? 'text-white' : 'text-foreground')}>{item.title}</span>
							</HoveredLink>
						))}
					</div>
					<div className={cn('mt-3 flex flex-col gap-1.5 border-t pt-3', dark ? 'border-white/10' : 'border-border')}>
						<p className={cn('text-sm', dark ? 'text-white/50' : 'text-muted-foreground')}>
							Not sure yet?{' '}
							<HoveredLink href="/scope" dark={dark} className="font-medium underline-offset-2 hover:underline">
								Get an instant estimate
							</HoveredLink>
						</p>
						<p className={cn('text-sm', dark ? 'text-white/50' : 'text-muted-foreground')}>
							Ready now?{' '}
							<HoveredLink href="/contact" dark={dark} className="font-medium underline-offset-2 hover:underline">
								Schedule a demo
							</HoveredLink>
						</p>
						<p className={cn('text-sm', dark ? 'text-white/50' : 'text-muted-foreground')}>
							Have a Vahi account?{' '}
							<HoveredLink href="/vahi/login" dark={dark} className="font-medium underline-offset-2 hover:underline">
								Sign in
							</HoveredLink>
						</p>
					</div>
				</div>
			</MenuItem>
			<MenuItem setActive={setActive} active={active} item="Products" dark={dark}>
				<div className="flex w-[26rem] gap-4">
					<a
						href="https://vivira.agapeworks.in"
						target="_blank"
						rel="noopener noreferrer"
						className="group relative block w-44 shrink-0 overflow-hidden rounded-xl bg-black p-4"
					>
						<span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/60">
							{/* eslint-disable-next-line @next/next/no-img-element -- small static logo, not worth next/image */}
							<img src="/vivira-logo.svg" alt="" className="size-3" /> Vivira
						</span>
						<p
							className="animate-shimmer bg-clip-text text-lg font-semibold tracking-tight text-transparent"
							style={{
								backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.35) 0%, #ffffff 50%, rgba(255,255,255,0.35) 100%)',
								backgroundSize: '200% auto',
							}}
						>
							Live now
						</p>
						<span className="mt-1 block text-xs text-white/40 transition-colors group-hover:text-white/70">
							AI cart for WooCommerce →
						</span>
					</a>
					<div className="flex flex-1 flex-col gap-3">
						<a
							href="https://vivira.agapeworks.in"
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-col gap-0.5 rounded-md px-1 py-1.5 transition-colors hover:bg-white/5"
						>
							<span className={cn('font-medium', dark ? 'text-white' : 'text-foreground')}>Vivira</span>
							<span className={cn('text-xs', dark ? 'text-white/50' : 'text-muted-foreground')}>AI-powered cart recovery for WooCommerce stores</span>
						</a>
						<HoveredLink href="/products" dark={dark} className={cn('mt-auto text-sm font-medium underline-offset-2 hover:underline', dark ? 'text-white' : 'text-foreground')}>
							See all products →
						</HoveredLink>
					</div>
				</div>
			</MenuItem>
			<MenuItem setActive={setActive} active={active} item="Company" dark={dark}>
				<div className="flex w-64 flex-col gap-3">
					{companyLinks.map((item) => (
						<HoveredLink key={item.title} href={item.href} dark={dark} className="flex items-start gap-2">
							<item.icon className={cn('mt-0.5 size-4 shrink-0', dark ? 'text-white/70' : 'text-foreground')} />
							<span>
								<span className={cn('block font-medium', dark ? 'text-white' : 'text-foreground')}>{item.title}</span>
								<span className={cn('block text-xs', dark ? 'text-white/50' : 'text-muted-foreground')}>{item.description}</span>
							</span>
						</HoveredLink>
					))}
				</div>
			</MenuItem>
			<HoveredLink href="/portfolio" dark={dark} className="font-medium">
				Digital Experiences
			</HoveredLink>
		</Menu>
	);
}

export function Header({ variant = 'light' }: { variant?: 'light' | 'dark' } = {}) {
	const [open, setOpen] = React.useState(false);
	const dark = variant === 'dark';

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<>
			<SiteBanner />

			{/* Mobile: plain bar (non-sticky, scrolls with the page) + full-screen drawer */}
			<header
				className={cn('relative z-50 w-full border-b md:hidden', {
					'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg':
						!dark,
					'bg-neutral-900/90 backdrop-blur-lg border-white/10': dark,
				})}
			>
				<nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
					<Link href="/" className={cn('rounded-md p-2', dark ? 'hover:bg-white/10' : 'hover:bg-accent')}>
						<Image src={dark ? '/logo-white.png' : '/logo-black.png'} alt="Agape Works" width={181} height={32} className="h-7 w-auto" priority />
					</Link>
					<div className="flex items-center gap-2">
						{!dark && <NotificationAlertDialog />}
						<Button
							size="icon"
							variant="outline"
							onClick={() => setOpen(!open)}
							aria-expanded={open}
							aria-controls="mobile-menu"
							aria-label="Toggle menu"
							className={cn(dark && 'border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white')}
						>
							<MenuToggleIcon open={open} className="size-5" duration={300} />
						</Button>
					</div>
				</nav>
				<MobileMenu open={open} dark={dark} className="flex flex-col justify-between gap-2 overflow-y-auto">
					<NavigationMenu className="max-w-full">
						<div className="flex w-full flex-col gap-y-2">
							<span className={cn('text-sm', dark && 'text-white/50')}>Main Services</span>
							{mainServiceLinks.map((link) => (
								<ListItem key={link.title} {...link} dark={dark} />
							))}
							<span className={cn('text-sm', dark && 'text-white/50')}>Company</span>
							{companyLinks.map((link) => (
								<ListItem key={link.title} {...link} dark={dark} />
							))}
							<div className="mt-2 flex flex-col gap-1 border-t pt-2" style={{ borderColor: dark ? 'rgba(255,255,255,0.1)' : undefined }}>
								<a
									href="/portfolio"
									className={cn('rounded-md p-2 text-sm font-medium', dark ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'hover:bg-accent')}
								>
									Digital Experiences
								</a>
								<a
									href="/products"
									className={cn('rounded-md p-2 text-sm font-medium', dark ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'hover:bg-accent')}
								>
									Products
								</a>
								<a
									href="/vahi/login"
									className={cn('rounded-md p-2 text-sm font-medium', dark ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'hover:bg-accent')}
								>
									Vahi sign in
								</a>
							</div>
						</div>
					</NavigationMenu>
					<div className="flex flex-col gap-2">
						<div className="flex gap-2">
							<Button asChild variant="outline" className={cn('flex-1', dark && 'border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white')}>
								<Link href="/signin">Sign In</Link>
							</Button>
							<Button asChild variant="outline" className={cn('flex-1', dark && 'border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white')}>
								<Link href="/signup">Sign Up</Link>
							</Button>
						</div>
						<Button asChild className={cn('w-full', dark && 'bg-white text-black hover:bg-neutral-200')}>
							<Link href="/contact">Contact</Link>
						</Button>
					</div>
				</MobileMenu>
			</header>

			{/* Desktop */}
			{dark ? (
				/* Split into three pills: logo | links | CTA (non-sticky, scrolls with the page) */
				<motion.div
					initial="hidden"
					animate="visible"
					variants={containerVariants}
					className="relative z-50 hidden w-full items-center justify-between gap-4 px-6 py-6 md:flex md:px-10"
				>
					<motion.div variants={fadeVariants} className="flex shrink-0 items-center">
						<Link href="/" className="flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900/90 py-3 pl-4 pr-6 backdrop-blur-sm">
							<Image src="/logo-white.png" alt="Agape Works" width={181} height={32} className="h-6 w-auto" priority />
						</Link>
					</motion.div>

					<motion.div variants={fadeVariants} className="rounded-full border border-white/10 bg-neutral-900/90 px-3 py-2 backdrop-blur-sm">
						<DesktopNavLinks dark />
					</motion.div>

					<motion.div variants={fadeVariants} className="flex shrink-0 items-center gap-4">
						<Link href="/signin" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
							Sign In
						</Link>
						<Button asChild className="rounded-full bg-white px-6 py-3 text-black hover:bg-neutral-200">
							<Link href="/contact">Contact</Link>
						</Button>
					</motion.div>
				</motion.div>
			) : (
				/* Single pill, non-sticky (scrolls with the page) */
				<div className="relative z-50 hidden w-full justify-center py-6 md:flex">
					<motion.nav
						initial="hidden"
						animate="visible"
						variants={containerVariants}
						className="relative flex h-14 items-center gap-3 overflow-visible rounded-full border bg-background/80 px-3 shadow-lg backdrop-blur-sm"
					>
						<motion.div variants={fadeVariants} className="flex shrink-0 items-center">
							<Link href="/" className="hover:bg-accent rounded-md p-1">
								<Image src="/logo-black.png" alt="Agape Works" width={181} height={32} className="h-6 w-auto" priority />
							</Link>
						</motion.div>

						<motion.div variants={fadeVariants}>
							<DesktopNavLinks />
						</motion.div>

						<motion.div variants={fadeVariants} className="flex shrink-0 items-center gap-3 pr-1">
							<NotificationAlertDialog />
							<Link href="/signin" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
								Sign In
							</Link>
							<Button asChild>
								<Link href="/contact">Contact</Link>
							</Button>
						</motion.div>
					</motion.nav>
				</div>
			)}
		</>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
	dark?: boolean;
};

function MobileMenu({ open, dark = false, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				dark
					? 'bg-black/95 backdrop-blur-lg text-white'
					: 'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg',
				'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
					'size-full p-4',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}

function ListItem({
	title,
	description,
	icon: Icon,
	className,
	href,
	dark = false,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem & { dark?: boolean }) {
	return (
		<NavigationMenuLink
			className={cn(
				'w-full flex flex-row gap-x-2 rounded-sm p-2',
				dark
					? 'hover:bg-white/10 focus:bg-white/10 text-white'
					: 'data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
				className,
			)}
			{...props}
			asChild
		>
			<a href={href}>
				<div className={cn('flex aspect-square size-12 items-center justify-center rounded-md border shadow-sm', dark ? 'bg-white/5 border-white/10' : 'bg-background/40')}>
					<Icon className={cn('size-5', dark ? 'text-white' : 'text-foreground')} />
				</div>
				<div className="flex flex-col items-start justify-center">
					<span className="font-medium">{title}</span>
					<span className={cn('text-xs', dark ? 'text-white/50' : 'text-muted-foreground')}>{description}</span>
				</div>
			</a>
		</NavigationMenuLink>
	);
}

const mainServiceLinks: LinkItem[] = [
	{
		title: 'Web Development',
		href: '/services/web-development',
		description: 'Websites, eCommerce, web applications, custom platforms',
		icon: GlobeIcon,
	},
	{
		title: 'Mobile App Development',
		href: '/services/mobile-app-development',
		description: 'Android, iOS, React Native, Flutter, API-driven apps',
		icon: SmartphoneIcon,
	},
	{
		title: 'SaaS Development',
		href: '/saas',
		description: 'Multi-tenant platforms, billing, admin panels and APIs',
		icon: LayersIcon,
	},
	{
		title: 'AI Solutions',
		href: '/services/ai-solutions',
		description: 'Custom AI features, LLM integrations, and automation',
		icon: BotIcon,
	},
	{
		title: 'Digital Marketing & Branding',
		href: '/services/digital-marketing-branding',
		description: 'Social, content, performance campaigns and brand identity',
		icon: MegaphoneIcon,
	},
];

const companyLinks: LinkItem[] = [
	{
		title: 'About Us',
		href: '/about',
		description: 'Learn more about our story and team',
		icon: Users,
	},
	{
		title: 'Customer Stories',
		href: '/case-studies',
		description: 'See how we’ve helped our clients succeed',
		icon: Star,
	},
	{
		title: 'Partnerships',
		href: '/collaboration',
		icon: Handshake,
		description: 'Collaborate with us for mutual growth',
	},
];
