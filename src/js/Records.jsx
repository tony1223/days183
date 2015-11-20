require('../css/Records.scss');


/*
 ██████ ██   ██
██       ██ ██
██        ███
██       ██ ██
 ██████ ██   ██
*/
function cx(o) {
	return Object.keys(o).filter(function(k) {
		return o[k]
	}).join(' ');
}


/*
████████  ██████  ██████   █████  ████████ ███████ ███████ ████████ ██████  ██ ███    ██  ██████
   ██    ██    ██ ██   ██ ██   ██    ██    ██      ██         ██    ██   ██ ██ ████   ██ ██
   ██    ██    ██ ██   ██ ███████    ██    █████   ███████    ██    ██████  ██ ██ ██  ██ ██   ███
   ██    ██    ██ ██   ██ ██   ██    ██    ██           ██    ██    ██   ██ ██ ██  ██ ██ ██    ██
   ██     ██████  ██████  ██   ██    ██    ███████ ███████    ██    ██   ██ ██ ██   ████  ██████
*/
function toDateString(d){
	if(!d)return ''

	return (d.getFullYear()-1911)+'-'+
		('0'+(d.getMonth()+1)).substr(-2)+'-'+
		('0'+d.getDate()).substr(-2);
}




/*
 ██████  ███████ ████████ ██████  ███████ ██████  ██████   █████  ██    ██ ███████
██       ██         ██    ██   ██ ██      ██   ██ ██   ██ ██   ██  ██  ██  ██
██   ███ █████      ██    ██   ██ █████   ██████  ██   ██ ███████   ████   ███████
██    ██ ██         ██    ██   ██ ██      ██      ██   ██ ██   ██    ██         ██
 ██████  ███████    ██    ██████  ███████ ██      ██████  ██   ██    ██    ███████
*/
function getDepDays(rt){
	return rt.reduce(function(a,b){
		if(b.dep) return a+b.days;
		else return a;
	},0)
}


/*
 ██████  █████  ██       ██████ ██████  ███████  ██████  ██████  ██████  ██████
██      ██   ██ ██      ██      ██   ██ ██      ██      ██    ██ ██   ██ ██   ██
██      ███████ ██      ██      ██████  █████   ██      ██    ██ ██████  ██   ██
██      ██   ██ ██      ██      ██   ██ ██      ██      ██    ██ ██   ██ ██   ██
 ██████ ██   ██ ███████  ██████ ██   ██ ███████  ██████  ██████  ██   ██ ██████
*/
//直接 modify r
function calcRecord(r,rt){
	//複製 rt, 不知道有沒有更好的方式
	rt=rt.map(function(r){
		return {dep:r.dep,days:r.days}
	})



	//把區間縮減到最後一筆記錄的一年內
	var days=0;
	for(var i=rt.length-1;i>=0;i--){
		if(days + rt[i].days > 365){
			rt[i].days = 365-days
			rt.splice(0,i)
			break;
		}
		days+=rt[i].days;
	}
	//rt不會短於一年, 因為有在最前插入一整年


	//記錄時點是否符合資格
	r.qualified = getDepDays(rt) < 183;
	r.rt=rt;

	if(r.qualified != r.dep){
		//記錄時已符合資格, 且記錄為入境
		//記錄時不符合資格, 且記錄為出境

		//只要不再出入境，資格維持不變
		r.invertDate = null;
	}else{
		//記錄時已符合資格, 但記錄為出境
		//記錄時不符合資格, 但記錄為入境

		//依記錄在最後插入虛擬的在/離境區間
		var lastDur ={
			days:0,
			dep:r.dep
		}
		rt.push(lastDur)

		//最前區間-1 最後區間+1 while到 qualified 反轉為止
		do{
			rt[0].days-=1;
			if(rt[0].days==0) rt.shift()
			lastDur.days+=1;
		}while(r.qualified==(getDepDays(rt) < 183))

		//最後記錄時間加上最後區間的天數即為反轉日期
		var t = r.date.getTime()+lastDur.days*86400000;
		r.invertDate = new Date(t);
	}
}





