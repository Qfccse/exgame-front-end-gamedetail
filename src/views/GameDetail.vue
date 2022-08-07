<!--张宇 1952168-->
<template>
    <div id="canvas">
        <GameCarousel game_id="0000000006"></GameCarousel>
        <GameInfo :game_id="this.game_id"></GameInfo>
        <GameComments :game_id="this.game_id" :user_id="this.user_id"></GameComments>
    </div>
</template>

<script>
import GameCarousel from "@/components/GameCarousel";
import GameInfo from "@/components/GameInfo";
import GameComments from "@/components/GameComments";
export default {
    name: "GameDetail",
    props:['game_id','user_id'],
    components: {
        GameComments,
        GameInfo,
        GameCarousel,
    },
}

</script>

<style scoped>
#canvas {
    position:fixed;
    width:100%;
    height:100vh;
    background: url("../assets/imgs/gamebg.png")no-repeat;
    overflow: auto;
}

</style>
