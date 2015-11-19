require('../css/App.scss')
require('../index.html')

var App = React.createClass({
	getInitialState: function() {
		return {
			inputDate: '',
			dep:true,
			enabled:false,
			records:[]
		};
	},
	setDep:function(){
		this.setState({dep:true});
	},
	setArr:function(){
		this.setState({dep:false});
	},
	getDate:function(s){
		var m=s.match(/^(\d{2,3})(\d{2})(\d{2})$/)
		if(m){
			var d = new Date((parseInt(m[1],10)+1911)+'-'+m[2]+'-'+m[3])
			if(!isNaN(d.getTime())) return d
		}
		return null;
	},
	inputChange:function(e){
		var s = e.target.value.replace(/\D/g,'').substr(0,7)
		var date = this.getDate(s)
		var enabled = date!=null;
		this.setState({
			inputDate:s,
			date:date,
			enabled:enabled
		})
	},
	inputDown:function(e){
		if(e.keyCode==13 && this.state.enabled){
			this.addRecord();
		}
	},
	sortDate:function(r1,r2){
		return r1.date.getTime()-r2.date.getTime()
	},
	addRecord:function(){
		var r = this.state.records.concat({
			date:this.state.date,
			dep: this.state.dep,
		})
		r.sort(this.sortDate)
		this.setState({
			inputDate:'',
			enabled:false,
			dep: !this.state.dep,
			records:r
		})
	},
	removeRecord:function(idx){
		return function(){
			var r = this.state.records.concat();
			r.splice(idx,1)
			this.setState({
				records:r
			})
		}.bind(this)
	},
	componentDidMount: function() {
		ReactDOM.findDOMNode(this.refs.input).focus();
	},
	render:function(){
		console.log(this.state.records)
		var result='';
		if(this.state.records.length>0){
			var last = this.state.records[this.state.records.length-1]
		}
		return(
			<div className='app'>
				出入境紀錄<br/>
				日期格式: 1030602<br/>
				<input type='text' ref='input' placeholder='輸入日期' value={this.state.inputDate} onKeyDown={this.inputDown} onChange={this.inputChange}/>
				<button className={this.state.enabled?'enabled':'disabled'} onClick={this.addRecord}>加入</button>
				{'  '}
				<button className={ this.state.dep?'active':'deactive'} onClick={this.setDep}>出境</button>
				<button className={!this.state.dep?'active':'deactive'} onClick={this.setArr}>入境</button>
				<br/>
				<hr/>
				{this.state.records.map(function(r,i){
					var d = r.date.toJSON().substr(0,10).split('-')
					d[0]=parseInt(d[0],10)-1911;
					var s=d.join('-')

					return(
						<div className='record' key={JSON.stringify(r)} onClick={this.removeRecord(i)}>
							<span>{s}</span>
							<span>{r.dep?'出境':'入境'}</span>
						</div>
					)
				}.bind(this))}
				<hr/>
				{result}
			</div>
		);
	}
});

module.exports = App;
ReactDOM.render(<App/>,$('#wrapper')[0])
