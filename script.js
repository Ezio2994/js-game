import enemiesData from './dataBase.js'
import {itemsBag} from './dataBase.js'


const startGame = document.querySelector('#startGame')
const startGameText = document.querySelector('#startGame p')
const startGameButton = document.querySelector('#startGame button')
const mainMenu = document.querySelector('#mainMenu')
const field = document.querySelector('main')
const rightArrow = document.querySelector('#right')
const goblinKing = document.querySelector('#goblinKing')
const battleSection = document.querySelector('section')
const turnIndicator = document.querySelector('section h2')
const character = document.querySelector('#characterPG')
const messageField = document.querySelector('#messageField')
const winMessage = document.querySelector('#message')
const actionMenu = document.querySelector('.buttons')
const actionMenuIcons = document.querySelectorAll('.buttons img')
const actionMenuButtons = document.querySelectorAll('.buttons button')
const artsMenu = document.querySelector('.artsMenu')
const artsMenuButtons = document.querySelectorAll('.artsMenu button')
const artsMenuIcons = document.querySelectorAll('.artsMenu img')
const itemsMenu = document.querySelector('.itemsMenu')
const itemsMenuContent = document.querySelectorAll('.itemsMenu button')
const slot1 = document.querySelectorAll('.slot1')
const slot2 = document.querySelectorAll('.slot2')
const slot3 = document.querySelectorAll('.slot3')
const goBack = document.querySelectorAll('.goBack')
const attack = document.querySelector('#attack')
const items = document.querySelector('#items')
const arts = document.querySelector('#arts')
const flee = document.querySelector('#flee')
const enemy1 = document.querySelector('#enemy1')
const enemy2 = document.querySelector('#enemy2')
const enemy1LP = document.querySelector('#enemy1LP')
const enemy2LP = document.querySelector('#enemy2LP')
const enemiesDataContainer = document.querySelectorAll('.enemiesDataContainer h5')
const damageAnimation = document.querySelector('#damageAnimation')
const characterLP = document.querySelector('#LP')
const characterAP = document.querySelector('#AP')
const attackAnimation = document.querySelector('.attackAnimation')
const continuee = document.querySelector('#continue')
const menu = document.querySelector('#menu')
const menuButton = document.querySelectorAll('#menu button')
const totEXP = document.querySelector('#train h2 span')
const train = document.querySelector('#train')
const upBottons = document.querySelectorAll('#train article button')
const statsValue = document.querySelectorAll('#train article span')
const useItems = document.querySelector('#useItems')
const useItemsButtons = document.querySelectorAll('#useItems button')
const useItemsStats = document.querySelectorAll('#useItems span')
const equipmentMenu = document.querySelector('#equipmentMenu')
const eqListButton = document.querySelectorAll('#list button')
const eqImgs = document.querySelectorAll('#showEq img')


const characterAttackEffect = `<img src="./img/Slash2-unscreen.gif" alt=""></img>`
const koi = `<img src="./img/Kaiser36101000hit0-zps55d5acee-unscreen.gif" alt="">`
const ken = `<img src="./img/ken.gif">`
const kik = `<img src="./img/kik.gif">`
const bloodyAttack = `<img src="./img/0f9d24f99455f65ba1c5ff8d3474e4-unscreen.gif" alt="">`
const plantVenom = `<img src="./img/plantVenom.gif">`
const sonicAttack = `<img src="./img/sonicAttack.gif">`
const negativeAura = `<img src="./img/negativeAura.gif">`
const crushAttack = `<img src="./img/crushAttack.gif">`


let page = 0;
let x = 0;
let y = 0;
let movement = false;
let currentAction = '';
let currentArt = '';
let action = false;
let clicked = false
let enemy1Be;
let enemy2Be;
let enemySpots;
let battleExperience = 0;
let totalExperience = 0;
let battleItems = ''
let battleEq = ''
let itemsChance = 0;
let currentItem;
let ownEq = []; 

const characterStats = {
    maxLP: 32,
    LP: 32,
    maxAP: 12,
    AP: 12,
    ATT: 12,
    DEF: 8,
    artATT: 10,
    artDEF: 8
}

startGameButton.onclick = () => {
    if (page === 0 ) {
        startGameText.innerHTML = 'The action you can take are; <span>Attack:</span> which cause phisical damage.<br> <span>Art:</span> You have different art, different enemies are weaker against <br> one art more than another, it is on you to find out every enemy weakness, <br> Be aware that Art consumes AP, if your AP are 0 you cannot use arts. <br> <span>Items:</span> You can use items to restore LP(life point) and AP(art poiny) and more. <br> <span>Flee:</span> Ff you see the enemy is too strong for you, you can try to escape the battle <br> be aware that you may failed to escape, but you can try again as many time as you can. '
        page = 1
    } else if (page === 1) {
        startGameText.innerHTML = 'If during battle your LP goes to 0 is game over <br> On the top left on the screen you can find the button for accesing the menu where you have: <br><span>Train:</span> which allows you to spend the experience point you got by defeating enemies and <br> boosting the stats you prefer, try to balance them so you are preper to any type of enemy. <br> <span>Equipment:</span> Some enemies other than items are also gonna drop equipment <br> that you can wear to be more powerfull. <br><span>Items:</span> You can also use items outside of battles through the menu.'
        page = 2
    } else {
        startGame.style.display = 'none'
        movement = true;
        mainMenu .style.display = 'inline-block'
    }
}

mainMenu.onclick = () => {
    if (menu.style.display === 'none' && train.style.display === 'none' && useItems.style.display === 'none' && equipmentMenu.style.display === 'none') {
        menu.style.display = 'block'
        movement = false
    } else {
        menu.style.display = 'none'
        train.style.display = 'none'
        useItems.style.display = 'none'
        equipmentMenu.style.display = 'none'
        movement = true
    }
}

