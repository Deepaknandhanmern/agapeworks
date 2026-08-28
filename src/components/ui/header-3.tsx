'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { NotificationAlertDialog } from '@/components/ui/notification-alert-dialog';
import { createPortal } from 'react-dom';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { LucideIcon } from 'lucide-react';
import {
	GlobeIcon,
	SmartphoneIcon,
	LayersIcon,
	BotIcon,
	ShoppingCartIcon,
	CogIcon,
	MegaphoneIcon,
	SearchIcon,
	WebhookIcon,
	ShieldCheckIcon,
	WrenchIcon,
	Users,
	Star,
	FileText,
	Shield,
	RotateCcw,
	Handshake,
	Leaf,
	HelpCircle,
} from 'lucide-react';

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
};

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

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
		<header
			className={cn('sticky top-0 z-50 w-full border-b border-transparent', {
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg':
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
				<div className="flex items-center gap-5">
					<Link href="/" className="hover:bg-accent rounded-md p-2">
						<span className="text-base font-bold tracking-tight">Agape</span>
					</Link>
					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent">Services</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-background p-1 pr-1.5">
									<div className="bg-popover grid w-lg grid-cols-2 gap-4 rounded-md border p-3 shadow">
										<div>
											<p className="text-muted-foreground mb-2 px-2 text-xs font-semibold uppercase tracking-wide">
												Main Services
											</p>
											<ul className="space-y-1">
												{mainServiceLinks.map((item, i) => (
													<li key={i}>
														<NavigationMenuLink
															href={item.href}
															className="hover:bg-accent flex flex-row items-center gap-x-2 rounded-md p-2"
														>
															<item.icon className="text-foreground size-4" />
															<span className="text-sm font-medium">{item.title}</span>
														</NavigationMenuLink>
													</li>
												))}
											</ul>
										</div>
										<div>
											<p className="text-muted-foreground mb-2 px-2 text-xs font-semibold uppercase tracking-wide">
												Supporting &amp; Technical
											</p>
											<ul className="space-y-1">
												{supportingServiceLinks.map((item, i) => (
													<li key={i}>
														<NavigationMenuLink
															href={item.href}
															className="hover:bg-accent flex flex-row items-center gap-x-2 rounded-md p-2"
														>
															<item.icon className="text-foreground size-4" />
															<span className="text-sm font-medium">{item.title}</span>
														</NavigationMenuLink>
													</li>
												))}
											</ul>
										</div>
									</div>
									<div className="p-2">
										<p className="text-muted-foreground text-sm">
											Interested?{' '}
											<a href="/contact" className="text-foreground font-medium hover:underline">
												Schedule a demo
											</a>
										</p>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent">Company</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
									<div className="grid w-lg grid-cols-2 gap-2">
										<ul className="bg-popover space-y-2 rounded-md border p-2 shadow">
											{companyLinks.map((item, i) => (
												<li key={i}>
													<ListItem {...item} />
												</li>
											))}
										</ul>
										<ul className="space-y-2 p-3">
											{companyLinks2.map((item, i) => (
												<li key={i}>
													<NavigationMenuLink
														href={item.href}
														className="flex p-2 hover:bg-accent flex-row rounded-md items-center gap-x-2"
													>
														<item.icon className="text-foreground size-4" />
														<span className="font-medium">{item.title}</span>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuLink className="px-4" asChild>
								<a href="/portfolio" className="hover:bg-accent rounded-md p-2">
									Portfolio
								</a>
							</NavigationMenuLink>
							<NavigationMenuLink className="px-4" asChild>
								<a href="/contact" className="hover:bg-accent rounded-md p-2">
									Contact
								</a>
							</NavigationMenuLink>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="hidden items-center gap-2 md:flex">
					<NotificationAlertDialog />
					<Button variant="outline">Sign In</Button>
					<Button>Get Started</Button>
				</div>
				<div className="flex items-center gap-2 md:hidden">
					<NotificationAlertDialog />
					<Button
						size="icon"
						variant="outline"
						onClick={() => setOpen(!open)}
						aria-expanded={open}
						aria-controls="mobile-menu"
						aria-label="Toggle menu"
					>
						<MenuToggleIcon open={open} className="size-5" duration={300} />
					</Button>
				</div>
			</nav>
			<MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
				<NavigationMenu className="max-w-full">
					<div className="flex w-full flex-col gap-y-2">
						<span className="text-sm">Main Services</span>
						{mainServiceLinks.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
						<span className="text-sm">Supporting &amp; Technical</span>
						{supportingServiceLinks.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
						<span className="text-sm">Company</span>
						{companyLinks.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
						{companyLinks2.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
					</div>
				</NavigationMenu>
				<div className="flex flex-col gap-2">
					<Button variant="outline" className="w-full bg-transparent">
						Sign In
					</Button>
					<Button className="w-full">Get Started</Button>
				</div>
			</MobileMenu>
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg',
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
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
	return (
		<NavigationMenuLink className={cn('w-full flex flex-row gap-x-2 data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm p-2', className)} {...props} asChild>
			<a href={href}>
				<div className="bg-background/40 flex aspect-square size-12 items-center justify-center rounded-md border shadow-sm">
					<Icon className="text-foreground size-5" />
				</div>
				<div className="flex flex-col items-start justify-center">
					<span className="font-medium">{title}</span>
					<span className="text-muted-foreground text-xs">{description}</span>
				</div>
			</a>
		</NavigationMenuLink>
	);
}

const mainServiceLinks: LinkItem[] = [
	{
		title: 'Web Development',
		href: '/services',
		description: 'Websites, eCommerce, web applications, custom platforms',
		icon: GlobeIcon,
	},
	{
		title: 'Mobile App Development',
		href: '/services',
		description: 'Android, iOS, React Native, Flutter, API-driven apps',
		icon: SmartphoneIcon,
	},
	{
		title: 'SaaS Development',
		href: '/services',
		description: 'Multi-tenant platforms, billing, admin panels and APIs',
		icon: LayersIcon,
	},
	{
		title: 'AI Solutions',
		href: '/services',
		description: 'Custom AI features, LLM integrations, and automation',
		icon: BotIcon,
	},
	{
		title: 'E-Commerce Development',
		href: '/services',
		description: 'Online stores, checkout flows, and payment integrations',
		icon: ShoppingCartIcon,
	},
	{
		title: 'Custom Software & Automation',
		href: '/services',
		description: 'Bespoke internal tools and workflow automation',
		icon: CogIcon,
	},
	{
		title: 'Digital Marketing & Branding',
		href: '/services',
		description: 'Social, content, performance campaigns and brand identity',
		icon: MegaphoneIcon,
	},
];

const supportingServiceLinks: LinkItem[] = [
	{
		title: 'SEO & AEO',
		href: '/services',
		icon: SearchIcon,
	},
	{
		title: 'API Development',
		href: '/services',
		icon: WebhookIcon,
	},
	{
		title: 'Security',
		href: '/services',
		icon: ShieldCheckIcon,
	},
	{
		title: 'Maintenance',
		href: '/services',
		icon: WrenchIcon,
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

const companyLinks2: LinkItem[] = [
	{
		title: 'Terms of Service',
		href: '#',
		icon: FileText,
	},
	{
		title: 'Privacy Policy',
		href: '#',
		icon: Shield,
	},
	{
		title: 'Refund Policy',
		href: '#',
		icon: RotateCcw,
	},
	{
		title: 'Blog',
		href: '/blog',
		icon: Leaf,
	},
	{
		title: 'Help Center',
		href: '#',
		icon: HelpCircle,
	},
];


function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	// also check on first load
	React.useEffect(() => {
		const id = setTimeout(onScroll, 0);
		return () => clearTimeout(id);
	}, [onScroll]);

	return scrolled;
}
