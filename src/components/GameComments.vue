<template>
    <div class="m-page clearbox">
        <div style="margin-bottom: 30px;margin-top: 10px">
            <div style="background-color: #b3d4fc;height: 60px;border: #55a532 1px solid;">
                <div style="display: block;width: 690px;float: left">
                    <p>总体测评</p>
                    <p style="margin-top: 10px;font-size: 20px;font-weight: bolder;color: #3B9CFF" >好评如潮 <span style="font-size: 12px;font-weight: normal;color: black">(30 篇评测)</span></p>
                </div>
                <div style="display: block;margin-left: 15px;float: left">
                    <p>总体测评</p>
                    <p style="margin-top: 10px;font-size: 20px;font-weight: bolder;color: #3B9CFF">好评如潮 <span style="font-size: 12px;font-weight: normal;color: black">(30 篇评测)</span></p>
                </div>
            </div>
            <select style="width: 50px;" @change="selectComments(num)" v-model="select">
                <option>全部</option>
                <option>好评</option>
                <option>差评</option>
            </select>
            <div>
                <span style="display: block;height:20px;width: 690px;border: #55a532 1px solid;float: left">最有价值的评测</span>
                <span style="margin-left: 15px;float: left">最近发布</span>
            </div>
        </div>
        <ul class="most-value fl">
            <li v-for="(comment,index) in mostValuedComments" :key="index">
                <div class="m-comment fl">
                    <div class="m-comment-left fl">
                        <div class="comment-creator">
                            <div class="user-head fl">
                                <img  :src="require('../assets/imgs/' + comment.user.head)"  alt="" height="36" width="36" >
                            </div>
                            <div class="user-info fl">
                                <p>{{comment.user.name}}</p>
                                <p>账户内拥有{{comment.user.gameNum}}项产品</p>
                                <p>{{comment.user.commentNum}}篇测评</p>
                            </div>
                        </div>
                    </div>
                    <div class="m-comment-right fl">
                        <div class="comment-rate">
                            <div class="m-rate-left fl">
                                <img  v-if="comment.detail.rate===1" src="../assets/imgs/icon_thumbsUp.png"  alt="">
                                <img v-else src="../assets/imgs/icon_thumbsDown.png" alt="">
                            </div>
                            <div class="m-rate-right fl">
                                <div class="rate-name" >
                                    <span v-if="comment.detail.rate===1">推荐</span>
                                    <span v-else>不推荐</span>
                                </div>
                                <div class="rate-count-time">
                                    总时数 {{comment.user.gamedTime}}小时
                                    <span v-if="comment.user.gamedTimeComment!==''">（测评时{{comment.user.gamedTimeComment}}小时）</span>
                                </div>
                            </div>
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
                        <div class="comment-judge">
                            <p>这篇评测是否有价值?</p>
                            <div class="rate-icons">
                    <span class="rate-ico"  :id="getRateID(index+1,'rate-ico-1-',1)" @click="addRate(index,1,1)">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                            <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                        </svg>
                        是
                    </span>
                                <span class="rate-ico" :id="getRateID(index+1,'rate-ico-2-',1)" @click="addRate(index,2,1)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                            <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                        </svg>
                        否
                    </span>
                                <span class="rate-ico"  :id="getRateID(index+1,'rate-ico-3-',1)" @click="addRate(index,3,1)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                        </svg>
                        欢乐
                     </span>
                            </div>
                            <p>有{{comment.rate.goodCount }} 人觉得这篇评测有价值</p>
                            <p>有{{comment.rate.happyCount}}人觉得这篇评测很欢乐</p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <ul  class="most-recent fr">
            <li v-for="(comment,index) in mostRecentComments" :key="index">
                <div class="m-comment-recent fl">
                    <div class="comment-rate-recent">
                        <div class="m-rate-left-recent fl">
                            <img v-if="comment.detail.rate===1" src="../assets/imgs/icon_thumbsUp.png" height="20" width="20" alt="">
                            <img v-else src="../assets/imgs/icon_thumbsDown.png" height="20" width="20" alt="">
                        </div>
                        <div class="m-rate-right-recent">
                            <div class="rate-user fl">
                                {{ comment.user.name }}
                            </div>
                            <div class="rate-count-time fr" style="margin-right: 100px">
                                {{comment.user.gamedTime}}小时
                            </div>
                        </div>
                    </div>
                    <div class="recent-comment-main" >
                        <div class="recent-comment-time">
                            发布于：{{ mostValuedComments[0].detail.date }}
                        </div>
                        <div >
                            {{ mostValuedComments[0].detail.content }}
                        </div>
                    </div>
                    <div class="comment-judge">
                        <p>是否有价值?</p>
                        <div class="rate-icons">
                    <span class="rate-ico"  :id="getRateID(index + 1,'rate-ico-1-',2)" @click="addRate(index,1,2)">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                            <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                        </svg>
                        是
                    </span>
                            <span class="rate-ico" :id="getRateID(index + 1,'rate-ico-2-',2)" @click="addRate(index ,2,2)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                            <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                        </svg>
                        否
                    </span>
                            <span class="rate-ico"  :id="getRateID(index + 1,'rate-ico-3-',2)" @click="addRate(index,3,2)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                        </svg>
                        欢乐
                     </span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "GameComments",
    props:['game_id','user_id'],
    data(){
        return {
            select:'全部',
            mostValuedCommentsNum:3,
            mostRecentCommentsNum:4,
            comments:[
                {
                    user:{
                        head:'h1.jpg',
                        uid:'',
                        name:'阿古斯之手',
                        gameNum:168,
                        commentNum:9,
                        gamedTime:'196.1',
                        gamedTimeComment:'181.5',
                    },
                    detail:{
                        rate:1,
                        cid:'',
                        date:'7.8',
                        content:'忠告：一周目是你最宝贵的财富，得到宝藏的兴奋，鏖战boss的坚持，误入捷径的惊喜，不完美才会记得，不完整才有动力，不要让攻略指引你的脚步，不要让收集毁了你的体验。如果能许下一个愿望，我希望让我忘记这个游戏所有的记忆，带着初心再战一次。'
                    },
                    rate:{
                        goodCount:1952,
                        badCount:0,
                        happyCount:41,
                    },
                    myChoice:{
                        good:true,
                        bad:false,
                        happy:true,
                    }
                },
                {
                    user:{
                        head:'h2.jpg',
                        name:'894.',
                        uid:'',
                        gameNum:160,
                        commentNum:5,
                        gamedTime:'65.9',
                        gamedTimeComment:'',
                    },
                    detail:{
                        rate:1,
                        cid:'',
                        date:'7.10',
                        content:
                            '人生就是一个开放世界游戏。\n' +
                            '有很多npc、很多任务、很多风景等着我们去认识，去接触、去探索。\n'+
                            '如果能早一点来到交界地\n'+
                            '也许就不用学习那些并不擅长的治愈祷告\n' +
                            '不用带着那些刺鼻的苔藓\n' +
                            '就算两只手都握着大剑 身上也会闪烁着黄金树的光芒\n' +
                            '她应该是一个活泼开朗乐观的女孩，急性子\n' +
                            '听了太多的英雄的故事，在大赐福等的不耐烦了，一个人跑来破败的礼拜堂，迎接心里早已排练了无数遍的王和女巫的初次相遇\n' +
                            '我们会在大赐福有一个自己的房间\n' +
                            '她会和罗德莉卡成为朋友，和菲雅说悄悄话，会拜托柏克剪短自己的长裙，柯林老师的授课也会轻松许多\n' +
                            '她会帮我计算怎么分配卢恩，会和我一起挑选适合的武器，会在我擦拭大剑的时候去河边给托雷特洗澡\n' +
                            '她会红着脸让流浪商人给一大捆羽毛箭打折，一边往嘴里塞煮熟的虾子一边抱怨流氓一直盯着她的脸，乐此不疲的研究怎么让仿生泪滴变成自己的样子\n' +
                            '还要遇见多少人，才能填补这段空白啊\n' +
                            '故事要是能从第一句改写就好了\n' +
                            '我们可以一起坐在赐福旁边，商量一个我们都满意的结局。\n' +
                            '即使引导已经破碎，终将为王的褪色者也会踏上旅程。',
                    },
                    rate:{
                        goodCount:1952,
                        badCount:0,
                        happyCount:4,
                    },
                    myChoice:{
                        good:false,
                        bad:false,
                        happy:false,
                    }
                },
                {
                    user:{
                        head:'h3.jpg',
                        name:'纯粹DUOLUO',
                        uid:'',
                        gameNum:103,
                        commentNum:7,
                        gamedTime:'122.6',
                        gamedTimeComment:'122.5',
                    },
                    detail:{
                        rate:2,
                        cid:'',
                        date:'7.23',
                        content:'论一个好游戏被小蓝熊毁掉的故事还不够多吗？怎么2022年了还有运营用小蓝熊？我这个差评不是给宫崎也不是给埃尔登！而是给小蓝熊！以后只要有小蓝熊的游戏我都会给小蓝熊刷差评！小蓝熊差评从我做起！拒绝小蓝熊这个外挂软件！'
                    },
                    rate:{
                        goodCount:40,
                        badCount:0,
                        happyCount:4,
                    },
                    myChoice:{
                        good:false,
                        bad:false,
                        happy:false,
                    }
                },
                {
                    user:{
                        head:'h4.jpg',
                        name:'2572372856',
                        uid:'',
                        gameNum:57,
                        commentNum:5,
                        gamedTime:'44.9',
                        gamedTimeComment:'18.5',
                    },
                    detail:{
                        rate:1,
                        cid:'',
                        date:'8.6',
                        content:'蛮好的',
                    },
                    rate:{
                        goodCount:0,
                        badCount:0,
                        happyCount:0,
                    },
                    myChoice:{
                        good:true,
                        bad:false,
                        happy:false,
                    }
                },
                {
                    user:{
                        head:'h5.jpg',
                        name:'obidou',
                        uid:'',
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
                        happyCount:0,
                    },
                    myChoice:{
                        good:false,
                        bad:false,
                        happy:false,
                    }
                },
                {
                    user:{
                        head:'h6.jpg',
                        name:'Ash',
                        uid:'',
                        gameNum:132,
                        commentNum:1,
                        gamedTime:'8.8',
                        gamedTimeComment:'8.5',
                    },
                    detail:{
                        rate:2,
                        cid:'',
                        date:'8.5',
                        content:'难度太高玩不下去',
                    },
                    rate:{
                        goodCount:0,
                        badCount:0,
                        happyCount:0,
                    },
                    myChoice:{
                        good:false,
                        bad:false,
                        happy:false,
                    }
                },
                {
                    user:{
                        head:'h7.jpg',
                        name:'伊蕾娜',
                        uid:'',
                        gameNum:16,
                        commentNum:1,
                        gamedTime:'164.9',
                        gamedTimeComment:'120.5',
                    },
                    detail:{
                        rate:1,
                        cid:'',
                        date:'8.5',
                        content:'只要你喜欢这款游戏卖多少都不会觉的贵',
                    },
                    rate:{
                        goodCount:0,
                        badCount:0,
                        happyCount:0,
                    },
                    myChoice:{
                        good:false,
                        bad:false,
                        happy:false,
                    }
                },
            ],
            mostValuedComments:[],
            mostRecentComments:[],
        }

    },
    mounted() {
        this.getData('0000000006','0000000001');
        this.init();
        setTimeout(this.pic,100);
    },
    methods:{
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
            this.$axios.post('api/gamedetail/getGameComment', {
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
                    self.comments.push(res.data.comment_list[i])
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
                        head:this.comments[i].user.head,
                        name:this.comments[i].user.name,
                        gameNum:this.comments[i].user.gameNum,
                        commentNum:this.comments[i].user.commentNum,
                        gamedTime:this.comments[i].user.gamedTime,
                        gamedTimeComment:this.comments[i].user.gamedTimeComment,
                    },
                    detail:{
                        rate:this.comments[i].detail.rate,
                        date:this.comments[i].detail.date,
                        content:this.comments[i].detail.content,
                    },
                    rate:{
                        goodCount:this.comments[i].rate.goodCount,
                        badCount:this.comments[i].rate.badCount,
                        happyCount:this.comments[i].rate.happyCount,
                    },
                    myChoice:{
                        good:this.comments[i].myChoice.good,
                        bad:this.comments[i].myChoice.bad,
                        happy:this.comments[i].myChoice.happy,
                    }
                })
            }
            for(let i=this.mostValuedCommentsNum;i<this.comments.length;i++)
            {
                this.mostRecentComments.push({
                    user:{
                        name:this.comments[i].user.name,
                        gamedTime:this.comments[i].user.gamedTime,
                    },
                    detail:{
                        rate:this.comments[i].detail.rate,
                        date:this.comments[i].detail.date,
                        content:this.comments[i].detail.content,
                    },
                    rate:{
                        goodCount:this.comments[i].rate.goodCount,
                        badCount:this.comments[i].rate.badCount,
                        happyCount:this.comments[i].rate.happyCount,
                    },
                    myChoice:{
                        good:this.comments[i].myChoice.good,
                        bad:this.comments[i].myChoice.bad,
                        happy:this.comments[i].myChoice.happy,
                    }
                })
            }
        },
        pic:function ()
        {
            for(let i=0; i<this.mostValuedComments.length; i++)
            {
                if(this.mostValuedComments[i].myChoice.good===true&&this.mostValuedComments[i].myChoice.bad===true)
                {
                    alert('测评数据出错，不能同时选择good、bad')
                    return;
                }

                if(this.mostValuedComments[i].myChoice.good===true)
                {
                    document.getElementById(this.getRateID(i+1,'rate-ico-1-',1)).style.backgroundColor = 'red';
                }
                else if(this.mostValuedComments[i].myChoice.bad===true)
                {
                    document.getElementById(this.getRateID(i+1,'rate-ico-2-',1)).style.backgroundColor = 'red';
                }
                else {
                    console.log('good/bad not choose')
                }
                if(this.mostValuedComments[i].myChoice.happy===true)
                {
                    document.getElementById(this.getRateID(i+1,'rate-ico-3-',1)).style.backgroundColor = 'red';
                }
                console.log('comment' + (i+1).toString() + '渲染完毕')
            }
            for(let i=0; i<this.mostRecentComments.length; i++)
            {
                if(this.mostRecentComments[i].myChoice.good===true&&this.mostRecentComments[i].myChoice.bad===true)
                {
                    alert('测评数据出错，不能同时选择good、bad')
                    return;
                }

                if(this.mostRecentComments[i].myChoice.good===true)
                {
                    document.getElementById(this.getRateID(i+1,'rate-ico-1-',2)).style.backgroundColor = 'red';
                }
                else if(this.mostRecentComments[i].myChoice.bad===true)
                {
                    document.getElementById(this.getRateID(i+1,'rate-ico-2-',2)).style.backgroundColor = 'red';
                }
                else {
                    console.log('good/bad not choose')
                }
                if(this.mostRecentComments[i].myChoice.happy===true)
                {
                    document.getElementById(this.getRateID(i+1,'rate-ico-3-',2)).style.backgroundColor = 'red';
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
                        document.getElementById(this.getRateID(index+1,'rate-ico-2-',pos)).style.backgroundColor = '#3B9CFF';
                        comment[index].rate.badCount--;
                    }
                    comment[index].myChoice.good=true;
                    document.getElementById(this.getRateID(index+1,'rate-ico-1-',pos)).style.backgroundColor = 'red';
                    comment[index].rate.goodCount++;
                }
                else{
                    comment[index].myChoice.good=false;
                    document.getElementById(this.getRateID(index+1,'rate-ico-1-',pos)).style.backgroundColor = '#3B9CFF';
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
                        document.getElementById(this.getRateID(index+1,'rate-ico-1-',pos)).style.backgroundColor = '#3B9CFF';
                        comment[index].rate.goodCount--;
                    }
                    comment[index].myChoice.bad=true;
                    document.getElementById(this.getRateID(index+1,'rate-ico-2-',pos)).style.backgroundColor = 'red';
                    comment[index].rate.badCount++;
                }
                else{
                    comment[index].myChoice.bad = false;
                    document.getElementById(this.getRateID(index+1,'rate-ico-2-',pos)).style.backgroundColor = '#3B9CFF';
                    comment[index].rate.badCount--;
                }
            }
            else if(type===3)
            {
                if(comment[index].myChoice.happy===false)
                {
                    comment[index].myChoice.happy = true;
                    document.getElementById(this.getRateID(index+1,'rate-ico-3-',pos)).style.backgroundColor = 'red';
                    comment[index].rate.happyCount++;
                }
                else{
                    comment[index].myChoice.happy = false;
                    document.getElementById(this.getRateID(index+1,'rate-ico-3-',pos)).style.backgroundColor = '#3B9CFF';
                    comment[index].rate.happyCount--;
                }
            }
            else{
                console.log('rate not found err')
            }
        },
        selectComments:function (){
            alert(this.select)
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
    width: 1005px;
    min-height: 600px;
    margin: 0 auto;
    overflow:hidden;
}