/*
 ██████  █████  ██       ██████ ██████  ███████  ██████  ██████  ██████  ██████  ███████
██      ██   ██ ██      ██      ██   ██ ██      ██      ██    ██ ██   ██ ██   ██ ██
██      ███████ ██      ██      ██████  █████   ██      ██    ██ ██████  ██   ██ ███████
██      ██   ██ ██      ██      ██   ██ ██      ██      ██    ██ ██   ██ ██   ██      ██
 ██████ ██   ██ ███████  ██████ ██   ██ ███████  ██████  ██████  ██   ██ ██████  ███████
*/
//直接 modify rr
function calcRecords(rr){
	if(rr.length==0) return rr;

	//偵測衝突
	var conflict=false;
	var lastDep = !rr[0].dep;
	rr.forEach(function(r){
		r.conflict = r.dep==lastDep;
		if(r.conflict) conflict=true;
		lastDep=r.dep;
	})
	if(conflict) return rr;


	//以出入境紀錄算出在境/離境區間
	var rt=[];
	for(var i=0;i < rr.length-1;i++){
		var days = Math.round((rr[i+1].date.getTime()-rr[i].date.getTime())/86400000);
		rt.push({
			dep:rr[i].dep,
			days: days
		})
	}
	//在最前面插入一整年的區間
	//例如第一筆資料是出境，就當作在這之前都是在境
	rt.unshift({
		dep:!rr[0].dep,
		days:365
	})
	//至此 rr 跟 rt 的 length 應該一樣


	//針對每一筆記錄計算資格
	var lastDate=null;
	for(var i=rr.length-1;i>=0;i--){
		//從後往前建立資格資料
		var r = rr[i]
		calcRecord(r, rt.slice(0,i+1))

		//若 invert 超過後一筆記錄日期則無效
		if(r.invertDate && lastDate){
			if(r.invertDate.getTime()>=lastDate.getTime()){
				r.invertDate=null;
			}
		}
		lastDate=r.date;
	}
}












/*
██████  ███████  ██████  ██████  ██████  ██████
██   ██ ██      ██      ██    ██ ██   ██ ██   ██
██████  █████   ██      ██    ██ ██████  ██   ██
██   ██ ██      ██      ██    ██ ██   ██ ██   ██
██   ██ ███████  ██████  ██████  ██   ██ ██████
*/
var Record = React.createClass({
	toggleRecord:function(){
		this.props.toggleRecord(this.props.idx);
	},
	removeRecord:function(e){
		if(e.ctrlKey || confirm('確定刪除這筆 '+toDateString(this.props.record.date)+' 的資料?')){
			this.props.removeRecord(this.props.idx);
		}
	},
	render:function(){
		var r = this.props.record;

		var divCN = cx({
			record:true,
			dep: r.dep,
			arr:!r.dep,
			conflict: r.conflict
		})

		var spanCN = cx({
			dep: r.dep,
			arr:!r.dep,
		})

		var statusCN = cx({
			status: true,
			qualified: r.qualified,
			empty: this.props.redundant
		})

		var invertCN = cx({
			invert: true,
			qualified: !r.qualified,
			empty: r.invertDate==null
		})


		return(
			<div className={divCN}>
				<span className='close'  onClick={this.removeRecord}/>
				<span className='date'>{toDateString(r.date)}</span>
				<span className={spanCN} onClick={this.toggleRecord}/>
				<div className='qualify'>
					<span className={statusCN}/>
					<span className={invertCN}>{toDateString(r.invertDate)}</span>
				</div>
			</div>
		);
	}
});

/*
██████  ███████  ██████  ██████  ██████  ██████  ███████
██   ██ ██      ██      ██    ██ ██   ██ ██   ██ ██
██████  █████   ██      ██    ██ ██████  ██   ██ ███████
██   ██ ██      ██      ██    ██ ██   ██ ██   ██      ██
██   ██ ███████  ██████  ██████  ██   ██ ██████  ███████
*/
var Records = React.createClass({
	render:function(){
		var rr = this.props.records;
		calcRecords(rr);
		if(rr.length>0){
			var lastQualified = !rr[0].qualified;

			var conflict = false;
			if(rr.length>0){
				var depFlag=rr[0].dep;
				conflict = rr.some(function(r,i){
					//與第一項作 XOR, 應該奇數列為0, 偶數列為1
					//偶數列反轉, 應該最後為全0, 有1就是衝突
					return r.dep^depFlag^(i%2) !=0;
				})
			}
			//前面也有偵測衝突，應該可精簡


		}
		return(
			<div className='records'>
				{rr.map(function(r,i){
					var redundant = r.qualified==lastQualified;
					lastQualified=r.qualified;
					return(
						<Record
							idx={i}
							record={r}
							redundant={redundant}
							key={JSON.stringify(r)}
							toggleRecord={this.props.toggleRecord}
							removeRecord={this.props.removeRecord}
							/>
					);
				}.bind(this))}
				{conflict?<span className='conflict'>出入境記錄有衝突</span>:''}
			</div>
		);
	}
});

module.exports = Records;
