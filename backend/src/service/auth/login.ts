import { GenerateToken } from "../../utils/jwt";
import { verifyUserCredentials } from "../../utils/validations/user-check";

export const Login = async (email: string, password: string) => {
    const user = await verifyUserCredentials(email, password);

    const token = GenerateToken({
        id: user.id,
        username: user.username,
        roleId: user.roleId,
    });

    return {
        ...user,
        token
    };
};
