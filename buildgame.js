/*
    Description:
    The year is 1985. Your job is to build a text-based (console) RPG game.
    
    By: William Tubman
*/
const readline = require("readline-sync");
const playerName = readline.question("Please enter your name: ");

console.log(`Welcome to Bojesi, ${playerName}! A fantasy game with combats and dangers like never before!`);

//Game start.
const start = readline.keyIn(`${playerName} please press 0 to start.`, {limit: '$<0>'});
let pressStart = false;
if (start == 0)
{
    console.log("------------------------------------ \nYou are on a highway between two towns in Bojesi. Zombies and vampires roam this country side! Beware!");
    pressStart = true;
}

//Set variables.
const gameEnemies = ["Zombie", "Lorax", "Noctis Lucis", "Tidus", "Sephiroth", "Yuna", "Vampire", "Raiden"];
const gameTreasure = ["Tome of Agony", "Spite Rod", "Guardian's Cup", "Statuette of Healing", "Restoration Grail","Goblet of Birth"];
let gameInventory = [];
let gameUserHealth = 100;
let userHasHealed = false;
let numOfKills = 0;

function buildGame()
{
    while (pressStart == true && gameUserHealth > 0)
    {
        //Randomized Variables.
        let pickUp = gameTreasure[Math.floor(Math.random() * gameTreasure.length)];
        let gameEnemyHealth = Math.floor(Math.random() * 200);
        const attackPower = Math.floor(Math.random() * (30 + 15 - 3) + 15);
        const yourEnemy = gameEnemies[Math.floor(Math.random() * gameEnemies.length)];
        const enemyPower = Math.floor(Math.random() * (20 + 20 - 2) + 12);
        const heal = Math.floor(Math.random() * 70 + 1);

        //Action Options.
        const perform = readline.keyIn("What would you like to do? \nPress 'W' to walk. \nPress 'H' to heal. \nPress 'P' to print stats. \nPress 'X' to exit the game.", {limit: '$<w, h, p, x>'});

        //Game Metrix.
        if (perform == 'x')
        {
            console.log(`------------------------------------ \n~~ ${playerName}'s Final Stats ~~ \nName: ${playerName} \nHealth: ${gameUserHealth} \nKills: ${numOfKills} \nItems:${gameInventory} \n------------------------------------`);
            return(gameUserHealth = 0);
        }
        else if (perform == 'p')
        {
            console.log(`------------------------------------ \nName: ${playerName} \nHealth: ${gameUserHealth} \nKills: ${numOfKills} \nItems:${gameInventory} \n------------------------------------`);
        }
        else if (perform == 'h')
        {
            if (gameUserHealth < 100 && userHasHealed == false)
            {
                gameUserHealth += heal;
                console.log(`------------------------------------ \nYou healed for ${heal} hit points!`);
                userHasHealed = true;
                if (gameUserHealth > 100)
                {
                    gameUserHealth = 100;
                }
            }
            else if (gameUserHealth < 100 && userHasHealed == true)
            {
                console.log(`------------------------------------ \nYou have already healed! - Health: ${gameUserHealth}`)
            }
            else if (gameUserHealth >= 100)
            {
                console.log(`------------------------------------ \nYour health is full! - Health: ${gameUserHealth}`)
            }
        }
        else if (perform == 'w')
        {
            userHasHealed = false;
            let randomize = Math.random();
            if (randomize >= 0.26)
            {
                console.log("------------------------------------ \nYou are walking down the road...");
            }
            else if (randomize <= 0.25)
            {
                console.log(`------------------------------------ \nCaution! A ${yourEnemy} just appeared!`);
                while (gameUserHealth > 0 && gameEnemyHealth > 0)
                {
                    const actions = readline.keyIn("What would you like to do? \nPress 'R' to run away. \nPress 'A' to attack.", {limit: '<r, a>'});
                    if (actions == 'r')
                    {
                        const run = Math.random();
                        if (run <= 0.5)
                        {
                            console.log(`------------------------------------ \nYou couldn't run away! The ${yourEnemy} attacks you ${enemyPower} damage!`);
                            gameUserHealth -= enemyPower;
                            if (gameUserHealth <= 0)
                            {
                                console.log(`The ${yourEnemy} has terminated you! ${playerName} is dead!`);
                                console.log(`------------------------------------ \n~~ ${playerName}'s Final Stats ~~ \nName: ${playerName} \nHealth: ${gameUserHealth} \nKills: ${numOfKills} \nItems:${gameInventory} \n------------------------------------`);
                                break;
                            }
                        }
                        else if (run >= 0.51)
                        {
                            console.log("------------------------------------ \nYou got away safely!")
                            break;
                        }
                    }
                    else if (actions == 'a')
                    {
                        gameEnemyHealth -= attackPower;
                        console.log(`------------------------------------ \nYou attacked the ${yourEnemy}  ${attackPower} damage!`);
                        gameUserHealth -= enemyPower;
                        console.log(`The ${yourEnemy} attacked you ${enemyPower} damage!`);
                        if (gameEnemyHealth <= 0)
                        {
                            console.log(`You successfully killed the ${yourEnemy}!`);
                            numOfKills += 1;
                            let dropLoot = Math.random();
                            if (dropLoot <= 0.25)
                            {
                                console.log(`You found a ${pickUp} on the dead ${yourEnemy}!`);
                                gameInventory.push(" " + pickUp);
                            }
                        }
                        if (gameUserHealth <= 0)
                        {
                            console.log(`The ${yourEnemy} has terminated you! ${playerName} is dead!`);
                            console.log(`------------------------------------ \n~~ ${playerName}'s Final Stats ~~ \nName: ${playerName} \nHealth: ${gameUserHealth} \nKills: ${numOfKills} \nItems:${gameInventory} \n------------------------------------`);
                            break;
                        }
                    }
                }
            }
        }
    }
}

buildGame();

//Game End