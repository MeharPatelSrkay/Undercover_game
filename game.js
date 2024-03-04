    words = [
        {
            "w1" : "London",
            "w2" : "Paris"
        },
        {
            "w1" : "Strawberry",
            "w2" : "Cherry"
        },
        {
            "w1" : "Singapor",
            "w2" : "Hong Kong"
        },
        {
            "w1" : "Captain America",
            "w2" : "Iron Man"
        },
        {
            "w1" : "Bubble Gum",
            "w2" : "Lolipop"
        },
        {
            "w1" : "Escalator",
            "w2" : "Elevator"
        },
        {
            "w1" : "Ice cream",
            "w2" : "Yogurt"
        }
    ]


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

function inarray(arr, ele) {
    let flag = false
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] == ele) {
            flag = true
        }
        
    }
    return flag
}


function passnumvalues(){
    const game = {}
    var num_of_players = document.getElementById("no_players").value
    let num_of_undercover = document.getElementById("no_undercover").value
    let num_of_mr_white = document.getElementById("no_mrwhite").value
    let count = 0
    game.num_of_players = num_of_players    
    game.num_of_undercover = num_of_undercover    
    game.num_of_mr_white = num_of_mr_white 
    game.undercover = [] 
    do {
        un = parseInt(Math.random() * num_of_players);
        if (!inarray(game.undercover, un)) {
            count++
            game.undercover.push(un)
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
    main.innerHTML += `<input id="btnsub" class="btn btn-outline-primaryx" type="submit" value="GenerateCard" />`
    game.players = []
    document.getElementById('btnsub').addEventListener('click', () => {
        let names = []
        for(let i = 0 ; i < game.num_of_players; i++){
            names.push(document.getElementById(`names${i}`).value);

            // console.log("loop called");
        }
        // console.log(names);
        let selected_word = words[parseInt(Math.random() * words.length)];
        let un_word = (parseInt(Math.random() * 2) == 0) ? selected_word.w1 : selected_word.w2;
        let civ_word = (un_word == selected_word.w1) ? selected_word.w2 : selected_word.w1;
        for (let i = 0; i < game.num_of_players; i++) {
            if(inarray(game.undercover, i)){
                // console.log(un_word);
                const player = {
                    "name" : names[i],
                    "role" : "undercover",
                    "word" : un_word,
                    "score" : 0
                }
                game.players.push(player)
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
        // console.log(JSON.stringify(game, null, 5));
        let cardbox = document.getElementById("cardbox")
        for (let j = 0; j < game.players.length; j++) {
            // console.log(game.players[j]);
            // cardbox.innerHTML += game.players[j].name
            
            formattedcard = `<div id="card${j}" class="card pt-10 text-center mb-5 border-slate-950 rounded-sm border-2 px-6 mx-6 w-1/5 h-80">
                                <p>Pick a card</p>
                            </div>
                            <div id="othercard${j}" style="display : none;" class="card pt-10 text-center mb-5 border-slate-950 rounded-sm border-2 px-6 mx-6 w-1/5 h-80">
                                <p>Picked Card</p>
                                <button id="lastcardbutton${j}" type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Okay</button>
                            </div>
                            <div id="lastcard${j}" style="display : none;" class="card pt-10 text-center mb-5 border-slate-950 rounded-sm border-2 px-6 mx-6 w-1/5 h-80">
                                
                            </div>`
            cardbox.innerHTML += formattedcard
        }

        // for (let l = 0; l < game.players.length; l++) {
            // const name = game.players[l].name;
            let flag = true
            let countname = 0  
            for (let k = 0; k < game.players.length; k++) {
                    let card_id = `card${k}`
                    let othercard_id = `othercard${k}`
                    let lastcard_id = `lastcard${k}`
                    let lastcardbutton = `lastcardbutton${k}`
                    document.getElementById(card_id).addEventListener('click', () => {
                        if(flag == true) {
                        flag = false
                        let card = document.getElementById(card_id)
                        let othercard = document.getElementById(othercard_id)
                        card.classList.add("selected")
                        // card.innerHTML += `<p>${game.players[k].name}</p>`
                        card.style.display = "none";
                        othercard.style.display = "block";
                        othercard.innerHTML += `<p>${game.players[countname].name}</p>`
                        othercard.innerHTML += `${game.players[countname].word}`
                        document.getElementById(lastcardbutton).addEventListener('click', () => {
                            flag = true
                            othercard.style.display = "none";
                            let lastcard = document.getElementById(lastcard_id)
                            lastcard.innerHTML += `<p>${game.players[countname].name}'s Card</p>`
                            lastcard.style.display = "block";
                            countname++
                        })
                        if(countname == game.players.length-1) {
                            gotovote(game)
                        }
                    }
                    })
                
            }


    })
    // return game


}

function gotovote(game) {
    let vote = document.getElementById("vote")
    vote.innerHTML += `<button id="votebtn" type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Go to Vote</button>`

    let votebtn = document.getElementById("votebtn")
    let votecards = document.getElementById("votecards")
    votebtn.addEventListener('click', () => {
        for (let i = 0; i < game.players.length; i++) {
            // const  = game.players[i];
            votecards.innerHTML += `<button type="button" id="votename${i}" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">${game.players[i].name}</button>`    
        }
        let count = 0
        for (let j = 0; j < game.players.length; j++) {
            // const element = game.players[j];
            let voted = document.getElementById(`votename${j}`)
            voted.addEventListener('click', () => {
                console.log("hi");
                console.log(game.players[j].name);
                
            })
            
        }
    })
}