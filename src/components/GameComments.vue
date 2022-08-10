<template>
    <div class="m-page clearbox">
        <div class="tab-bar clearbox">
            <span class="comment-count fl">找到{{comments.length}}条测评</span>
            <ul class="comment-tab fr">
                <li @click="tab(index)"  v-for="(item,index) in items"
                    :class="{active : index===curId}" :key="index" style="display: inline;margin-left: 20px">{{item.item}}
                </li>
            </ul>
        </div>
        <div class="tab-con clearbox">
            <div style="height: 20px"></div>
            <div class="comment-tip1"  v-show="curId===0&&comments.length!==0">
                <span class="line1"></span>
                &emsp;10天内的测评&emsp;
                <span class="line2"></span>
            </div>
            <div  class="comment-tip2" v-show="comments.length===0">暂无评论</div>
            <ul class="most-value fl">
                <li v-for="(comment,index) in comments" :key="index">
                    <div class="m-comment fl">
                        <div class="comment-creator fl">
                            <div class="user-head">
                                <img  :src="require('../assets/imgs/' + comment.user.head)"  alt="" height="60" width="60" >
                            </div>
                            <div class="user-info">
                                <p>{{comment.user.name}}</p>
                                <p>账户内拥有{{comment.user.gameNum}}项产品</p>
                                <p>{{comment.user.commentNum}}篇测评</p>
                            </div>
                        </div>
                        <!--                    </div>-->
                        <div class="m-comment-right fr">
                            <div class="comment-rate">
                                <div class="m-rate-left fl">
                                    <div v-if="comment.detail.rate>3" style="text-indent: -25px;height: 25px;width: 25px;overflow: hidden">
                                        <img  src="../assets/imgs/emoji-laughing.svg" style="filter: drop-shadow(25px 0px orange)" height="25" alt="">
                                    </div>
                                    <div v-else >
                                        <img src="../assets/imgs/emoji-frown.svg" height="25" alt="">
                                    </div>
                                </div>
                                <div class="m-rate-right fl">
                                    <div class="rate-name" >
                                        <span v-if="comment.detail.rate>3">推荐</span>
                                        <span v-else>不推荐</span>
                                    </div>
                                </div>
                                <div class="rate-count-time fr">
                                    总时数 {{comment.user.gamedTime}}小时
                                    <span v-if="comment.user.gamedTimeComment!==''">（测评时{{comment.user.gamedTimeComment}}小时）</span>
                                </div>
                                <div class="line3 clearbox"></div>
                            </div>
                            <div class="comment-main" >
                                <div class="comment-time">
                                    发布于：{{comment.detail.date}}
                                </div>
                                <div class="wrapper">
                                    <input :id="getID(index+1,'exp')" class="exp"  type="checkbox">
                                    <div class="text">
                                        <label class="btn" :for="getID(index+1,'exp')"></label>
                                        {{comment.detail.content}}
                                    </div>
                                </div>
                            </div>
                            <div class="comment-judge" >
                                <div class="rate-icons" v-show="curId===0">
                                    <span class="rate-ico"  :id="getRateID(index+1,'rate-ico-1-',1)" @click="addRate(index,1,1)">有用（{{comment.rate.goodCount}}）</span>
                                    <span class="rate-ico" :id="getRateID(index+1,'rate-ico-2-',1)" @click="addRate(index,2,1)">没用（{{comment.rate.badCount}}）</span>
                                </div>
                                <div class="rate-icons" v-show="curId===1">
                                    <span class="rate-ico"  :id="getRateID(index+1,'rate-ico-1-',2)" @click="addRate(index,1,2)">有用（{{comment.rate.goodCount}}）</span>
                                    <span class="rate-ico" :id="getRateID(index+1,'rate-ico-2-',2)" @click="addRate(index,2,2)">没用（{{comment.rate.badCount}}）</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    name: "GameComments",
    data(){
        return {
            select:'全部',
            curId: 0,
            items: [
                {item: '最有价值'},
                {item: '最新发表'},
            ],
            detailType:{
                rate:{
                    type: Number
                },
                date:{
                    type: String
                },
                content:{
                    type: String
                },
            },
            mostValuedCommentsNum:4,
            mostRecentCommentsNum:2,
            mostValuedComments:[],
            mostRecentComments:[],
            userList:[],
            comments:[],
            commentList:[
                {
                    //评论创建者，我认为可以用一个user_id代替，调用其他接口
                    user:{
                        //分别是 头像、user_id、昵称、游戏数目、测评数目、游戏时间、评论时的游戏时间
                        head:'h1.jpg',
                        name:'阿古斯之手',
                        gameNum:168,
                        commentNum:9,
                        gamedTime:'196.1',
                        gamedTimeComment:'181.5',
                    },
                    //评论详情
                    detail:{
                        //分别是 rate 1表示好评 2表示差评  、 comment_id 评论id 、评论日期 、 评论内容
                        rate:1,
                        date:'7.8',
                        content:'忠告：一周目是你最宝贵的财富，得到宝藏的兴奋，鏖战boss的坚持，误入捷径的惊喜，不完美才会记得，不完整才有动力，不要让攻略指引你的脚步，不要让收集毁了你的体验。如果能许下一个愿望，我希望让我忘记这个游戏所有的记忆，带着初心再战一次。'
                    },
                    //评论的点评
                    rate:{
                        // 评论点赞数、点踩数、认为这篇评论很欢乐的数目
                        goodCount:1952,
                        badCount:0,
                    },
                    //我对评论的点评
                    myChoice:{
                        // 我对该评论的看法，点赞、点踩、认为很欢乐
                        good:true,
                        bad:false,
                    }
                },
                {
                    user:{
                        head:'h2.jpg',
                        name:'纯粹DUOLUO',
                        gameNum:103,
                        commentNum:7,
                        gamedTime:'122.6',
                        gamedTimeComment:'122.5',
                    },
                    detail:{
                        rate:2,
                        date:'7.23',
                        content:'论一个好游戏被小蓝熊毁掉的故事还不够多吗？论论一个好游戏被戏被小蓝熊毁掉的故事还不够多吗？论论一个好游戏被戏被小蓝熊毁掉的故事还不够多吗？论论一个好游戏被戏被小蓝熊毁掉的故事还不够多吗？论论一个好游戏被小蓝熊毁掉的故事还不够多吗？论一个好游戏被小蓝熊毁掉的故事还不够多吗？一个好游戏被小蓝熊毁掉的故事还不够多吗？论一个好游戏被小蓝熊毁掉的故事还不够多吗？论一个好游戏被小蓝熊毁掉的故事还不够多吗？论一个好游戏被小蓝熊毁掉的故事还不够多吗？论一个好游戏被小蓝熊毁掉的故事还不够多吗？论一个好游戏被小蓝熊毁掉的故事还不够多吗？论一个好游戏被小蓝熊毁掉的故事还不够多吗？论一个好游戏被小蓝熊毁掉的故事还不够多吗？论一个好游戏被小蓝熊毁掉的故事还不够多吗？论一个好游戏被小蓝熊毁掉的故事还不够多吗？论一个好游戏被小蓝熊毁掉的故事还不够多吗？怎么2022年了还有运营用小蓝熊？我这个差评不是给宫崎也不是给埃尔登！而是给小蓝熊！以后只要有小蓝熊的游戏我都会给小蓝熊刷差评！小蓝熊差评从我做起！拒绝小蓝熊这个外挂软件！'
                    },
                    rate:{
                        goodCount:40,
                        badCount:0,
                    },
                    myChoice:{
                        good:false,
                        bad:false,
                    }
                },
                {
                    user:{
                        head:'h4.jpg',
                        name:'2572372856',
                        gameNum:57,
                        commentNum:5,
                        gamedTime:'44.9',
                        gamedTimeComment:'18.5',
                    },
                    detail:{
                        rate:1,
                        date:'8.6',
                        content:'蛮好的',
                    },
                    rate:{
                        goodCount:0,
                        badCount:0,
                    },
                    myChoice:{
                        good:true,
                        bad:false,
                    }
                },
                {
                    user:{
                        head:'h5.jpg',
                        name:'obidou',
                        gameNum:168,
                        commentNum:9,
                        gamedTime:'14.9',
                        gamedTimeComment:'14.1',
                    },
                    detail:{
                        rate:1,
                        cid:'',
                        date:'8.5',
                        content:'卡满月女王怒删游戏 自以为玩了90多个小时拿下老头环一点问题都没有，谁知除了幽魂以外几乎谁都能一刀打我半血 我说我法师档脆皮正常，那sb女王还会摇人摇了个征战骑士一刀几乎满血秒了 我超我6口血瓶喝的机会都没有!玩魂3 1周目穿中甲盖尔老头投技都秒不了我 你一个前期boss几乎一下一个 反正我先弃了 宫崎老贼，你妈卖批',
                    },
                    rate:{
                        goodCount:0,
                        badCount:0,
                    },
                    myChoice:{
                        good:false,
                        bad:false,
                    }
                },
                {
                    user:{
                        head:'h6.jpg',
                        name:'Ash',
                        gameNum:132,
                        commentNum:1,
                        gamedTime:'8.8',
                        gamedTimeComment:'8.5',
                    },
                    detail:{
                        rate:2,
                        date:'8.5',
                        content:'难度太高玩不下去',
                    },
                    rate:{
                        goodCount:0,
                        badCount:0,
                    },
                    myChoice:{
                        good:false,
                        bad:false,
                    }
                },
                {
                    user:{
                        head:'h7.jpg',
                        name:'伊蕾娜',
                        gameNum:16,
                        commentNum:1,
                        gamedTime:'164.9',
                        gamedTimeComment:'120.5',
                    },
                    detail:{
                        rate:1,
                        date:'8.5',
                        content:'只要你喜欢这款游戏卖多少都不会觉的贵',
                    },
                    rate:{
                        goodCount:0,
                        badCount:0,
                    },
                    myChoice:{
                        good:false,
                        bad:false,
                    }
                },
            ],
        }

    },
    mounted() {
        this.getData('0000000006','0000000001');
        this.init();
        setTimeout(this.pic,100);
    },
    methods:{
        tab (index) {
            if(index===0)
            {
                this.comments = this.mostValuedComments;
            }
            else {
                this.comments = this.mostRecentComments;
            }
            console.log(this.curId.toString() + '+++++')

            this.curId = index;
            this.pic();
        },
        getUserInfo:function (uid){
            if(uid.length===0)
            {
                alert('uid 不能为空')
                return;
            }
            this.$axios.post('api/user/getUserInfo', {
                user_id:uid,
            }).then( res => {
                switch(res.data.result){
                    case 1:
                        console.log("GameComment 请求成功");
                        break;
                    default:
                        console.log('GameComment 请求失败')
                        break;
                }
                this.userList.push(
                    {
                        head:res.data.profile_photo,
                        name:res.data.name,
                        gameNum:res.data.game_num,
                        commentNum:0,
                        gamedTime:'000',
                        gamedTimeComment:'000',
                    }
                )
            }).catch( err => {
                console.log(err);
            })
        },
        getData:function (gid,uid)
        {
            if(gid.length===0)
            {
                alert('gid 不能为空')
                return;
            }
            if(uid.length===0)
            {
                alert('uid 不能为空')
                return;
            }
            console.log('getData')
            var self = this;
            this.$axios.post('api/gamedetail/getGameComments', {
                game_id: gid,
                user_id:uid,
            }).then( res => {
                switch(res.data.result){
                    case 1:
                        console.log("GameComment 请求成功");
                        break;
                    default:
                        console.log('GameComment 请求失败')
                        break;
                }
                for(let i in res.data.comment_list)
                {
                    console.log(res.data.comment_list[i].creator_id)
                    self.detailType = res.data.detail;
                    res.data.toString()

                    self.comments.push(
                        {
                            user:{
                                head:'h1.jpg',
                                name:'阿古斯之手',
                                gameNum:168,
                                commentNum:9,
                                gamedTime:'196.1',
                                gamedTimeComment:'181.5',
                            },
                            detail:{
                                rate:res.data.detail.rate,
                                date:res.data.detail.date,
                                content:res.data.detail.content
                            },
                            rate:{
                                goodCount:res.data.rate.good_count,
                                badCount:res.data.rate.bad_count,
                            },
                            myChoice:{
                                good:res.data.my_view.good,
                                bad:res.data.my_view.bad,
                            }

                        }
                    )
                }

            }).catch( err => {
                console.log(err);
            })
        },
        init:function ()
        {
            console.log('init')
            for(let i=0;i<this.mostValuedCommentsNum;i++)
            {
                this.mostValuedComments.push({
                    user:{
                        head:this.commentList[i].user.head,
                        name:this.commentList[i].user.name,
                        gameNum:this.commentList[i].user.gameNum,
                        commentNum:this.commentList[i].user.commentNum,
                        gamedTime:this.commentList[i].user.gamedTime,
                        gamedTimeComment:this.commentList[i].user.gamedTimeComment,
                    },
                    detail:{
                        rate:this.commentList[i].detail.rate,
                        date:this.commentList[i].detail.date,
                        content:this.commentList[i].detail.content,
                    },
                    rate:{
                        goodCount:this.commentList[i].rate.goodCount,
                        badCount:this.commentList[i].rate.badCount,
                    },
                    myChoice:{
                        good:this.commentList[i].myChoice.good,
                        bad:this.commentList[i].myChoice.bad,
                    }
                })
            }
            for(let i=this.mostValuedCommentsNum; i<this.commentList.length; i++)
            {
                this.mostRecentComments.push({
                    user:{
                        head:this.commentList[i].user.head,
                        name:this.commentList[i].user.name,
                        gameNum:this.commentList[i].user.gameNum,
                        commentNum:this.commentList[i].user.commentNum,
                        gamedTime:this.commentList[i].user.gamedTime,
                        gamedTimeComment:this.commentList[i].user.gamedTimeComment,
                    },
                    detail:{
                        rate:this.commentList[i].detail.rate,
                        date:this.commentList[i].detail.date,
                        content:this.commentList[i].detail.content,
                    },
                    rate:{
                        goodCount:this.commentList[i].rate.goodCount,
                        badCount:this.commentList[i].rate.badCount,
                    },
                    myChoice:{
                        good:this.commentList[i].myChoice.good,
                        bad:this.commentList[i].myChoice.bad,
                    }
                })
            }
            this.comments = this.mostValuedComments;
        },
        pic:function ()
        {
            for(let i=0; i<this.comments.length; i++)
            {
               // console.log(this.comments[i].myChoice.good)
               // console.log(this.comments[i].myChoice.bad)
                var pos = this.curId === 0?1:2;
                if(this.comments[i].myChoice.good===true&&this.comments[i].myChoice.bad===true)
                {
                    alert('测评数据出错，不能同时选择good、bad')
                    return;
                }
                if(this.comments[i].myChoice.good===true)
                {
                    document.getElementById(this.getRateID(i+1,'rate-ico-1-',pos)).style.backgroundColor = '#e9e9e9';
                }
                else if(this.comments[i].myChoice.bad===true)
                {
                    document.getElementById(this.getRateID(i+1,'rate-ico-2-',pos)).style.backgroundColor = '#e9e9e9';
                }
                else
                {
                    document.getElementById(this.getRateID(i+1,'rate-ico-1-',pos)).style.backgroundColor = 'transparent';
                    document.getElementById(this.getRateID(i+1,'rate-ico-2-',pos)).style.backgroundColor = 'transparent';
                    console.log('good/bad not choose')
                }

                console.log('comment' + (i+1).toString() + '渲染完毕')
            }
        },
        getID:function (index,pre){
            // console.log(pre + index.toString())
            return pre + index.toString();
        },
        getRateID:function (index,pre,pos){
            // console.log(pre + pos.toString() +'-'+ index.toString())
            return pre + pos.toString() + '-' + index.toString();
        },
        addRate:function (index,type,pos){
            // alert('需要检测是否登录')
            console.log('选择' + (pos===1?'左侧':'右侧') + ' 第' + index.toString() + '条评论 第 ' + type.toString()+  '个按钮')
            let comment = pos===1?this.mostValuedComments:this.mostRecentComments;

            if(type===1)
            {
                if(comment[index].myChoice.good===false)
                {
                    if(comment[index].myChoice.bad===true)
                    {
                        comment[index].myChoice.bad = false;
                        document.getElementById(this.getRateID(index+1,'rate-ico-2-',pos)).style.backgroundColor = 'transparent';
                        comment[index].rate.badCount--;
                    }
                    comment[index].myChoice.good=true;
                    document.getElementById(this.getRateID(index+1,'rate-ico-1-',pos)).style.backgroundColor = '#e9e9e9';
                    comment[index].rate.goodCount++;
                }
                else{
                    comment[index].myChoice.good=false;
                    document.getElementById(this.getRateID(index+1,'rate-ico-1-',pos)).style.backgroundColor ='transparent';
                    comment[index].rate.goodCount--;
                }
            }
            else if(type===2)
            {
                if(comment[index].myChoice.bad===false)
                {
                    if(comment[index].myChoice.good===true)
                    {
                        comment[index].myChoice.good=false;
                        document.getElementById(this.getRateID(index+1,'rate-ico-1-',pos)).style.backgroundColor = 'transparent';
                        comment[index].rate.goodCount--;
                    }
                    comment[index].myChoice.bad=true;
                    document.getElementById(this.getRateID(index+1,'rate-ico-2-',pos)).style.backgroundColor = '#e9e9e9';
                    comment[index].rate.badCount++;
                }
                else{
                    comment[index].myChoice.bad = false;
                    document.getElementById(this.getRateID(index+1,'rate-ico-2-',pos)).style.backgroundColor = 'transparent';
                    comment[index].rate.badCount--;
                }
            }
            else{
                console.log('rate not found err')
            }
        },
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
a{
    text-decoration: none;
    color: #333;
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
.m-page{
    width: 1055px;
    min-height: 600px;
    margin: 0 auto;
    overflow:hidden;
    background-color: white;
}
.tab-bar {
    margin-top: 50px;
    color:#666666;
    font-weight: bolder;
}
.tab-bar .active {
    color: black;
    border-bottom: orange 3px solid;
}
.tab-con{
    margin-top: 20px;
}
.comment-count{
    margin-left: 25px;
}
.comment-tip1{
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    color:#666666;
    width: 700px;
    font-size: 12px;
    margin-left: auto;
    margin-right: auto;
}
.comment-tip2{
    text-align: center;
    color:#666666;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
}
.line1 {
    height: 0.5px;
    background-color: #666666;
    flex-grow: 0.5;
}

.line2 {
    height:  0.5px;
    background-color: #666666;
    flex-grow:0.5;
}
.comment-tab{
    margin-right: 25px;
}
.m-comment{
    width: 1005px;
    margin-left: 25px;
    background-color: #fff;
    background-image: linear-gradient(#333333, #666666);
    margin-top: 20px;
    border-radius:15px;
}
.comment-creator{
    margin-top: 80px;
    text-align: center;
    width: 300px;
}
.user-head{
    border:  white 2px solid;
    width: 64px;
    height: 64px;
    margin: auto;
    border-radius:50%;
    overflow:hidden;
}
.user-info{
    margin-top: 10px;
}
.user-info p:first-of-type{
    font-size: 18px;
    font-weight: bold;
}
.user-info p{
    display: block;
    border-bottom: 5px;
    font-size: 12px;
    line-height: 1.5;
    color: white;
}
.comment-rate{
    height: 55px;
}
.line3{
    width: 90%;
    margin: auto;
    border-top: #aaaaaa 1px solid;
}

.rate-name{
    font-size: 18px;
    font-weight: bolder;
    margin-bottom: 5px;
    margin-left: 5px;
}
.rate-count-time{
    font-size: 12px;
    margin-left: 5px;
    margin-top: 30px;
    color:#666666;
}

.m-rate-left{
    margin-top: 15px;
    margin-left: 15px;
}

.m-rate-right{
    margin-top: 20px;
    height: 40px;
}

.m-comment-right{
    width: 700px;
    background-color: #fff;
    margin-top: 3px;
    margin-bottom: 3px;
    margin-right: 3px;
    border-radius:15px
}

.comment-main{
    min-height: 170px;
}
.comment-time{
    margin-top: 15px;
    font-size: 14px;
    color:#666666;
    margin-left: 15px;
    font-weight: bolder;
}

.wrapper {
    display: flex;
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 15px;
    /*margin: auto;*/
    width: 670px;
    overflow: hidden;
    /*border-radius: 8px;*/
    /*padding: 15px ;*/
    /*box-shadow: 20px 20px 60px  #fff,*/
    /*-20px -20px 60px #fff;*/
}
.text {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    /*text-align: justify;*/
    letter-spacing: normal;
    word-break :break-all;
    word-wrap: break-word;
    position: relative;
    line-height: 1.5;
    max-height: 10.5em;
    transition: .3s max-height;
    color:#666666;
}
.text::before {
    content: '';
    height: calc(100% - 18px);
    float: right;
}
.text::after {
    content: '';
    width: 999vw;
    height: 9999vw;
    position: absolute;
    box-shadow: inset calc(100px - 999vw) calc(30px - 999vw) 0 0  white;
    margin-left: -100px;
}
.btn{
    position: relative;
    float: right;
    clear: both;
    margin-left: 20px;
    font-size: 12px;
    padding: 0 8px;
    background: #3F51B5;
    line-height: 18px;
    border-radius: 4px;
    color:  white;
    cursor: pointer;
}
.btn::after{
    content:'展开'
}
.exp{
    display: none;
}
.exp:checked+.text{
    max-height: none;
}
.exp:checked+.text::after{
    visibility: hidden;
}
.exp:checked+.text .btn::before{
    visibility: hidden;
}
.exp:checked+.text .btn::after{
    content:'收起'
}
.btn::before{
    content: '...';
    position: absolute;
    left: -10px;
    color: #333;
    transform: translateX(-100%)
}

.comment-judge{
}
.comment-judge p{
    font-size: 12px;
}
.rate-ico{
    border: 1px #aaaaaa solid;
    font-size: 12px;
    margin-left: 5px;
    width: 90px;
    height: 26px;
    text-align: center;
    vertical-align: middle;
    border-radius: 13px;
    line-height: 26px;
    display: inline-block;
    color:#666666;
}
/*.rate-ico:hover{*/
/*    background-color: #e9e9e9;*/
/*}*/
.rate-icons{
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 20px;
}

</style>
