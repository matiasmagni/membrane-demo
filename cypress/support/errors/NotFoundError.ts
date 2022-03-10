export default class NotFoundError extends Error {
    constructor(elementName: string) {
        super(`${elementName} could not be found!`);
    }
}
