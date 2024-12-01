async function parse(): Promise<[Map<number, number>, Map<number, number>]> {
    const path = "input/input.txt";
    const myFile = Bun.file(path);

    const myStream = await myFile.text();
    const decoder = new TextDecoder();

    // let arrayLeft = [];
    // let arrayRight = [];

    let leftMap = new Map<number, number>();
    let rightMap = new Map<number, number>();

    for (const chunk of myStream.split("\n")) {
        const arr = chunk.split("\\s+");
        const leftNumber = parseInt(arr[0]);
        const rightNumber = parseInt(arr[1]);

        leftMap.set(leftNumber, leftMap.get(leftNumber) ?? 0 + 1);
        rightMap.set(rightNumber, rightMap.get(rightNumber) ?? 0 + 1);
    }

    return [leftMap, rightMap];
}

async function main() {
    const [leftMap, rightMap] = await parse();

}

main();
