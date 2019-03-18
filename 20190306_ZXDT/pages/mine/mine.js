// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    chapterlist:{},
    myday:{},
    mytotalday:{}
  },
  jumplast:function(e){
    let chapterlist = this.data.chapterlist
    let status = chapterlist.status
    let id = chapterlist.id
    let tnumber = chapterlist.tnumber
    let name = chapterlist.name
    wx.navigateTo({
      url: '/pages/home/dt/tix/tix?id='+id+'&tnumber='+tnumber+'&name='+name+'&stats='+status,
    })
  },
  handlejumpzj:function(){
    wx.navigateTo({
      url: '/pages/mine/minezuj/minezuj',
    })
  },
  handlepm:function(){
    wx.navigateTo({
      url: '/pages/mine/pcpm/pcpm?type=1',
    })
  },
  handlepm1:function(){
    wx.navigateTo({
      url: '/pages/mine/pcpm/pcpm?type=2',
    })
  },
  handlepm2:function(){
    wx.navigateTo({
      url: '/pages/mine/pcpm/pcpm?type=3',
    })
  },
  jumpdak:function(){
    wx.navigateTo({
      url: '/pages/mine/minedk/minedk',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
	  if (app.globalData.userInfo) {
	    this.setData({
	      userInfo: app.globalData.userInfo,
	      hasUserInfo: true
	    })
	  } else if (this.data.canIUse){
	    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
	    // 所以此处加入 callback 以防止这种情况
	    app.userInfoReadyCallback = res => {
	      this.setData({
	        userInfo: res.userInfo,
	        hasUserInfo: true
	      })
	    }
	  } else {
	    // 在没有 open-type=getUserInfo 版本的兼容处理
	    wx.getUserInfo({
	      success: res => {
	        app.globalData.userInfo = res.userInfo
			console.log(res.userInfo)
	        this.setData({
	          userInfo: res.userInfo,
	          hasUserInfo: true
	        })
	      }
	    })
	  }
	  
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
    let _this = this
    wx.request({
			url:app.globalData.domain+'/front/question/getQuestionRecord',
			data:{
        userId: app.globalData.userInfo.id,
        limit:1
			},
			success:function(res){
        let chapterlist = {}
        chapterlist = res.data[0]
        if (res.data[0] == undefined) {
          chapterlist = {}
        }
        _this.setData({ chapterlist })
			}
    })
    //今日个人排名
    wx.request({
			url:app.globalData.domain+'/front/index/getDayUserSort?userId='+app.globalData.userInfo.id,
			success:function(res){
        _this.setData({myday:res.data.mySort})
			}
    })
    //总排名
    wx.request({
			url:app.globalData.domain+'/front/index/getTotalUserSort',
			data:{
        userId: app.globalData.userInfo.id
			},
			success:function(res){
        _this.setData({mytotalday:res.data.mySort})
			}
    })
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