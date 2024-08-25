import { db } from "../../database/connections";
import { roles } from "../../database/schema";
import { BaseError } from "../responses/base-error";
import { StatusCodes } from "http-status-codes";
import { eq } from "drizzle-orm";

export const checkRoleValidity = async (roleName: string) => {
    const [role] = await db.select().from(roles)
        .where(eq(roles.name, roleName))
        .limit(1)
        .execute();

    if (!role) {
        throw new BaseError(StatusCodes.BAD_REQUEST, "Invalid role name");
    }

    return role.id;
};
