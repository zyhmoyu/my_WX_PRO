// pages/mine/minedk/minedk.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year:0,
    mouth:3,
    dates:[],
    n:0,
    date:'2016-09'
  },
  prev:function(){
    let n = this.data.n
    n--
    this.getdatee({val:n})
    this.setData({n})
  },
  next:function(){
    let n = this.data.n
    n++
    this.getdatee({val:n})
    this.setData({n})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindDateChange:function(e){
    // 
    console.log(e.detail.value)
    this.getdatee({date1:e.detail.value})
  },
  getdatee:function({val,date1}){
    let _this = this
    let dates = []
    let month = ''
    console.log('val',val)
    console.log('date1',date1)
    let isval = true
    if(val==undefined){
      console.log('执行了')
      val=0
      isval = false
      month = date1
    }
    
    // 获取前一个月最后一天的星期
    let date = new Date()//当前时间
    let nian = date.getFullYear();//当前年份 
    let yue = date.getMonth()+val; //当前月 
    let tian = date.getDate(); //当前天 

    let lastday = new Date(nian,yue+1,1-1).getDate()//当前月最后一天
    let lastd = new Date(nian,yue+1,1-1).getDay()//当前月最后一天是周几
    let firstday = new Date(nian,yue,1).getDay()//当前月第一天是周几
    //请求获取签到详情
    var signList = []
    console.log('isval',isval)
    console.log('month1',month)
    if(isval){
      month = nian+'-'+(yue+1)
    }
    console.log('month2',month)
    wx.request({
			url:app.globalData.domain+'/front/sign/getSignList',
			data:{
        userId: app.globalData.userInfo.id,
        month
			},
			success:function(res){

        signList = res.data.signList
        console.log(signList)
        for(let i=0;i<firstday;i++){
          dates.push({day:0})
        }
        //填充天数
        for(let i=0;i<lastday;i++){
          // let cde = i%7?'cdk':'bdk'
          let arr = {}
          // let arr = is
          for(let j=0;j<signList.length;j++){
            let day1 = new Date(signList[j].ctime)
            let day2 = day1.getDate()
            
            arr.day = i+1
            if(i==day2-1){
              arr.isdk = signList[j].issign == 0 ?'bdk':'cdk'
              let  isnow =new Date().setHours(0,0,0,0) == day1.setHours(0,0,0,0);
              if(isnow){
                arr.day = '今'
                arr.now = 'now'
              }
            }            
          }
          if(!arr.day){
            arr.day = i+1
          }
          dates.push(arr)
        }
        //填充最后的空白
        let ct = 6-lastd
        if(ct>0){
          for(let i=0;i<ct;i++){
            
            dates.push({day:0})
          }
        }
        // console.log(nian,yue,tian,lastday,firstday,lastd)
        // console.log(dates)
        let date =''
        if(isval){
          date = nian+'-'+(yue<10?'0'+(yue+1):yue+1)
        }else{
          date = date1
        }
        
        _this.setData({dates,year:nian,date})
			}
    })
  },
  onLoad: function (options) {
    this.getdatee({val:this.data.n})
    
    
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