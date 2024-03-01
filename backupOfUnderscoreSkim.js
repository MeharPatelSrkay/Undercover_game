// import _, { map } from 'underscore';
// import words from './words.json';



if (num_of_players >= 3 && num_of_undercover < num_of_players) {
    console.log("Go to Vote : ");
    eliminate = 1
    if (contains(undercover, eliminate)) {
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
    const game = {}
    var num_of_players = document.getElementById("no_players").value
    let num_of_undercover = document.getElementById("no_undercover").value
    let num_of_mr_white = document.getElementById("no_mrwhite").value
    game.num_of_players = num_of_players    
    game.num_of_undercover = num_of_undercover    
    game.num_of_mr_white = num_of_mr_white 
    game.undercover = [] 
    do {
        un = parseInt(Math.random() * num_of_players);
        if (!include(game.undercover, un)) {
            count++
            undercover.push(un)
        }   
    } while (count != num_of_undercover);  
    console.log(game.undercover);
    console.log(game);
    makediv(game)
    // return game
}


function makediv(game) {
    // console.log(game);
    // console.log(game.num_of_players);
    let main = document.getElementById("main")
    var formatted;

    main.innerHTML = ''

    for (let i = 0; i < game.num_of_players; i++) {
        formatted = `<label>Enter the ${i+1}'s player Name </label><input type='text' id = 'names${i}' /> <br/>`
        // main.append(formatted)
        main.innerHTML += formatted
    }
    main.innerHTML += `<input id="btnsub" type="submit" value="GenerateCard" onclick=generatecard() />`
    document.getElementById('btnsub').addEventListener('click', () => {
    console.log("dvfvhwj");
    let names = []
    for(let i = 0 ; i < game.num_of_players; i++){
        names.push(document.getElementById(`names${i}`).value);

        console.log("loop called");
    }
    console.log(names);
    let selected_word = words[parseInt(Math.random() * words.length)];
    let un_word = (parseInt(Math.random() * 2) == 0) ? selected_word.w1 : selected_word.w2;
    let civ_word = (un_word == selected_word.w1) ? selected_word.w2 : selected_word.w1;
    for (let i = 0; i < num_of_players; i++) {
        if(contains(game.undercover, i)){
            // console.log(un_word);
            game.players = []
            const player = {
                "name" : names[i],
                "role" : "undercover",
                "word" : un_word,
                "score" : 0
            }
            players.push(player)
        }
        else {
            // console.log(civ_word);
            const player = {
                "name" : names[i],
                "role" : "civillian",
                "word" : civ_word,
                "score" : 0
            }
            game.players.push(player)
        }
    }
    })
    // return game

}