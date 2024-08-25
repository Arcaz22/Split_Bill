import { db } from "../../database/connections";
import { users, roles } from "../../database/schema";
import { eq, like, or } from "drizzle-orm";
import { PaginationInterface, calculatePagination } from "../../utils/interface/pagination-interface";
import { SearchInterface } from "../../utils/interface/search-interface";

export const findUser = async (search: SearchInterface, pagination: PaginationInterface) => {
    const { limit, offset } = calculatePagination(pagination.page, pagination.length);

    const searchCondition = search.search
        ? or(
            eq(users.id, search.search),
            like(users.username, `%${search.search}%`),
            like(users.email, `%${search.search}%`)
        )
        : undefined;

    const results = await db.select({
        id: users.id,
        username: users.username,
        email: users.email,
        phone: users.phone,
        avatar: users.avatar,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        roleId: users.roleId,
        roleName: roles.name
    })
    .from(users)
    .leftJoin(roles, eq(users.roleId, roles.id))
    .where(searchCondition)
    .limit(limit)
    .offset(offset)
    .execute();

    const total = await db.select({ count: users.id }).from(users)
        .where(searchCondition)
        .execute();

    const totalUsers = total.length;

    const formattedResults = results.map(result => ({
        id: result.id,
        username: result.username,
        email: result.email,
        phone: result.phone,
        avatar: result.avatar,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        role: {
            id: result.roleId,
            name: result.roleName
        }
    }));

    return {
        results: formattedResults,
        total: totalUsers,
        page: pagination.page || 1,
        length: pagination.length || 10,
    };
};
