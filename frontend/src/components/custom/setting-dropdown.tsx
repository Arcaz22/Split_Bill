import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useMedia } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/actions/auth/logout";
import { RootState, AppDispatch } from "@/store";

export const SettingsDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMedia("(max-width: 1023px)", false);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state: RootState) => state.logout);

    const handleMouseEnter = () => {
        if (!isMobile) {
            setIsOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setIsOpen(false);
        }
    };

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser());
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger
                asChild
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Button
                    size="sm"
                    variant="outline"
                    className={`justify-between font-normal border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none transition-all duration-200 ease-in-out ${isMobile ? "bg-transparent text-black hover:bg-[#B9D6F2] hover:text-black" : "bg-transparent text-white hover:bg-[#006DAA] hover:text-white"}`}
                >
                    Settings
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                 align="start"
                 className={`bg-white text-black rounded-md shadow-lg p-2 ${isMobile ? "min-w-[200px] max-w-[300px] w-full left-0 right-0 mx-auto" : "w-40"}`}
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
            >
                <DropdownMenuItem
                    asChild
                    className={`rounded-md p-2 font-normal  ${isMobile ? "bg-transparent text-black hover:bg-[#B9D6F2] hover:text-black" : "hover:bg-[#B9D6F2] hover:text-black"}`}
                >
                    <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={`rounded-md p-2 font-normal ${isMobile ? "bg-transparent text-black hover:bg-[#B9D6F2] hover:text-black" : "hover:bg-[#B9D6F2] hover:text-black"}`}
                    onClick={handleLogout}
                >
                    {loading ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
