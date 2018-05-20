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
		hidden.map(sigmoid); // activation function

		// generaing output's output
		let output = Matrix.matrixMultiply(this.weights_ho,hidden);
		output.add(this.bias_o);
		output.map(sigmoid); // activation function

		return output.toArray(); 
	}

	train(inputs,targets){
		let outputs = this.feedforward(inputs);
		outputs = Matrix.fromArray(outputs);
		targets = Matrix.fromArray(targets);

		let output_errors = Matrix.subtract(targets,outputs);

		let weights_ho_t = Matrix.transpose(this.weights_ho);

		let hidden_errors = Matrix.matrixMultiply(weights_ho_t,output_errors);

		hidden_errors.print();
		// outputs.print();
		// targets.print();
		// output_errors.print();

	}
}