menuButton.forEach(button => {
    button.onclick = () => {
        if(button.innerHTML === 'Train') {
            train.style.display = 'block'
            menu.style.display = 'none'
        } else if(button.innerHTML === 'Use Items') {
            useItems.style.display = 'block'
            menu.style.display = 'none'
            updateMenu()
        } else if(button.innerHTML === 'Equipment') {
            equipmentMenu.style.display = 'flex'
            menu.style.display = 'none'
        } else if (button.innerHTML === 'Tutorial') {
            startGame.style.display = 'block'
            mainMenu.style.display = 'none'
            menu.style.display = 'none'
            page = 0
            startGameText.innerHTML = `Hello adventurous, I'm glad to see you came to help our hero to defeat <br> the goblin king who invaded this forest. <br> The path is full of powerfull enemies so be caferull on going ahead to quickly <br> since enemies get stronger and stronger as you move forward. <br> Sometimes may help go back and get stronger by defeating weaker enemies. <br> This is a rpg turn based, this means you can fight by declaring one action per turn. <br>
            You will be able to acces the following tutorial everytime you need from the menu.`
        }
    }
})

const updateMenu = () => {
    useItemsStats[0].innerText = `LP: ${characterStats.LP}/${characterStats.maxLP}`
    useItemsStats[1].innerText = `AP: ${characterStats.AP}/${characterStats.maxAP}` 
    characterLP.innerHTML = `LP: ${characterStats.LP}/${characterStats.maxLP}`
    characterAP.innerHTML = `AP: ${characterStats.LP}/${characterStats.maxLP}`
}

useItemsButtons.forEach(button => {
    button.onclick = () => {
        if (button.innerHTML.includes('LP potion')) {
            characterStats.LP = characterStats.maxLP
            itemsBag[0].quantity --    
            itemRenderer()
            updateMenu()
        } else if (button.innerHTML.includes('AP potion')) {
            characterStats.AP = characterStats.maxAP
            itemsBag[1].quantity --    
            itemRenderer()
            updateMenu()
        }else if (button.value === 'back') {
            useItems.style.display = 'none'
            menu.style.display = 'block'
        }
    }
})

upBottons.forEach(button => {
    button.onclick = () => {
        if (button.value === 'LP' && totalExperience >= 5) {
            characterStats.maxLP ++
            totalExperience -= 5;
            statsValue[0].innerText = characterStats.maxLP
            charactermaxLP.innerHTML = characterStats.maxLP
        } else if (button.value === 'AP' && totalExperience >= 5) {
            characterStats.maxAP ++
            totalExperience -= 5;
            statsValue[1].innerText = characterStats.maxAP
            charactermaxAP.innerHTML = characterStats.maxAP
        } else if (button.value === 'ATT' && totalExperience >= 5) {
            characterStats.ATT ++
            totalExperience -= 5;
            statsValue[2].innerText = characterStats.ATT
        } else if (button.value === 'DEF' && totalExperience >= 5) {
            characterStats.DEF ++
            totalExperience -= 5;
            statsValue[3].innerText = characterStats.DEF
        } else if (button.value === 'artATT' && totalExperience >= 5) {
            characterStats.artATT ++
            totalExperience -= 5;
            statsValue[4].innerText = characterStats.artATT
        } else if (button.value === 'artDEF' && totalExperience >= 5) {
            characterStats.artDEF ++
            totalExperience -= 5;
            statsValue[5].innerText = characterStats.artDEF
        } else if (button.value === 'back') {
            train.style.display = 'none'
            menu.style.display = 'block'    
        } totEXP.innerText = totalExperience
    }
})

const getEq = () => {
    if (ownEq.includes('Silver Elmet')) {
        eqListButton[0].style.display = 'flex'
    } if (ownEq.includes('Regal Elmet')) {
        eqListButton[1].style.display = 'flex'
    } if (ownEq.includes('Silver Armor')) {
        eqListButton[2].style.display = 'flex'
    } if (ownEq.includes('Regal Armor')) {
        eqListButton[3].style.display = 'flex'
    } if (ownEq.includes('Magic Sword')) {
        eqListButton[4].style.display = 'flex'
    } if (ownEq.includes('Strong Sword')) {
        eqListButton[5].style.display = 'flex'
    } if (ownEq.includes('Silver Boots')) {
        eqListButton[6].style.display = 'flex'
    } if (ownEq.includes('Regal Boots')) {
        eqListButton[7].style.display = 'flex'
    } 
}; eqListButton[8].style.display = 'flex'

eqImgs.forEach(img => {img.style.display = 'none'})


