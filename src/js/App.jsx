require('../css/App.scss');
require('../index.html');

var Inputs = require('Inputs.jsx');
var Records = require('Records.jsx');
var serializer = require('RecordsSerializer.js')


console.clear();



/*
 █████  ██████  ██████
██   ██ ██   ██ ██   ██
███████ ██████  ██████
██   ██ ██      ██
██   ██ ██      ██
*/
var App = React.createClass({
	getInitialState: function() {
		return {
			records:[],
			hash:''
		};
	},





	/*
	██████  ███████  ██████  ██████  ██████  ██████  ███████
	██   ██ ██      ██      ██    ██ ██   ██ ██   ██ ██
	██████  █████   ██      ██    ██ ██████  ██   ██ ███████
	██   ██ ██      ██      ██    ██ ██   ██ ██   ██      ██
	██   ██ ███████  ██████  ██████  ██   ██ ██████  ███████
	*/
	addRecord:function(r){
		var rr = this.state.records;
		rr.push(r);
		rr.sort(function(r1,r2){
			return r1.date.getTime()-r2.date.getTime()
		});
		this.setRecords(rr);
	},
	removeRecord:function(idx){
		var rr = this.state.records;
		rr.splice(idx,1)
		this.setRecords(rr)
	},
	toggleRecord:function(idx){
		var rr = this.state.records;
		rr[idx].dep = !rr[idx].dep;
		this.setRecords(rr)
	},


	setRecords:function(rr){
		var hash = serializer.stringify(rr);
		window.location.hash=hash;
		this.setState({
			records: rr,
			hash: hash
		})
	},






	/*
	 ██████ ██████  ███    ███
	██      ██   ██ ████  ████
	██      ██   ██ ██ ████ ██
	██      ██   ██ ██  ██  ██
	 ██████ ██████  ██      ██
	*/
	componentDidMount: function() {
		var hash = window.location.hash.replace(/^#/,'');
		var rr = serializer.parse(hash);
		this.setRecords(rr);
	},

	/*
	██████  ███████ ███    ██ ██████  ███████ ██████
	██   ██ ██      ████   ██ ██   ██ ██      ██   ██
	██████  █████   ██ ██  ██ ██   ██ █████   ██████
	██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██
	██   ██ ███████ ██   ████ ██████  ███████ ██   ██
	*/
	render:function(){
		var hashURL = window.location.origin+window.location.pathname+'#'+this.state.hash;
		return(
			<div className='app'>
				<h1>1 8 3</h1>

				<Inputs addRecord={this.addRecord}/>
				日期格式: 1030602<br/>


				<Records
					records={this.state.records}
					removeRecord={this.removeRecord}
					toggleRecord={this.toggleRecord}
					/>

				<br/>

				{this.state.hash==''?null:
					<div>
						記錄網址: <a href={hashURL}>{hashURL}</a>
					</div>
				}
				<br/>
				<br/>
				<div className='tips'>
					<p>
						輸入框中<br/>
						按 Q 或 Numpad+ 可切換為 [入境]<br/>
						按 W 或 Numpad- 可切換為 [出境]<br/>
						按 E 或 Numpad/ 可切換[出境]與[入境]<br/>
					</p>
					<p>
						記錄的出入境標記可點擊以切換<br/>
						Ctrl-點擊記錄的移除標記可略過確認框
					</p>
				</div>
				<br/>
				<a href="https://github.com/scars377/days183" style={{fontSize:'12px'}} target="_blank">
					https://github.com/scars377/days183
				</a>
			</div>
		);
	}
});

module.exports = App;
ReactDOM.render(<App/>,$('#wrapper')[0])
