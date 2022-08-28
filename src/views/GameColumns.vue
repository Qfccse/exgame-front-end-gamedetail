<template>
    <div class="canvas">
        <div style="width: 1055px;margin:100px auto;border-radius: 10px;background-color: #e0e0e0;overflow: hidden" class="clearbox">
            <div>
                <span class="column-name fl">Ring</span>
                <div class="column-head clearbox">
                    <img  src="../assets/imgs/anPoster.jpg">
                </div>
                <div style="
            text-align: center;
            width: 1005px;
            font-size: 20px;
            font-weight: bolder;
            margin:auto;
            background-color: white;
            height: 50px;
            border-radius: 0px 0px 10px 10px;">
                <span style="
                bottom: -15px;
                position: relative;
                border-bottom: red 4px solid;
                height: 30px;
                width: 100px;
                margin: auto;
                line-height: 10px;
                display:block;">
                    游戏论坛
                </span>
                </div>
            </div>
            <el-dialog  :visible.sync="showImg" width="400px" append-to-body>
                <img ref="img-board" :src="imgSrc" width="360px" style="margin:auto">
                <div slot="footer" class="dialog-footer">
                    <span class="iconfont icon-arrow-left fl"  @click="click2Before"></span>
                    <span class="iconfont icon-iconfontjiantou5 fr" @click="click2Next"></span>
                </div>
            </el-dialog>
            <div class="column-page clearbox">
                <ul class="column-left fl">
                    <ColumnCreator></ColumnCreator>
                    <li v-for="(column,index) in columnList" :key="index" class="m-column clearbox">
                        <div style="height: 10px"></div>
                        <div class="column-creator clearbox">
                            <div class="user-head fl">
                                <img :src="require('../assets/imgs/h1.jpg')">
                            </div>
                            <div class="user-name fl">
                                {{column.name}}
                            </div>
                        </div>
                        <div class="column-title">{{column.title}}</div>
                        <div class="column-content">{{column.content}}</div>
                        <div class="column-image clearbox">
                            <ul>
                                <li v-for="(img,i) in column.imageList.slice(0,columnShowImage[index])" :key="i">
                                    <div class="m-image fl" @click=" click2ShowImg(index,i)">
                                        <img :src="require('../assets/imgs/' + img)">
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="column-tips clearbox" @click="click2ShowReply(index)">
                            <span class="iconfont icon-pinglun fl"></span><span class="column-rpnum fl" >&nbsp;{{column.replyNum}}</span>
                            <span class="column-time fr">发布于：{{column.releaseTime}}</span>
                        </div>
                        <div :id="getID(index)" class="column-replies" style="display: none">
                            <ColumnReplier style="margin-top: 10px;"></ColumnReplier>
                            <div v-if="column.replyNum ===0" style="height: 30px;text-align: center;line-height: 30px">还没有回帖</div>
                            <ul>
                                <li v-for="(reply,index) in column.replyList" :key="index">
                                    <div class="m-reply">
                                        <div class="reply-creator clearbox">
                                            <div class="user-head-r fl">
                                                <img :src="require('../assets/imgs/h1.jpg')">
                                            </div>
                                            <div class="user-name-r fl">
                                                {{reply.name}}
                                            </div>
                                            <div class="reply-time fr">回复时间 {{reply.time}}&emsp;&emsp;&nbsp;&nbsp;&nbsp;</div>
                                        </div>
                                        <div class="reply-content">
                                            {{reply.content}}
                                        </div>
                                        <div style="height: 10px"></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div style="height: 10px"></div>
                    </li>
                </ul>
                <div class="column-right fr">
                    <div style="margin-top: 40px">
                        <p style="font-size: 18px;font-weight: bolder">意见反馈</p>
                        <p style="color: #666666;margin-top: 10px;margin-bottom: 30px">游戏的各种问题都将被解答</p>
                        <span style="margin-right:15px;display: inline-block;width: 80px;height: 20px;border:#666666 1px solid;border-radius: 10px">去反馈</span>
                        <span style="margin-left:15px;display: inline-block;width: 80px;height: 20px;border:#666666 1px solid;border-radius: 10px">历史反馈</span>
                    </div>
                    <div style="margin-top: 20px;color: #666666;">
                        <div style="line-height: 30px;height: 30px">臻Game官网</div>
                        <div  style="line-height: 30px;height:30px">www.exgame.com</div>
                        <div style="line-height: 30px;height: 30px">客服邮箱</div>
                        <div  style="line-height: 30px;height: 30px">2544668476@qq.com</div>
                        <div style="line-height: 30px;height: 30px">客服电话</div>
                        <div style="line-height: 30px;height: 30px">021-222222</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ColumnReplier from "@/components/ColumnReplier";
