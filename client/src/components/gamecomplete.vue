<template>
    <div>
        <p>{{ $t('congratulate') }}</p>
        <p>{{ this.$store.state.time }} {{ $t('seconds') }}</p>
        <section>
            <button v-on:click="replay">{{ $t('playagainButton') }}</button>
            <button v-on:click="showScores">{{ $t('scoreboardButton') }}</button>
        </section>
    </div>
    <article v-show="!close">
        <button v-on:click="closeBtn">X</button>
        <p>{{ $t('scoreboardButton') }}</p>

        <ul>
            <li v-for="x in scores">{{ $t('username') }}: {{ x.name }} | {{ $t('topScore') }}: {{ x.topScore }} {{ $t('seconds') }}</li>
        </ul>
    </article>
</template>

<script>
    export default{
        data(){
            return {
                close: true,
                scores:  []
            }
        },
        methods:{
            replay(){
                location.reload();
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
            }
        }
    }
</script>

<style scoped>
    div{
    width: 360px;
    height: 175px;
    background-color: #faedcd;
    position: absolute;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    border: 2px solid black;
    padding: 10px 0 20px;
    }
    p{
    color: green;
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 10px;
    }
    button{
    background-color: black;
    color: whitesmoke;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    font-size: 20px;
    padding: 5px;
    width: 120px, fit-content;
    cursor: pointer;
    transition: all 0.2s;
    }
    button:nth-of-type(1):hover{
    background-color: grey;
    }
    button:nth-of-type(2){
    background-color: white;
    color: black;
    }
    button:nth-of-type(2):hover{
    background-color: grey;
    }
    section{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
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
    border: 1px solid black;
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
    color: black;
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
</style>