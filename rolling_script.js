function roll_n(n) {
  number = Math.random();
  dieroll = Math.floor(number * n) + 1;
  return dieroll;
}

function set_random_seed() {
  if (window.location.hash) {
    Math.seedrandom(window.location.hash);
  } else {
    // Fragment doesn't exist
  }
}

function full_game() {
  const numRounds = 8;
  const numDice = 7;
  const dieColors = [
    "orange",
    "blue",
    "green",
    "yellow",
    "red",
    "purple",
    "wild",
  ];
  const results = [];
  for (i = 0; i < numRounds; i++) {
    var dieBag = [...dieColors];
    let round = [];
    for (j = numDice; j > 1; j--) {
      let colorRoll = roll_n(j) - 1;
      let color = dieBag[colorRoll];
      if (color == undefined) {
        console.log(dieBag);
        console.log(j);
        console.log(colorRoll);
      }
      dieBag.splice(colorRoll, 1);
      let numberRoll = roll_n(6);
      round.push([color, numberRoll]);
    }
    results.push(round);
  }
  return results;
}


function getRoll() {
  if (roundCounter >= 8) {
    return "all done";
  }
  let round = gameResults[roundCounter];
  let rolls = round.slice(rollCounter, rollCounter + 2);
  rollCounter += 2;
  if (rollCounter >= 6) {
    rollCounter = 0;
    roundCounter += 1;
  }
  return rolls;
}

function track_game() {
  if (roundCounter >= gameTracker.length) {
    if (roundCounter >= 8) {
      return;
    }
    new_round();
    return;
  }
  let rolls = getRoll();
  let roll1 = rolls[0][0] + " " + rolls[0][1];
  let roll2 = rolls[1][0] + " " + rolls[1][1];
  let colors = [rolls[0][0] + "s", rolls[1][0] + "s"];
  let turn = { texts: [roll1, roll2], classes: colors };
  let round = gameTracker[0];
  round.turns.unshift(turn);
}

function new_round() {
  let newRound = {
    id: gameTracker.length,
    number: "ROUND " + (gameTracker.length + 1),
    turns: [],
  };
  gameTracker.unshift(newRound);
}

function focus_id(id){
    let inp = document.getElementById(id);
    inp.focus();
    inp.select();    
}

