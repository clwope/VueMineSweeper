<template>
    <div class="container">
        <component :is="activeComp"></component>
        <div class="info">
            <p ref="p">{{ $t('mines') }}: {{ mines }}</p>
            <p v-if="this.$store.state.diff !== ''">{{ $t('difficulty') }}: {{ this.$store.state.diff  }}</p>
            <p>{{ $t('time') }} : {{ time }}</p>
        </div>
        <div class="board">
            <div class="block" v-for="x in keys" v-on:click="tileClick" v-on:contextmenu="flagRightClick"></div>
        </div>
        <p id="flagCounter">{{ $t('flag') }}: {{ flagCount }}</p>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                mines: this.mine,
                difficulty: "",
                row: this.rows,
                column: this.columns,
                keys: [],
                isStart: false,
                bombs: [],
                tilesClicked: 0,
                gameOver: false,
                gameComplete: false,
                time: 0,
                timer: null,
                flagCount: this.mine
            }
        },
        methods: {
            fillTheBoard(){
                    this.keys = [];
                    let key = ""

                    for(let r = 0; r < this.row; r++){
                        for(let c = 0; c < this.column; c++){
                            key = `${r}-${c}`;
                            this.keys.push(key);
                        }
                    }
                
            },
            tileClick(event){
                if(this.$store.state.isReady === true && !this.$store.state.gameEnd && !event.target.classList.contains("clicked")){
                            if(event.target.classList.contains("flag")){
                                return;
                            }
                                
                            event.target.innerText = "";

                            let divs = document.querySelectorAll(".block");

                            for(let y = 0; y < this.keys.length; y++){
                                divs[y].id = this.keys[y];
                            }

                            event.target.style.backgroundColor = "darkgray";

                            if(this.$data.isStart === false){
                                this.$data.difficulty = this.$store.state.diff
                                this.placeBombs();
                                this.disableSelect();
                                this.$data.isStart = true;
                                this.timer = window.setInterval(() => this.time++, 1000);
                            }

                            for(let i = 0; i < this.bombs.length; i++){
                                if(event.target.id === this.bombs[i]){
                                    window.clearInterval(this.timer);
                                    this.$store.state.time = this.time;
                                    //console.log(this.time);
                                    this.revealMines();
                                    this.gameOver = true;
                                    this.$store.state.gameEnd = true;
                                    return;
                                }        
                            }   

                            let pos = event.target.id.split("-", 2);

                            //console.log(pos);

                            let r = parseInt(pos[0]);
                            let c = parseInt(pos[1]);

                            this.checkMine(r, c);
                }else{
                    return;
                }

                },
                placeBombs(){

                    let count = this.mines;

                    for(let i = 0; i < count; i++){
                        let r = Math.floor(Math.random() * this.row);
                        let c = Math.floor(Math.random() * this.column);

                        if(this.bombs.includes(`${r}-${c}`)){
                            this.newRandomValue();
                        }else{
                            this.bombs.push(`${r}-${c}`);
                        }

                    }
            },
            checkMine(r, c){
                if (r < 0 || r >= this.$data.row || c < 0 || c >= this.$data.column) {
                    return;
                }

                let id = `${r}-${c}`;
                let div = document.getElementById(id);
                
                if (div.classList.contains("clicked")) {
                    return;
                }

                div.classList.add("clicked");
                this.tilesClicked++;

                let minesFound = 0;

                minesFound += this.checkTile(r-1, c-1);    
                minesFound += this.checkTile(r-1, c);         
                minesFound += this.checkTile(r-1, c+1);      
                minesFound += this.checkTile(r, c-1);        
                minesFound += this.checkTile(r, c+1);        
                minesFound += this.checkTile(r+1, c-1);     
                minesFound += this.checkTile(r+1, c);         
                minesFound += this.checkTile(r+1, c+1);     

                if (minesFound > 0) {
                    let id = `${r}-${c}`;
                    let div = document.getElementById(id)

                    div.innerText = minesFound;
                    div.classList.add("x" + minesFound.toString());
                    
                }
                else {
                    
                    this.checkMine(r-1, c-1);  
                    this.checkMine(r-1, c);   
                    this.checkMine(r-1, c+1);    
                    this.checkMine(r, c-1);    
                    this.checkMine(r, c+1);     
                    this.checkMine(r+1, c-1);    
                    this.checkMine(r+1, c);      
                    this.checkMine(r+1, c+1);    
                }

                if(this.tilesClicked === (this.row * this.column) - (this.mines)){
                    window.clearInterval(this.timer);
                    this.$store.state.time = this.time;
                    this.sendScore();
                    //console.log(this.time);
                    this.gameComplete = true;
                    this.$store.state.gameEnd = true;
                }
            },
            checkTile(r, c){
                if(r < 0 || r >= this.$data.row || c < 0 || c >= this.$data.column){
                    return 0;
                }
                else if (this.bombs.includes(`${r}-${c}`)) {
                    return 1;
                }
                else{
                    return 0;
                }
            },
            disableSelect(){
                let select = document.querySelector("select");
                select.setAttribute('disabled', '');
            },
            flagRightClick(event){
                event.preventDefault();
                if(event.target.innerText === "" && this.$store.state.isReady === true && !this.$store.state.gameEnd){
                    if(event.target.classList.contains("flag")){
                    event.target.innerHTML = "";
                    event.target.classList.remove("flag");
                    this.flagCount++;
                    }
                    else{
                        if(this.$data.flagCount !== 0){
                        event.target.classList.add("flag");
                        let newEl = document.createElement("img");
                        newEl.src = "https://www.svgrepo.com/download/525339/flag.svg";
                        newEl.style.width = "20px";
                        newEl.style.height = "20px";
                        event.target.appendChild(newEl);
                        this.flagCount--;
                        }
                        else{
                            return;
                        }
                    }
                }
                else{
                    return;
                }
                
            },
            revealMines(){
                for(let b = 0; b < this.bombs.length; b++){
                    let foundBomb = document.getElementById(this.bombs[b]);
                    let imageEL = document.createElement("img");
                    imageEL.src = "https://www.svgrepo.com/download/404859/bomb.svg";
                    imageEL.style.width = "20px";
                    imageEL.style.height = "20px";
                    foundBomb.style.backgroundColor = "red";
                    foundBomb.appendChild(imageEL);
                }
            },
            newRandomValue(){
                let r = Math.floor(Math.random() * this.row);
                let c = Math.floor(Math.random() * this.column);

                if(this.bombs.includes(`${r}-${c}`)){
                    this.newRandomValue();
                }else{
                    this.bombs.push(`${r}-${c}`);
                }
                
            },
            async sendScore(){
                if(this.$store.state.username === ""){
                    return;
                }else{
                    let data = {username: this.$store.state.username, score: this.$store.state.time};
                    await fetch("http://localhost:3000/login", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json"
                    }
                    })
                }
            }
        },
        mounted() {
            this.fillTheBoard();
        },
        computed: {
            activeComp(){
                if(this.$data.gameOver === true){
                    return 'game-over';
                }
                
                if(this.$data.gameComplete === true){
                    return 'game-complete';
                }
            }
        },
        props: ['rows', 'columns', 'mine'],
        watch: {
            rows: function(val){
                this.$data.row = val;
                this.fillTheBoard();
            },
            columns: function(val){
                this.$data.column = val;
                this.fillTheBoard();
            },
            mine: function(val){
                this.$data.mines = val;
                this.$data.flagCount = val;
            }
        }
    }
</script>

<style scoped>
    .container{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .info{
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 60px;
        padding: 20px 0;
    }

    .board{
        width: 500px;
        height: 500px;
        border: 10px solid darkgray;
        border-radius: 4px;
        display: flex;
        flex-wrap: wrap;
    }

    .block{
        width: 48px;
        height: 48px;
        border: 1px solid white;
        background-color: lightslategray;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
    }


    p{
        font-family: 'Courier New', Courier, monospace;
        font-size: 28px;
        color: lightslategray;
    }

    button{
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        background-color: red;
        cursor: pointer;
    }

    #flagCounter{
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .x1{
        color: blue;
     }

     .x2{
        color: green;
     }

     .x3{
        color: red;
     }

     .x4{
        color: chocolate;
     }

     .x5{
        color: yellow;
     }

     .x6{
        color: black;
     }

     .x7{
        color: darkmagenta;
     }

     .x8{
        color: hotpink;
     }

    .clicked{
        background-color: darkgray;
    }

    .v-enter-from{
        translate: -100px 0;
    }
</style>