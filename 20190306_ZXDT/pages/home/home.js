// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:'',
		bookslist:[],
    domain:app.globalData.domain,
    chapterlist:{}
  },
  handledt:function(){
    wx.switchTab({
      url: '/pages/home/dt/dt',
    })
  },
  handlepm:function(){
    wx.navigateTo({
      url: '/pages/mine/pcpm/pcpm?type=2',
    })
  },
  handsj:function(e){
	  wx.navigateTo({
	  	url:"/pages/home/dt/test/test?id="+e.target.dataset.id+'&name='+e.target.dataset.name
	  })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		let _this = this
		wx.request({
			url:app.globalData.domain+'/front/index/getBanner',
			success:function(res){
				_this.setData({
				  banner:res.data
				})
			}
		})
		wx.request({
			url:app.globalData.domain+'/front/question/getQuestionCategory',
			success:function(res){
				_this.setData({
					bookslist:res.data,
				})
			}
		})
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
        if(res.data[0]==undefined){
          chapterlist = {}
        }
				_this.setData({chapterlist})
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