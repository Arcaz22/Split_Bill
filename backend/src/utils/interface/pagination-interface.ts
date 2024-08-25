export interface PaginationInterface {
    page?: number;
    length?: number;
}

export const calculatePagination = (page: number = 1, length: number = 10) => {
    return {
        limit: Math.max(length, 1),
        offset: Math.max((page - 1) * length, 0)
    };
};
