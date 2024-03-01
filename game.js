const words = require('./words.json')
const _ = require('underscore')
const players = []
let num_of_players = document.getElementById("no_player").value
let num_of_undercover = document.getElementById("no_undercover").value
let num_of_mr_white = document.getElementById("no_mrwhite").value
console.log(num_of_mr_white, num_of_players, num_of_undercover);
let undercover = []
let count = 0
let eliminate = 0
do {
    un = parseInt(Math.random() * num_of_players);
    if (!_.contains(undercover, un)) {
        count++
        undercover.push(un)
    }
} while (count != num_of_undercover);

if (num_of_players >= 3 && num_of_undercover < num_of_players) {
    selected_word = words.words[parseInt(Math.random() * words.words.length)];
    let un_word = (parseInt(Math.random() * 2) == 0) ? selected_word.w1 : selected_word.w2;
    let civ_word = (un_word == selected_word.w1) ? selected_word.w2 : selected_word.w1;
    for (let i = 0; i < num_of_players; i++) {
        if(_.contains(undercover, i)){
            // console.log(un_word);
            const player = {
                "name" : "abc",
                "role" : "undercover",
                "word" : un_word,
                "score" : 0
            }
            players.push(player)
        }
        else {
            // console.log(civ_word);
            const player = {
                "name" : "abc",
                "role" : "civillian",
                "word" : civ_word,
                "score" : 0
            }
            players.push(player)
        }
        
    }
    console.log(players);
    console.log("Go to Vote : ");
    eliminate = 1
    if (_.contains(undercover, eliminate)) {
        console.log("Yesssss! you found the undercover!!");
    }
    else {
        console.log("Booooooooo! You eliminated a civillian!!");
    }
}
else if(num_of_undercover >= num_of_players) {
    console.log("Number of undercover has to be less than the number of total players!");
}
else 
{
    console.log(`This isn't a ${num_of_players} player game`);
}

function passnumvalues(){
    let num_of_players = document.getElementById("no_players").value
    let num_of_undercover = document.getElementById("no_undercover").value
    let num_of_mr_white = document.getElementById("no_mrwhite").value
    console.log(num_of_players);
    console.log(num_of_undercover);
    console.log(num_of_mr_white);
}