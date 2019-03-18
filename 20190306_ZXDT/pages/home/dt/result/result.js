// pages/home/dt/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  score:75,
    t:'00:00',
    questionId:''
  },
  handlehk:function(){
    wx.navigateBack({
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({ score: Number(options.score),t:options.t,questionId:options.questionId})
    let canvas = wx.createCanvasContext('score')
    let canvaswidth = 0,canvasheight = 0
    let query = wx.createSelectorQuery()
    let r = 60
    let _this = this
    query.select('.canvas').boundingClientRect(function (res) {
      canvaswidth = res.width
      canvasheight = res.height
      canvas.beginPath()
      canvas.arc(canvaswidth/2,canvasheight/2,r, 135/180 * Math.PI, 45/180 * Math.PI)
      canvas.setStrokeStyle('#e3e3e3')
      canvas.setLineWidth(5)
      canvas.setLineCap('round')
      canvas.stroke()
      canvas.beginPath()
      let score = _this.data.score
      canvas.arc(canvaswidth/2,canvasheight/2,r, 135/180 * Math.PI, (135+score*2.7)/180 * Math.PI)
      canvas.setStrokeStyle('#ea1d10')
      canvas.setLineWidth(5)
      canvas.setLineCap('round')
      canvas.stroke()
      canvas.draw()
      // canvas.draw()
    }).exec()

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
    // wx.switchTab({
    //   url: '/pages/home/home',
    // })
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