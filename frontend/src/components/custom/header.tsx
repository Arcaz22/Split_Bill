import { HeaderLogo } from "./header-logo";
import { Navigation } from "./navigation";
import { WelcomeMsg } from "./welcome";

export const Header = () => {
    return (
        <header className="bg-gradient-to-b from-[#0353A4] to-[#006DAA] px-4 py-8 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14 flex-wrap">
                    <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo />
                        <Navigation />
                    </div>
                </div>
                <WelcomeMsg />
            </div>
        </header>
    );
};
