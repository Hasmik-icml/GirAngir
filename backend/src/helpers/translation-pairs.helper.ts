
export default function translationPairs(contentsIds: number[]): [number, number][] {
    const translationPairs: [number, number][] = [];

    for (let i = 0; i < contentsIds.length; i++) {
        for (let j = i + 1; j < contentsIds.length; j++) {
            translationPairs.push([contentsIds[i], contentsIds[j]]);
        }
    }

    return translationPairs;
}
