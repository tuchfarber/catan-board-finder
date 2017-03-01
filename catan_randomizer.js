let possible_tiles = [
    {"Type":"brick","Color":"#A03318"},
    {"Type":"brick","Color":"#A03318"},
    {"Type":"brick","Color":"#A03318"},
    {"Type":"ore","Color":"#777777"},
    {"Type":"ore","Color":"#777777"},
    {"Type":"ore","Color":"#777777"},
    {"Type":"lumber","Color":"#72421d"},
    {"Type":"lumber","Color":"#72421d"},
    {"Type":"lumber","Color":"#72421d"},
    {"Type":"lumber","Color":"#72421d"},
    {"Type":"grain","Color":"#c9bb20"},
    {"Type":"grain","Color":"#c9bb20"},
    {"Type":"grain","Color":"#c9bb20"},
    {"Type":"grain","Color":"#c9bb20"},
    {"Type":"wool","Color":"#92ff54"},
    {"Type":"wool","Color":"#92ff54"},
    {"Type":"wool","Color":"#92ff54"},
    {"Type":"wool","Color":"#92ff54"},
    {"Type":"desert","Color":"#ffe789"}
]
let possible_tokens = shuffle([2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12])

let range = n => Array.from(Array(n).keys())

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function buildTiles(){
    let tiles = shuffle(possible_tiles);
    let tokens = shuffle(possible_tokens);
    tiles.forEach(function(current_el){
        if(current_el["Type"] != "Desert"){
            current_el["Token"] = tokens.pop()
        }
    })
    return tiles;
}

let board;
window.onload = function(){
    board = new Vue({
        el: '#board',
        data: {
            tiles: buildTiles()
        },
        methods:{
            updateTiles: function(event){
                this.tiles = []
                new_tiles = buildTiles()
                for(var i=0;i<new_tiles.length;i++){
                    this.tiles.push(new_tiles[i]);
                }
            }
        }
    })
}