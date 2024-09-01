import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarUploadProps } from '../interface/avatar-upload.interface';

export default function AvatarUpload({ onAvatarChange }: AvatarUploadProps) {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onAvatarChange(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <Avatar size="md" ring="blue" rotate={true}>
                    {avatarUrl ? (
                        <AvatarImage src={avatarUrl} alt="Avatar" />
                    ) : (
                        <AvatarFallback>AV</AvatarFallback>
                    )}
                </Avatar>
                <label htmlFor="avatar" className="absolute -bottom-2 right-0 bg-[#FB8500] hover:bg-[#FB8500] text-white p-2 rounded-full cursor-pointer shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 21h6a2 2 0 002-2v-4.586a1 1 0 00-.293-.707l-9-9a1 1 0 00-.707-.293H5a2 2 0 00-2 2v6a1 1 0 00.293.707l9 9a1 1 0 00.707.293H9z" />
                    </svg>
                </label>
                <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                />
            </div>
            <label htmlFor="avatar" className="mt-2 block text-sm font-medium text-[#061A40]">
                Unggah Avatar
            </label>
        </div>
    );
}
