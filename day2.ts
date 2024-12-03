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
        let isRowSafe = isSafe(myArray[i]);
        if (isRowSafe) {
            safeCount++;
        }
    }
    console.log(safeCount);
}

function isSafe(myArray: number[]): boolean {
    let lastDiff: number = 0;
    let isSafe = true;
    for (let j = 1; j < myArray.length && isSafe; ++j) {
        let num1 = myArray[j],
            num2 = myArray[j - 1],
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
    return isSafe;
}

async function partTwo() {
    const myArray = await parse("input/day2.txt");

    let safeCount = 0;
    for (let i = 0; i < myArray.length; ++i) {
        let lastDiff: number = 0;
        let isRowSafe = true;
        for (let j = 1; j < myArray[i].length && isRowSafe; ++j) {
            let num1 = myArray[i][j],
                num2 = myArray[i][j - 1],
                currentDiff = num1 - num2;
            if (
                Math.abs(currentDiff) > 3 ||
                currentDiff === 0 ||
                currentDiff * lastDiff < 0
            ) {
                let myArray2 = [...myArray[i]];
                let myArray3 = [...myArray[i]];
                myArray[i].splice(j - 1, 1);
                myArray2.splice(j, 1);
                // myArray3.splice(j + 1, 1);
                isRowSafe =
                    isSafe(myArray[i]) || isSafe(myArray2) || isSafe(myArray3);
            }
            lastDiff = currentDiff;
        }
        if (isRowSafe) {
            safeCount++;
        }
    }
    console.log(safeCount);
}

async function main() {
    // partOne();
    partTwo();
}

main();
