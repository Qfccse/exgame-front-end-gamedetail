<template>
    <div class="editor clearbox">
        <textarea  v-model="textarea"  placeholder="发一个友善的评论" class="chatText clearbox" ref="lczdTxt" id="textarea" @keydown="getHight"></textarea>
        <div class="rich-editor clearbox">
            <div class="chatIcon fl">
                <el-popover placement="top-start" width="400" trigger="click" class="emoBox">
                    <div class="emotionList">
                        <a href="javascript:void(0);" @click="getEmo(index)" v-for="(item,index) in faceList" :key="index" class="emotionItem">{{item}}</a>
                    </div>
                    <el-button
                        class="emotionSelect"
                        slot="reference"
                    ><span style="position: relative;top:-10px">表情</span></el-button>
                </el-popover>
            </div>
            <span class="send-button fr">发表评论</span>
        </div>
    </div>
</template>

<script>
export default {
    name:"ColumnReplyer",
    mounted() {
        const appData = require("../assets/emoji.json");
        for(let i in appData){
            this.faceList.push(appData[i].char);
        }
    },
    data() {
        return {
            faceList: [],
            textarea: "",
        };
    },

    methods: {
        getHight() { //
            let textArea = this.$refs.lczdTxt;
            if (textArea.scrollHeight > 52) {
                textArea.style.height = "52px";
                textArea.style.height = textArea.scrollHeight + "px";
            }

        },
        getEmo(index) {
            var textArea = document.getElementById('textarea');

            function changeSelectedText(obj, str) {
                if (window.getSelection) {
                    // 非IE浏览器
                    textArea.setRangeText(str);
                    // 在未选中文本的情况下，重新设置光标位置
                    textArea.selectionStart += str.length;
                    textArea.focus()
                } else if (document.selection) {
                    // IE浏览器
                    obj.focus();
                    var sel = document.selection.createRange();
                    sel.text = str;
                }
            }

            changeSelectedText(textArea, this.faceList[index]);
            this.textarea = textArea.value;// 要同步data中的数据
            // console.log(this.faceList[index]);
            console.log(this.textarea)
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
.fl{
    float: left;
}
.fr{
    float: right;
}
.clearbox{
    clear:both;
}
.rich-editor{
    height: 30px;
    width: 600px;
}
.chatIcon {
    padding: 0 10px;
    font-size: 25px;
}
.emotionList{
    display: flex;
    flex-wrap: wrap;
    padding:5px;
}
.emotionItem{
    width:10%;
    font-size:20px;
    text-align:center;
}
/*包含以下四种的链接*/
.emotionItem {
    text-decoration: none;
}
/*正常的未被访问过的链接*/
.emotionItem:link {
    text-decoration: none;
}
/*已经访问过的链接*/
.emotionItem:visited {
    text-decoration: none;
}
/*鼠标划过(停留)的链接*/
.emotionItem:hover {
    text-decoration: none;
}
/* 正在点击的链接*/
.emotionItem:active {
    text-decoration: none;
}
.emotionSelect{
    background: url('../assets/imgs/emoji-laughing.svg') no-repeat;
    border: none;
    width: 10px;
}
.emotionSelect:hover{
    background-color: transparent;
}
.editor{
    background-color: white;
    width: 600px;
    margin: auto;
}
.chatText{
    border-radius:5px;
    background-color: #F5F5F5;
    width: 600px;
    margin-bottom: 10px;
    min-height: 52px;
    overflow-y: hidden;
    padding: 10px;
    resize: none;
    font-family: 'Microsoft YouYuan', sans-serif;
    font-size:14px;
}
.send-button{
    border: #666666 1px solid;
    height: 20px;
    width: 80px;
    font-size: 14px;
    text-align: center;
    border-radius: 5px;
    line-height: 20px;
}
</style>