// from GitHub
function invertHex(hex) {
    if (hex[0] === "#"){
        var myHex = hex.slice(1)
    }
    else{
        var myHex = hex;
    }
    let invertedHex = (Number(`0x1${myHex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
    if (hex[0] === "#"){
        invertedHex = "#" + invertedHex;
    }
    return invertedHex;
}

/* Setup on pageload */

set_random_seed();

const gameResults = full_game();
const gameTracker = [];

var PRINTED_ROLL = false;
var roundCounter = 0;
var rollCounter = 0;

var fiftyArray = new Array(50).fill('')
var stateObj = {}


/* Vue stuff */

var buttonVue = new Vue({
  el:"#rollButton",
  methods: {
    advance: function (event) {
      track_game();
    }
  }
});

Vue.component("state-shape", {
  props: {
    state: Object,
  },
  data: function () {
    return {
      myVal: "",
      validNumbers: [1,2,3,4,5,6],
      invalidNumber: false
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
    alert_style: function() {
        // if (this.myVal.toLowerCase() === "x" || this.validNumbers.length === 0 || this.myVal.length > 1 && this.myVal[0] === "["){
        if (this.invalidNumber === true){
            return "fill:url(#" + this.state.alert_style + "_flat)";
        }
        else if (this.validNumbers.length === 0){
            return "fill:url(#" + this.state.alert_style + ")";
        }
        else if (this.validNumbers.length === 1 && this.myVal === ""){
            return "fill:url(#" + this.state.alert_style + "_half)";   
        }
        else {
            return "";
        }
    },
  },
  template: `
  <g class="state-shape" v-on:click="focus_me">
      <title> {{state.id.replace("_"," ")}} &#10; {{validNumbers.join(" ")}} </title>
      <rect v-if="state.height" :id="state.id" :class="state.class" :style="alert_style" :x="state.x" :y="state.y" :width="state.width" :height="state.height"/>
      <path v-else :id="state.id" :class="state.class" :style="alert_style" :d="state.d"/>
        <foreignObject :x="state.box_x + 8" :y="state.box_y + 8" :width="state.box_width" :height="state.box_height"> 
        <div xmlns="http://www.w3.org/1999/xhtml">
          <input :id="state.box_id" type="text" v-model="myVal" @input="$emit('state_input', state.id, $event.target.value)"></input>
        </div>
        </foreignObject>
    </g>
`,
});

/* 
      <g v-if="x_alert">
      <rect v-if="state.height" :id="state.id + '_alert'" :class="state.class" :style="'url(#' + state.x_alert_class" :x="state.x" :y="state.y" :width="state.width" :height="state.height"/>
      <path v-else :id="state.id + '_alert'" :class="state.class" :style="'url(#' + state.x_alert_class" :d="state.d"/>
      </g>

*/

var statesVue = new Vue({
  el: "#state-shapes",
  data: {
    states: statesData,
    neighborGraph: statesGraph,
    counterXes: 0,
    counterEmpties: 50,
    inputArray: new Array(50).fill(''),
    bigStateObject: {},
    counters: {},
  },
  methods: {
    update_object: function(state, value) {
      this.bigStateObject[state] = value;
      this.count_set_xes();
      this.set_valid_options();
    },    
    count_set_xes: function(){
      var numOfXes = 0;
      var numOfEmpties = 50;
      let valuesArray = Object.values(this.bigStateObject)
      for(let value of valuesArray){
        if(value.toLowerCase() === "x"){
           numOfXes += 1;
        }
        if (value !== ""){
            numOfEmpties -= 1;
        }
      }
      this.counterXes = numOfXes;
      this.counterEmpties = numOfEmpties; 
      },
      _child_array: function(states){
        // Should be a set
        const targetStates = [];
        for (let child of this.$children){
            if (states.includes(child.state.id)){
                targetStates.push(child)
            }
        }
        return targetStates;
      },
    get_valid_options: function(state){
      var validOptions = [];
      // var INVALID_FLAG = false;
      let targetState = this._child_array([state])[0];
      targetState.invalidNumber = false;
      let targetVal = targetState.myVal;
      if (targetVal.toLowerCase() === "x"){
        return [];
      }
      if (targetVal.includes("[") && targetVal.includes("]")){
        return [];
      }
      let naybs = this.neighborGraph[state];
      let states = this._child_array(naybs);
      let minVal = 7;
      let maxVal = -1;
      for (let naybState of states){
        let value = naybState.myVal;
        if (! isNaN(value) && value !== ""){
            value = Number(value);
            minVal = Math.min(minVal, value);
            maxVal = Math.max(maxVal, value);
        }
      }
      if (minVal === 7){
        var validOptions = [1,2,3,4,5,6];
      }
      else{
        for (let num of [1,2,3,4,5,6]){
          if (Math.abs(num-minVal) <= 1 && Math.abs(num-maxVal) <= 1){
              validOptions.push(num);
          }
          else if ((! isNaN(targetVal)) && targetVal !== "" && Number(targetVal)===num){
            targetState.invalidNumber = true;
            // INVALID_FLAG = true;
          }
        }
      }
      if (! isNaN(targetVal) && targetVal !== "" && targetState.invalidNumber === false)
      {return [targetVal];}
      else {return validOptions;}
    },
    set_valid_options: function(){
      let counters = {};
      for (let child of this.$children){
        let state = child.state.id;
        let color = child.state.class;
        let options = this.get_valid_options(state);
        child.validNumbers = options;
        // debugger;
        if (color in counters){
            for (let option of options){
                if (option in counters[color]){
                    counters[color][option] += 1;
                }
                else{
                    counters[color][option] = 1;
                }
            }
        }
        else {
            counters[color] = {}
            for (let option of options){
                counters[color][option]=1;
            }
        } 
      }
      // console.log(counters);
      this.counters = counters;
    },
    fill_states: function(statesList, fill="x"){
        for (let child of this.$children){
            if (statesList.includes(child.state.id)){
                child.myVal = fill;
            }
            else {
                child.myVal = "";
            }
        }
    }
  },
});

Vue.component("check-box", {
  props: ["check"],
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
  <div class="checkDiv" :id="check.id" :count="countChecks">
      <label :style="'opacity:' + 100 / Math.sqrt(countChecks + 1) + '%'">
        <span  :class="classObject">{{check.label}}</span>:
      </label>
      <input type="checkbox" value="true" v-model="checkList[0]"></input>
      <input type="checkbox" value="true" v-model="checkList[1]"></input>
      <input type="checkbox" value="true" v-model="checkList[2]"></input>
  </div>
`,
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

Vue.component("color-pattern", {
        props: ['color', 'cross', 'flat', 'diagonal', 'stroke'],
        computed: {
            transform_rotate: function() {
                if (this.flat){
                    return "";
                }
                else{
                    return "rotate(45 0 0)"
                }
            }
        },
        methods: {
            // invr
        },
        template: 
        `
        <pattern width="40" height="40" :patternTransform="transform_rotate" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="50" height="50" :style="'fill:' + color.fill"/> 
          <line v-if="diagonal" x1="0" y1="0" x2="0" y2="50" :style="'stroke:' + stroke + '; stroke-width:5'"/>
          <line v-if="cross" x1="0" y1="25" x2="50" y2="25" :style="'stroke:' + stroke + '; stroke-width:3'"/>
        </pattern>
        `,
    });

var rollsVue = new Vue({
  el: "#svgPatterns",
  data: {
    colorObjs: [
        {fill: '#fdc89c', stroke: '#e96c34', id_: 'orangePattern', half_id: 'orangePattern_half', flat_id: 'orangePattern_flat'},
        {fill: '#ffeda3', stroke: '#faaf20', id_: 'yellowPattern', half_id: 'yellowPattern_half', flat_id: 'yellowPattern_flat'},
        {fill: '#c2c5e6', stroke: '#6c61a5', id_: 'purplePattern', half_id: 'purplePattern_half', flat_id: 'purplePattern_flat'},
        {fill: '#f9c0bb', stroke: '#e54e4f', id_: 'redPattern', half_id: 'redPattern_half', flat_id: 'redPattern_flat'},
        {fill: '#c1e3cb', stroke: '#04a34e', id_: 'greenPattern', half_id: 'greenPattern_half', flat_id: 'greenPattern_flat'},
        {fill: '#b7e4f9', stroke: '#0d87d2', id_: 'bluePattern', half_id: 'bluePattern_half', flat_id: 'bluePattern_flat'}
    ],
  },
  methods: {
    invert_hex: function(hex) {
        let invert = invertHex(hex);
        return invert;
    }
  }
});


/* 
    Another component called colorBoxes or something

    That just renders a little thing
    based on what numbers are in the Counter
        & you can hover for the full info


        <text x="20" y="1000" font-size="4.4em" class="oranges" font-family="Helvetica"> <tspan font-weight="700"> 1 2 </tspan> <tspan font-weight="400"> 3 4 </tspan> <tspan font-weight="200"> 5 </tspan> </text>
        <text x="600" y="1700" font-size="4.4em" class="greens"> <tspan font-weight="bold"> 1 2 3 4 5 6</tspan>   </text>
        <text x="1200" y="400" font-size="4.4em" class="blues" font-family="Helvetica"> <tspan font-weight="700"> 1 2 </tspan> <tspan font-weight="400"> 3 4 </tspan> <tspan font-weight="200"> 5 </tspan> </text>
        
*/

Vue.component("rolls-table", {
  props: ["round", "index"],
  template: `
  <div :class="classObject">
    <table> {{ round.number}}
      <tr v-for="turn, num in round.turns"
        :key=num>
        <td :class="turn.classes[0]" class="rollCell"> {{ turn.texts[0] }} </td>
        <td :class="turn.classes[1]" class="rollCell"> {{ turn.texts[1] }} </td>
      </tr>
    </table>
    <div v-if="index===0" style="'height:' + (9-3*round.length) + 'em'"/>
  </div>
`,
  computed: {
    classObject: function () {
      return {
        firstRound: this.index === 0,
        laterRound: this.index >= 1,
      }  
    }
  }
  });  



var rollsVue = new Vue({
  el: "#rollsList",
  data: {
    rounds: gameTracker,
  }
});

