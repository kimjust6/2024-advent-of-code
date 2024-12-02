async function parse(): Promise<[number[], number[]]> {
    const path = "input/day2.txt";
    const myFile = Bun.file(path);

    const myStream = await myFile.text();

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