eqListButton.forEach(eq => {
    eq.addEventListener('click', () => {
        if (eq.innerText.includes('Silver Elmet')) {
            if (eqImgs[0].style.display === 'block' && eqImgs[1].style.display === 'none') {
                eqImgs[0].style.display = 'none'
                characterStats.maxLP -= 5
                characterStats.ATT -= 5
            } else if (eqImgs[1].style.display === 'block') {
                eqImgs[1].style.display = 'none'
                eqImgs[0].style.display = 'block'    
                characterStats.maxLP += 3
                characterStats.ATT -= 3 
            } else if(eqImgs[0].style.display === 'none') {
                eqImgs[0].style.display = 'block'
                eqImgs[1].style.display = 'none'
                characterStats.maxLP += 5
                characterStats.ATT += 5
            }
        } else if (eq.innerText.includes('Regal Elmet')) {
            if (eqImgs[1].style.display === 'block' && eqImgs[0].style.display === 'none') {
                eqImgs[1].style.display = 'none'
                characterStats.maxLP -= 2
                characterStats.ATT -= 8
            } else if (eqImgs[0].style.display === 'block') {
                eqImgs[0].style.display = 'none'
                eqImgs[1].style.display = 'block'    
                characterStats.maxLP -= 3
                characterStats.ATT += 3 
            } else if(eqImgs[1].style.display === 'none') {
                eqImgs[1].style.display = 'block'
                eqImgs[0].style.display = 'none'
                characterStats.maxLP += 2
                characterStats.ATT += 8
            }
        } else if (eq.innerText.includes('Silver Armor')) {
            if (eqImgs[2].style.display === 'block' && eqImgs[3].style.display === 'none') {
                eqImgs[2].style.display = 'none'
                characterStats.maxLP -= 5
                characterStats.DEF -= 5
            } else if (eqImgs[3].style.display === 'block') {
                eqImgs[3].style.display = 'none'
                eqImgs[2].style.display = 'block'    
                characterStats.artDEF -= 5
                characterStats.maxLP += 5
            } else if(eqImgs[2].style.display === 'none') {
                eqImgs[2].style.display = 'block'
                eqImgs[3].style.display = 'none'
                characterStats.maxLP += 5
                characterStats.DEF += 5
            } 
        } else if (eq.innerText.includes('Regal Armor')) {
            if (eqImgs[3].style.display === 'block' && eqImgs[2].style.display === 'none') {
                eqImgs[3].style.display = 'none'
                characterStats.artDEF -= 5
                characterStats.DEF -= 5
            } else if (eqImgs[2].style.display === 'block') {
                eqImgs[2].style.display = 'none'
                eqImgs[3].style.display = 'block'    
                characterStats.artDEF += 5
                characterStats.maxLP -= 5
            } else if(eqImgs[3].style.display === 'none') {
                eqImgs[3].style.display = 'block'
                eqImgs[2].style.display = 'none'
                characterStats.artDEF += 5
                characterStats.DEF += 5
            } console.log(characterStats);
        } else if (eq.innerText.includes('Magic Sword')) {
            if (eqImgs[4].style.display === 'block' && eqImgs[5].style.display === 'none') {
                eqImgs[4].style.display = 'none'
                characterStats.artATT -= 10
                characterStats.maxAP -= 10
            } else if (eqImgs[5].style.display === 'block') {
                eqImgs[5].style.display = 'none'
                eqImgs[4].style.display = 'block'    
                characterStats.artATT += 10
                characterStats.maxAP += 10
                characterStats.ATT -= 10
                characterStats.maxLP -= 5
            } else if(eqImgs[4].style.display === 'none') {
                eqImgs[4].style.display = 'block'
                eqImgs[5].style.display = 'none'
                characterStats.artATT += 10
                characterStats.maxAP += 10
            }
        } else if (eq.innerText.includes('Strong Sword')) {
            if (eqImgs[5].style.display === 'block' && eqImgs[4].style.display === 'none') {
                eqImgs[5].style.display = 'none'
                characterStats.ATT -= 10
                characterStats.maxLP -= 5
            } else if (eqImgs[4].style.display === 'block') {
                eqImgs[4].style.display = 'none'
                eqImgs[5].style.display = 'block'    
                characterStats.artATT -= 10
                characterStats.maxAP -= 10
                characterStats.ATT += 10
                characterStats.maxLP += 5
            } else if(eqImgs[5].style.display === 'none') {
                eqImgs[5].style.display = 'block'
                eqImgs[4].style.display = 'none'
                characterStats.ATT += 10
                characterStats.maxLP += 5
            }
        } else if (eq.innerText.includes('Silver Boots')) {
            if (eqImgs[6].style.display === 'block' && eqImgs[7].style.display === 'none') {
                eqImgs[6].style.display = 'none'
                characterStats.ATT -= 4
                characterStats.DEF -= 4
            } else if (eqImgs[7].style.display === 'block') {
                eqImgs[7].style.display = 'none'
                eqImgs[6].style.display = 'block'    
                characterStats.ATT += 1
                characterStats.DEF += 4
                characterStats.maxLP -= 20
            } else if(eqImgs[6].style.display === 'none') {
                eqImgs[6].style.display = 'block'
                eqImgs[7].style.display = 'none'
                characterStats.ATT += 4
                characterStats.DEF += 4
            } console.log(characterStats);
        } else if (eq.innerText.includes('Regal Boots')) {
            if (eqImgs[7].style.display === 'block' && eqImgs[6].style.display === 'none') {
                eqImgs[7].style.display = 'none'
                characterStats.ATT -= 3
                characterStats.maxLP -= 20
            } else if (eqImgs[6].style.display === 'block') {
                eqImgs[6].style.display = 'none'
                eqImgs[7].style.display = 'block'    
                characterStats.ATT -= 1
                characterStats.DEF -= 4
                characterStats.maxLP += 20
            } else if(eqImgs[7].style.display === 'none') {
                eqImgs[7].style.display = 'block'
                eqImgs[6].style.display = 'none'
                characterStats.ATT += 3
                characterStats.maxLP += 20
            } console.log(characterStats); 
        } if (eq.value === 'back') {
            equipmentMenu.style.display = 'none'
            menu.style.display = 'block'    
        }
        statsValue[0].innerText = characterStats.maxLP
        statsValue[1].innerText = characterStats.maxAP
        statsValue[2].innerText = characterStats.ATT
        statsValue[3].innerText = characterStats.DEF
        statsValue[4].innerText = characterStats.artATT
        statsValue[5].innerText = characterStats.artDEF
        characterLP.innerHTML = `LP: ${characterStats.LP}/${characterStats.maxLP}`
        characterAP.innerHTML = `AP: ${characterStats.AP}/${characterStats.maxAP}`
    })
})


characterLP.innerHTML = `LP: ${characterStats.LP}/${characterStats.maxLP}`
characterAP.innerHTML = `AP: ${characterStats.AP}/${characterStats.maxAP}`

const enemy1Data = enemiesData.map(enemy => { // to make a deep copy of an array
    return {...enemy} // spread operator
})

const enemy2Data = enemiesData.map(enemy => { // to make a deep copy of an array
    return {...enemy} // spread operator
})


window.addEventListener('keydown', (event) => {
    if (movement === true) {
        if(event.keyCode === 39 && x < 800) {
            x += 10;
            character.style.left = (+ x + 'px');
            character.style.transform = 'none'
            console.log(character.style.left);         
            enemy()       
        } else if (event.keyCode === 37 && x > 0) {
            y = x -= 10
            character.style.left = (+ y + 'px');
            character.style.transform = 'scaleX(-1)'
            console.log(character.style.left);        
            enemy()        
        }
    }
})

let scenario = 1

