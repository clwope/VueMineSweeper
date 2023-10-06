<template>
  <header-part />
  <main-part :rows="r" :columns="c" :mine="m"/>
  <div id="login" v-show="!close">
      <input type="text" v-bind:placeholder="$t('username')" v-model="input">
      <p>{{ $t('disclaimer') }}</p>
      <button id="close" v-on:click="closeBtn">X</button>
      <button type="submit" id="signIn" v-on:click="signIn">{{ $t('startButton') }}</button>
      <select name="difficulty" id="selectBox" v-model="this.$store.state.diff" v-on:change="diffChange">
            <option selected disabled value="">{{ $t('difficulties[0]') }}</option>
            <option v-bind:value="$t('difficulties[1]')">{{ $t('difficulties[1]') }}</option>
            <option v-bind:value="$t('difficulties[2]')">{{ $t('difficulties[2]') }}</option>
            <option v-bind:value="$t('difficulties[3]')">{{ $t('difficulties[3]') }}</option>
      </select>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        close: false,
        input: "",
        r: 10,
        c: 10,
        m: 12
      }
    },
    methods: {
      closeBtn(){
        this.$store.state.username = this.input;
        this.$store.state.isReady = true;
        this.close = true;
        if(this.$store.state.diff === ""){
          this.$store.state.diff = this.$t('difficulties[1]')
        }
        //console.log(this.$store.state.username);
      },
      signIn(){
        this.$store.state.username = this.input;
        this.$store.state.isReady = true;
        this.close= true;
        if(this.$store.state.diff === ""){
          this.$store.state.diff = this.$t('difficulties[1]')
        }
        //console.log(this.$store.state.username);
      },
      diffChange(){
        if(this.$store.state.diff === "Easy" || this.$store.state.diff === "" || this.$store.state.diff === "Kolay"){
            // this.$store.state.rows = 10;
            // this.$store.state.columns = 10;
            this.r = 10;
            this.c = 10;
            this.m = 12;
            let board = document.querySelector(".board");
            board.style.width = "500px";
            board.style.height = "500px";
            board.style.border = "10px solid darkgray";
        }
        else if(this.$store.state.diff === "Medium" || this.$store.state.diff === "Orta"){
            // this.$store.state.rows = 12;
            // this.$store.state.columns = 12;
            this.r = 12;
            this.c = 12;
            this.m = 25;
            let board = document.querySelector(".board");
            board.style.width = "600px";
            board.style.height = "600px";
            board.style.border = "12px solid darkgray";
        }
        else if(this.$store.state.diff === "Hard" || this.$store.state.diff === "Zor"){
            // this.$store.state.rows = 14;
            // this.$store.state.columns = 14;
            this.r = 14;
            this.c = 14;
            this.m = 50;
            let board = document.querySelector(".board");
            board.style.width = "700px";
            board.style.height = "700px";
            board.style.border = "14px solid darkgray";
        }
      }
    }
  }
</script>

<style scoped>
  #login{
    width: 400px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #faedcd;
    padding: 15px;
    border: 2px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  #login input{
    border-radius: 7px;
    background-color: black;
    color: whitesmoke;
    height: 30px;
  }

  #login p{
    margin-top: 15px;
    margin-bottom: 10px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  #login #signIn{
    width: 66px;
    height: 30px;
    background-color: lightslategray;
    border-radius: 7px;
    color: whitesmoke;
    font-size: 17px;
    cursor: pointer;
  }

  #login #signIn:hover{
    background-color: darkgray;
  }

  #login #close{
    background-color: red;
    color: black;
    position: absolute;
    top: -1px;
    right: -2px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    border-top-right-radius: 0px;
    transition: all 0.2s;
  }

  #login #close:hover{
    background-color: gray;
  }

  #selectBox{
        position: absolute;
        right: 50%;
        bottom: 15px;
        transform: translateX(50%);
        font-size: 20px;
        background-color: #001219;
        color: #faedcd;
        padding: 5px;
    }
</style>
