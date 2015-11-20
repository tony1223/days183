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

		var rr = this.state.records;
		var conflict = false;
		if(rr.length>0){
			var depFlag=rr[0].dep;
			conflict = rr.some(function(r,i){
				//與第一項作 XOR, 應該奇數列為0, 偶數列為1
				//偶數列反轉, 應該最後為全0, 有1就是衝突
				return r.dep^depFlag^(i%2) !=0;
			})
		}

		return(
			<div className='app'>
				<h2>出入境紀錄</h2>
				日期格式: 1030602<br/>

				<Inputs addRecord={this.addRecord}/>


				<Records
					records={rr}
					removeRecord={this.removeRecord}
					toggleRecord={this.toggleRecord}
					/>

				{this.state.hash==''?null:
					<div>
						記錄網址: <a href={hashURL}>{hashURL}</a>
					</div>
				}
				<br/>
				{conflict?'出入境記錄有衝突':''}
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
