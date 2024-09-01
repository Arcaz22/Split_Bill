import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
    href: string;
    label: string;
    isActive?: boolean;
}

export const NavButton = ({
    href,
    label,
    isActive,
}: Props) => {
    return (
        <Button
            asChild
            size="sm"
            variant="outline"
            className={cn(
                "w-full lg:w-auto justify-between font-normal border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none transition-all duration-200 ease-in-out",
                isActive ? "bg-[#006DAA] text-white" : "bg-transparent text-white hover:bg-[#0353A4] hover:text-white focus:text-white active:text-white"
            )}
        >
            <Link to={href}>
                {label}
            </Link>
        </Button>
    );
}

