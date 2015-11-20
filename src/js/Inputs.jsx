require('../css/Inputs.scss');





var Inputs = React.createClass({
	getInitialState: function() {
		return {
			dep: false,
			input: '',
			enabled:false,
		};
	},

	getDateFromString: function(s){
		var m=s.match(/^(\d{2,3})(\d{2})(\d{2})$/)
		if(!m) return null;

		var d = new Date((parseInt(m[1],10)+1911)+'-'+m[2]+'-'+m[3])
		if(isNaN(d.getTime())) return null;

		var y = d.getFullYear();
		if(y < 2000 || y > 2063) return null;

		return d
	},

	setDep:function(dep){
		return function(){
			this.setState({dep:dep})
		}.bind(this)
	},
	inputChange:function(e){
		var s = e.target.value.replace(/\D/g,'').substr(0,7)
		var enabled = this.getDateFromString(s)!=null;
		this.setState({
			input:s,
			enabled:enabled,
		})
	},
	inputDown:function(e){
		switch(e.keyCode){
			case 13://enter
				if(this.state.enabled) this.addRecord()
				break;
			case 81: // q
			case 109: //-
				this.setState({dep:true});
				break;
			case 87: // w
			case 107: //+
				this.setState({dep:false});
				break;
			case 111:  // /
				this.setState({dep:!this.state.dep})
				break;

			default:
				// console.log(e.keyCode);
		}
	},
	addRecord:function(){
		this.props.addRecord({
			date:this.getDateFromString(this.state.input),
			dep: this.state.dep,
		})
		this.setState({
			input:'',
			enabled:false,
			dep: !this.state.dep
		})
	},

	componentDidMount: function() {
		ReactDOM.findDOMNode(this.refs.input).focus();
	},
	render:function(){
		return(
			<div className='inputs'>

				<button
					className={'dep '+( this.state.dep?'active':'deactive')}
					onClick={this.setDep(true)}
					>
					出境
				</button>

				<button
					className={'arr '+(!this.state.dep?'active':'deactive')}
					onClick={this.setDep(false)}
					>
					入境
				</button>

				<input
					type='text'
					ref='input'
					placeholder='輸入日期'
					value={this.state.input}
					onKeyDown={this.inputDown}
					onChange={this.inputChange}/>

				<button
					className={this.state.enabled?'enabled':'disabled'}
					onClick={this.addRecord}
					>
					加入
				</button>
			</div>
		);
	}
});

module.exports = Inputs;
