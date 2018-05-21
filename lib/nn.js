function sigmoid(x) {
	return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y){
	return y*(1-y);
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

		this.bias_h = new Matrix(this.hidden_nodes,1);
		this.bias_o = new Matrix(this.output_nodes,1);
		this.bias_h.randomize();
		this.bias_o.randomize();
		this.learning_rate = 0.1;

	}

	feedforward(input_array){

		// generating hidden outputs
		let inputs = Matrix.fromArray(input_array);
		let hidden = Matrix.multiply(this.weights_ih,inputs);
		hidden.add(this.bias_h);
		hidden.map(sigmoid); // activation function

		// generaing output's output
		let output = Matrix.multiply(this.weights_ho,hidden);
		output.add(this.bias_o);
		output.map(sigmoid); // activation function

		return output.toArray(); 
	}

	train(input_array,target_array){
		
		// generating hidden outputs
		let inputs = Matrix.fromArray(input_array);
		let hidden = Matrix.multiply(this.weights_ih,inputs);
		hidden.add(this.bias_h);
		hidden.map(sigmoid); // activation function

		// generaing output's output
		let outputs = Matrix.multiply(this.weights_ho,hidden);
		outputs.add(this.bias_o);
		outputs.map(sigmoid); // activation function

		let targets = Matrix.fromArray(target_array);

		let output_errors = Matrix.subtract(targets,outputs);

		let gradients = Matrix.map(outputs,dsigmoid);
		gradients.multiply(output_errors);
		gradients.multiply(this.learning_rate);

		// Calculate deltas
		let hidden_t = Matrix.transpose(hidden);
		let ho_weight_deltas = Matrix.multiply(gradients,hidden_t);

		this.weights_ho.add(ho_weight_deltas);
		this.bias_o.add(gradients);

		let weights_ho_t = Matrix.transpose(this.weights_ho);

		let hidden_errors = Matrix.multiply(weights_ho_t,output_errors);

		// Calculate hidden gradients
		let hidden_gradients = Matrix.map(hidden,dsigmoid);
		hidden_gradients.multiply(hidden_errors);
		hidden_gradients.multiply(this.learning_rate);

		// caluclate input->hidden deltas
		let inputs_t = Matrix.transpose(inputs);
		let ih_weight_deltas = Matrix.multiply(hidden_gradients,inputs_t)

		this.weights_ih.add(ih_weight_deltas);
		this.bias_h.add(hidden_gradients);

		// hidden_errors.print();
		// outputs.print();
		// targets.print();
		// output_errors.print();

	}
}