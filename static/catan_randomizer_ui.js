app = new Vue({
    el: '#app',
    created() {
        this.rs_options = ["Few", "Some", "Many"];
        this.ts_options = ["Few", "Some", "Many"];
        this.rts_options = ["Even", "Slightly uneven", "Very uneven"];
    },
    data: {
        tiles: [],
        iterations: 0,
        rs_wanted : -1,
        ts_wanted : -1,
        rts_wanted : -1,
        infoOpen: false,
    },
    methods: {
        getRandomBoard: function(){
            this.getNewBoard([-1, -1, -1]);
        },
        getCustomBoard: function(){
            this.getNewBoard([
                this.rs_wanted,
                this.ts_wanted,
                this.rts_wanted
            ]);
        },
        getNewBoard: function(params){
            ({
                board: this.tiles,
                iterations: this.iterations,
                resource_spacing_score: this.rs_wanted,
                token_spacing_score: this.ts_wanted,
                resource_probability_score: this.rts_wanted
            } = getBoard(...params));
        },
        openInfo(){
            this.infoOpen = true;
        },
        closeInfo(){
            this.infoOpen = false;
        }
    },
    mounted: function(){
        this.getRandomBoard()
    }
})
