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
                scores.updateScores();
            }
        }
    })
    scores = new Vue({
        el: '#scores',
        data: {
            resource_spacing: 0,
            token_spacing: 0,
            resource_token_spacing: 0
        },
        methods:{
            updateScores: function(){
                this.resource_spacing = resourceSpacingAll(board.tiles);
                this.token_spacing = tokenSpacingAll(board.tiles);
                this.resource_token_spacing = tokenResourceSpacingAll(board.tiles);
            }
        }
    })
    scores.updateScores();
}

/***********************
 * Main Calculatons
 ***********************/

// Takes tiles, returns resource spacing score
function resourceSpacingAll(tiles){
    let trips = tilesToTrips(tiles);
    let total = 0;
    trips.forEach(function(trip){
        total += resourceSpacingTrip(trip[0],trip[1],trip[2])
    })
    return total;
}

// Takes tiles, returns token spacing score
function tokenSpacingAll(tiles){
    let trips = tilesToTrips(tiles);
    let total = 0;
    trips.forEach(function(trip){
        total += tokenSpacingTrip(trip[0],trip[1],trip[2])
    })
    return total;
}

// Takes tiles, returns token resource spacing score
function tokenResourceSpacingAll(tiles){
    let t_vals = {};
    let means = []
    tiles.forEach(function(tile){
        let val = (6-Math.abs(7-tile.Token));
        t_vals[tile.Type] ? t_vals[tile.Type] += val : t_vals[tile.Type] = val;
    })
    //Object to array
    Object.keys(t_vals).forEach(function(key){means.push(t_vals[key])});
    let avg_res_val = getMean(means);
    let result = 0;
    means.forEach(function(mean){
        result += Math.abs(mean - avg_res_val)
    })
    return result.toFixed(2);
}

/***********************
 * Triplet Calculatons
 ***********************/

// Takes tiles, returns resource spacing score
function resourceSpacingTrip(x,y,z){
    if(x.Type == y.Type == z.Type){return 3};
    if(x.Type == y.Type || x.Type == z.Type || y.Type == z.Type){return 1};
    return 0;
}

// Takes tiles, returns token spacing score
function tokenSpacingTrip(x,y,z){
    xy = Math.abs(Math.abs(7-x.Token) - Math.abs(7-y.Token));
    xz = Math.abs(Math.abs(7-x.Token) - Math.abs(7-z.Token));
    yz = Math.abs(Math.abs(7-y.Token) - Math.abs(7-z.Token));
    return xy+xz+yz;
    // Sum. Higher=>more even
}

/***********************
 *      Utilities
 ***********************/

// Takes tiles, returns triplets
function tilesToTrips(tiles){
    let ret_arr = []
    ret_arr.push([tiles[0],tiles[3],tiles[4]]);
    ret_arr.push([tiles[0],tiles[1],tiles[4]]);
    ret_arr.push([tiles[1],tiles[4],tiles[5]]);
    ret_arr.push([tiles[1],tiles[2],tiles[5]]);
    ret_arr.push([tiles[2],tiles[5],tiles[6]]);
    ret_arr.push([tiles[3],tiles[7],tiles[8]]);
    ret_arr.push([tiles[3],tiles[4],tiles[8]]);
    ret_arr.push([tiles[4],tiles[8],tiles[9]]);
    ret_arr.push([tiles[4],tiles[5],tiles[9]]);
    ret_arr.push([tiles[5],tiles[9],tiles[10]]);
    ret_arr.push([tiles[5],tiles[6],tiles[10]]);
    ret_arr.push([tiles[6],tiles[10],tiles[11]]);
    ret_arr.push([tiles[7],tiles[8],tiles[12]]);
    ret_arr.push([tiles[8],tiles[12],tiles[13]]);
    ret_arr.push([tiles[8],tiles[9],tiles[13]]);
    ret_arr.push([tiles[9],tiles[13],tiles[14]]);
    ret_arr.push([tiles[9],tiles[10],tiles[14]]);
    ret_arr.push([tiles[10],tiles[14],tiles[15]]);
    ret_arr.push([tiles[10],tiles[11],tiles[15]]);
    ret_arr.push([tiles[12],tiles[13],tiles[16]]);
    ret_arr.push([tiles[13],tiles[16],tiles[17]]);
    ret_arr.push([tiles[13],tiles[14],tiles[17]]);
    ret_arr.push([tiles[14],tiles[17],tiles[18]]);
    ret_arr.push([tiles[14],tiles[15],tiles[18]]);
    return ret_arr;
}

// Takes array, return mean
function getMean(arr){
    let total = 0;
    arr.forEach(function(el){total += el});
    return total / arr.length;
}

// Takes array, returns shuffled array
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

// Takes value, returns array of 0 to value
let range = n => Array.from(Array(n).keys())

// Takes nothing, returns random board
function buildTiles(){
    let tiles = shuffle([
        {"Type":"brick"},{"Type":"brick"},{"Type":"brick"},
        {"Type":"ore"},{"Type":"ore"},{"Type":"ore"},
        {"Type":"lumber"},{"Type":"lumber"},{"Type":"lumber"},{"Type":"lumber"},
        {"Type":"grain"},{"Type":"grain"},{"Type":"grain"},{"Type":"grain"},
        {"Type":"wool"},{"Type":"wool"},{"Type":"wool"},{"Type":"wool"},
        {"Type":"desert"}
    ]);
    let tokens = shuffle([2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12]);
    tiles.forEach(function(current_el){
        if(current_el["Type"] != "desert"){
            current_el["Token"] = tokens.pop()
        }else{
            current_el["Token"] = 1;
        }
    })
    return tiles;
}