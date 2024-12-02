async function parse(): Promise<[number[], number[]]> {
    const path = "input/day1.txt";
    const myFile = Bun.file(path);

    const myStream = await myFile.text();
    // const decoder = new TextDecoder();

    let leftArray: number[] = [];
    let rightArray: number[] = [];

    for (const chunk of myStream.split("\n")) {
        const arr = chunk.split(/\s+/);

        const leftNumber = parseInt(arr[0]);

        const rightNumber = parseInt(arr[1]);
        if (!isNaN(leftNumber)) {
            leftArray.push(leftNumber);
        }
        if (!isNaN(rightNumber)) {
            rightArray.push(rightNumber);
        }
    }
    return [leftArray, rightArray];
}

async function parseMap(): Promise<[Map<number, number>, Map<number, number>]> {
    const path = "input/input.txt";
    const myFile = Bun.file(path);

    const myStream = await myFile.text();

    let leftArray: Map<number, number> = new Map<number, number>();
    let rightArray: Map<number, number> = new Map<number, number>();

    for (const chunk of myStream.split("\n")) {
        const arr = chunk.split(/\s+/);

        const leftNumber = parseInt(arr[0]);

        const rightNumber = parseInt(arr[1]);
        if (!isNaN(leftNumber)) {
            leftArray.set(leftNumber, (leftArray.get(leftNumber) ?? 0) + 1);
        }
        if (!isNaN(rightNumber)) {
            rightArray.set(rightNumber, (rightArray.get(rightNumber) ?? 0) + 1);
        }
    }
    return [leftArray, rightArray];
}

function getSmallestNumberIndex(array: number[]): number {
    let smallestNumber = array[0];

    let i = 0;
    let returnIndex = 0;
    for (; i < array.length; i++) {
        if (array[i] < smallestNumber) {
            smallestNumber = array[i];
            returnIndex = i;
        }
    }

    return returnIndex;
}

async function partOne() {
    let [leftArray, rightArray] = await parse();

    let difference = 0;
    while (leftArray.length > 0 && rightArray.length > 0) {
        let leftIndex = getSmallestNumberIndex(leftArray);
        let rightIndex = getSmallestNumberIndex(rightArray);

        difference += Math.abs(leftArray[leftIndex] - rightArray[rightIndex]);
        leftArray.splice(leftIndex, 1);
        rightArray.splice(rightIndex, 1);
    }

    console.log(difference);
}

async function partTwo() {
    let sum = 0;
    let [leftMap, rightMap] = await parseMap();
    for (let [key, value] of leftMap) {
        if (rightMap.has(key)) {
            sum += key * (rightMap.get(key) ?? 0);
        }
    }

    console.log(sum);
}

async function main() {
    partTwo();
}

main();
