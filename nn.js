function sigmoid(x) {
	return 1 / (1 + Math.exp(-x));
}

class NeuralNetwork{

	constructor(input_nodes, hidden_nodes, output_nodes){
		this.input_nodes = input_nodes;
		this.hidden_nodes = hidden_nodes;
		this.output_nodes = output_nodes;

		this.weights_ih = new Matrix(this.hidden_nodes,this.input_nodes);
		this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
		this.weights_ih.randomize();
		this.weights_ho.randomize();

		this.bias_h = new Matrix(this.input_nodes,1);
		this.bias_o = new Matrix(this.hidden_nodes,1);

	}

	feedforward(input_array){

		// generating hidden outputs
		let inputs = Matrix.fromArray(input_array);
		let hidden = Matrix.matrixMultiply(this.weights_ih,inputs);
		hidden.add(this.bias_h);

		// activation function
		hidden.map(sigmoid);

		// generaing output's output
		let output = Matrix.matrixMultiply(this.weights_ho,hidden);
		output.add(this.bias_o);
		output.map(sigmoid);

		return output.toArray();
	}
}