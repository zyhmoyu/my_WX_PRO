// pages/home/dt/dt.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterlist:[]
  },
  handlesj:function(){
    wx.navigateTo({
      url: '/pages/home/dt/test/test',
    })
  },
  hanledtc:function(e){
    let stats = e.target.dataset.stats
    let id = e.target.dataset.id
    let tnumber = e.target.dataset.tnumber
    let name = e.target.dataset.name
    wx.navigateTo({
      url: '/pages/home/dt/tix/tix?id='+id+'&tnumber='+tnumber+'&name='+name+'&stats='+stats,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
        userId: app.globalData.userInfo.id
			},
			success:function(res){
				_this.setData({chapterlist:res.data})
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