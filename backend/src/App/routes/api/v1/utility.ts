export function createResponse(payload: any, isError = false, errorMessage = ""): Record<string, any> {
    if (isError) return { isError, errorMessage, payload };
    return { isError, payload };
}

export const temp = 0;
