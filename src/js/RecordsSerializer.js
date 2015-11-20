module.exports={

	//將 records 陣列轉為 base64
	stringify:function(rr){
		var m = rr.reduce(function(a,r){
			var d=r.date;
			var n = d.getFullYear()-2000 //0-64 6bits
			n = n << 4 | d.getMonth()    //0-11 4bits
			n = n << 5 | d.getDate()     //1-31 5bits
			n = n << 1 | (r.dep?1:0)     //     1bit

			//n 為 2bytes 整數，拆為兩個字元
			return a+String.fromCharCode(n>>8&0xff)+String.fromCharCode(n&0xff);

		},'')
		return btoa(m);
	},

	//將 base64 字串轉為 records
	parse:function(h){
		h=h.replace(/^#/,'');
		var rr=[];
		try{
			var m = atob(h); //這裡可能有 error

			for(var i=0;i < m.length;i+=2){
				var n = m.charCodeAt(i) << 8 | m.charCodeAt(i+1); //可能有溢位error
				var year = (n>>10) + 2000;
				var month= (n>>6) & 0x0f
				var date = (n>>1) & 0x1f;
				var dep = (n&1)==1;
				var d = new Date(year,month,date) //d可能 invalid, 這裡不會有 error, 或許應該要檢查
				rr.push({
					date:d,
					dep:dep
				})
			}

		}catch(err){
		}
		return rr;
	}
}
