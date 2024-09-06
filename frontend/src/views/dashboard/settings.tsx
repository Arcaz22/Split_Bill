import { ChangePassword } from "@/lib/components/change-password";
import { Profil } from "@/lib/components/profile";

export const Settings = () => {
    return (
        <div className="max-w-screen-xl mx-auto w-full pb-10 -mt-24 space-y-8">
            <div className="bg-[#F0F0F0] p-6 rounded-3xl shadow-lg">
                <Profil />
            </div>
            <div className="bg-[#F0F0F0] p-6 rounded-3xl shadow-lg">
                <ChangePassword />
            </div>
        </div>
    );
};
