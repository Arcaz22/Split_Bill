import { useLocation, useNavigate } from "react-router-dom";
import { NavButton } from "./nav-button";
import { SettingsDropdown } from "./setting-dropdown";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useMedia } from "react-use";
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";

const routes = [
    { href: "/", label: "Dashboard" },
    { href: "/history", label: "History" },
    { href: "/friends", label: "Friends" }
];

export const Navigation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMedia("(max-width: 1023px)", false);

    const onClick = (href: string) => {
        setIsOpen(false);
        navigate(href);
    };

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="font-normal bg-white/10 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full h-full bg-white px-4">
                    <nav className="flex flex-col gap-y-4 pt-6">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant="ghost"
                                onClick={() => onClick(route.href)}
                                className={`w-full justify-start ${route.href === location.pathname ? "bg-[#B9D6F2]" : "hover:bg-[#B9D6F2]"}`}
                            >
                                {route.label}
                            </Button>
                        ))}
                        <SettingsDropdown />
                    </nav>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <nav className="flex items-center gap-x-2 overflow-x-auto lg:overflow-visible flex-wrap">
            {routes.map((route) => (
                <NavButton
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={location.pathname === route.href}
                />
            ))}
            <SettingsDropdown />
        </nav>
    );
};
