export const extractVerificationCode = (emailContent: string): string => {
    // @ts-ignore: Object is possibly 'null'.
    return emailContent.match(/\b\d{6}\b/g)[0];
}

export default { extractVerificationCode };
