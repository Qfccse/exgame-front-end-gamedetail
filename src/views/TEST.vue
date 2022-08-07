<template>
    <!-- https://juejin.cn/post/6963904955262435336 -->
    <div style="background-color: white" class="co">
        <div class="wrapper">
            <input id="exp1" class="exp"  type="checkbox">
            <div class="text">
                <label class="btn" for="exp1"></label>
                <textarae>{{content}}</textarae>
            </div>
        </div>
        <div class="wrapper">
            <input id="exp2" class="exp"  type="checkbox">
            <div class="text">
                <label class="btn" for="exp2"></label>
                <textarae>{{content}}</textarae>
            </div>
        </div>
        <div class="wrapper">
            <input id="exp3" class="exp"  type="checkbox">
            <div class="text">
                <label class="btn" for="exp3"></label>
                <textarae>{{content}}</textarae>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "TEST",
    data(){
        return {
            //     content:"1234567890123456789012345678901234567890123456789012345678902" +
            //         '\u3000\u3000\u3000\u3000\u3000'+'\u3000\u3000\u3000\u3000\u3000'+'\u3000\u3000\u3000\u3000\u3000'
            //         +'\u3000\u3000\u3000\u3000\u3000'+'\u3000\u3000\u3000\u3000\u3000'+'\u3000\u3000\u3000\u3000\u3000'+
            //         '\u3000\u3000\u3000\u3000\u3000'+
            //         '浮动元素是如何定位的' +'\u3000\u3000\u3000\u3000\u3000'+'\u3000\u3000\u3000\u3000\u3000'+
            //         '\u3000\u3000\u3000\u3000\u3000'+'\u3000\u3000\u3000\u3000\u3000'+'\u3000\u3000\u3000\u3000\u3000'+'\u3000\u3000\u3000\u3000\u3000'+
            //         '正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。',
            //
            content:'忠告：一周目是你最宝贵的财富，得到宝藏的兴奋，鏖战boss的坚持，误入捷径的惊喜，不完美才会记得，不完整才有动力，不要让攻略指引你的脚步，不要让收集毁了你的体验。如果能许下一个愿望，我希望让我忘记这个游戏所有的记忆，带着初心再战一次.'
        }
    }
}
</script>

<style scoped>

.wrapper {
    display: flex;
    margin: auto;
    width: 500px;
    overflow: hidden;
    border-radius: 8px;
    padding: 15px ;
    box-shadow: 20px 20px 60px  #fff,
    -20px -20px 60px #fff;
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
    max-height: 3em;
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
</style>
