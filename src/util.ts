export function getRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function getRandomInteger(min: number, max: number): number {
    return Math.floor(getRandom(min, max));
}