async function parse(path: string): Promise<number[][]> {
    const myFile = Bun.file(path);

    const myStream = await myFile.text();

    let arrayOfArray: number[][] = [];

    for (const chunk of myStream.split("\n")) {
        const arr = chunk.split(/\s+/);
        const row = [];
        for (let i = 0; i < arr.length; i++) {
            const asNumber = parseInt(arr[i]);
            row.push(asNumber);
        }
        arrayOfArray.push(row);
    }
    return arrayOfArray;
}

async function partOne() {
    const myArray = await parse("input/day2.txt");

    let safeCount = 0;
    for (let i = 0; i < myArray.length; ++i) {
        let lastDiff: number = 0;
        let isSafe = true;
        for (let j = 1; j < myArray[i].length && isSafe; ++j) {
            let num1 = myArray[i][j],
                num2 = myArray[i][j - 1],
                currentDiff = num1 - num2;
            if (
                Math.abs(currentDiff) > 3 ||
                currentDiff === 0 ||
                currentDiff * lastDiff < 0
            ) {
                isSafe = false;
            }
            lastDiff = currentDiff;
        }
        if (isSafe) {
            safeCount++;
        }
    }
    console.log(safeCount);
}

async function main() {
    partOne();
}

main();
