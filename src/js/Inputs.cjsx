require '../css/Inputs.scss'

Inputs = React.createClass
	getInitialState: ()->
		input:   ''
		dep:     false
		enabled: false

	getDateFromString: (s)->
		m = s.match /^(\d{2,3})(\d{2})(\d{2})$/
		return null if !m

		d = new Date((parseInt(m[1],10)+1911)+'-'+m[2]+'-'+m[3])
		return null if isNaN d.getTime()

		y = d.getFullYear()
		return null if y< 2000 or y>2063

		return d



	setDep:(dep)->
		=>@setState dep:dep


	inputChange:(e)->
		s = e.target.value.replace(/\D/g,'').substr(0,7)
		enabled = @getDateFromString(s)!=null;
		@setState
			input:s
			enabled:enabled

	inputDown:(e)->
		switch e.keyCode
			#enter
			when 13      then @addRecord() if @state.enabled
			# Q,-
			when 81, 109 then @setState dep:true
			# W,+
			when 87, 107 then @setState dep:false
			# E,/
			when 69, 111 then @setState dep:!@state.dep

			# console.log e.keyCode

	addRecord:->
		@props.addRecord
			date:@getDateFromString(@state.input)
			dep: @state.dep

		@setState
			input: ''
			enabled: false
			dep: !@state.dep

	componentDidMount: ->
		ReactDOM.findDOMNode(@refs.input).focus();

	render:->
		<div className='inputs'>

			<button
				className={'dep '+(if @state.dep then 'active' else 'deactive')}
				onClick={@setDep true}
				>
				出境
			</button>

			<button
				className={'arr '+(if !@state.dep then 'active' else 'deactive')}
				onClick={@setDep false}
				>
				入境
			</button>

			<input
				type='text'
				ref='input'
				placeholder='輸入日期'
				value={@state.input}
				onKeyDown={@inputDown}
				onChange={@inputChange}
				/>

			<button
				className={if @state.enabled then 'enabled' else 'disabled'}
				onClick={@addRecord}
				>
				加入
			</button>
		</div>

module.exports = Inputs;
