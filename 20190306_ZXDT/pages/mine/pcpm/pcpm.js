// pages/mine/pcpm/pcpm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:[],
    mayday:{},
    totle:[],
    mytotle:{},
	  minepm:{num:4},
	  week1:true,
    week3:false,
    showlist:[],
    ispc:false,
    showpc:{}
  },
  handleweek1:function(){
	  this.setData({
		  week1:true,
      week3:false,
      showpc:this.data.mayday,
      showlist:this.data.day
	  })
  },
  handleweek3:function(){
  	  this.setData({
  		  week1:false,
        week3:true,
        showpc:this.data.mytotle,
        showlist:this.data.totle
  	  })
  },
  // 用户当天排名
  //用户总排名
  //用户当天在单位排名
  //用户在单位总排名
  //单位当天排名
  //单位总排名
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  let _this = this
	  let weekd = []
	  for(let i=0;i<25;i++){
		  let c = {}
		  c.num = i+1
		  weekd.push(c)
	  }
    let msg = ""
    let ispc = false
    let urls1 = ''
    let urls2 = ''
	  if(options.type==1){
      msg = '个人排名'
      ispc = true
      urls1 = '/front/index/getDayUserSort?userId='+app.globalData.userInfo.id
      urls2 = '/front/index/getTotalUserSort?userId='+app.globalData.userInfo.id
	  }else if(options.type==2){
      msg = '单位排名'
      urls1 = '/front/index/getDayDeptSort?departmentId='+app.globalData.userInfo.departmentid
      urls2 = '/front/index/getTotalDeptSort?departmentId='+app.globalData.userInfo.departmentid
    }else if(options.type==3){
      msg = '在单位排名'
      ispc = true
      urls1 = '/front/index/getDayUserSort?userId='+app.globalData.userInfo.id+'&departmentId='+app.globalData.userInfo.departmentid
      urls2 = '/front/index/getTotalUserSort?userId='+app.globalData.userInfo.id+'&departmentId='+app.globalData.userInfo.departmentid
    }
    wx.request({
			url:app.globalData.domain+urls1,
			success:function(res){
				_this.setData({day:res.data.list,mayday:res.data.mySort},function(){
          _this.handleweek1()
        })
			}
    })
    wx.request({
			url:app.globalData.domain+urls2,
			success:function(res){
				_this.setData({totle:res.data.list,mytotle:res.data.mySort})
			}
		})
    
	  wx.setNavigationBarTitle({
			title:msg
		  })
	  this.setData({weekd,ispc})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})