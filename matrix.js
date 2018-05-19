class Matrix{

	constructor(rows, columns){
		this.rows = rows;
		this.columns = columns;
		this.data = [];

		for (let i = 0; i < this.rows; i++) {
			this.data[i] = [];
			for (let j = 0; j < this.columns; j++) {
				this.data[i][j] = 0;
			}
		}
	}

	randomize(){
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
				this.data[i][j] = Math.random()*2 - 1;
			}
		}
	}

	add(n){
		if(n instanceof Matrix){
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.columns; j++) {
					this.data[i][j] += n.data[i][j];
				}
			}
		}else{
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.columns; j++) {
					this.data[i][j] += n;
				}
			}
		}
	}

	static matrixMultiply(m1,m2){
		if(m1 instanceof Matrix && m2 instanceof Matrix){
			if(m2.rows !== m1.columns){
				console.log('Column A must match rows of B');
				return undefined;
			}

			let result = new Matrix(m1.rows, m2.columns);

			for (let i = 0; i < result.rows; i++) {
				for (let j = 0; j < result.columns; j++) {
					let sum = 0;
					for (let k = 0; k < m1.columns; k++) {
						sum += m1.data[i][k] * m2.data[k][j];
					}
					result.data[i][j] = sum;
				}
			}
			return result;
		}
		return undefined;
	}

	static fromArray(arr){
		let result = new Matrix(arr.length,1);
		for (var i = 0; i < arr.length; i++) {
			result.data[i][0] = arr[i];
		}
		return result;
	}

	toArray(){
		let arr = [];
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
				arr.push(this.data[i][j]);
			}
		}
		return arr;
	}

	map(func){
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
				this.data[i][j] = func(this.data[i][j]);
			}
		}
	}

	multiply(n){
		if(n instanceof Matrix){
			if(n.rows !== this.columns){
				console.log('Column A must match rows of B');
				return undefined;
			}

			let result = new Matrix(this.rows, n.columns);

			for (let i = 0; i < result.rows; i++) {
				for (let j = 0; j < result.columns; j++) {
					let sum = 0;
					for (let k = 0; k < this.columns; k++) {
						sum += this.data[i][k] * n.data[k][j];
					}
					result.data[i][j] = sum;
				}
			}
			return result;

		}else{
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.columns; j++) {
					this.data[i][j] *= n;
				}
			}
		}
	}

	transpose(){
		let result = new Matrix(this.columns,this.rows);
		for (let i = 0; i < result.rows; i++) {
			for (let j = 0; j < result.columns; j++) {
				result.data[i][j] = this.data[j][i];
			}
		}
		return result;
	}

	print(){
		console.table(this.data);
	}
}