const enemy = () => {
    let random = Math.floor(Math.random() * 4) + 1
    messageField.innerHTML = "You are under attack!"
    if (character.style.left == '30px' && scenario === 1) {
        enemy1Be = enemiesData[0].name 
        enemy2Be = enemiesData[0].name
        enemySpots = 1;
        prepareBattle()
    } else if (character.style.left == '80px' && random < 3 && scenario === 1) {
        if (random < 2) {
            enemy1Be = enemiesData[0].name
        } else {
            enemy1Be = enemiesData[1].name
        }
        enemy2Be = enemiesData[0].name
        enemySpots = 2;
        prepareBattle()
    } else if (character.style.left == '200px' && random < 3 && scenario === 1) {
        if (random < 3) {
            enemy1Be = enemiesData[2].name
        } else {
            enemy1Be = enemiesData[1].name
        }
        enemy2Be = enemiesData[0].name
        enemySpots = 3;
        prepareBattle()
    } else if (character.style.left == '350px' && random < 3 && scenario === 1) {
        if (random < 3) {
            enemy1Be = enemiesData[0].name
        } else {
            enemy1Be = enemiesData[2].name
        }
        enemy2Be = enemiesData[2].name
        enemySpots = 4;
        prepareBattle()
    } else if (character.style.left == '500px' && random < 3 && scenario === 1) {
        if (random < 2) {
            enemy1Be = enemiesData[1].name
        } else {
            enemy1Be = enemiesData[2].name
        } if (random < 2) {
            enemy2Be = enemiesData[3].name
        } else {
            enemy1Be = enemiesData[1].name
        }
        enemySpots = 5;
        prepareBattle()
    } else if (character.style.left == '600px' && random < 3 && scenario === 1) {
        if (random < 2) {
            enemy1Be = enemiesData[3].name
        } else {
            enemy1Be = enemiesData[2].name
        } if (random < 2) {
            enemy2Be = enemiesData[3].name
        } else {
            enemy1Be = enemiesData[1].name
        }
        enemySpots = 6;
        prepareBattle()
    } else if (character.style.left === '800px' && scenario === 1) {
        scenario = 2;
        field.style.backgroundImage = `url("./img/goblinForest.jpg")`
        goblinKing.style.display = 'block'
        character.style.left = '80px'
        x = 80;
        rightArrow.style.transform = 'scaleX(-1)'
        rightArrow.style.left = '-50px'
    } else if (character.style.left === '40px' && scenario === 2) {
        scenario = 1;
        field.style.backgroundImage = `url("./img/darkForestEntrance.jpg")`
        goblinKing.style.display = 'none'
        character.style.left = '760px'
        x = 760;
        rightArrow.style.transform = 'none'
        rightArrow.style.left = 'unset'
    } else if (character.style.left == '140px' && random < 3 && scenario === 2) {
        if (random < 2) {
            enemy1Be = enemiesData[5].name
        } else {
            enemy1Be = enemiesData[4].name
        }
        enemy2Be = enemiesData[4].name
        enemySpots = 7;
        prepareBattle()
    }
}      


const prepareBattle = () => {
    movement = false
    messageField.style.display = 'block'
    setTimeout(monsterRenderer, 4000);
    setTimeout(battle, 3000);
    mainMenu.style.display = 'none'
    character.style.transform = 'none'
    attackAnimation.style.display = 'block'
    rightArrow.style.display = 'none'
    goblinKing.style.display = 'none'
} 
const monsterRenderer = () => {
    if (enemy1Be === enemiesData[0].name) {
        enemy1.innerHTML += `<img src="${enemiesData[0].img}" alt="">`
        enemy1Data[0].LP = enemiesData[0].LP
        enemiesDataContainer[0].innerHTML = enemiesData[0].name
        enemy1LP.innerHTML = `${enemy1Data[0].LP}/${enemiesData[0].LP}`
        battleExperience += enemiesData[0].exp
        itemsChance += 2
    } if (enemy2Be === enemiesData[0].name) {
        enemy2.innerHTML = `<img src="${enemiesData[0].img}" alt="">`
        enemy2Data[0].LP = enemiesData[0].LP
        enemiesDataContainer[1].innerHTML = enemiesData[0].name
        enemy2LP.innerHTML = `${enemy2Data[0].LP}/${enemiesData[0].LP}`
        battleExperience += enemiesData[0].exp
        itemsChance += 2
    } if (enemy1Be === enemiesData[1].name) {
        enemy1.innerHTML += `<img src="${enemiesData[1].img}" alt="">`
        enemy1Data[1].LP = enemiesData[1].LP
        enemiesDataContainer[0].innerHTML = enemiesData[1].name
        enemy1LP.innerHTML = `${enemy1Data[1].LP}/${enemiesData[1].LP}`
        battleExperience += enemiesData[1].exp
        itemsChance += 4
    } if (enemy2Be === enemiesData[1].name) {
        enemy2.innerHTML = `<img src="${enemiesData[1].img}" alt="">`
        enemy2Data[1].LP = enemiesData[1].LP
        enemiesDataContainer[1].innerHTML = enemiesData[1].name
        enemy2LP.innerHTML = `${enemy2Data[1].LP}/${enemiesData[1].LP}`
        battleExperience += enemiesData[1].exp
        itemsChance += 4
    } if (enemy1Be === enemiesData[2].name) {
        enemy1.innerHTML += `<img src="${enemiesData[2].img}" alt="">`
        enemy1Data[2].LP = enemiesData[2].LP
        enemiesDataContainer[0].innerHTML = enemiesData[2].name
        enemy1LP.innerHTML = `${enemy1Data[2].LP}/${enemiesData[2].LP}`
        battleExperience += enemiesData[2].exp
        itemsChance += 5
    } if (enemy2Be === enemiesData[2].name) {
        enemy2.innerHTML = `<img src="${enemiesData[2].img}" alt="">`
        enemy2Data[2].LP = enemiesData[2].LP
        enemiesDataContainer[1].innerHTML = enemiesData[2].name
        enemy2LP.innerHTML = `${enemy2Data[2].LP}/${enemiesData[2].LP}`
        battleExperience += enemiesData[2].exp
        itemsChance += 5
    } if (enemy1Be === enemiesData[3].name) {
        enemy1.innerHTML += `<img src="${enemiesData[3].img}" alt="">`
        enemy1Data[3].LP = enemiesData[3].LP
        enemiesDataContainer[0].innerHTML = enemiesData[3].name
        enemy1LP.innerHTML = `${enemy1Data[3].LP}/${enemiesData[3].LP}`
        battleExperience += enemiesData[3].exp
        itemsChance += 7
    } if (enemy2Be === enemiesData[3].name) {
        enemy2.innerHTML = `<img src="${enemiesData[3].img}" alt="">`
        enemy2Data[3].LP = enemiesData[3].LP
        enemiesDataContainer[1].innerHTML = enemiesData[3].name
        enemy2LP.innerHTML = `${enemy2Data[3].LP}/${enemiesData[3].LP}`
        battleExperience += enemiesData[3].exp
        itemsChance += 7
    } if (enemy1Be === enemiesData[4].name) {
        enemy1.innerHTML += `<img src="${enemiesData[4].img}" alt="">`
        enemy1Data[4].LP = enemiesData[4].LP
        enemiesDataContainer[4].innerHTML = enemiesData[4].name
        enemy1LP.innerHTML = `${enemy1Data[3].LP}/${enemiesData[4].LP}`
        battleExperience += enemiesData[4].exp
        itemsChance += 8
    } if (enemy2Be === enemiesData[4].name) {
        enemy2.innerHTML = `<img src="${enemiesData[4].img}" alt="">`
        enemy2Data[4].LP = enemiesData[4].LP
        enemiesDataContainer[4].innerHTML = enemiesData[4].name
        enemy2LP.innerHTML = `${enemy2Data[4].LP}/${enemiesData[4].LP}`
        battleExperience += enemiesData[4].exp
        itemsChance += 8
    } if (enemy1Be === enemiesData[5].name) {
        enemy1.innerHTML += `<img src="${enemiesData[5].img}" alt="">`
        enemy1Data[5].LP = enemiesData[5].LP
        enemiesDataContainer[5].innerHTML = enemiesData[5].name
        enemy1LP.innerHTML = `${enemy1Data[5].LP}/${enemiesData[5].LP}`
        battleExperience += enemiesData[5].exp
        itemsChance += 9
    } if (enemy2Be === enemiesData[5].name) {
        enemy2.innerHTML = `<img src="${enemiesData[5].img}" alt="">`
        enemy2Data[5].LP = enemiesData[5].LP
        enemiesDataContainer[5].innerHTML = enemiesData[5].name
        enemy2LP.innerHTML = `${enemy2Data[5].LP}/${enemiesData[5].LP}`
        battleExperience += enemiesData[5].exp
        itemsChance += 9
    }
}

