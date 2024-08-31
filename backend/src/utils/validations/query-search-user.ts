import {
    or,
    eq,
    like
} from "drizzle-orm";
import { users } from "../../database/schema";

export const buildSearchCondition = (search?: string) => search
    ? or(
        eq(users.id, search),
        like(users.name, `%${search}%`),
        like(users.username, `%${search}%`),
        like(users.email, `%${search}%`)
    )
    : undefined;
