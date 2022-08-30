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
            <el-popover placement="top-start" width="320" trigger="click" class="emoBox">
                <!--                action="https://testopenapi.nbdeli.com/crm/customer/saveChannelLogoFile"-->
                <div class="imgList">
                    <el-upload
                        :on-preview="handlePictureCardPreview"
                        :disabled="upload.isUploading"
                        :multiple="true"
                        :on-change="handleFileChange"
                        :before-remove="handleFileRemove"
                        :auto-upload="false"
                        :file-list="upload.fileList"
                        :class="{ hide: uploadDisabled }"
                        :show-file-list="true"
                        list-type="picture-card"
                        :limit="limit"
                        :accept="fileType?fileType:'image/*'"
                        action="http://localhost:6001/api/column/uploadColumnImage"
                        :on-success="handleUploadSuccess"
                        :on-remove="handleRemove"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>

                </div>
                <el-button
                    class="imgSelect"
                    slot="reference"
                ><img class="imgSelect" src="../assets/imgs/card-image.svg"></el-button>
            </el-popover>
            <span class="send-button fr" @click="submitFileForm">发布</span>
        </div>
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
            textareaC: "",
            title:"",
            uploadDisabled: false,
            logoId: "1", //专区logo id
            dialogVisible: false,
            fileList: [],
            form: {
                dialogImageUrl: "1", //图片上传到后台之后，后台会返回一个id,只需要给后台传id,但是点击编辑的时候后台返回的是http地址
            },
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
                url: 'http://localhost:6001/api/column/uploadColumnImage',
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
        // 移除封面图
        handleRemove(file, fileList) {
            fileList,
                console.log(file);
            setTimeout(() => {
                this.uploadDisabled = false;
            }, 1000);
        },
        // 文件状态变化
        handleChange(file, fileList) { //上传成功与否都会触发
            this.uploadDisabled = fileList.length >= this.limit;
        },
        // 预览封面图
        handlePictureCardPreview(file) {
            this.form.dialogImageUrl = file.url;
            this.dialogVisible = true;
            this.uploadDisabled = true;
        },
        //上传成功
        handleUploadSuccess(file) {
            console.log('上传成')
            this.form.dialogImageUrl = file.result; //上传服务器成功
            this.uploadDisabled = true;
        },
        // 上传发生变化钩子
        handleFileChange(file, fileList) {
            this.upload.fileList = fileList;
        },
        // 删除之前钩子
        handleFileRemove(file, fileList) {
            this.upload.fileList = fileList;
        },
        postImg:function (fd){
            this.$axios.post(
                this.upload.url,
                {
                    formData:fd,
                },
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                .then(res => {
                    if(res.data.result === 1){
                        alert('上传成功！');
                    }else{
                        alert('response.msg');
                    }
                })
        },
        submitFileForm() {
            if(this.textareaC===''||this.title==='')
            {
                alert('帖子内容不能为空')
                return
            }
            let fd = new FormData();
            for (let i in this.upload.fileList)
            {
                console.log(this.upload.fileList[i].name + 'img-' + i.toString())
                fd.append('img-' + ' ' +  i.toString(), this.upload.fileList[i]);
                this.upload.fileName.push(this.upload.fileList[i].name);
            }
            for (let [a, b] of fd.entries()) {
                console.log(a, b)
            }
            this.postImg(fd)
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