const battle = () => {
    messageField.style.display = 'none'
    field.style.backgroundImage = 'url("https://i.ytimg.com/vi/Iby6J0o3mKs/maxresdefault.jpg")'
    battleSection.style.display = 'flex'
    character.style.left = '20px'
}

const showAttackIcons = (action) => {
    if (clicked === false && turnIndicator.innerHTML === 'Your turn') {
        actionMenuIcons.forEach(icon => {icon.style.display = 'none'})

        if (action === 'attack') {
            actionMenuIcons[0].style.display = 'inline-block'
            actionMenuIcons[1].style.display = 'inline-block'
        } else if (action === 'items') {
            actionMenuIcons[2].style.display = 'inline-block'
            actionMenuIcons[3].style.display = 'inline-block'
        } else if (action === 'art') {
            actionMenuIcons[4].style.display = 'inline-block'
            actionMenuIcons[5].style.display = 'inline-block'
        }
    }
}

const showArtsIcons = (action) => {
    artsMenuIcons.forEach(icon => {icon.style.display = 'none'})

    if (action === 'koi') {
        artsMenuIcons[0].style.display = 'inline-block'
        artsMenuIcons[1].style.display = 'inline-block'
    } else if (action === 'ken') {
        artsMenuIcons[2].style.display = 'inline-block'
        artsMenuIcons[3].style.display = 'inline-block'
    } else if (action === 'kik') {
        artsMenuIcons[4].style.display = 'inline-block'
        artsMenuIcons[5].style.display = 'inline-block'
    }
}

actionMenuButtons[0].addEventListener('click', () => {
    showAttackIcons('attack')
    clicked = true
})

actionMenuButtons[1].addEventListener('click', () => {clicked = false})
actionMenuButtons[2].addEventListener('click', () => {clicked = false})
actionMenuButtons[3].addEventListener('click', () => {clicked = false})
artsMenuButtons[0].addEventListener('click', () => {showArtsIcons('koi')})
artsMenuButtons[1].addEventListener('click', () => {showArtsIcons('ken')})
artsMenuButtons[2].addEventListener('click', () => {showArtsIcons('kik')})
artsMenuButtons[3].addEventListener('click', () => {showArtsIcons('')})
battleSection.addEventListener('mouseout', () => {showAttackIcons('out')})
actionMenuButtons[0].addEventListener('mouseover', () => {showAttackIcons('attack')})
actionMenuButtons[1].addEventListener('mouseover', () => {showAttackIcons('items')})
actionMenuButtons[2].addEventListener('mouseover', () => {showAttackIcons('art')})

attack.addEventListener('click', () => {
    if(turnIndicator.innerHTML === 'Your turn') {
        currentAction = 'attack'
        action = true;
    }
})

arts.addEventListener('click', () => {
    if(turnIndicator.innerHTML === 'Your turn') {
        actionMenu.style.display = 'none'
        itemsMenu.style.display = 'none'
        artsMenu.style.display = 'block'
    }
})

items.addEventListener('click', () => {
    if(turnIndicator.innerHTML === 'Your turn') {
        actionMenu.style.display = 'none'
        artsMenu.style.display = 'none'
        itemsMenu.style.display = 'block'
    }
})

flee.addEventListener('click', () => {
    if (turnIndicator.innerHTML === 'Your turn') {
        let random = Math.floor(Math.random() * 3) + 1
        if (random < 2) {
            enemy1.innerHTML = ''
            enemy2.innerHTML = ''
            checkWin()
        } else {
            turnIndicator.innerHTML = 'Enemy turn'
            currentAction = 'enemyTurn'
            setTimeout(enemy1Turn, 3000);
            messageField.style.display = 'block'
            messageField.innerHTML = "You failed <br> to escape"
        }
    }
})


artsMenuButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (characterStats.AP >= 3) {
        currentArt = button.innerText
        console.log(button.innerText);
        currentAction = 'art'
        action = true;
        }
    })
})

goBack.forEach(button => {
    button.addEventListener('click', () => {
        actionMenu.style.display = 'block'
        artsMenu.style.display = 'none'
        itemsMenu.style.display = 'none'
        action = false
    })
})


