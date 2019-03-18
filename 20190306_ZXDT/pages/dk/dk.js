// pages/dk/dk.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSign:false
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
  daka:function(){
    console.log('daka')
    let _this = this
    wx.request({
      url:app.globalData.domain+'/front/sign/setSign',
      data:{
        userId: app.globalData.userInfo.id,
      },
      success:function(res){
        if(res.data.code==200){
          _this.setData({isSign:true})
        }
        // _this.setData({isSign:res.data.isSign})
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this
    let date = new Date()
    let year = date.getFullYear()
    let months = date.getMonth()+1
    let month = year+'-'+months
    wx.request({
      url:app.globalData.domain+'/front/sign/getSignList',
      data:{
        userId: app.globalData.userInfo.id,
        month
      },
      success:function(res){
        console.log(res)
        _this.setData({isSign:res.data.isSign})
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