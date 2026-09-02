"use client"

import { BellRing, X, Clock, Check, ShoppingCart, Receipt, Star, Handshake, Sparkles, type LucideIcon } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Notification {
    id: string
    icon: LucideIcon
    title: string
    description: string
    time: string
    href: string
    read: boolean
}

// Real site announcements — not fabricated chat messages. Each links
// somewhere real; nothing here is invented.
const initialNotifications: Notification[] = [
    {
        id: "vivira",
        icon: ShoppingCart,
        title: "Vivira is live",
        description: "Our AI cart plugin for WooCommerce — recovers abandoned carts automatically.",
        time: "New",
        href: "https://vivira.agapeworks.in",
        read: false,
    },
    {
        id: "partner-program",
        icon: Handshake,
        title: "Partner program is live",
        description: "Refer clients or resell under your own brand — see how it works.",
        time: "This week",
        href: "/partner-program",
        read: false,
    },
    {
        id: "case-study",
        icon: Star,
        title: "New case study: Kathir Solar Solutions",
        description: "A corporate website built to explain a technical product clearly.",
        time: "This week",
        href: "/case-studies/kathir-solar-solutions",
        read: false,
    },
    {
        id: "ai-dev",
        icon: Sparkles,
        title: "AI-powered development, now available",
        description: "Custom AI features and LLM integrations, built into your product.",
        time: "Recently",
        href: "/services",
        read: false,
    },
    {
        id: "vahi",
        icon: Receipt,
        title: "Vahi is live",
        description: "GST-compliant billing and invoicing, built for small businesses.",
        time: "Live",
        href: "/billing",
        read: true,
    },
]

function NotificationRow({
    notification,
    onRead,
    detailed,
}: {
    notification: Notification
    onRead: (id: string) => void
    detailed?: boolean
}) {
    const Icon = notification.icon
    return (
        <Link
            href={notification.href}
            onClick={() => onRead(notification.id)}
            {...(notification.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            className={cn(
                "flex items-start gap-3 rounded-md p-3 transition-all duration-200",
                detailed ? "rounded-lg" : "",
                notification.read ? "bg-gray-100" : "bg-indigo-50 shadow-sm",
            )}
        >
            <div
                className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full",
                    notification.read ? "bg-gray-200 text-gray-600" : "bg-indigo-200 text-indigo-700",
                )}
            >
                <Icon className="size-4.5" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-sm font-medium", notification.read ? "text-gray-700" : "text-gray-900")}>
                        {notification.title}
                    </p>
                    {!notification.read && <span className="mt-1 size-2 shrink-0 rounded-full bg-indigo-500" />}
                </div>
                <p className={cn("text-xs text-gray-500", detailed ? "" : "truncate")}>{notification.description}</p>
                <div className="mt-1 flex items-center text-xs text-gray-400">
                    <Clock className="mr-1 h-3 w-3" />
                    {notification.time}
                    {detailed && notification.read && (
                        <span className="ml-3 flex items-center text-indigo-500">
                            <Check className="mr-1 h-3 w-3" />
                            Read
                        </span>
                    )}
                </div>
            </div>
        </Link>
    )
}

export function NotificationAlertDialog() {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

    // Click-to-open only — no auto-show, no auto-dismiss.
    const [open, setOpen] = useState(false)
    const [showAllNotifications, setShowAllNotifications] = useState(false)

    const markAsRead = (id: string) => {
        setNotifications(
            notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
        )
    }

    const markAllAsRead = () => {
        setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    }

    const unreadCount = notifications.filter((notification) => !notification.read).length

    return (
        <div className="relative">
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setOpen((v) => !v)}
                aria-label="Announcements"
                aria-expanded={open}
            >
                <BellRing className="size-4" />
                {unreadCount > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                        {unreadCount}
                    </span>
                )}
            </Button>

            {open && (
                <>
                    {/* Click-outside-to-close backdrop */}
                    <button
                        type="button"
                        aria-label="Close announcements"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setOpen(false)}
                    />
                    <div
                        className="absolute right-0 top-full z-50 mt-2 w-[calc(100vw-2rem)] max-w-md"
                        role="dialog"
                        aria-label="Announcements"
                    >
                        <div className="rounded-lg border-2 border-indigo-200 bg-white p-6 shadow-xl">
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <BellRing className="h-5 w-5 text-indigo-500" />
                                        <h3 className="text-lg font-semibold">Announcements</h3>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {unreadCount > 0 && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={markAllAsRead}
                                                className="text-xs text-indigo-500 hover:text-indigo-600"
                                            >
                                                Mark all as read
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setOpen(false)}
                                            className="h-8 w-8 text-gray-500 hover:text-gray-700"
                                            aria-label="Dismiss"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {unreadCount > 0
                                        ? `${unreadCount} new ${unreadCount === 1 ? "update" : "updates"} from Agape Works.`
                                        : "You're all caught up."}
                                </p>
                            </div>
                            <div className="my-3 space-y-2">
                                {notifications.slice(0, 3).map((notification) => (
                                    <NotificationRow key={notification.id} notification={notification} onRead={markAsRead} />
                                ))}
                            </div>
                            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    className="mt-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 sm:mt-0"
                                >
                                    Close
                                </Button>
                                <Button
                                    className="bg-indigo-500 hover:bg-indigo-600"
                                    onClick={() => {
                                        setOpen(false)
                                        setShowAllNotifications(true)
                                        document.body.classList.add("overflow-hidden")
                                    }}
                                >
                                    View All
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Full slide-over panel, opened from "View All" */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
                    showAllNotifications ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
            >
                <div
                    className={cn(
                        "fixed top-0 right-0 h-full shadow-lg transition-transform duration-300 ease-in-out transform w-full max-w-md",
                        "bg-white border-l border-gray-200",
                        showAllNotifications ? "translate-x-0" : "translate-x-full",
                    )}
                >
                    <div className="flex flex-col h-full">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BellRing className="h-5 w-5 text-indigo-500" />
                                <h2 className="text-lg font-semibold">All Announcements</h2>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    setShowAllNotifications(false)
                                    document.body.classList.remove("overflow-hidden")
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-indigo-200">
                            {notifications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                    <BellRing className="h-12 w-12 mb-2 text-gray-300" />
                                    <p>No announcements</p>
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <NotificationRow key={notification.id} notification={notification} onRead={markAsRead} detailed />
                                ))
                            )}
                        </div>
                        <div className="p-4 border-t border-gray-200">
                            <Button
                                className="w-full bg-indigo-500 hover:bg-indigo-600"
                                onClick={() => {
                                    markAllAsRead()
                                    setShowAllNotifications(false)
                                    document.body.classList.remove("overflow-hidden")
                                }}
                            >
                                Mark All as Read
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