.m-comment{
    width: 690px;
    min-height: 475px;
    margin: 0 auto;
}
.comment-creator{
    margin-top: 5px;
    margin-left: 5px;
}
.user-head{
    border: #3B9CFF 2px solid;
    width: 40px;
    height: 40px;
    background-color: #3B9CFF;
}
.user-info{
    margin-left: 5px;
}
.user-info p:first-of-type{
    font-size: 16px;
    font-weight: bold;
}
.user-info p{
    display: block;
    border-bottom: 5px;
    font-size: 12px;
    line-height: 1.5;
}
.comment-rate{
    height: 40px;
    margin-bottom: 10px;
    margin-top: 5px;
    border: #000000 1px solid;
}
.m-comment-recent{
    margin-bottom: 10px;
}
.comment-rate-recent{
    height: 20px;
    margin-bottom: 10px;
    margin-top: 5px;
    border: #000000 1px solid;
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
}
.m-comment-left{
    width: 250px;
    min-height:475px;
    height:100%;
    background-color: #fff;
    border: 2px #DD4A68 solid;
}
.m-rate-left{
    width: 40px;
    height: 40px;
}
m-rate-right-recent{
    width: 20px;
    height: 20px;
}
.m-rate-right{
    height: 40px;
}
.m-rate-right-recent{
    height: 20px;
}
.rate-user{
    font-size: 14px;
    font-weight: bolder;
    margin-left: 5px;
}
.m-comment-right{
    width: 440px;
    min-height: 475px;
    background-color: #fff;
    border: 2px #55a532 solid;
}
.most-recent{
    width: 300px;
    background-color: #fff;
    border: 2px #3B9CFF solid;
}


.comment-main{
    min-height: 320px;
    border: black 1px solid;
}
.comment-time{
    margin-top: 10px;
    font-size: 14px;
}
.recent-comment-main{
    font-size: 14px;
    border: black 1px solid;
}
.recent-comment-time{
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
}
.wrapper {
    display: flex;
    margin-top: 10px;
    /*margin: auto;*/
    width: 430px;
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
    max-height: 21em;
    transition: .3s max-height;
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
    margin-top: 10px;
    border: #795da3 1px solid;
}
.comment-judge p{
    font-size: 12px;
}
.rate-ico{
    background-color: #3B9CFF;
    font-size: 14px;
    margin-left: 5px;
}
.rate-icons{
    margin-bottom: 10px;
    margin-top: 10px;
}

</style>
