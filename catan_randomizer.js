let API_URL_BASE = "https://us-central1-catanboardfinderapi.cloudfunctions.net/catanboardfinderapi?"
//resource=1&token=1&probability=1

app = new Vue({
    el: '#app',
    data: {
        tiles: [],
        board_type: '',
        iterations: 0,

        rs_options:["Few", "Some", "Many"],
        ts_options:["Few", "Some", "Many"],
        rts_options:["Even", "Slightly uneven", "Very uneven"],
        rs_wanted : "",
        ts_wanted : "",
        rts_wanted : "",

        not_ready: true,
        error_msg: ''
    },
    methods: {
        getRandomBoard: function(){
            this.callAPI(API_URL_BASE)
        },
        getCustomBoard: function(){
            this.callAPI(
                API_URL_BASE
                + 'resource=' + this.rs_options.indexOf(this.rs_wanted) 
                + '&token=' + this.ts_options.indexOf(this.ts_wanted)
                + '&probability=' + this.rts_options.indexOf(this.rts_wanted)
            )
        },
        callAPI: function(url){
            axios({
                method: 'get',
                url: url
            })
            .then(response => {
                this.not_ready = false;
                this.error_msg = '';
                this.tiles = response.data.board;
                this.board_type = response.data.type
                this.iterations = response.data.iterations;
                this.rs_wanted = this.rs_options[response.data.resource_spacing_score];
                this.ts_wanted = this.ts_options[response.data.token_spacing_score];
                this.rts_wanted = this.rts_options[response.data.resource_probability_score];
            })
            .catch(error => {
                this.error_msg = "Error! Could not load data."
            });
        }
    },
    mounted: function(){
        this.getRandomBoard()
    }
})
