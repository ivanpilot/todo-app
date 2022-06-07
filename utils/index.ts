export function reportError(error: unknown) {
    if (error instanceof Error) {
        return { msg: error.message, stack: error.stack };
    }
    return 'unknown error';
}
