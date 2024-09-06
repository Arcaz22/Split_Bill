import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormField from '@/lib/components/form-field';
import { useState } from 'react';
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { changePassword } from "@/store/actions/user/change-password";

export const ChangePassword = () => {
    const dispatch: AppDispatch = useDispatch();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleChangePassword = async () => {
        setLoading(true);

        try {
            await dispatch(changePassword(formData));
        } catch (error) {
            console.error("Error Change Password:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex items-center justify-between gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1">Change Password</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            id="oldPassword"
                            label="Old Password"
                            type="password"
                            value={formData.oldPassword}
                            onChange={handleInputChange}
                        />
                        <FormField
                            id="newPassword"
                            label="New Password"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                        />
                        <FormField
                            id="confirmNewPassword"
                            label="Confirm New Password"
                            type="password"
                            value={formData.confirmNewPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mt-8 flex justify-end">
                        <Button onClick={handleChangePassword} disabled={loading}>
                            {loading ? 'Loading...' : 'Perbarui'}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
