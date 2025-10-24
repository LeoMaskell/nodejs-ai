const synaptic = require('synaptic');
const { Neuron, Layer, Network, Trainer } = require('synaptic');


// define the network
const A = new Layer(784);
const B = new Layer(50);
const C = new Layer(10);
A.project(B); // A - B connection
B.project(C); // B - C connection
A.set({ squash: Neuron.squash.HLIM });
B.set({ squash: Neuron.squash.ReLU });    // squashing function for B
C.set({ squash: Neuron.squash.SIGMOID }); // squashing function for C

const net = new Network({
	input: A,
	hidden: [B],
	output: C
});
console.log(net);


// dataset setup
const mnist = require('mnist');
const set = mnist.set(600, 20);
const trainSet = set.training;
const testSet = set.testing;


// training
var trainer = new Trainer(net);

trainer.train(trainSet, {
	rate: .1,
	iterations: 20000,
	error: .1,
	shuffle: true,
	log: 1,
	cost: Trainer.cost.CROSS_ENTROPY
});

// testing
for (i = 0; i<10; i++) {
	let list = net.activate(mnist[i].get()); // preparing for a binary step function
	let Nlist = [];
	for (n=0; n<list.length; n++) {
		if (list[n] > 0.6) {
			Nlist.push(1);
		} else {
			Nlist.push(0);
		};
	};


	console.log((Nlist), 'should be a', i); // should be the i'th term
};
