const { loadDataset } = require(__dirname + '/dataset/dataset.js');

async function main() {
    try {
        const df = await loadDataset();

        // Split the dataset into training and test sets
        const testSize = Math.floor(df.length * 0.15);
        const shuffled = df.sort(() => Math.random() - 0.5); // Shuffle the array
        const testSet = shuffled.slice(0, testSize);
        const trainSet = shuffled.slice(testSize);

        // Return the train and test sets
        return { trainSet, testSet };
    } catch (error) {
        console.error('Failed to load dataset:', error);
        return null;
    }
}

// actually using the data
main().then(({ trainSet, testSet }) => {
    console.log(`the train-set length: \n${trainSet.length}`);
    console.log(`the test-set length: \n${testSet.length}`);

    
});