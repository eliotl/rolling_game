function roll_n(n) {
  number = Math.random();
  dieroll = Math.floor(number * n) + 1;
  return dieroll
}

function set_random_seed(){
    if(window.location.hash) {
      Math.seedrandom(window.location.hash)
    } else {
      // Fragment doesn't exist
    }
}

function full_game(){
    const numRounds = 8;
    const numDice = 7;
    const dieColors = ["orange", "blue", "green", "yellow", "red", "purple", "wild"];
    const results = [];
    for (i=0; i<numRounds; i++){
        var dieBag = [...dieColors];
        let round = [];
        for (j=numDice; j>1; j--){
            let colorRoll = roll_n(j) - 1;
            let color = dieBag[colorRoll];
            if (color == undefined){
                console.log(dieBag);
                console.log(j);
                console.log(colorRoll);
            }
            dieBag.splice(colorRoll, 1);
            let numberRoll = roll_n(6);
            round.push([color, numberRoll])
        }
        results.push(round)
    }
    return results;
}

function getRoll(){
    if (roundCounter >= 8){
        return "all done"
    }
    let round = gameResults[roundCounter];
    let rolls = round.slice(rollCounter, rollCounter+2);
    rollCounter += 2;
    if (rollCounter >= 6) {
        rollCounter = 0;
        roundCounter += 1;
    }
    return rolls
}



function track_game(){
    if (roundCounter >= gameTracker.length) {
        new_round();
        return
    }
    let rolls = getRoll();
    let roll1 = rolls[0][0] + " " + rolls[0][1];
    let roll2 = rolls[1][0] + " " + rolls[1][1];
    let colors = [rolls[0][0] + "s", rolls[1][0] + "s"];
    let turn = {texts: [roll1, roll2], classes: colors};
    let round = gameTracker[0]
    round.turns.unshift(turn);
}

function new_round() {
    let newRound = {id: gameTracker.length, 
                    number: "ROUND " + (gameTracker.length + 1),
                    turns: []}
    gameTracker.unshift(newRound);
}

function focus_id(id){
    let inp = document.getElementById(id);
    inp.focus();
    inp.select();    
}

set_random_seed();

const gameResults = full_game();
const gameTracker = [];

var PRINTED_ROLL = false;
var roundCounter = 0;
var rollCounter = 0;

var fiftyArray = new Array(50).fill('')
var stateObj = {}




/*  rollCounter etc. could be in here as opposed to global objects 
    since that's the point of Vue?
    */
var buttonVue = new Vue({
    el:"#rollButton",
    data: {
        name: "clambake"
    },
    methods: {
        advance: function (event) {
            track_game();
        }
    }
});

Vue.component("state-shape", {
    props: {
        state: Object,
        clambake: String,
        num: Number
    },
    data: function () {
        return {
            stateObj_: stateObj,
            arr: fiftyArray,
            myVal: ""
        }
    },
    methods: {
        focus_me: function (event) {
            focus_id(this.state.box_id);
        }
    },
    computed: {
        is_x: function() {
            return this.myVal.toLowerCase() === "x";
        },
    },
    template: `
    <g class="state-shape" v-on:click="focus_me">
            <title> {{state.id.replace("_"," ")}} </title>
            <rect v-if="state.height" :id="state.id" :class="state.class" :x="state.x" :y="state.y" :width="state.width" :height="state.height"/>
            <path v-else :id="state.id" :class="state.class" :d="state.d"/>
              <foreignObject :x="state.box_x + 8" :y="state.box_y + 8" :width="state.box_width" :height="state.box_height"> 
              <div xmlns="http://www.w3.org/1999/xhtml">
                  <input :id="state.box_id" :class="state.class" type="text" v-model="myVal" @input="$emit('state_input', state.id, $event.target.value)"></input>
              </div>
              </foreignObject>
        </g>
`
});

var statesVue = new Vue({
    el: '#state-shapes',
    data: {
        states: statesData,
        counter1: 0,
        inputArray: new Array(50).fill(''),
        bigStateObject: {},
    },
    computed: {
        countXes: function(){
            var numOfXes = 0;
            for(let child of this.$children){
                if(child.myVal.toLowerCase() === "x"){
                   numOfXes = numOfXes + 1;
                }
            }            
            return numOfXes;        
        },
        x_count_2: function () {
            let counter = 0;
            for (let value of fiftyArray){
                if (value.toLowerCase() === "x"){
                    counter +=1;
                }
                return counter;            
            }
            }
    },
    methods: {
        count_xes: function(){
            var numOfXes = 0;
            let valuesArray = Object.values(this.bigStateObject)
            for(let value of valuesArray){
                if(value.toLowerCase() === "x"){
                    console.log(['num', numOfXes]);
                   numOfXes += 1;
                }
            }            
            // probably should be a setter method
            this.counter1 = numOfXes;
            console.log(numOfXes);
            return numOfXes;        
            },
        update_object: function(state, value) {
            this.bigStateObject[state] = value;
            this.count_xes();
        }
    }
});

Vue.component("check-box", {
    props: ['check'],
    data: function () {
        return {
            checkList: [false, false, false]
        }
    },
    computed: {
        countChecks: function() {
            let checkCounter = 0;
            for (let check of this.checkList){
                if (check === true){
                    checkCounter += 1;
                }
            }
        return checkCounter;
        },
        classObject: function () {
          return {
            crossedOut: this.countChecks === 3
            }
        },        
    },
    template: `
    <div class="checkDiv" :id="check.id" :title="check.help" :count="countChecks">
            <label :style="'opacity:' + 100 / Math.sqrt(countChecks + 1) + '%'">
            <span  :class="classObject">{{check.label}}</span>:</label>
            <input type="checkbox" value="true" v-model="checkList[0]"></input>
            <input type="checkbox" value="true" v-model="checkList[1]"></input>
            <input type="checkbox" value="true" v-model="checkList[2]"></input>
    </div>
`
});    

var checksVue = new Vue({
    el: '#check-bank',
    data: function () {
        return {
        checks: [
        { label: "Color changes", id: "colorChanges", help: "Change the color of a single die roll"},
        { label: "Dupes", id: "dupes", help: "Duplicate a single die roll"},
        { label: "Guards", id: "guards", help: "Write a single roll like [3] and consider it to have no neighbors"}
        ],
        }
    }
});

Vue.component("rolls-table", {
    props: ['round'],
    template: `
    <div>
        <table> {{ round.number}}
            <tr v-for="turn, num in round.turns"
                :key=num>
                <td :class="turn.classes[0]" class="rollCell"> {{ turn.texts[0] }} </td>
                <td :class="turn.classes[1]" class="rollCell"> {{ turn.texts[1] }} </td>
            </tr>
        </table>
    </div>
`
    });    



/* Data is something mutable ! 
    Then onclick advances it!

*/


var rollsVue = new Vue({
    el: '#rollsList',
    data: {
        rounds: gameTracker,
        rounds_: [ 
            { id: '0', number: 'ROUND 1', turns: 
                [   {texts: ['red 3', 'blue 4'], classes: ['reds', 'blues']},
                    {texts: ['red 1', 'blue 5'], classes: ['reds', 'blues']}, 
                ]
            },
            { id: '1', number: 'ROUND 2', turns: 
                [   {texts: ['a', 'b'], classes: ['reds', 'blues']},
                    {texts: ['c', 'd'], classes: ['reds', 'blues']}, 
                ]
            },
        ]
    }
    });   