import ColumnCreator from "@/components/ColumnCreator";
export default {
    name: "GameColumns",
    props:["game_id"],
    components:{
        ColumnCreator,
        ColumnReplier,
    },
    data(){
        return{
            showImg:false,
            imgSrc:'',
            columnPos:0,
            imgPos:0,
            columnShowImage:[4,3],
            columnList:[
                {
                    columnID:'0000000001',
                    uid:'00000001',
                    name:'+++',
                    title:'啥啊',
                    content:'46sa4da4',
                    imageList:[
                        'dlc1.jpg',
                        'dlc1.jpg',
                        'dlc1.jpg',
                        'dlc2.jpg',
                    ],
                    replyNum:5,
                    releaseTime:'2022/08/25',
                    replyList:[
                        {
                            name:'123',
                            userID:'0000000002',
                            userHead:'+++',
                            content:'一眼顶真',
                            time:'2000/22/22'
                        },
                        {
                            name:'123',
                            userID:'0000000002',
                            userHead:'+++',
                            content:'一眼顶真',
                            time:'2000/22/22'
                        },
                    ],
                },
                {
                    uid:'00000001',
                    name:'+++',
                    title:'say',
                    content:'chhhhhhh',
                    imageList:[
                        'dlc2.jpg',
                        'dlc2.jpg',
                        'dlc2.jpg',
                        'dlc2.jpg',
                    ],
                    replyNum:0,
                    releaseTime:'2022/08/24',
                }
            ],
        }
    },
    methods:{
        getID(index){
            return 'rep-' + index.toString()
        },
        click2ShowImg(i,ii){
            this.showImg = true
            this.columnPos = i
            this.imgPos =ii
            this.imgSrc = require('../assets/imgs/' + this.columnList[i].imageList[ii])
        },
        click2Next:function (){
            console.log(1)
            var that = this
            if( that.imgPos+1< that.columnList[ that.columnPos].imageList.length)
            {
                that.imgSrc = require('../assets/imgs/' + that.columnList[ that.columnPos].imageList[ that.imgPos+1])
                that.imgPos++;
            }
        },
        click2Before:function (){
            console.log(1)
            var  that = this;
            if( that.imgPos>0)
            {
                that.imgSrc = require('../assets/imgs/' +  that.columnList[ that.columnPos].imageList[ that.imgPos-1])
                that.imgPos--;
            }
        },
        click2ShowReply:function (index){
            console.log(index)
            var reply = document.getElementById(this.getID(index))
            if(reply.style.display === 'none')
            {
                reply.style.display = 'block'
            }
           else
            {
                reply.style.display = 'none'
            }
        }
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
ul, ol{
    list-style: none;
}
.fl{
    float: left;
}
.fr{
    float: right;
}
.clearbox{
    clear:both;
}
.canvas {
    position:fixed;
    width:100%;
    height:100vh;
    background-color: black;
    overflow: auto;
}
.column-head{
    background-color: white;
    width: 1005px;
    border-radius: 10px 10px 0px 0px;
    height: 50px;
    margin: 120px auto 0px;
}
.column-head img{
    position: relative;
    height: 180px;
    margin-left: 50px;
    top: -110px;
    border-radius: 10px;
}
.column-name{
    margin-left: 300px;
    margin-top: 20px;
    line-height: 120px;
    font-size: 36px;
    font-weight: bolder;
}
.column-page{
    width: 1005px;
    margin:  auto;
}
.column-left{
    width:705px;
    margin-top: 5px;
}
.column-right{
    width: 285px;
    background-color: white;
    /*height: 200px;*/
    height: 100vh;
    margin-top: 15px;
    border-radius: 10px;
    text-align: center;
}
.column-creator{
    height: 35px;
    margin-left: 15px;
    line-height: 30px;
}
.column-creator .user-head{
    overflow: hidden;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    margin-top: 2px;
}
.column-creator .user-name{
    font-size: 16px;
    font-weight: bolder;
    margin-left: 10px;
}
.column-creator img{
    height: 30px;
    width: 30px;
}
.column-replies{
    border-top: #666666 1px solid;
}
.m-reply{
    border-top: #e0e0e0 1px solid;
    border-bottom: #e0e0e0 1px solid;
}
.reply-creator{
    height: 30px;
    margin-left: 15px;
    line-height: 30px;
    margin-top: 20px;
}
.reply-creator .user-head-r{
    overflow: hidden;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    margin-top: 2px;
}
.reply-creator .user-name-r{
    font-size: 14px;
    font-weight: bolder;
    margin-left: 10px;
    line-height: 15px;
}
.reply-creator img{
    height: 25px;
    width: 25px;
}
.reply-content{
    margin-left: 55px;
    font-size: 14px;
    word-wrap: break-word;
}
.reply-time{
    font-size: 12px;
    color: #666666;
    line-height: 15px;
}
.m-column{
    background-color: white;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.column-title{
    font-weight: bolder;
    font-size: 18px;
    margin-left: 20px;
    margin-top: 10px;
    width: 685px;
    /*border: red 1px solid;*/
}
.column-content{
    margin-left: 20px;
    width: 685px;
    margin-top: 10px;
    font-size: 14px;
    color: #666666;
    /*border: red 1px solid;*/
}
.column-image{
    margin-top: 10px;
    margin-left: 13px;
}
.m-image{
    overflow: hidden;
    width: 160px;
    height: 160px;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
    border-radius: 5px;
}
.m-image img{
    width: 160px;
    height: 160px;
    object-fit: cover;
}
.column-tips{
    margin-left: 15px;
    height: 30px;
    width: 680px;
    line-height: 30px;
    font-size: 14px;
}
.column-replies{
    margin-left: 10px;
    width: 685px;
    margin-top: 10px;
}
.dialog-footer{
    position: relative;
    top:-20px;
    height: 0px;
    margin-bottom: 0;
}
</style>
