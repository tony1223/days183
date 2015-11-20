module.exports={
	stringify:function(rr){
		var m = rr.reduce(function(a,r){
			var d=r.date;
			var n = d.getFullYear()-2000 //0-64 6bits
			n = n << 4 | d.getMonth()    //0-11 4bits
			n = n << 5 | d.getDate()     //1-31 5bits
			n = n << 1 | (r.dep?1:0)     //     1bit
			return a+String.fromCharCode(n>>8&0xff)+String.fromCharCode(n&0xff);
		},'')
		return btoa(m);
	},
	parse:function(h){
		h=h.replace(/^#/,'');
		var rr=[];
		try{
			var m = atob(h);
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

		}catch(err){
		}
		return rr;
	}
}
