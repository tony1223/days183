require '../css/App.scss'
require '../index.html'

Inputs     = require 'Inputs.cjsx'
Records    = require 'Records.cjsx'
serializer = require 'RecordsSerializer.coffee'

console.clear()


###
 █████  ██████  ██████
██   ██ ██   ██ ██   ██
███████ ██████  ██████
██   ██ ██      ██
██   ██ ██      ██
###
App = React.createClass
	getInitialState:->{
		records: []
		hash: ''
	}

	###
	██████  ███████  ██████  ██████  ██████  ██████  ███████
	██   ██ ██      ██      ██    ██ ██   ██ ██   ██ ██
	██████  █████   ██      ██    ██ ██████  ██   ██ ███████
	██   ██ ██      ██      ██    ██ ██   ██ ██   ██      ██
	██   ██ ███████  ██████  ██████  ██   ██ ██████  ███████
	###
	addRecord: (r) ->
    rr = @state.records
    rr.push r
    rr.sort (r1, r2) ->
      r1.date.getTime() - r2.date.getTime()
    @setRecords rr

  removeRecord: (idx) ->
    rr = @state.records
    r = rr.splice idx, 1
    @setRecords rr

  toggleRecord: (idx) ->
    rr = @state.records
    rr[idx].dep = !rr[idx].dep
    @setRecords rr

	setRecords: (rr) ->
		hash = serializer.stringify(rr)
		window.location.hash = hash
		@setState
			records: rr
			hash: hash

	###
	 ██████ ██████  ███    ███
	██      ██   ██ ████  ████
	██      ██   ██ ██ ████ ██
	██      ██   ██ ██  ██  ██
	 ██████ ██████  ██      ██
	###
	componentDidMount: ->
		hash = window.location.hash.replace /^#/,''
		rr = serializer.parse hash
		@setRecords rr


	###
	██████  ███████ ███    ██ ██████  ███████ ██████
	██   ██ ██      ████   ██ ██   ██ ██      ██   ██
	██████  █████   ██ ██  ██ ██   ██ █████   ██████
	██   ██ ██      ██  ██ ██ ██   ██ ██      ██   ██
	██   ██ ███████ ██   ████ ██████  ███████ ██   ██
	###
	render:->
		hashURL = window.location.origin+window.location.pathname+'#'+@state.hash
		<div className='app'>
			<h1>1 8 3</h1>

			<Inputs addRecord={@addRecord}/>
			日期格式: 1030602<br/>

			<Records
				records={@state.records}
				removeRecord={@removeRecord}
				toggleRecord={@toggleRecord}
				/>

			<br/>

			{if @state.hash=='' then null else
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


module.exports = App;
ReactDOM.render <App/>,$('#wrapper')[0]
