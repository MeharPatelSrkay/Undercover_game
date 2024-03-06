let total_players = 10
let undercover = 4
let mrwhite = 1
console.log(total_players);
console.log(parseInt(0.5*total_players))
if((undercover <= (0.4*total_players)) && (mrwhite <= (0.2*total_players)) && (undercover + mrwhite) <= parseInt(0.5*total_players)){
    console.log(("hi"));
}
