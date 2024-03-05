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
            "w1" : "Onion",
            "w2" : "Garlic"
        },
        {
            "w1" : "Gravy",
            "w2" : "Curry"
        },
        {
            "w1" : "Roti",
            "w2" : "Bread"
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
    let entervalues = document.getElementById("entervalues")
    game.num_of_players =  document.getElementById("no_players").value
    game.num_of_undercover = document.getElementById("no_undercover").value
    game.num_of_mr_white = document.getElementById("no_mrwhite").value
    console.log(game.num_of_players, game.num_of_undercover, game.num_of_mr_white)
    if ((game.num_of_players >= 3) || (game.num_of_undercover < game.num_of_players)){
        entervalues.disabled = true
        console.log("IF");
        // entervalues.style.background = "grey"
        document.getElementById("errorbox").style.display = "none"
        game.undercover = []         
        makediv(game)
    } 
    else if (game.num_of_undercover >= game.num_of_players){
        console.log("ELSEIF");
        document.getElementById("errorbox").style.display = "block"
    }
    else{
        console.log("ELSE");
        document.getElementById("errorbox").style.display = "block"
    }
}


function makediv(game) {
    let main = document.getElementById("main")
    var formatted;
    let names = []
    game.players = []
    for (let i = 0; i < game.num_of_players; i++) {
        formatted = `<label>Enter the ${i+1}'s player Name </label><input type='text' id = 'names${i}' /> <br/>`
        // main.append(formatted)
        main.innerHTML += formatted
    }
    // main.innerHTML = ''

    main.innerHTML += `<button id="generatebtn" class="popup-button">Generate Cards<button/>`
    
    document.getElementById('generatebtn').addEventListener('click', () => {
        game.players.length = 0
        game.undercover.length = 0
        console.log(JSON.stringify(game, null, 5));
        let selected_word = words[parseInt(Math.random() * words.length)];
        let un_word = (parseInt(Math.random() * 2) == 0) ? selected_word.w1 : selected_word.w2;
        let civ_word = (un_word == selected_word.w1) ? selected_word.w2 : selected_word.w1;
        let generatebtn = document.getElementById("generatebtn")
        generatebtn.disabled = true
        let count = 0
        do {
            un = parseInt(Math.random() * game.num_of_players);
            if (!inarray(game.undercover, un)) {
                count++
                game.undercover.push(un)
            }
        } while (count != game.num_of_undercover);
        for(let i = 0 ; i < game.num_of_players; i++){
            names.push(document.getElementById(`names${i}`).value);
        }
            for (let i = 0; i < game.num_of_players; i++) {
                if(inarray(game.undercover, i)){
                    const player = {
                        "name" : names[i],
                        "role" : "undercover",
                        "word" : un_word,
                        "score" : 0
                    }
                    game.players.push(player)
                }
                else {
                    const player = {
                        "name" : names[i],
                        "role" : "civillian",
                        "word" : civ_word,
                        "score" : 0
                    }
                    game.players.push(player)
                }
            }
        let cardbox = document.getElementById("cardbox")
        for (let j = 0; j < game.players.length; j++) {

            formattedcard = `<div id="card${j}" class="card pt-10 text-center mb-5 border-slate-950 rounded-sm border-2 px-6 mx-6 w-1/5 h-80">
                                <p>Pick a card</p>
                            </div>
                            <div id="othercard${j}" style="display : none;" class="card pt-10 text-center mb-5 border-slate-950 rounded-sm border-2 px-6 mx-6 w-1/5 h-80">
                                <p>Picked Card</p>
                                <button id="lastcardbutton${j}" class="popup-button">Okay</button>
                            </div>
                            <div id="lastcard${j}" style="display : none;" class="card pt-10 text-center mb-5 border-slate-950 rounded-sm border-2 px-6 mx-6 w-1/5 h-80">

                            </div>`
            cardbox.innerHTML += formattedcard

        }

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


}

function gotovote(game) {
    let un_count = 0
    let vote = document.getElementById("vote")
    vote.innerHTML += `<button id="votebtn" class="popup-button">Go to Vote</button>`

    let votebtn = document.getElementById("votebtn")
    votebtn.addEventListener('click', () => {
        votebtn.disabled = true
        let votecards = document.getElementById("votecards")
        // votebtn.style.background = "grey"
        for (let i = 0; i < game.players.length; i++) {
            console.log(game.players[i].name);
            votecards.innerHTML += `<button id="votename${i}" class="popup-button">${game.players[i].name}</button>`
            votecards.innerHTML += `${game.players[i].name}`
            console.log("mehar");
        }
        un_count = 0
        console.log("mehar2");
        let voteanswer = document.getElementById("voteanswer")
        for (let j = 0; j < game.players.length; j++) {
                let voted = document.getElementById(`votename${j}`)
                voted.addEventListener('click', () => {
                    if(game.players[j].role == "undercover"){
                        voted.disabled = true;
                        // voted.style.background = "grey"
                        voteanswer.innerHTML = "Woohoo!! You guessed the undercover!!"
                        un_count++
                    }
                    else {
                        voted.disabled = true;
                        // voted.style.background = "grey"
                        voteanswer.innerHTML = "Boooooooo!! You eliminated a civillian!!"
                    }
                    console.log(un_count);
                    console.log(game.undercover.length);
                    
                    if(un_count == game.undercover.length){
                        console.log("hufggdjhewbo");
                        voteanswer.innerHTML = "Woohoo!! You guessed all the undercover!!"
                        let playagaindiv = document.getElementById("playagaindiv")
                        playagaindiv.innerHTML = `<button id="playagain" class="popup-button">Play Again!!!</button>`
                        votecards.style.display = "none"
                        document.getElementById("playagain").addEventListener('click', () => {
                            document.getElementById("cardbox").innerHTML = ''
                            document.getElementById("vote").innerHTML = ''
                            document.getElementById("votecards").innerHTML = ''
                            document.getElementById("voteanswer").innerHTML = ''
                            document.getElementById("generatebtn").disabled = false
                            document.getElementById("playagain").style.display = "none"
                            document.getElementById("votecards").style.display = "block"
                        })
                        // undercoverdiscovered(game)
                    }

                })
            }


    })
}

function undercoverdiscovered(game) {
    
}