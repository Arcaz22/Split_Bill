import { getUser } from "@/lib/index";

export const WelcomeMsg = () => {
    const user = getUser();
    const isLoaded = user !== null;

    return (
        <div className="space-y-2 mb-4">
            <h2 className="text-2xl lg:text-4xl text-white font-medium">
                Selamat Datang Kembali{isLoaded ? ", " : ""}{user?.username}
            </h2>
            <p className="text-sm lg:text-base text-[#B9D6F2]">
                Ayo mulai bagi tagihan dengan mudah bersama kami!
            </p>
        </div>
    );
};
