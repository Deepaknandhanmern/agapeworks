"use client"

import { BellRing, X, Clock, Check } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Notification {
    id: string
    sender: {
        name: string
        initials: string
    }
    message: string
    time: string
    read: boolean
}

export function NotificationAlertDialog() {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            sender: {
                name: "John Doe",
                initials: "JD",
            },
            message: "Hey, can we discuss the project timeline?",
            time: "5 minutes ago",
            read: false,
        },
        {
            id: "2",
            sender: {
                name: "Alice Smith",
                initials: "AS",
            },
            message: "I've uploaded the design files you requested",
            time: "10 minutes ago",
            read: false,
        },
        {
            id: "3",
            sender: {
                name: "Robert Johnson",
                initials: "RJ",
            },
            message: "The client meeting has been rescheduled to tomorrow",
            time: "1 hour ago",
            read: false,
        },
        {
            id: "4",
            sender: {
                name: "Emily Davis",
                initials: "ED",
            },
            message: "Please review the latest changes to the documentation",
            time: "2 hours ago",
            read: false,
        },
        {
            id: "5",
            sender: {
                name: "Michael Wilson",
                initials: "MW",
            },
            message: "Don't forget about our team meeting at 3 PM today",
            time: "3 hours ago",
            read: false,
        },
    ])

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
                aria-label="Notifications"
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
                        aria-label="Close notifications"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setOpen(false)}
                    />
                    <div
                        className="absolute right-0 top-full z-50 mt-2 w-[calc(100vw-2rem)] max-w-md"
                        role="dialog"
                        aria-label="Notifications"
                    >
                        <div className="rounded-lg border-2 border-indigo-200 bg-white p-6 shadow-xl">
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <BellRing className="h-5 w-5 text-indigo-500" />
                                        <h3 className="text-lg font-semibold">Notifications</h3>
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
                                    You have {unreadCount} unread {unreadCount === 1 ? "message" : "messages"} from your team members.
                                </p>
                            </div>
                            <div className="my-3 space-y-2">
                                {notifications.slice(0, 2).map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-md transition-all duration-200 cursor-pointer",
                                            notification.read ? "bg-gray-100" : "bg-indigo-50 shadow-sm",
                                        )}
                                        onClick={() => markAsRead(notification.id)}
                                    >
                                        <div
                                            className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center font-medium shrink-0",
                                                notification.read
                                                    ? "bg-gray-200 text-gray-700"
                                                    : "bg-indigo-200 text-indigo-700",
                                            )}
                                        >
                                            {notification.sender.initials}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={cn(
                                                    "text-sm font-medium",
                                                    notification.read ? "text-gray-700" : "text-gray-900",
                                                )}
                                            >
                                                {notification.sender.name}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">{notification.message}</p>
                                            <div className="flex items-center text-xs text-gray-400 mt-1">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {notification.time}
                                            </div>
                                        </div>
                                        {!notification.read && (
                                            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 shrink-0"></span>
                                        )}
                                    </div>
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
                                <h2 className="text-lg font-semibold">All Notifications</h2>
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
                                    <p>No notifications</p>
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={cn(
                                            "flex items-start gap-3 p-4 rounded-lg transition-all duration-200 cursor-pointer",
                                            notification.read
                                                ? "bg-white border border-gray-200"
                                                : "bg-indigo-50 border border-indigo-100 shadow-sm",
                                        )}
                                        onClick={() => markAsRead(notification.id)}
                                    >
                                        <div
                                            className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center font-medium shrink-0",
                                                notification.read
                                                    ? "bg-gray-200 text-gray-700"
                                                    : "bg-indigo-200 text-indigo-700",
                                            )}
                                        >
                                            {notification.sender.initials}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <p
                                                    className={cn(
                                                        "text-sm font-medium",
                                                        notification.read ? "text-gray-700" : "text-gray-900",
                                                    )}
                                                >
                                                    {notification.sender.name}
                                                </p>
                                                <div className="flex items-center text-xs text-gray-400">
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {notification.time}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>

                                            {notification.read && (
                                                <div className="flex items-center mt-2 text-xs text-indigo-500">
                                                    <Check className="h-3 w-3 mr-1" />
                                                    Read
                                                </div>
                                            )}
                                        </div>
                                        {!notification.read && (
                                            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 shrink-0 mt-2"></span>
                                        )}
                                    </div>
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
