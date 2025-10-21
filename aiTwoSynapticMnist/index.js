const synaptic = require('synaptic');
const { Neuron, Layer, Network, Trainer } = require('synaptic');


// define the network
const A = new Layer(784);
const B = new Layer(10);
A.project(B); // A - B connection
B.set({ squash: Neuron.squash.Sigmoid }); // squashing function

const net = new Network({
	input: A,
	hidden: [],
	output: B
});
console.log(net);


// dataset setup
const mnist = require('mnist');
const set = mnist.set(500, 20);
const trainSet = set.training;
const testSet = set.testing;


// training
var trainer = new Trainer(net);

trainer.train(trainSet, {
	rate: .1,
	iterations: 20000,
	error: .005,
	shuffle: true,
	log: 1000,
	cost: Trainer.cost.CROSS_ENTROPY
});
