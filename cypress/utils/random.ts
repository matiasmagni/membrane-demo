/**
 * Returns a new array containing N random elements determined by the num param.
 * 
 * @param num The number of random elements to be returned.
 * @param array The array to be scaned. 
 * @returns An array of N random elements.
 */
export const getNRandomElementsFrom = (num: number, array: Array<any>) => {
    const shuffled = array.sort(() => .5 - Math.random());

    return shuffled.slice(0, num);
};

/**
 * Returns a random element from the given array.
 * 
 * @param array The array to be scaned.
 * @returns An array of N random elements 
 */
export const getRandomElementFrom = (array: Array<any>) =>
    array[Math.floor(Math.random() * array.length)];

export default { getNRandomElementsFrom, getRandomElementFrom };