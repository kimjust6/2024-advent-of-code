async function parse(): Promise<[number[], number[]]> {
    const path = "input/input.txt";
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

async function main() {
    let [leftArray, rightArray] = await parse();

    let difference = 0;
    // console.log(getSmallestNumberIndex(rightArray));
    while (leftArray.length > 0 && rightArray.length > 0) {
        let leftIndex = getSmallestNumberIndex(leftArray);
        let rightIndex = getSmallestNumberIndex(rightArray);

        difference += Math.abs(leftArray[leftIndex] - rightArray[rightIndex]);
        leftArray.splice(leftIndex, 1);
        rightArray.splice(rightIndex, 1);
    }

    console.log(difference);
}

main();
