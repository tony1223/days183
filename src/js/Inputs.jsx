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

		var m=s.match(/^(\d{2,3})(\d{2})(\d{2})$/);
		if(!m) return null;

		var d = new Date((parseInt(m[1],10)+1911)+'-'+m[2]+'-'+m[3])
		if(isNaN(d.getTime())) return null;

		var y = d.getFullYear();
		if(y < 2000 || y > 2063) return null;

		return d
	},

	getDateFromString2: function(s){

		var m=s.match(/^(\d{4})(\d{2})(\d{2})$/);
		if(!m) return null;

		var d = new Date((parseInt(m[1],10))+'/'+m[2]+'/'+m[3])
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
			case 81: // Q
			case 109: //-
				this.setState({dep:true});
				break;
			case 87: // W
			case 107: //+
				this.setState({dep:false});
				break;
			case 69:  // E
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
	importFromText:function(){

		var val = React.findDOMNode(this.refs.import).value;

		var lines = val.split("\n");
		var records = [];
		var that = this;


		lines.forEach(function(line){
			if(line){
				var tokens = line.split(/[ \t]+/);

				if(tokens[1] == "出境" || tokens[1] =="入境"){
					var dep = null;

					if(tokens[1] == "出境"){
						dep = true;
					}else if(tokens[1] == "入境"){
						dep = false;
					}

					if(dep != null ){
						records.push({
							date:that.getDateFromString2(tokens[2]),
							dep: dep
						});
						debugger;
					}
				}
				
			}
		});


		this.props.setRecords(records);

		// date:this.getDateFromString(this.state.input),
		// dep: this.state.dep,

		// this.props.setRecords();
	},
	componentDidMount: function() {
		ReactDOM.findDOMNode(this.refs.input).focus();
	},
	render:function(){
		return(
			<div>
				<h2>移民署格式匯入（承辦作業專用）</h2>
				<textarea ref="import" onChange={this.importFromText} style={{width:"60%",height:"200px"}} ></textarea>

				<hr />

				<h2>手動輸入</h2>
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
				<hr />
			</div>
		);
	}
});

module.exports = Inputs;
