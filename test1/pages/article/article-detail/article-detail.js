var { articles } = require('../../../data/db.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var articleId=options.articleId;
    var article = articles[articleId];
    //处理状态
    var articles_collection = wx.getStorageSync("articles_collection")
    var isCollected = false;
    if (!articles_collection){
      var data={}
      data[articleId]=false;
      wx.setStorageSync("articles_collection",data)
    }else{
      isCollected = !!articles_collection[articleId]
    }
    this.setData({ ...article, isCollected: isCollected})
    //监听音乐播放
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.onPlay(function () {
      this.setData({
        isPlaying: true
      })
    }.bind(this))
    backgroundAudioManager.onPause(function () {
      this.setData({
        isPlaying: false
      })
    }.bind(this))    
  },
  /*
  *处理收藏
  */
  tapCollect:function(){
    // wx.setStorageSync("key1", 123);
    // wx.setStorageSync("key2", 'hellow');
    // wx.setStorageSync("key3", {
    //   name:'tom'
    // });
    // console.log(wx.getStorageSync('key1'))
    var articles_collection = wx.getStorageSync("articles_collection")
    var isCollected = articles_collection[this.data.articleId];
    //改变storage数据
    articles_collection[this.data.articleId] = !isCollected;
    wx.setStorageSync('articles_collection', articles_collection)
    this.setData({
      isCollected:!isCollected
    },function(){
      wx.showToast({
        title:isCollected ?'取消成功':'收藏成功'
      })
    })
  },
  /*
  *处理分享
  */
  tapShare:function(){
    var itemList = ['分享到朋友圈', '分享到QQ', '分享到微博',]
    wx.showActionSheet({
      itemList: itemList,
      success:function(res){
        wx.showToast({
          title: itemList[res.tapIndex]+'成功',
        })
      }
    })
  },
  /*
  *音乐播放
  */
  tapMusic:function(){
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    var isPlaying = this.data.isPlaying;
    if(isPlaying){
      backgroundAudioManager.pause();
      this.setData({
        isPlaying: false,

      })
    }else{
      var music = articles[this.data.articleId].music;
      backgroundAudioManager.src = music.src;
      
      backgroundAudioManager.coverImgUrl = music.coverImgUrl;
      backgroundAudioManager.title = music.title;
      // backgroundAudioManager.play();
      this.setData({
        isPlaying:true,

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