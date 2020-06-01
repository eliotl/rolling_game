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
        if (child.myVal !== ""){
            continue;
        }
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
      this.counters = counters;
      this.set_wheel_values();
    },
    set_wheel_values: function (){
        for (let child of wheelsVue.$children){
            let color = child.color;
            if (! (color in this.counters)){
                child.opacs = {};
            }
            else{
                child.opacs = this.counters[color];
            }
        }
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

// The wheel is one component ... by color
// The trapezoid is one component ... by number

/*






*/







const numberWheels = Vue.component("number-wheel", {
  props: ["colorobj", "color", "nums", "innerpaths", "outerpaths", "numbercoords", "angle", "statecount"],
  template: `
  <g class="numberWheelComponent" :style="transform_style">
    <g v-for="n in nums" :id="group_id_name(n)" :style="opacs_(n)" :title="title_val(n)">
        <path :id="inner_id_name + n" :class=inner_class_name :d=innerpaths[n-1] />
        <path :id="outer_id_name + n" :class=outer_class_name :d=outerpaths[n-1] />
        <text :id="number_id_name(n)" class="wheelNumber" :x=x_coord(n) :y=y_coord(n)><tspan>{{n}}</tspan></text>
    </g>
  </g>
`,
  computed: {
    inner_id_name: function(){
        return this.color + "_inner_";
    },
    outer_id_name: function(){
        return this.color + "_outer_";
    },
    transform_style: function(){
        return `transform: scale(0.4) translate(${this.colorobj.xOffset}px, ${this.colorobj.yOffset}px) rotate(${this.colorobj.angle}deg);`
    },
    inner_class_name: function(){
        return this.color + " innerTrapezoid";
    },
    outer_class_name: function(){
        return this.color.slice(0,-1) + "Fill outerTrapezoid";
    },
    opacity_obj: function() {
        if (! (this.color in statesVue.counters)){
            return [1,1,1,1,1,1];
        }
        return statesVue.counters[this.color];
    },
  },
  methods: {
    group_id_name: function(n) {
        return this.color + "_numberWheel_" + n;
    },
    number_id_name: function(n){
        return this.color + "_number_" + n;
    },
    x_coord: function(n){
        return this.numbercoords[n-1][0];
    },
    y_coord: function(n){
        return this.numbercoords[n-1][1];
    },
    opacs_: function(n){
        let opacity = 0;
        if (n in this.opacs){
            opacity = (this.opacs[n] / this.statecount) * 1.2;
        }
        return `opacity: ${opacity}`;
    },
    title_val: function(n){
        return `${this.opacs[n]} left of ${n} in ${this.color}`;
    },
    opacity_style: function(color, number){
        if (! (color in statesVue.counters)){
            return `opacity: ${1};`
        }
        let count = statesVue.counters[color][3];
        let opacity = 8 / count;
        return `opacity: ${opacity};`
    }    
  },
  data: function () {
    return {
      opacs: {
        1: 8,
        2: 8,
        3: 8,
        4: 8,
        5: 8,
        6: 8,
        },
        }
    }
  });



var wheelsVue = new Vue({
  el: "#numberWheels",
  data: {
    wheelColors: [
        {fill: '#fdc89c', stroke: '#e96c34', id_: 'orangeWheel', color: "oranges", xOffset: -200, yOffset: 3000, angle: -90, count: 9},
        {fill: '#ffeda3', stroke: '#faaf20', id_: 'yellowWheel', color: "yellows", xOffset: 4000, yOffset: 4200, angle: 0, count: 8},
        {fill: '#c2c5e6', stroke: '#6c61a5', id_: 'purpleWheel', color: "purples", xOffset: 8200, yOffset: 900, angle: 90, count: 8},
        {fill: '#f9c0bb', stroke: '#e54e4f', id_: 'redWheel', color: "reds", xOffset: 6400, yOffset: 2700, angle: 0, count: 9},
        {fill: '#c1e3cb', stroke: '#04a34e', id_: 'greenWheel', color: "greens", xOffset: 1400, yOffset: 3800, angle: 0, count: 7},
        {fill: '#b7e4f9', stroke: '#0d87d2', id_: 'blueWheel', color: "blues", xOffset: 2900, yOffset: 320, angle: 0, count: 9},
    ],
    innerPaths: [
        "M 33.996 722.346 L 270.31 683.137 L 290 549 L 75.198 455.385 L 33.996 722.346 Z",
        "M 76.112 453.599 L 290.811 547.176 L 378 449 L 248.928 253.469 L 76.112 453.599 Z",
        "M 250.67 252.454 L 379.662 447.857 L 503.405 412.376 L 503.439 178.127 L 250.67 252.454 Z",
        "M 761.582 251.746 L 632 450 L 505.468 412.321 L 505.446 178.156 L 761.582 251.746 Z",
        "M 939.202 455.668 L 719 550 L 633.645 451.129 L 763.27 252.817 L 939.202 455.668 Z",
        "M 978.366 722.348 L 739.69 683.137 L 719.905 551.839 L 940.138 457.473 L 978.366 722.348 Z",
        ],
    
    outerPaths: [
        "M 102.459 709.652 L 135.203 482.582 L 76.531 457.026 L 36.029 720.739 L 102.459 709.652 Z",
        "M 137.31 478.966 L 283.519 307.13 L 249.291 255.107 L 78.212 453.227 L 137.31 478.966 Z",
        "M 287.496 304.599 L 502.753 239.937 L 502.864 179.547 L 252.794 253.057 L 287.496 304.599 Z",
        "M 725.226 304.363 L 507.024 240.142 L 506.946 179.547 L 758.837 252.959 L 725.226 304.363 Z",
        "M 879.671 479.431 L 730.484 307.386 L 763.949 256.202 L 936.289 454.991 L 879.671 479.431 Z",
        "M 914 709.618 L 881.241 485.165 L 939.201 460.271 L 976.309 719.815 L 914 709.618 Z",
    ],
    innerPaths_: [
        "M102,711l168.31-27.863L290,549,134,480Z",
        "M133.5,482.173L290,551l88-102L281.989,303.191Z",
        "M282,304l95,146,128-38V238Z",
        "M727,304L632,450,504,412V238Z",
        "M875.505,481.173L719,550,631,448l96.011-145.809Z",
        "M908,711L739.69,683.137,719,548l156-68Z",
    ],
    outerPaths_: [
        "M104,711l32-230L75,454,34.456,721.534Z",
        "M134.882,482.447L283.1,304.852,250,252,74,455Z",
        "M283,305l222-65V178L248,253Z",
        "M726,305L504,240V178l257,75Z",
        "M875.118,482.447L725,304l35-52L936,455Z",
        "M906,711L873,481l62-27,40.544,267.534Z",
    ],
    numberCoords: [
        [150, 620],
        [240, 430],
        [400, 330],
        [580, 330],
        [770, 430],
        [850, 620]
    ],
    nums: [1,2,3,4,5,6],
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
        template: 
        `
        <pattern width="40" height="40" :patternTransform="transform_rotate" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="50" height="50" :style="'fill:' + color.fill"/> 
          <line v-if="diagonal" x1="0" y1="0" x2="0" y2="50" :style="'stroke:' + stroke + '; stroke-width:5'"/>
          <line v-if="cross" x1="0" y1="25" x2="50" y2="25" :style="'stroke:' + stroke + '; stroke-width:3'"/>
        </pattern>
        `,
    });

var patternsVue = new Vue({
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
    },
  },
  });  



var rollsVue = new Vue({
  el: "#rollsList",
  data: {
    rounds: gameTracker,
  }
});

