const getBoard = (resource_spacing_level, token_spacing_level, resource_probability_level) => {
    let board, iterations;
    if (resource_spacing_level == -1 || token_spacing_level == -1 || resource_probability_level == -1) {
        board = buildTiles();
        iterations = 1;
        resource_spacing_level = buildScoreObj(resourceSpacingAll(board));
        token_spacing_level = buildScoreObj(tokenSpacingAll(board));
        resource_probability_level = buildScoreObj(tokenResourceSpacingAll(board));
    } else {
        [board, iterations] = buildCustomBoard(resource_spacing_level, token_spacing_level, resource_probability_level);
    }
    return {
        'board': board,
        'iterations': iterations,
        'resource_spacing_score': resource_spacing_level,
        'token_spacing_score': token_spacing_level,
        'resource_probability_score': resource_probability_level
    };
};

function validParam(param){
    return [0, 1, 2].indexOf(param) >= 0;
}

function buildScoreObj(score){
    // Score ranges do not overlap, so we can assume type by score
    let options = null;
    let index = null;

    // Resource Spacing Scores
    if(score <= 6){return 0}
    else if(score <= 12){return 1}
    else if(score <= 18){return 2}

    // Resource Probability Scores
    else if(score <= 25){return 0}
    else if(score <= 31){return 1}
    else if(score <= 60){return 2}

    // Token Spacing Scores
    else if(score <= 101){return 0}
    else if(score <= 127){return 1}
    else {return 2}
}

function buildCustomBoard(resource_spacing_level, token_spacing_level, resource_probability_level){
    let counter=0;
    while(true){
        let board = buildTiles();
        counter += 1
        if(
            resource_spacing_level == buildScoreObj(resourceSpacingAll(board))
            && token_spacing_level == buildScoreObj(tokenSpacingAll(board))
            && resource_probability_level == buildScoreObj(tokenResourceSpacingAll(board))
        ){
            return [board, counter];
        }
    }
}

/***********************
 * Scoring Calculatons
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
    let avg_res_val = (means.reduce((a, b) => a + b, 0) / means.length);
    let result = 0;
    means.forEach(function(mean){
        result += Math.abs(mean - avg_res_val)
    })
    return result.toFixed();
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
    return [
        [tiles[0],tiles[3],tiles[4]],
        [tiles[0],tiles[1],tiles[4]],
        [tiles[1],tiles[4],tiles[5]],
        [tiles[1],tiles[2],tiles[5]],
        [tiles[2],tiles[5],tiles[6]],
        [tiles[3],tiles[7],tiles[8]],
        [tiles[3],tiles[4],tiles[8]],
        [tiles[4],tiles[8],tiles[9]],
        [tiles[4],tiles[5],tiles[9]],
        [tiles[5],tiles[9],tiles[10]],
        [tiles[5],tiles[6],tiles[10]],
        [tiles[6],tiles[10],tiles[11]],
        [tiles[7],tiles[8],tiles[12]],
        [tiles[8],tiles[12],tiles[13]],
        [tiles[8],tiles[9],tiles[13]],
        [tiles[9],tiles[13],tiles[14]],
        [tiles[9],tiles[10],tiles[14]],
        [tiles[10],tiles[14],tiles[15]],
        [tiles[10],tiles[11],tiles[15]],
        [tiles[12],tiles[13],tiles[16]],
        [tiles[13],tiles[16],tiles[17]],
        [tiles[13],tiles[14],tiles[17]],
        [tiles[14],tiles[17],tiles[18]],
        [tiles[14],tiles[15],tiles[18]]
    ]
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