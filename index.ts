async function parse() {
    const path = "input/input.txt";
    const myFile = Bun.file(path);

    const myStream = await myFile.text();
    const decoder = new TextDecoder();

    let arrayLeft = [];
    let arrayRight = [];

    for (const chunk of myStream.split("\n")) {
        const arr = chunk.split("\\s+");
        arrayLeft.push(arr[0]);
        arrayRight.push(arr[1]);
    }
}

async function main() {
    await parse();
}

main();
