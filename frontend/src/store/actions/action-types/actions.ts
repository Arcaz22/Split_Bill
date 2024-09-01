export function actionSuccess<T>(type: string, data: T) {
    return {
        type: type,
        data: data,
    };
}

export function actionError(type: string, error: string) {
    return {
        type: type,
        error: error,
    };
}

export function actionPending(type: string) {
    return {
        type: type,
    };
}
