<template>
  <div class="main_page_box">
    <!--<div class="btns">-->
    <!--<button @click="$router.push('/video')">桌面视频</button>-->
    <!--</div>-->
    <div class="item" :style="'height:'+(expandIndex===index?(item.children.length+1)*51:50)+'px'"
         @click="expandIndex=index" v-for="(item,index) in list">
      <div class="title">
        <span class="icon" :class="{expand:expandIndex===index}"></span>
        <span class="text">
          {{item.title}}
        </span>
      </div>
      <div class="item" v-for="_item in item.children">
        <img @mouseover="openWin('followWin')" @mouseleave="closeWin({name:'followWin',data:'鼠标移开咯~~~'})"
             src="~@/assets/256x256.png">
        <span @click="_item.click">{{_item.text}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  const util = require('../util/util');

  export default {
    name: 'MainPage',
    data() {
      return {
        expandIndex: 0,

        list: [
          {
            title: '窗口',
            children: [
              {
                text: '打开窗口（多开）',
                click: () => this.openNewWin(),
              },
              {
                text: '打开窗口（单开）',
                click: () => this.openNewWin('single'),
              },
              {
                text: '打开窗口（3秒后自动关闭）',
                click: () => this.openNewWinAutoClose(),
              },
              {
                text: '打开窗口（单开-复用窗口）',
                click: () => this.openNewWin('reuse', {reuse: true}),
              },
              {
                text: '打开窗口（单开-复用窗口-重载-landing）',
                click: () => this.openNewWinReload('reuse', "landing"),
              },
              {
                text: '打开窗口（单开-复用窗口-重载-win1）',
                click: () => this.openNewWinReload('reuse', "win1"),
              },
              {
                text: '获取所有窗口信息（请打开开发者工具进行查看）',
                click: () => console.log(this.$Win.allWin),
              },
            ]
          },
          {
            title: '窗口打开动画',
            children: [
              {
                text: '打开窗口（右下角右方滑入）',
                click: () => this.openWin('bottomRightToleft'),
              },
              {
                text: '打开窗口（右下角下方滑入）',
                click: () => this.openWin('bottomRightToup'),
              },
            ]
          },
          {
            title: '窗口间通信',
            children: [
              {
                text: '打开/关闭 窗口1',
                click: () => this.openMsgWin('win1'),
              },
              {
                text: '打开/关闭 窗口2',
                click: () => this.openMsgWin('win2'),
              },
              {
                text: '打开/关闭 窗口3',
                click: () => this.openMsgWin('win3'),
              },
            ]
          },
        ]
      }
    },
    methods: {
      async openWin(type) {
        let _config = {
          width: 300,
          height: 300,
          x: 0,
          y: 0,
          windowConfig: {
            router: '/landing',
            name: type,
            data: "",
          }
        };


        let config = util[type](_config);

        console.log(config)

        this.$Win.openWin(config);
      },
      async openNewWin(winName, conf = {reuse: false}) {
        let option = {
          windowConfig: {
            router: '/landing',
            name: winName,
            reuse: conf.reuse,
          }
        };
        // console.log(option);
        this.$Win.openWin(option);
      },
      async openNewWinReload(winName, router) {
        let option = {
          windowConfig: {
            router: '/' + router,
            name: winName,
            reuse: true,
            reload: true,
          }
        };
        // console.log(option);
        this.$Win.openWin(option);
      },
      async openNewWinAutoClose(winName) {
        let option = {
          windowConfig: {
            router: '/landing',
            name: winName,
            time: 3000,
          }
        };
        // console.log(option);
        this.$Win.openWin(option);
      },
      async openMsgWin(winName) {

        let isopen = this.$Win.isOpen(winName)

        if (isopen) {
          this.$Win.closeWin(winName);
          return
        }

        this.$Win.openWin({
          width: 400,
          height: 800,
          x: winName === 'win1' ? 0 : (winName === 'win2' ? 410 : 820),
          y: 0,
          windowConfig: {
            router: '/' + winName,
            name: winName,
            data: winName,
          }
        });
      },
      async openSingleWin(winName) {
        let option = {
          windowConfig: {
            router: '/' + winName,
            name: winName,
          }
        };
        // console.log(option);
        this.$Win.openWin(option);
      },
      openVideoWin() {
        let option = {
          windowConfig: {
            router: '/video',
            name: '',
          }
        };
        // console.log(option);
        this.$Win.openWin(option);
      },
      closeWin(WinName) {
        this.$Win.closeWin(WinName);
      },
    }
  }
</script>

<style scoped lang="scss">

  .main_page_box {
    background-color: #fff;
    .item {
      overflow: hidden;
      height: 50px;
      border-bottom: 1px solid #ccc;
      transition-duration: 500ms;

      &.expand {
        height: 200px;
      }
      .title {

        .icon {
          display: inline-block;
          width: 10px;
          height: 10px;
          line-height: 50px;
          vertical-align: top;
          margin-top: 23px;
          transition-duration: 500ms;
          transform: rotateZ(-135deg);
          border: 2px solid black;
          border-color: transparent black black transparent;
          &.expand {
            transform: rotateZ(45deg);
          }
        }
        padding-left: 20px;
        background-color: #f2f2f2;
        .text {
          padding-left: 10px;
          line-height: 50px;
          vertical-align: top;
        }
        &:hover {
          background-color: #ccc;
        }
      }
      .item {
        padding-left: 20px;
        height: 50px;
        img {
          height: 40px;
          margin: 5px;
        }
        span {
          display: inline-block;
          vertical-align: top;
          line-height: 50px;
          width: calc(100% - 85px);
        }
        &:hover {
          background-color: #ccc;
        }
      }
    }
    .btns {
      line-height: 30px;
      height: 50px;
      background-color: #cccccc;
      box-sizing: border-box;
      padding: 10px;
      button {

      }
    }
  }

</style>
