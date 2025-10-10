// mushroom AI
const synaptic = require("synaptic");

// defining the model
var A = new synaptic.Layer(5);
var B = new synaptic.Layer(2);
A.project(B);

var learningRate = .3;

for (var i = 0; i < 20000; i++)
{
	// when A activates [1, 0, 1, 0, 1]
	A.activate([1,0,1,0,1]);

	// train B to activate [0,0]
	B.activate();
	B.propagate(learningRate, [0,0]);
}

// test it
A.activate([1,0,1,0,1]);
console.log(B.activate()); // [0.004606949693864496, 0.004606763721459169]
// loading the dataset
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