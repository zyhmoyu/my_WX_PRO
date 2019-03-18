// pages/home/dt/tix/tix.js
const app = getApp()
let mytimer = null
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		num: [],
		ishowdtk: false,
		xx1:[],
		t:'00:00',
		stj:[],
		n:0,
		ispd:false,
		tilist:[],
		userAnswer:[],
		questionId:0,
		pdcc:'',
		name:'',
		status:0,
		options:{}
	},
	handlepd:function(e){
		let tilist=this.data.tilist
		let n=this.data.n
		let userAnswer=this.data.userAnswer
		userAnswer[n] = {}
		userAnswer[n].answer = e.target.dataset.answer
	},
	ishowdtk: function() {
		let ishowdtk = false
		let n = this.data.n
		let userAnswer = this.data.userAnswer
		if (this.data.ishowdtk) {
			ishowdtk = false
			if(userAnswer[n].isdt!=undefined){
				userAnswer[n].active = 'ac1'
			}else{``
				userAnswer[n].active = ''
			}
			
		} else {
			ishowdtk = true
			if(!userAnswer[n]) userAnswer[n]={}
			userAnswer[n].active = 'active'
		}
		this.setData({
			ishowdtk,userAnswer
		})
	},
	handleti:function(e){
		let n = e.target.dataset.index
		this.ishowdtk()
		this.setData({n,ishowdtk:false})
	},
	handleprev:function(e){
		let _this = this
		let n = this.data.n
		let userAnswer = this.data.userAnswer
		let tilist = this.data.tilist
		if(e.target.dataset.mode=='prev'){
			if(n>0){
				n--
			}
		}else{
			if(n<tilist.length-1){
				n++

			}else{
				let cc = true
				for(let i=0;i<tilist.length;i++){
					if(!userAnswer[i]){
						cc = false
						_this.ishowdtk()
						return
					}
					if(!userAnswer[i].active){
						cc = false
						_this.ishowdtk()
						return
					}
				}
				if(cc){
					wx.showModal({
						title:'提交',
						content:'是否提交？',
						success:()=>{
							let status = _this.data.status
							if(status!=2){
								wx.showLoading({
									title: '正在提交成绩',
								})
								let isshow = false
								let score = 0
								//循环判断答案
								for(let i=0;i<tilist.length;i++){
									let tilianswer = tilist[i].answer
									let uAnswer = userAnswer[i].answer
									tilianswer = tilianswer.toString().split(",")
									uAnswer = uAnswer.toString().split("")
									if(uAnswer.length==tilianswer.length){
										let issc = true
										for(let j=0;j<tilianswer.length;j++){
											if(uAnswer.indexOf(tilianswer[j])<0){
												issc = false
											}
										}
										if(issc){
											score += tilist[i].score
										}
									}
								}
								clearInterval(mytimer)
								let time = _this.data.t
								time = time.toString()
								

								wx.request({
									url:app.globalData.domain+'/front/content/saveRecord',
									method:'POST',
									header: {
										'content-type': 'application/json'
									},
									data:{
										questionId:Number(_this.data.questionId),
										answers:userAnswer,
										endId:n,
										userId:app.globalData.userInfo.id,
										status:2,
										score,
										time
									},
									success:function(res){
										if(res.data.code==200){
											wx.hideLoading()
											// questionId
											let urlval = '?score='+score+'&t='+_this.data.t
											urlval+='&questionId='+_this.data.questionId

											wx.navigateTo({
												url:'/pages/home/dt/result/result'+urlval
											})
										}
									}
								})
							}
						}
					})
				}
			}
		}
		this.setData({n})
	},
	handlexz: function(e) {
		let userAnswer = this.data.userAnswer
		let tilist = this.data.tilist
		let result = e.target.dataset.result
		result = result.toString()
		let n = this.data.n
		console.log(userAnswer[n]==undefined)
		if(userAnswer[n]==undefined){
			userAnswer[n]={}
		}
		
		if(tilist[n].contentType==1||tilist[n].contentType==3)
			userAnswer[n].answer = result
		else if(tilist[n].contentType==2){
			if(!userAnswer[n].answer&&userAnswer[n].answer!=0){
				userAnswer[n].answer=''
			}
			userAnswer[n].answer.toString()
			if(userAnswer[n].answer.indexOf(result)==-1){
				
				userAnswer[n].answer += result
			}else{
				userAnswer[n].answer = userAnswer[n].answer.replace(result,'')
			}
		}
		userAnswer[n].active = 'ac1'
		userAnswer[n].id = tilist[n].id
		userAnswer[n].isdt = 1
		userAnswer[n].contentType = tilist[n].contentType

		this.setData({
			userAnswer
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let n=0
		if(options.tnumber!='undefined'){
			n = Number(options.tnumber)
		}
		wx.setNavigationBarTitle({
			title: options.name,
		})
		this.setData({name:options.name,questionId:options.id})
		this.setData({options})
		
	},
	formatSeconds: function(value) {
		var reg = /^(-|\+)?\d+$/;
		if (reg.test(value)) {
			var hour = Math.floor(value / 3600);
			var minute = Math.floor((value % 3600) / 60);
			var second = value % 60;
			var posstr = "";
			minute = minute+60*hour
			if (minute < 10)
				posstr += "0"
			posstr += minute
			posstr += ":";
			if (second < 10)
				posstr += "0";
			posstr += second;
			return posstr;
		} else {
			return "";
		}
	},
	formatTime:function(value){
		let seconds = 0
		if(value){
			value = value.split(':')
			seconds = Number(value[0])*60 + Number(value[1])
			seconds = seconds*1000
		}
		
		return seconds
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		let options = this.data.options
		
		
		
		//时间
		let _this = this
		let n = this.data.n
		//试卷题
		let url = '?questionId='+options.id+'&userId='+app.globalData.userInfo.id
		// let tnumber = 0
		if(options.tnumber!='undefined'){
			url += '&tnumber='+options.tnumber
		}
		
		wx.request({
			url:app.globalData.domain+'/front/content/getContentList'+url,
			success:function(res){
				let lasTtime = res.data.time
				let tilist = res.data.list
				let userAnswer = []
				console.log(res)
				if(!res.data.userAnswer){
					for(let i=0;i<tilist.length;i++){
						userAnswer[i]={}
						userAnswer[i].id = tilist[i].id
						userAnswer[i].contentType = tilist[i].contentType
					}
				}else{
					let cuserAnswer = res.data.userAnswer
					console.log(cuserAnswer)
					for(let d=0;d<cuserAnswer.length;d++){
						userAnswer[d] = {}
						userAnswer[d].active = cuserAnswer[d].active
						userAnswer[d].id = cuserAnswer[d].categoryid
						userAnswer[d].answer = cuserAnswer[d].answer
						userAnswer[d].contentType = cuserAnswer[d].contenttype
						userAnswer[d].isdt = cuserAnswer[d].isdt
					}
					console.log(userAnswer)

				}
				if(n==res.data.tnumber){
					_this.setData({n:0})
				}
				let status = 0
				if(res.data.status!=undefined){
					status = res.data.status
				}
				_this.setData({
					tilist,
					userAnswer,
					status
				},()=>{
					// status = 1
					if(status!=2){					
						// let lasTtime = ''
						
						lasTtime = _this.formatTime(lasTtime)
						let arr = [{id:3,lastime:''}]
						let a = {id: 3}
						let flay = true
						arr.forEach(item => {
							if (item.id == a.id) {
								flay = false
								item.lastime = new Date()
								mytimer=setInterval(function(){
									let lastime = new Date(item.lastime)
									let nowtime = new Date()
									let t = nowtime - lastime 
									t = t+lasTtime
									t = Math.floor(t/1000)
									t = _this.formatSeconds(t)
									_this.setData({
										t
									})
								},1000)
							}
						})
						if (flay) {
							let lastime = new Date()
							a.lastime = lastime
							arr.push(a)
						}
						
					}
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {
		let _this = this
		let tilist = _this.data.tilist
		let n = _this.data.n
		let userAnswer = _this.data.userAnswer
		let status = _this.data.status
		console.log(userAnswer,Number(_this.data.questionId),n,app.globalData.userInfo.id,_this.data.t)
		if(status!=2){
			wx.request({
				url:app.globalData.domain+'/front/content/saveRecord',
				method:'POST',
				header: {
					'content-type': 'application/json'
				},
				data:{
					questionId:Number(_this.data.questionId),
					answers:userAnswer,
					endId:n,
					userId:app.globalData.userInfo.id,
					status:1,
					time:_this.data.t,
					score:0
				},
				success:function(res){
					if(res.data.code==200){
						app.globalData.proxy = true
					}
				}
			})  
		}
		     
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
