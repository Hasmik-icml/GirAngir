
export class TranslationPairs {

    public static newPairs(contentsIds: string[]): string[][] {
        const newPairs: string[][] = [];

        for (let i = 0; i < contentsIds.length; i++) {
            for (let j = i + 1; j < contentsIds.length; j++) {
                newPairs.push([contentsIds[i], contentsIds[j]]);
            }
        }

        return newPairs;
    }

    public static pairsToRemove(newPairs: string[][], existingPairs: string[][]): string[][] {
        const pairsToRemove = existingPairs.filter(existingPair => {
           return !newPairs.some(pair => (pair[0] === existingPair[1] && pair[1] === existingPair[2]) || (pair[0] === existingPair[2] && pair[1] === existingPair[1]));
        })
        return pairsToRemove;

    }

    public static pairsToCreate(newPairs: string[][], existingPairs: string[][]): string[][] {
        const pairsToCreate = newPairs.filter(newPairs => {
            return !existingPairs.some(pair => (pair[0] === newPairs[0] && pair[1] === newPairs[1]) || (pair[0] === newPairs[1] && pair[1] === newPairs[0]))
        });

        return pairsToCreate;
    }
}