const animation = whichEnemy => {
    if (whichEnemy === '1') {
        attackAnimation.style.left = '400px'
        attackAnimation.style.bottom = '0'
        attackAnimation.style.display = 'block'
        if (currentAction === 'attack') {
            attackAnimation.innerHTML = characterAttackEffect
        } else {
            if (currentArt === 'Koi') {
                attackAnimation.innerHTML = koi
            } else if (currentArt === 'Ken') {
                attackAnimation.innerHTML = ken
            } else if (currentArt === 'Kik') {
                attackAnimation.innerHTML = kik
            }
        }
    } else if (whichEnemy === '2') {
        attackAnimation.innerHTML = characterAttackEffect
        attackAnimation.style.left = '200px'
        attackAnimation.style.bottom = '80px'
        attackAnimation.style.display = 'block'
        if (currentAction === 'attack') {
            attackAnimation.innerHTML = characterAttackEffect
        } else {
            if (currentArt === 'Koi') {
                attackAnimation.innerHTML = koi
            }
        }
    } else if (currentAction === 'enemyTurn') {
        attackAnimation.style.left = '0'
        attackAnimation.style.bottom = '0'
        attackAnimation.style.display = 'block'
    }
    setTimeout(stopAnimationSlash, 1000);
}

const stopAnimationSlash = () => {
    attackAnimation.style.display = 'none'
    setTimeout(stopAnimationDamage, 1000);
}

const stopAnimationDamage = () => {
    damageAnimation.innerHTML = ''
}


enemy1.addEventListener('click', () => {
    if (action === true) {
        let damage;
        let randomDamage = Math.floor(Math.random() * 5)
        animation('1')

        if (enemy1Be === enemiesData[0].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[0].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy1LP.innerHTML = `${enemy1Data[0].LP -= damage}/${enemiesData[0].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Koi') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[0].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[0].LP -= damage}/${enemiesData[0].LP}`        
                } else if (currentArt === 'Ken' || currentArt === 'Kik') {
                    damage = characterStats.artATT - enemiesData[0].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[0].LP -= damage}/${enemiesData[0].LP}`        
                };
            } action = false
        } else if (enemy1Be === enemiesData[1].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[1].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy1LP.innerHTML = `${enemy1Data[1].LP -= damage}/${enemiesData[1].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Kik') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[1].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[1].LP -= damage}/${enemiesData[1].LP}`        
                } else if (currentArt === 'Ken' || currentArt === 'Koi') {
                    damage = characterStats.artATT - enemiesData[1].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[1].LP -= damage}/${enemiesData[1].LP}`        
                };
            } action = false
        } else if (enemy1Be === enemiesData[2].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[2].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy1LP.innerHTML = `${enemy1Data[2].LP -= damage}/${enemiesData[2].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Ken' || currentArt === 'Koi') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[2].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[2].LP -= damage}/${enemiesData[2].LP}`        
                } else if (currentArt === 'Kik') {
                    damage = characterStats.artATT - enemiesData[2].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[2].LP -= damage}/${enemiesData[2].LP}`        
                };
            } action = false
        } else if (enemy1Be === enemiesData[3].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[3].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy1LP.innerHTML = `${enemy1Data[3].LP -= damage}/${enemiesData[3].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Ken') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[3].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[3].LP -= damage}/${enemiesData[3].LP}`        
                } else if (currentArt === 'Kik' || currentArt === 'Koi') {
                    damage = characterStats.artATT - enemiesData[3].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[3].LP -= damage}/${enemiesData[3].LP}`        
                };
            } action = false
        } else if (enemy1Be === enemiesData[4].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[4].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy1LP.innerHTML = `${enemy1Data[4].LP -= damage}/${enemiesData[4].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Koi') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[4].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[4].LP -= damage}/${enemiesData[4].LP}`        
                } else if (currentArt === 'Kik' || currentArt === 'Ken') {
                    damage = characterStats.artATT - enemiesData[4].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[4].LP -= damage}/${enemiesData[4].LP}`        
                };
            } action = false
        } else if (enemy1Be === enemiesData[5].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[5].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy1LP.innerHTML = `${enemy1Data[5].LP -= damage}/${enemiesData[4].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Kik') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[5].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[5].LP -= damage}/${enemiesData[5].LP}`        
                } else if (currentArt === 'Ken' || currentArt === 'Koi') {
                    damage = characterStats.artATT - enemiesData[5].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[5].LP -= damage}/${enemiesData[5].LP}`        
                };
            } action = false
        }

        damageAnimation.style.left = '400px'
        damageAnimation.style.bottom = '50px'
        damageAnimation.innerHTML = `<h2>-${damage}</h2>`
        turnIndicator.innerHTML = 'Enemy turn'
        KO()
        setTimeout(enemy1Turn, 3000);
        currentAction = 'enemyTurn'
        actionMenu.style.display = 'block'
        artsMenu.style.display = 'none'
        actionMenuIcons.forEach(icon => {icon.style.display = 'none'})
        artsMenuIcons.forEach(icon => {icon.style.display = 'none'})
        clicked = false
    }
})

enemy2.addEventListener('click', () => {
    if (action === true) {
        let damage;
        let randomDamage = Math.floor(Math.random() * 5)
        animation('2')

        if (enemy2Be === enemiesData[0].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[0].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy2LP.innerHTML = `${enemy2Data[0].LP -= damage}/${enemiesData[0].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                    if (currentArt === 'Koi') {
                        damage = characterStats.artATT * 2 + randomDamage - enemiesData[0].artDEF
                        if (damage < 0 ) { damage = 0}
                        enemy2LP.innerHTML = `${enemy2Data[0].LP -= damage}/${enemiesData[0].LP}`        
                    } else if (currentArt === 'Ken' || currentArt === 'Kik') {
                        damage = characterStats.artATT - enemiesData[0].artDEF + randomDamage
                        if (damage < 0 ) { damage = 0}
                        enemy2LP.innerHTML = `${enemy2Data[0].LP -= damage}/${enemiesData[0].LP}`        
                    }
                } action = false
        } else if (enemy2Be === enemiesData[1].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[1].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy2LP.innerHTML = `${enemy2Data[1].LP -= damage}/${enemiesData[1].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Kik') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[1].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy2LP.innerHTML = `${enemy2Data[1].LP -= damage}/${enemiesData[1].LP}`        
                } else if (currentArt === 'Ken' || currentArt === 'Koi') {
                    damage = characterStats.artATT - enemiesData[1].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy2LP.innerHTML = `${enemy2Data[1].LP -= damage}/${enemiesData[1].LP}`        
                }
            } action = false
        } else if (enemy2Be === enemiesData[2].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[2].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy2LP.innerHTML = `${enemy2Data[2].LP -= damage}/${enemiesData[2].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Ken' || currentArt === 'Koi') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[2].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy2LP.innerHTML = `${enemy2Data[2].LP -= damage}/${enemiesData[2].LP}`        
                } else if (currentArt === 'Kik') {
                    damage = characterStats.artATT - enemiesData[2].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy2LP.innerHTML = `${enemy2Data[2].LP -= damage}/${enemiesData[2].LP}`        
                }
            } action = false
        } else if (enemy2Be === enemiesData[3].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[3].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy2LP.innerHTML = `${enemy2Data[3].LP -= damage}/${enemiesData[3].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Ken') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[3].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy2LP.innerHTML = `${enemy2Data[3].LP -= damage}/${enemiesData[3].LP}`        
                } else if (currentArt === 'Kik' || currentArt === 'Koi') {
                    damage = characterStats.artATT - enemiesData[3].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy2LP.innerHTML = `${enemy2Data[3].LP -= damage}/${enemiesData[3].LP}`        
                }
            } action = false
        } else if (enemy2Be === enemiesData[4].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[4].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy2LP.innerHTML = `${enemy2Data[4].LP -= damage}/${enemiesData[4].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Koi') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[4].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy2LP.innerHTML = `${enemy2Data[4].LP -= damage}/${enemiesData[4].LP}`        
                } else if (currentArt === 'Kik' || currentArt === 'Ken') {
                    damage = characterStats.artATT - enemiesData[4].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy2LP.innerHTML = `${enemy2Data[4].LP -= damage}/${enemiesData[4].LP}`        
                }
            } action = false
        } else if (enemy2Be === enemiesData[5].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[5].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy2LP.innerHTML = `${enemy2Data[5].LP -= damage}/${enemiesData[5].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Kik') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[5].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy2LP.innerHTML = `${enemy2Data[5].LP -= damage}/${enemiesData[5].LP}`        
                } else if (currentArt === 'Koi' || currentArt === 'Ken') {
                    damage = characterStats.artATT - enemiesData[5].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy2LP.innerHTML = `${enemy2Data[5].LP -= damage}/${enemiesData[5].LP}`        
                }
            } action = false
        }

        damageAnimation.style.left = '200px'
        damageAnimation.style.bottom = '100px'
        damageAnimation.innerHTML = `<h2>-${damage}</h2>`
        turnIndicator.innerHTML = 'Enemy turn'
        setTimeout(enemy1Turn, 3000);
        currentAction = 'enemyTurn'
        actionMenu.style.display = 'block'
        artsMenu.style.display = 'none'    
        KO()
        actionMenuIcons.forEach(icon => {icon.style.display = 'none'})
        artsMenuIcons.forEach(icon => {icon.style.display = 'none'})
        clicked = false
    }
})

const enemy1Turn = () => {
    if (enemy1Be !== '') {
        let damage;
        let randomDamage = Math.floor(Math.random() * 5)
        damageAnimation.style.left = '0'
        damageAnimation.style.bottom = '0'

        if(enemy1Be === enemiesData[0].name) {
            damage = enemiesData[0].ATT - characterStats.DEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = bloodyAttack
            animation()
        } else if(enemy1Be === enemiesData[1].name) {
            damage = enemiesData[1].ATT - characterStats.DEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = plantVenom
            animation()
        } else if(enemy1Be === enemiesData[2].name) {
            damage = enemiesData[2].artATT - characterStats.artDEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = sonicAttack
            animation()
        } else if(enemy1Be === enemiesData[3].name) {
            if (randomDamage < 3) {
                damage = enemiesData[3].ATT - characterStats.DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                attackAnimation.innerHTML = crushAttack
                animation()
            } else {
                damage = enemiesData[2].artATT - characterStats.artDEF + randomDamage
                if (damage < 0 ) { damage = 0}
                attackAnimation.innerHTML = negativeAura
                animation()
            }
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP ${characterStats.LP -= damage}/${characterStats.maxLP}`
        } else if(enemy1Be === enemiesData[4].name) {
            damage = enemiesData[4].ATT - characterStats.DEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = sonicAttack
            animation()
        } else if(enemy1Be === enemiesData[5].name) {
            damage = enemiesData[5].ATT - characterStats.DEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = sonicAttack
            animation()
        }
        
        messageField.style.display = 'none'
        setTimeout(enemy2Turn, 3000);
    } else {
        enemy2Turn()
    }
}

