

cx = (o) ->
	Object.keys(o).filter((k) ->
		o[k]
	).join ' '


toDateString = (d) ->
	unless d?
		''
	else
		[
			d.getFullYear() - 1911
			('0' + (d.getMonth()+1)).substr(-2)
			('0' + d.getDate()).substr(-2)
		].join('-')


getDepDays = (rt) ->
	rt.reduce (a, b) ->
    if b.dep then a+b.days else a
  ,0


#直接 modify r
calcRecord = (r, rt) ->
	#複製 rt, 不知道有沒有更好的方式
	rt = rt.map (r) ->
		dep: r.dep
		days: r.days

	#把區間縮減到最後一筆記錄的一年內
	days = 0
	i = rt.length - 1
	while i >= 0
		if days + rt[i].days > 365
			rt[i].days = 365 - days
			rt.splice 0, i
			break
		days += rt[i].days
		i--

	#rt不會短於一年, 因為有在最前插入一整年
	#記錄時點是否符合資格
	r.qualified = getDepDays(rt) < 183
	r.rt = rt

	if r.qualified != r.dep
		#記錄時已符合資格, 且記錄為入境
		#記錄時不符合資格, 且記錄為出境
		#只要不再出入境，資格維持不變
		r.invertDate = null

	else
		#記錄時已符合資格, 但記錄為出境
		#記錄時不符合資格, 但記錄為入境
		#依記錄在最後插入虛擬的在/離境區間
		lastDur =
			days: 0
			dep: r.dep
		rt.push lastDur

		#最前區間-1 最後區間+1 while到 qualified 反轉為止
		loop
			rt[0].days -= 1
			rt.shift() if rt[0].days == 0
			lastDur.days += 1
			break if r.qualified != (getDepDays(rt) < 183)

		#最後記錄時間加上最後區間的天數即為反轉日期
		t = r.date.getTime() + lastDur.days * 86400000
		r.invertDate = new Date(t)



#直接 modify rr
calcRecords = (rr) ->
	return rr if rr.length == 0

	#偵測衝突
	conflict = false
	lastDep = !rr[0].dep
	rr.forEach (r) ->
		`var i`
		r.conflict = r.dep == lastDep
		if r.conflict
			conflict = true
		lastDep = r.dep
		return
	if conflict
		return rr
	#以出入境紀錄算出在境/離境區間
	rt = []
	i = 0
	while i < rr.length - 1
		days = Math.round((rr[i + 1].date.getTime() - rr[i].date.getTime()) / 86400000)
		rt.push
			dep: rr[i].dep
			days: days
		i++


	#在最前面插入一整年的區間
	#例如第一筆資料是出境，就當作在這之前都是在境
	rt.unshift
		dep: !rr[0].dep
		days: 365
	#至此 rr 跟 rt 的 length 應該一樣
	#針對每一筆記錄計算資格
	lastDate = null
	i = rr.length - 1
	while i >= 0
		#從後往前建立資格資料
		r = rr[i]
		calcRecord r, rt.slice(0, i+1)
		#若 invert 超過後一筆記錄日期則無效
		if r.invertDate and lastDate
			if r.invertDate.getTime() >= lastDate.getTime()
				r.invertDate = null
		lastDate = r.date
		i--




require '../css/Records.scss'


###
██████  ███████  ██████  ██████  ██████  ██████
██   ██ ██      ██      ██    ██ ██   ██ ██   ██
██████  █████   ██      ██    ██ ██████  ██   ██
██   ██ ██      ██      ██    ██ ██   ██ ██   ██
██   ██ ███████  ██████  ██████  ██   ██ ██████
###
Record = React.createClass
	toggleRecord: ->
		@props.toggleRecord @props.idx

	removeRecord: (e) ->
		if e.ctrlKey or confirm("確定刪除這筆 #{toDateString(@props.record.date)} 的資料?")
			@props.removeRecord @props.idx

	render: ->
		r = @props.record
		divCN = cx
			record: true
			dep: r.dep
			arr: !r.dep
			conflict: r.conflict

		spanCN = cx
			dep: r.dep
			arr: !r.dep

		statusCN = cx
			status: true
			qualified: r.qualified
			empty: @props.redundant

		invertCN = cx
			invert: true
			qualified: !r.qualified
			empty: r.invertDate == null

		<div className={divCN}>
			<span className='close'	onClick={this.removeRecord}/>
			<span className='date'>{toDateString(r.date)}</span>
			<span className={spanCN} onClick={this.toggleRecord}/>
			<div className='qualify'>
				<span className={statusCN}/>
				<span className={invertCN}>{toDateString(r.invertDate)}</span>
			</div>
		</div>


###
██████  ███████  ██████  ██████  ██████  ██████  ███████
██   ██ ██      ██      ██    ██ ██   ██ ██   ██ ██
██████  █████   ██      ██    ██ ██████  ██   ██ ███████
██   ██ ██      ██      ██    ██ ██   ██ ██   ██      ██
██   ██ ███████  ██████  ██████  ██   ██ ██████  ███████
###
Records = React.createClass
	render:->
		rr = @props.records
		calcRecords rr

		if rr.length > 0
			lastQualified = !rr[0].qualified
			conflict = false
			if rr.length > 0
				depFlag = rr[0].dep
				conflict = rr.some((r, i) ->
					#與第一項作 XOR, 應該奇數列為0, 偶數列為1
					#偶數列反轉, 應該最後為全0, 有1就是衝突
					r.dep ^ depFlag ^ i % 2 != 0
				)
			#前面也有偵測衝突，應該可精簡

		<div className='records'>
			{rr.map (r,i)=>
				redundant = r.qualified == lastQualified
				lastQualified = r.qualified
				<Record
					idx={i}
					record={r}
					redundant={redundant}
					key={JSON.stringify(r)}
					toggleRecord={@props.toggleRecord}
					removeRecord={@props.removeRecord}
					/>
			}
			{if conflict then <span className='conflict'>出入境記錄有衝突</span> else ''}
		</div>

module.exports = Records;
