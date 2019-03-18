// pages/home/dt/test/test.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterlist:[],
    dtcs:0,
    score:0,
    bastscore:0,
    options:{}
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
    this.setData({options})
    app.globalData.proxy = true
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
    let options = this.data.options
    let categoryId = options.id
    setTimeout(function(){
      wx.request({
        url:app.globalData.domain+'/front/question/getCategoryInfo',
        data:{
          categoryId,
          userId: app.globalData.userInfo.id
        },
        success:function(res){
          wx.setNavigationBarTitle({
            title: res.data.categoryTitle,
          })
          _this.setData({
            dtcs:res.data.totalCount,
            score:res.data.totalScore
          })
          // _this.setData({chapterlist:res.data})
        }
      })
      wx.request({
        url:app.globalData.domain+'/front/question/getQuestionList',
        data:{
          categoryId,
          userId: app.globalData.userInfo.id
        },
        success:function(res){
          app.globalData.proxy = false
          _this.setData({chapterlist:res.data})
        }
      })
      wx.request({
        url:app.globalData.domain+'/front/question/getHighRecord',
        data:{
          userId: app.globalData.userInfo.id
        },
        success:function(res){
          // console.log(res)\
          let bastscore = 100-res.data
          _this.setData({bastscore})
        }
      })
    },200)
    
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