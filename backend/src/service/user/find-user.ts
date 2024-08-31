import {
    PaginationResult,
} from "../../utils/interface/pagination-interface";
import {
    fetchTotalUsers,
    fetchUsers
} from "../../utils/validations/user-check";
import { SearchInterface } from "../../utils/interface/search-interface";
import { buildSearchCondition } from "../../utils/validations/query-search-user";

export const findUser = async (search: SearchInterface, pagination: PaginationResult) => {
    const { limit, offset } = pagination;
    const searchCondition = buildSearchCondition(search.search);

    const [results, totalUsers] = await Promise.all([
        fetchUsers(searchCondition, limit, offset),
        fetchTotalUsers(searchCondition)
    ]);

    const formattedResults = results.map(result => ({
        id: result.id,
        name: result.name,
        username: result.username,
        email: result.email,
        phone: result.phone,
        avatar: result.avatar,
        role: {
            id: result.roleId,
            name: result.roleName
        }
    }));

    return {
        results: formattedResults,
        total: Number(totalUsers),
    };
};
