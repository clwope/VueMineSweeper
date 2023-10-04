<template>
    <div>
        <h1>{{ $t('header') }}</h1>
        <p id="pScore">{{ $t('topScore') }}: {{ topScore }} {{ $t('seconds') }}</p>
        <p id="pUsername" v-if="this.$store.state.username">{{ $t('username') }}: {{ this.$store.state.username }}</p>
        <button id="score" v-on:click="showScores">{{ $t('scoreboardButton') }}</button>
        <select v-bind:disabled="this.$parent.close" name="lang" id="selectBox" v-model="$i18n.locale" @change="this.$store.state.diff = ''">
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
        </select>
    </div>
    <article v-show="!close">
        <button v-on:click="closeBtn">X</button>
        <p>{{ $t('scoreboardButton') }}</p>

        <ul>
            <li v-for="x in scores">{{ $t('username') }}: {{ x.name }} | {{ $t('topScore') }}: {{ x.topScore }} {{ $t('seconds') }}</li>
        </ul>
    </article>
    <hr>
</template>

<script>
    export default{
        data(){
            return {
                topScore: null,
                close: true,
                scores: []
            }
        },
        methods: {
            async getHighest(){
                let data = await fetch("http://localhost:3000/getHighest", {
                    method: "GET"
                }).then((result) => { return result.json(); });

                this.topScore = data.result;
            },
            async showScores(){
                this.close = false;
                let data = await fetch("http://localhost:3000/scores", {
                method: "GET"
                }).then((result) => {return result.json()}).catch((e) => {return e});

                this.scores = data;
            },
            closeBtn(){
                this.close = true;
            },
            selectChange(){
                console.log(this.$store.state.local);
            }
        },
        mounted(){
            this.getHighest();
        }
    }
</script>

<style scoped>
    div{
        width: 100%;
        background-color: #faedcd;
        display: flex;
        position: relative;
    }
    h1{
        width: 100%;
        text-align: center;
        color: black;
        font-family:'Courier New', Courier, monospace;
        font-size: 40px;
        padding: 30px 0;
    }
    hr{
        width: 100%;
        height: 5px;
        background-color: black;
    }
    #pScore:nth-of-type(1){
        position: absolute;
        font-size: 20px;
        color: red;
        right: 30px;
        top: 10px;
    }

    #pUsername:nth-of-type(2){
        position: absolute;
        font-size: 20px;
        color: black;
        right: 30px;
        top: 60px;
    }
    #score{
    background-color: black;
    color: whitesmoke;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 36px;
    left: 30px;
    height: 30px;
    font-size: 20px;
    padding: 5px;
    width: 120px, fit-content;
    cursor: pointer;
    transition: all 0.2s;
   }
   #score:hover{
    background-color: grey;
   }

    article{
    width: 500px;
    height: 520px;
    padding: 30px 25px 15px 15px;
    background-color: #faedcd;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    z-index: 30;
    border: 2px solid black;
    border-radius: 10px;
    }
   article button{
    background-color: red;
    color: black;
    position: absolute;
    top: -1px;
    right: -2px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    border-top-right-radius: 0px;
  }
  article p{
    display: flex;
    justify-content: center;
    font-size: 28px;
    font-weight: 600;
    font-family:'Times New Roman', Times, serif;
    margin-bottom: 20px;
  }
  article ul{
    width: 100%;
    height: 420px;
    list-style: none;
    margin-right: 10px;
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  article li{
    border: 1px solid black;
    color: red;
    font-size: 24px;
    padding: 7px 0;
  }
  #selectBox{
        position: absolute;
        top: 35px;
        right: 400px;
        transform: translateX(50%);
        font-size: 20px;
        background-color: #001219;
        color: #faedcd;
        width: 120px;
        height: 30px;
        display: flex;
        align-items: center;
    }
</style>