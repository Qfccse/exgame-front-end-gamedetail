<template>
    <div>
        <p>前置页面</p>
        <router-link :to="{name:'GameDetail',params:{game_id:'0000000006'}}">
            <el-button class="bottomRight" type="primary">跳转</el-button>
        </router-link>
    </div>
</template>

<script>
export default{
    data(){
        return{

        }
    },

    methods: {}

}


</script>

<style>
p {
    font-size: 20px;
    color: #353535;
    text-align: center;
    margin-top: 50px;
}
</style>
