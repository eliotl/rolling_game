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
    clambake: String,
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
  },
  methods: {
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
    update_object: function(state, value) {
      this.bigStateObject[state] = value;
      this.count_set_xes();
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
        // props: ["strokecolor", "fillcolor", "colorid"],
        props: ['color'],
        template: 
        `
        <pattern :id="color.id_" width="15" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <rect v-if="false" x="0" y="0" width="15" height="10" :style="'fill:' + color.fill"/> 
          <line x1="0" y1="0" x2="0" y2="10" :style="'stroke:' + color.stroke + '; stroke-width:5'" />
        </pattern>        
        `,
        /*
        `
        <pattern :id="colorid" width="15" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="15" height="10" :style="'fill:' + fillcolor"/> 
          <line x1="0" y1="0" x2="0" y2="10" :style="'stroke:' + strokecolor + '; stroke-width:5'" />
        </pattern>
        `,*/
    });

var rollsVue = new Vue({
  el: "#svgPatterns",
  data: {
    colorObjs: [
        {fill: '#fdc89c', stroke: '#e96c34', id_: 'orangePattern'},
        {fill: '#ffeda3', stroke: '#faaf20', id_: 'yellowPattern'},
        {fill: '#c2c5e6', stroke: '#6c61a5', id_: 'purplePattern'},
        {fill: '#f9c0bb', stroke: '#e54e4f', id_: 'redPattern'},
        {fill: '#c1e3cb', stroke: '#04a34e', id_: 'greenPattern'},
        {fill: '#b7e4f9', stroke: '#0d87d2', id_: 'bluePattern'}
    ],
  }
});


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

/* 
function delay(key) {
    console.log(key);
    console.log(statesGraph[key]);
    statesVue.fill_states(statesGraph[key]);
    i++;
}


for (const key in statesGraph){
    delay(key);
}

*/


/*
    setTimeout(function () {
    console.log(key);
    console.log(statesGraph[key]);
    statesVue.fill_states(statesGraph[key])
    }, 20000
    )
}

*/