module.exports =

	#將 records 陣列轉為 base64
	stringify: (rr) ->
		m = rr.reduce(((a, r) ->
			d = r.date
			n = d.getFullYear() - 2000            #0-64 6bits
			n = n << 4 | d.getMonth()             #0-11 4bits
			n = n << 5 | d.getDate()              #1-31 5bits
			n = n << 1 | (if r.dep then 1 else 0) # 1bit

			#n 為 2bytes 整數，拆為兩個字元
			a + String.fromCharCode(n >> 8 & 0xff) + String.fromCharCode(n & 0xff)
		), '')

		btoa m

	#將 base64 字串轉為 records
	parse: (h) ->
		h = h.replace(/^#/, '')
		rr = []
		try
			m = atob(h)			#這裡可能有 error
			i = 0
			while i < m.length
				n = m.charCodeAt(i) << 8 | m.charCodeAt(i + 1)	#可能有溢位error
				[year, month, date, dep] = [
					(n >> 10) + 2000
					n >> 6 & 0x0f
					n >> 1 & 0x1f
					(n & 1) == 1
				]
				d = new Date(year, month, date) #d可能 invalid, 這裡不會有 error, 或許應該要檢查
				rr.push
					date: d
					dep: dep
				i += 2
		catch err
		rr
