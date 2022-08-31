<template>
    <div class="editor clearbox">
        <input class="chatTitle" placeholder="请输入标题" v-model="title">
        <textarea  v-model="textareaC"  placeholder="发一个友善的帖子" class="chatText clearbox" ref="lczdTxt" id="textareaC" @keydown="getHight"></textarea>
        <div class="rich-editor clearbox">
            <div class="chatIcon fl">
                <el-popover placement="top-start" width="400" trigger="click" class="emoBox">
                    <div class="emotionList">
                        <a href="javascript:void(0);" @click="getEmo(index)" v-for="(item,index) in faceList" :key="index" class="emotionItem">{{item}}</a>
                    </div>
                    <el-button
                        class="emotionSelect"
                        slot="reference"
                    ></el-button>
                </el-popover>
            </div>
            <span class="send-button fr" @click="dePicText(title)">发布</span>
        </div>
        <span @click=" picText(textareaC)">+++++{{ text }}</span>
    </div>
</template>

<script>
export default {
    name:"ColumnCreator",
    props: {
        value: {
            type: Array,
            default: () => []
        },
        limit: {
            type: Number,
            default: 9
        },
        fileType: String,
    },
    data() {
        return {
            faceList: [],
            textareaC:'' ,
            title:"我超😀😄🤩",
            text:'',
            uploadDisabled: false,
            upload: {
                // 是否显示弹出层（用户导入）
                open:true,
                // 弹出层标题（用户导入）
                title: '',
                // 是否禁用上传
                isUploading: false,
                // 是否更新已经存在的用户数据
                updateSupport: 0,
                // 设置上传的请求头部
                // 上传的地址
                url: 'http://localhost:6001/api/column/uploadColumnContent',
                fileList: [],
                fileName: []
            }
        }
    },
    mounted() {
        const appData = require("../assets/emoji.json");
        for(let i in appData){
            this.faceList.push(appData[i].char);
        }
    },
    methods: {
        dePicText(tex){
            console.log( this.faceList.length)
            for(let i=0;i<tex.length;i++)
            {
                var flag = false
                for(let j=0;j<this.faceList.length;j++)
                {
                    var temp = tex.slice(i,i+this.faceList[j].length)
                    // console.log('切片位置' +i.toString() +' to ' +(i+this.faceList[j].length).toString() + temp)
                    for(let k=0;k<this.faceList.length;k++)
                    {
                        if(temp===this.faceList[k])
                        {
                            console.log('加入' + this.faceList[k]);
                            if(k<10)
                            {
                                this.textareaC+=('@#' + k.toString() +  '  #')
                            }
                            else if(k<100)
                            {
                                this.textareaC+=('@#' + k.toString() +  ' #')
                            }
                            // console.log(i)

                            // console.log('cur i  ' + i.toString())
                            i+=this.faceList[k].length-1;
                            // console.log('then i  ' + i.toString())
                            flag=true
                            break;
                        }
                    }
                    if(flag===true)
                    {
                        break
                    }
                }
                if(flag===true)
                {
                   continue
                }
                console.log('加入' + tex[i])
                this.textareaC+=tex[i]
            }
        },
        picText(tex)
        {

            console.log(tex.length)
            console.log( this.faceList.length)
            for(let i=0;i<tex.length;i++)
            {
                var num = ''
                console.log(tex[i])
                console.log(i)
                if(tex[i]==='@'&&tex[i+1]==='#'&&tex[i+5]==='#')
                {
                    num+=tex[i+2];
                    num+=tex[i+3];
                    num+=tex[i+4];
                    console.log(tex[i+2] + tex[i+3]+ tex[i+4] + '-----')
                    console.log(typeof parseInt(num))
                    console.log(this.faceList[parseInt(num)])
                    console.log('++++++')
                    this.text+=this.faceList[parseInt(num)]
                    i+=5
                    continue
                }
                else{
                    this.text+=tex[i]
                }
            }
        },

        getHight() { //
            let textArea = this.$refs.lczdTxt;
            if (textArea.scrollHeight > 52) {
                textArea.style.height = "52px";
                textArea.style.height = textArea.scrollHeight + "px";
            }
        },
        getEmo(index) {
            var textArea = document.getElementById('textareaC');
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
            this.textareaC = textArea.value;// 要同步data中的数据
            // console.log(this.faceList[index]);
            console.log(this.textareaC)
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
    margin-top: -10px;
    height: 45px;
    width: 705px;
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
    background: url('../assets/imgs/emoji-laughing.svg') no-repeat 100%;
    border: none;
    height: 20px;
    width: 20px;
}
.emotionSelect:hover{
    background-color: transparent;
}
.imgSelect
{
    height: 17px;
    width: 17px;
    margin-top: 0.5px;
    border: none;
}
.imgSelect:hover{
    background-color: transparent;
}
.editor{
    background-color: white;
    width: 705px;
    min-height: 130px;
    margin: auto;
    border-radius: 5px;
}
.chatTitle{
    margin-left: 15px;
    margin-top: 20px;
    height: 30px;
    width: 685px;
    outline:none;
    border: none;
    line-height: 30px;
}
.chatText{
    border-radius:5px;
    background-color: #eeeeee;
    width: 685px;
    outline:none;
    margin-bottom: 10px;
    margin-left: 10px;
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
    margin-right: 10px;
    margin-top: 10px;
}
</style>
