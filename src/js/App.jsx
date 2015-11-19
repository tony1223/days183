require('../css/App.scss')
require('../index.html')
require('file?name=[path][name].[ext]!../css/bootstrap.min.css')

console.clear();

function cx(o) {
	return Object.keys(o).filter(function(k) {
		return o[k]
	}).join(' ');
}

function toDateString(d){
	return (d.getFullYear()-1911)+'-'+
		('0'+(d.getMonth()+1)).substr(-2)+'-'+
		('0'+d.getDate()).substr(-2);
}


function getDateFromString(s){
	var m=s.match(/^(\d{2,3})(\d{2})(\d{2})$/)
	if(!m) return null;

	var d = new Date((parseInt(m[1],10)+1911)+'-'+m[2]+'-'+m[3])
	if(isNaN(d.getTime())) return null;

	var y = d.getFullYear();
	if(y < 2000 || y > 2063) return null;

	return d
}

function sortDate(r1,r2){
	return r1.date.getTime()-r2.date.getTime()
}





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
			inputDate: '',
			dep:true,
			enabled:false,
			records:[],
			hash:''
		};
	},
	setDep:function(dep){
		return function(){
			this.setState({dep:dep})
		}.bind(this)
	},
	inputChange:function(e){
		var s = e.target.value.replace(/\D/g,'').substr(0,7)
		var enabled = getDateFromString(s)!=null;
		this.setState({
			inputDate:s,
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


	/*
	██    ██ ██████  ██
	██    ██ ██   ██ ██
	██    ██ ██████  ██
	██    ██ ██   ██ ██
	 ██████  ██   ██ ███████
	*/
	setURL:function(rr){
		var m = rr.reduce(function(a,r){
			var d=r.date;
			var n = d.getFullYear()-2000 //0-64 6bits
			n = n << 4 | d.getMonth()    //0-11 4bits
			n = n << 5 | d.getDate()     //1-31 5bits
			n = n << 1 | (r.dep?1:0)     //     1bit
			return a+String.fromCharCode(n>>8&0xff)+String.fromCharCode(n&0xff);
		},'')
		var n = btoa(m)
		window.location.hash=n;
		this.setState({
			hash:n
		})
	},
	getURL:function(){
		var h = window.location.hash.replace('#','');
		try{
			var m = atob(h);
			var rr=[];
			for(var i=0;i < m.length;i+=2){
				var n = m.charCodeAt(i) << 8 | m.charCodeAt(i+1);
				var year = (n>>10) + 2000;
				var month= (n>>6) & 0x0f
				var date = (n>>1) & 0x1f;
				var dep = (n&1)==1;
				var d = new Date(year,month,date)
				rr.push({
					date:d,
					dep:dep
				})
			}
			this.setState({
				records:rr,
				hash:h
			})

		}catch(err){
			window.location.hash='';
		}
	},




	// getDateDep:function(d){
	// 	var rr = this.state.records;
	// 	var t = d.getTime();
	// 	for(var i=rr.length-1;i>=0;i--){
	// 		if(rr[i].date.getTime()<=d.getTime()){
	// 			return rr[i].dep
	// 		}
	// 	}
	// 	return false;
	// },
	/*
	 ██████  ███████ ████████ ██████  ███████ ███████ ██    ██ ██   ████████
	██       ██         ██    ██   ██ ██      ██      ██    ██ ██      ██
	██   ███ █████      ██    ██████  █████   ███████ ██    ██ ██      ██
	██    ██ ██         ██    ██   ██ ██           ██ ██    ██ ██      ██
	 ██████  ███████    ██    ██   ██ ███████ ███████  ██████  ███████ ██
	*/
	getDepDays:function(rt){
		return rt.reduce(function(a,b){
			if(b.dep) return a+b.days;
			else return a;
		},0)

	},
	
	getResult:function(){
		var rr = this.state.records.concat();

		//記錄不足
		if(rr.length<=1) return null;

		//已出入境紀錄算出在境/離境區間
		var rt=[];
		for(var i=0;i < rr.length-1;i++){
			var d = Math.round((rr[i+1].date.getTime()-rr[i].date.getTime())/86400000);
			rt.push({
				dep:rr[i].dep,
				days:Math.round((rr[i+1].date.getTime()-rr[i].date.getTime())/86400000)
			})
		}

		//若記錄太長 把區間縮減到最後一筆記錄的一年內
		var days=0;
		for(var i=rt.length-1;i>=0;i--){
			if(days + rt[i].days > 365){
				rt[i].days = 365-days
				rt.splice(0,i)
				break;
			}
			days+=rt[i].days;
		}

		//若記錄太短 在最前面加入與第一筆資料相反的在離境區間
		if(days < 365){
			rt.unshift({
				days:365-days,
				dep:!rt[0].dep
			})
		}

		//
		var lastRecord = rr[rr.length-1]
		var qualified = this.getDepDays(rt) < 183;

		if(qualified != lastRecord.dep){
			//符合資格且最後記錄為入境
			//不符合資格且最後記錄為出境

			//只要不再出入境，資格維持不變
			var recordLabel = toDateString(lastRecord.date)+' '+(lastRecord.dep?'出境':'入境');
			return '從 '+recordLabel+'之後皆'+(qualified?'符合':'不符合')+'資格'

		}else{
			//qualified == lastRecord.dep
			//符合資格且最後記錄為出境
			//不符合資格且最後記錄為入境

			//依最後記錄插入在離境區間
			var lastDur ={
				days:0,
				dep:lastRecord.dep
			}
			rt.push(lastDur)

			//最前區間-1 最後區間+1 while到 qualified 反轉為止
			do{
				rt[0].days-=1;
				if(rt[0].days==0) rt.shift()
				lastDur.days+=1;
			}while(qualified==(this.getDepDays(rt) < 183))

			//最後記錄時間加上最後區間的天數即為反轉日期
			var t = lastRecord.date.getTime()+lastDur.days*86400000;
			var d = new Date(t);

			var recordLabel = toDateString(d)
			return recordLabel+' 後'+(!qualified?'符合':'不符合')+'資格';
		}
	},








	/*
	 █████  ██████  ██████  ██████  ███████  ██████  ██████  ██████  ██████
	██   ██ ██   ██ ██   ██ ██   ██ ██      ██      ██    ██ ██   ██ ██   ██
	███████ ██   ██ ██   ██ ██████  █████   ██      ██    ██ ██████  ██   ██
	██   ██ ██   ██ ██   ██ ██   ██ ██      ██      ██    ██ ██   ██ ██   ██
	██   ██ ██████  ██████  ██   ██ ███████  ██████  ██████  ██   ██ ██████
	*/
	addRecord:function(){
		var rr = this.state.records.concat({
			date:getDateFromString(this.state.inputDate),
			dep: this.state.dep,
		})
		rr.sort(sortDate)

		this.setState({
			inputDate:'',
			enabled:false,
			dep: !this.state.dep,
			records:rr
		})
		this.setURL(rr)
	},
	removeRecord:function(idx){
		return function(){
			var rr = this.state.records.concat();
			rr.splice(idx,1)
			this.setState({
				records:rr
			})
			this.setURL(rr)
		}.bind(this)
	},
	toggleRecord:function(idx){
		return function(){
			var rr = this.state.records.concat();
			rr[idx].dep = !rr[idx].dep;
			this.setState({
				records:rr
			})
			this.setURL(rr)
		}.bind(this);
	},






	componentDidMount: function() {
		ReactDOM.findDOMNode(this.refs.input).focus();
		this.getURL()

	},
	render:function(){
		var rr = this.state.records;
		if(rr.length>0){
			var last = rr[rr.length-1];
			var lastDep = !rr[0].dep;
		}
		var conflict=false;

		return(
			<div className='app'>
				<h2>出入境紀錄</h2>
				日期格式: 1030602<br/>

				<button className={'dep '+( this.state.dep?'active':'deactive')} onClick={this.setDep(true)}>出境</button>
				<button className={'arr '+(!this.state.dep?'active':'deactive')} onClick={this.setDep(false)}>入境</button>

				<input type='text' ref='input' placeholder='輸入日期' value={this.state.inputDate} onKeyDown={this.inputDown} onChange={this.inputChange}/>
				<button className={this.state.enabled?'enabled':'disabled'} onClick={this.addRecord}>加入</button>

				<hr/>
				{rr.map(function(r,i){
					var cn = cx({
						record:true,
						dep:r.dep,
						arr:!r.dep,
						conflict: r.dep==lastDep
					})
					if(r.dep==lastDep) conflict =true;

					var spanCn = cx({
						dep:r.dep,
						arr:!r.dep,
					})

					lastDep=r.dep;

					return(
						<div className={cn} key={JSON.stringify(r)}>
							<span className={spanCn} onClick={this.toggleRecord(i)}/>
							<span className='date'>{toDateString(r.date)}</span>
							<span className='close'  onClick={this.removeRecord(i)}/>
						</div>
					)
				}.bind(this))}
				<hr/>
				{this.state.hash==''?null:
					<div>
						記錄網址:
						<a href={'#'+this.state.hash}>{this.state.hash}</a>
					</div>
				}
				<br/>
				{conflict?'出入境記錄有衝突':this.getResult()}
			</div>
		);
	}
});

module.exports = App;
ReactDOM.render(<App/>,$('#wrapper')[0])
