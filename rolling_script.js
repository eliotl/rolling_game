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

var PRINTED_ROLL = false;
var roundCounter = 0;
var rollCounter = 0;

function prepend_round_(text){
    let rollsList = document.getElementById("rollsList");
    let newItem = document.createElement("LI");
    let newText = document.createTextNode(text);
    let newList = document.createElement("UL");
    newList.setAttribute("id", "round" + (roundCounter+1));
    newItem.appendChild(newText);
    newItem.appendChild(newList);
    rollsList.prepend(newItem);
}

function prepend_roll_(text){
    if (rollCounter === 0){
        var roundNo = roundCounter;
    }
    else {
        var roundNo = roundCounter+1;
    }
    let roundNode = document.getElementById("round" + roundNo);
    let rollItem = document.createElement("LI");
    let rollText = document.createTextNode(text);
    rollItem.appendChild(rollText);
    roundNode.prepend(rollItem);
}

/* Make a row per roll */

function prepend_round(text){
    let rollsList = document.getElementById("rollsList");
    let newText = document.createTextNode(text);
    let newTable = document.createElement("TABLE");
    newTable.setAttribute("id", "round" + (roundCounter+1));
    rollsList.prepend(newTable);
    rollsList.prepend(newText);
}

function prepend_roll(texts, colors){
    if (rollCounter === 0){
        var roundNo = roundCounter;
    }
    else {
        var roundNo = roundCounter+1;
    }
    let roundNode = document.getElementById("round" + roundNo);
    let newRow = document.createElement("TR");
    roundNode.prepend(newRow);
    for (i = 0; i < 2; i++){
        let rollColumn = document.createElement("TD");
        let text = document.createTextNode(texts[i]);
        rollColumn.appendChild(text);
        rollColumn.setAttribute("class", colors[i] + "s");
        newRow.append(rollColumn);
    }

}

function add_round_number() {
    if (roundCounter >= 8) {
        return
    }
    let text = "ROUND " + (roundCounter + 1)
    prepend_round(text);
    PRINTED_ROLL = true;
}


function add_rolls(){
    let rolls = getRoll();
    let roll1 = rolls[0][0] + " " + rolls[0][1];
    let roll2 = rolls[1][0] + " " + rolls[1][1];
    let text = [roll1, roll2];
    let colors = [rolls[0][0], rolls[1][0]];
    prepend_roll(text, colors);
    PRINTED_ROLL = false;
}


function add_rolls_(){
    let rolls = getRoll();
    roll1 = rolls[0][0] + " " + rolls[0][1];
    roll2 = rolls[1][0] + " " + rolls[1][1];
    text = roll1 + ", " + roll2;
    prepend_roll_(text);
    PRINTED_ROLL = false;
}

function focus_input(object){
    if (object.tagName.toLowerCase() == "rect"){
        let foreignObj = object.nextElementSibling;
        var inp = foreignObj.firstElementChild.firstElementChild;        
    }
    else if (object.tagName.toLowerCase() == "path"){
        let foreignObj = object.nextElementSibling;
        var inp = foreignObj.firstElementChild.firstElementChild;        
    }
    else if (object.tagName.toLowerCase() == "foreignobject"){
        var inp = object.firstElementChild.firstElementChild;
    }
    else if (object.tagName.toLowerCase() == "div"){
        var inp = object.firstElementChild;
    }
    else if (object.tagName.toLowerCase() == "input"){
        var inp = object;
    }    
    else {
        console.log("Unexpected click");
        console.log(object.tagName);
        var inp = object;
    }
    inp.focus();
    inp.select();
}

function advance_game() {
    if (rollCounter === 0 && !PRINTED_ROLL){
        add_round_number();
    }
    else {
        add_rolls();
    }
}


set_random_seed();

const gameResults = full_game();
const gameTracker = [];



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
    props: ['state'],
    template: `
    <g class="state-shape">
            <title> {{state.id.replace("_"," ")}} </title>
            <rect v-if="state.height" :id="state.id" :class="state.class" :x="state.x" :y="state.y" :width="state.width" :height="state.height"/>
            <path v-else :id="state.id" :class="state.class" :d="state.d"/>
              <foreignObject :x="state.box_x + 8" :y="state.box_y + 8" :width="state.box_width" :height="state.box_height">
              <div xmlns="http://www.w3.org/1999/xhtml">
                  <input :id="state.input_id" :class="state.class" type="text"></input>
              </div>
              </foreignObject>
        </g>
`
});
var statesVue = new Vue({
    el: '#state-shapes',
    data: {
        states: statesData,
    },
  methods: {
    focus_state: function (event) {
      focus_input(event.target);
    }
    }
});   
Vue.component("check-box", {
    props: ['check'],
    template: `
    <div class="checkDiv" :id="check.id" :title="check.help">
      <label> {{ check.label }} </label>
      <input type="checkbox">
      <input type="checkbox">
      <input type="checkbox">
    </div>        
`
});    

var checksVue = new Vue({
    el: '#check-bank',
    data: {
        checks: [
        { label: "Color changes: ", id: "colorChanges", help: "Change the color of a single die roll"},
        { label: "Dupes: ", id: "dupes", help: "Duplicate a single die roll"},
        { label: "Guards: ", id: "guards", help: "Write a single roll like [3] and consider it to have no neighbors"}
        ],
    }
});

Vue.component("rolls-table", {
    props: ['round'],
    template: `
    <div>
        <table> {{ round.number}}
            <tr v-for="turn, num in round.turns"
                :key=num>
                <td :class="turn.classes[0]"> {{ turn.texts[0] }} </td>
                <td :class="turn.classes[1]"> {{ turn.texts[1] }} </td>
            </tr>
        </table>
    </div>
`
    });    


Vue.component("rolls-table_", {
    props: ['round'],
    template: `
    <ul>
    <li v-for> ROUND {{round}}
    </li>
    </ul>
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



