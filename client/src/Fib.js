import React, {
	Component
} from 'react';
import axios from 'axios';

class Fib extends Component {
	state = {
		seenIndice: [],
		values: {},
		index: ''
	};

	componentDidMount() {
		this.fetchValues();
		this.fetchIndice();
	}

	async fetchValues() {
		const values = await axios.get('/api/values/current');
		this.setState({
			values: values.data
		});
	}

	async fetchIndice() {
		const seenIndice = await axios.get('/api/values/all');
		this.setState({
			seenIndice : seenIndice.data
		});
	}

	render() {
		return (
				<div>
					<form onSubmit={this.handleSubmit}>
						<label>Enter your index</label>
						<input value={this.state.index} 
							   onChange={ev=>this.setState({index: ev.target.value })} />
						<button>Submit</button>
					</form>
					<h3>Indice I have seen</h3>
					{this.renderSeenIndice()}
					<h3>Calculated values</h3>
					{this.renderCalcValues()}
				</div>
			);
	}

	renderSeenIndice() {
		return this.state.seenIndice.map(x=>x.number).join(', ');
	}

	renderCalcValues() {
		const entries = [];
		for(let key in this.state.values) {
			entries.push(
					<div key={key}>
						For {key}, calculated {this.state.values[key]}
					</div>
				);
		}

		return entries;
	}

	handleSubmit = async (ev) => {
		ev.preventDefault();

		await axios.post('/api/values', {
			index: this.state.index
		});

		this.setState({
			index: ''
		});
	}
}

export default Fib;