const enemy2Turn = () => {
    if (enemy2Be !== '') {
        let damage;
        let randomDamage = Math.floor(Math.random() * 5)
        damageAnimation.style.left = '0'
        damageAnimation.style.bottom = '0'
        messageField.style.display = 'none'

        if(enemy2Be === enemiesData[0].name) {
            damage = enemiesData[0].ATT - characterStats.DEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML =  `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = bloodyAttack
            animation()
        } else if(enemy2Be === enemiesData[1].name) {
            damage = enemiesData[1].ATT - characterStats.DEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML =  `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = plantVenom
            animation()
        } else if(enemy2Be === enemiesData[2].name) {
            damage = enemiesData[2].artATT - characterStats.artDEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML =  `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = sonicAttack
            animation()
        } else if(enemy2Be === enemiesData[3].name) {
            if (randomDamage < 3) {
                damage = enemiesData[3].ATT - characterStats.DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                attackAnimation.innerHTML = crushAttack
                animation()
            } else {
                damage = enemiesData[2].artATT - characterStats.artDEF + randomDamage
                if (damage < 0 ) { damage = 0}
                attackAnimation.innerHTML = negativeAura
                animation()
            }
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
        } else if(enemy2Be === enemiesData[4].name) {
            damage = enemiesData[4].ATT - characterStats.DEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML =  `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = plantVenom
            animation()
        } else if(enemy2Be === enemiesData[5].name) {
            damage = enemiesData[5].ATT - characterStats.DEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML =  `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = plantVenom
            animation()
        }
    } turnIndicator.innerHTML = 'Your turn'
}

const KO = () => {
    if ((enemy1LP.innerHTML.includes('-') || enemy1LP.innerHTML.charAt(0) === '0') && enemy1.innerHTML !== '') {
        enemy1.innerHTML = ''
        enemy1Be = ''
        enemy1LP.innerHTML = ''
        enemiesDataContainer[0].innerHTML = ''
    } else if ((enemy2LP.innerHTML.includes('-') ||  enemy2LP.innerHTML.charAt(0) === '0') && enemy2.innerHTML !== '') {
        enemy2.innerHTML = ''
        enemy2Be = ''
        enemy2LP.innerHTML = ''
        enemiesDataContainer[1].innerHTML = ''
    }
    setTimeout(expAndItems, 3000)
}

const expAndItems = () => {
    if (enemy1Be === '' && enemy2Be === '') {
        gainExperience()
        gainItems()
        checkWin()
    }
}

const gainExperience = () => {
    totalExperience += battleExperience
    totEXP.innerText = totalExperience
}


const gainItems = () => {
    let random = Math.floor(Math.random() * 5)
    console.log(random);
    if (itemsChance < 5 && random > 1) {
        itemsBag[0].quantity ++
        battleItems = 'LP potion'
        if (itemsChance < 5 && random >= 3) {
            itemsBag[1].quantity ++
            battleItems = 'LP potion && AP potion'
    }} else if (itemsChance < 9 && random > 1) {
        itemsBag[0].quantity ++
        battleItems = 'LP potion'
        if (itemsChance < 9 && random >= 3) {
            ownEq.push('Silver Armor')
            battleItems = 'LP potion'
            battleEq = 'Silver Armor'
    }} else if (itemsChance < 11 && random > 1) {
        itemsBag[1].quantity += 2
        battleItems = '2 AP potion'
        ownEq.push('Silver Boots')
        battleEq = 'Silver Boots'
        if (itemsChance < 11 && random >= 4) {
            ownEq.push('Regal Boots')
            battleEq = 'Regal Boots && Silver Boots'
    }} else if (itemsChance < 14 && random > 1) {
        itemsBag[0].quantity ++
        itemsBag[0].quantity ++
        battleItems = 'AP potion && LP potion'
        if (itemsChance < 14 && random >= 4) {
            ownEq.push('Magic Sword')
            battleEq = 'Magic Sword'
    }} else if (itemsChance === 14) {
        ownEq.push('Strong Sword')
        battleEq = 'Strong Sword'
    } else if (itemsChance < 16 && random > 1) {
        itemsBag[0].quantity ++
        itemsBag[1].quantity ++
        battleItems = 'LP potion && AP potion'
        if (itemsChance <= 18 && random >= 3) {
            ownEq.push('Silver Elmet')
            battleEq = 'Silver Elmet'
    }}
    
    itemRenderer()
    getEq()
    itemsChance = 0;
}
const itemRenderer = () => {
    if (itemsBag[0].quantity > 0) {
        slot1.forEach(slot => slot.innerHTML = `${itemsBag[0].item} : ${itemsBag[0].quantity}`)
    } else {
        slot1.forEach(slot => slot.innerHTML = `empty`)
    } if (itemsBag[1].quantity > 0) {
        slot2.forEach(slot => slot.innerHTML = `${itemsBag[1].item} : ${itemsBag[1].quantity}`)
    } else {
        slot2.forEach(slot => slot.innerHTML = `empty`)
    } 
}

itemsMenuContent.forEach((item) => {
    item.addEventListener('click', () => {
        currentItem = item.innerHTML
        itemAction()
    })
})


const itemAction = () => {
    if (currentItem.includes('LP potion')) {
        characterStats.LP = characterStats.maxLP
        characterLP.innerHTML =  `${characterStats.LP}/${characterStats.maxLP}`
        itemsBag[0].quantity --
        setTimeout(enemy1Turn, 2000);
        currentAction = 'enemyTurn'
        turnIndicator.innerHTML = 'Enemy turn'
        actionMenu.style.display = 'block'
        itemsMenu.style.display = 'none'
        itemRenderer()    
    } else if (currentItem.includes('AP potion')) {
        characterStats.AP = characterStats.maxAP
        characterAP.innerHTML =  `AP: ${characterStats.AP}/${characterStats.maxAP}`
        itemsBag[1].quantity --
        setTimeout(enemy1Turn, 2000);
        currentAction = 'enemyTurn'
        turnIndicator.innerHTML = 'Enemy turn'
        actionMenu.style.display = 'block'
        itemsMenu.style.display = 'none'
        itemRenderer()    
    }
}


const checkWin = () => {
    if (enemy1Be === '' && enemy2Be === '') {
        field.style.backgroundImage = "url('./img/depositphotos_213264340-stock-illustration-frame-with-celtic-ornament.jpg')"
        winMessage.style.display = 'block'
        winMessage.innerHTML = `You Won <br> gained experience ${battleExperience} <br> Gained items: ${battleItems} <br> Gained equip: ${battleEq}` 
        battleSection.style.display = 'none'
        continuee.style.display = 'block'
        battleExperience = 0
        battleItems = ''
        attackAnimation.style.display = 'none'
    } else {
        field.style.backgroundImage = "url('./img/depositphotos_213264340-stock-illustration-frame-with-celtic-ornament.jpg')"
        winMessage.style.display = 'block'
        winMessage.innerHTML = `You were able to escaped, <br> but you gained nothing` 
        battleSection.style.display = 'none'
        continuee.style.display = 'block'
        battleExperience = 0
        attackAnimation.style.display = 'none'
    }
}

continuee.onclick = () => {
    field.style.backgroundImage = 'url("https://cdna.artstation.com/p/assets/images/images/000/199/218/large/magdalena-mudlaff-matte-painting-environment-fantasy-forest-concept.jpg?1410275846")'
    continuee.style.display = 'none'
    winMessage.style.display = 'none'
    movement = true
    mainMenu.style.display = 'block'
    if (enemySpots === 1) {
        character.style.left = '30px'
    } else if (enemySpots === 2) {
        character.style.left = '80px'
    } else if (enemySpots === 3) {
        character.style.left = '200px'
    } else if (enemySpots === 4) {
        character.style.left = '350px'
    } else if (enemySpots === 5) {
        character.style.left = '500px'
    } else if (enemySpots === 6) {
        character.style.left = '600px'
    }
}




