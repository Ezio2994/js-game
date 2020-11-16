import enemiesData from './dataBase.js'
import {itemsBag} from './dataBase.js'

const mute = document.querySelector('#mute')
const audio = document.querySelector('audio')
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
const restart = document.querySelector('#restart')
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
const blueFlames = `<img src="./img/blueFlames.gif">`
const bomb = `<img src="./img/bomb.gif">`
const confusion = `<img src="./img/confusion.gif">`
const electroShock = `<img src="./img/electroShock.gif">`
const energicBomb = `<img src="./img/energicBomb.gif">`
const fire = `<img src="./img/fire.gif">`

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
let whichEnemy = 1
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

audio.muted = true
mute.onclick = () => {
    if (audio.muted === true) {
        audio.muted = false
        audio.play()
        mute.innerHTML = '<i class="fas fa-volume-up"></i>'
    } else {
        audio.muted = true
        audio.pause()
        mute.innerHTML = '<i class="fas fa-volume-mute"></i>'
    }
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
        menu.style.display = 'block'
        mainMenu.style.display = 'none'
        movement = false
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
        } else if (menuButton[4]) {
            menu.style.display = 'none'
            train.style.display = 'none'
            useItems.style.display = 'none'
            equipmentMenu.style.display = 'none'
            mainMenu.style.display = 'inline-block'
            movement = true    
        }
    }
})

const updateMenu = () => {
    useItemsStats[0].innerText = `LP: ${characterStats.LP}/${characterStats.maxLP}`
    useItemsStats[1].innerText = `AP: ${characterStats.AP}/${characterStats.maxAP}` 
    characterLP.innerHTML = `LP: ${characterStats.LP}/${characterStats.maxLP}`
    characterAP.innerHTML = `AP: ${characterStats.AP}/${characterStats.maxAP}`
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
            characterLP.innerHTML = characterStats.maxLP
        } else if (button.value === 'AP' && totalExperience >= 5) {
            characterStats.maxAP ++
            totalExperience -= 5;
            statsValue[1].innerText = characterStats.maxAP
            characterAP.innerHTML = characterStats.maxAP
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
            }
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
            }
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
            } 
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

const enemy1Data = enemiesData.map(enemy => { 
    return {...enemy} 
})

const enemy2Data = enemiesData.map(enemy => {
    return {...enemy} 
})

const moveLeft = document.querySelector('#arrowLeft')
const moveRight = document.querySelector('#arrowRight')

moveLeft.addEventListener('touchmove', () => {
    if (movement === true) {
        if (x > 0) {
            y = x -= 10
            character.style.left = (+ y + 'px');
            character.style.transform = 'scaleX(-1)'
            enemy()        
        }
    }
})

moveRight.addEventListener('touchmove', () => {
    console.log('ciao');
    if (movement === true) {
        if(x < 800) {
            x += 10;
            character.style.left = (+ x + 'px');
            character.style.transform = 'none'
            // enemy()       
        }
    }
})

window.addEventListener('keydown', (event) => {
    if (movement === true) {
        if(event.keyCode === 39 && x < 800) {
            x += 10;
            character.style.left = (+ x + 'px');
            character.style.transform = 'none'
            enemy()       
        } else if (event.keyCode === 37 && x > 0) {
            y = x -= 10
            character.style.left = (+ y + 'px');
            character.style.transform = 'scaleX(-1)'
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
        if (random < 2) {
            enemy1Be = enemiesData[2].name
        } else {
            enemy1Be = enemiesData[1].name
        }
        enemy2Be = enemiesData[0].name
        enemySpots = 3;
        prepareBattle()
    } else if (character.style.left == '350px' && random < 3 && scenario === 1) {
        if (random < 2) {
            enemy1Be = enemiesData[2].name
        } else {
            enemy1Be = enemiesData[1].name
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
            enemy2Be = enemiesData[2].name
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
            enemy2Be = enemiesData[1].name
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
    } else if (character.style.left == '260px' && random < 3 && scenario === 2) {
        if (random < 2) {
            enemy1Be = enemiesData[4].name
        } else {
            enemy1Be = enemiesData[5].name
        }
        enemy2Be = enemiesData[5].name
        enemySpots = 8;
        prepareBattle()
    } else if (character.style.left == '350px' && random < 3 && scenario === 2) {
        if (random < 2) {
            enemy1Be = enemiesData[5].name
        } else {
            enemy1Be = enemiesData[6].name
        }
        enemy2Be = enemiesData[4].name
        enemySpots = 9;
        prepareBattle()
    } else if (character.style.left == '400px' && random < 3 && scenario === 2) {
        if (random < 2) {
            enemy1Be = enemiesData[6].name
        } else {
            enemy1Be = enemiesData[5].name
        }
        enemy2Be = enemiesData[5].name
        enemySpots = 10;
        prepareBattle()
    } else if (character.style.left == '520px' && random < 3 && scenario === 2) {
        if (random < 2) {
            enemy1Be = enemiesData[7].name
        } else {
            enemy1Be = enemiesData[6].name
        }
        enemy2Be = enemiesData[6].name
        enemySpots = 11;
        prepareBattle()
    } else if (character.style.left == '600px' && random < 3 && scenario === 2) {
        if (random < 2) {
            enemy1Be = enemiesData[7].name
        } else {
            enemy1Be = enemiesData[6].name
        }
        enemy2Be = enemiesData[7].name
        enemySpots = 12;
        prepareBattle()
    } else if (character.style.left == '680px' && scenario === 2) {
        enemy1Be = enemiesData[8].name
        enemySpots = 13;
        prepareBattle()
    }
}      

const prepareBattle = () => {
    movement = false
    messageField.style.display = 'inline-block'
    setTimeout(monsterRenderer, 3000);
    setTimeout(battle, 3000);
    mainMenu.style.display = 'none'
    character.style.transform = 'none'
    rightArrow.style.display = 'none'
    goblinKing.style.display = 'none'
    turnIndicator.innerHTML = 'Your turn'
} 

const monsterRenderer = () => {
    if (enemy1Be === enemiesData[0].name) {
        enemy1.innerHTML = `<img src="${enemiesData[0].img}" alt="">`
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
        enemy1.innerHTML = `<img src="${enemiesData[1].img}" alt="">`
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
        enemy1.innerHTML = `<img src="${enemiesData[2].img}" alt="">`
        enemy1Data[2].LP = enemiesData[2].LP
        enemiesDataContainer[0].innerHTML = enemiesData[2].name
        enemy1LP.innerHTML = `${enemy1Data[2].LP}/${enemiesData[2].LP}`
        battleExperience += enemiesData[2].exp
        itemsChance += 6
    } if (enemy2Be === enemiesData[2].name) {
        enemy2.innerHTML = `<img src="${enemiesData[2].img}" alt="">`
        enemy2Data[2].LP = enemiesData[2].LP
        enemiesDataContainer[1].innerHTML = enemiesData[2].name
        enemy2LP.innerHTML = `${enemy2Data[2].LP}/${enemiesData[2].LP}`
        battleExperience += enemiesData[2].exp
        itemsChance += 6
    } if (enemy1Be === enemiesData[3].name) {
        enemy1.innerHTML = `<img src="${enemiesData[3].img}" alt="">`
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
        enemy1.innerHTML = `<img src="${enemiesData[4].img}" alt="">`
        enemy1Data[4].LP = enemiesData[4].LP
        enemiesDataContainer[0].innerHTML = enemiesData[4].name
        enemy1LP.innerHTML = `${enemy1Data[4].LP}/${enemiesData[4].LP}`
        battleExperience += enemiesData[4].exp
        itemsChance += 8
    } if (enemy2Be === enemiesData[4].name) {
        enemy2.innerHTML = `<img src="${enemiesData[4].img}" alt="">`
        enemy2Data[4].LP = enemiesData[4].LP
        enemiesDataContainer[1].innerHTML = enemiesData[4].name
        enemy2LP.innerHTML = `${enemy2Data[4].LP}/${enemiesData[4].LP}`
        battleExperience += enemiesData[4].exp
        itemsChance += 8
    } if (enemy1Be === enemiesData[5].name) {
        enemy1.innerHTML = `<img src="${enemiesData[5].img}" alt="">`
        enemy1Data[5].LP = enemiesData[5].LP
        enemiesDataContainer[0].innerHTML = enemiesData[5].name
        enemy1LP.innerHTML = `${enemy1Data[5].LP}/${enemiesData[5].LP}`
        battleExperience += enemiesData[5].exp
        itemsChance += 9
    } if (enemy2Be === enemiesData[5].name) {
        enemy2.innerHTML = `<img src="${enemiesData[5].img}" alt="">`
        enemy2Data[5].LP = enemiesData[5].LP
        enemiesDataContainer[1].innerHTML = enemiesData[5].name
        enemy2LP.innerHTML = `${enemy2Data[5].LP}/${enemiesData[5].LP}`
        battleExperience += enemiesData[5].exp
        itemsChance += 9
    } if (enemy1Be === enemiesData[6].name) {
        enemy1.innerHTML = `<img src="${enemiesData[6].img}" alt="">`
        enemy1Data[6].LP = enemiesData[6].LP
        enemiesDataContainer[0].innerHTML = enemiesData[6].name
        enemy1LP.innerHTML = `${enemy1Data[6].LP}/${enemiesData[6].LP}`
        battleExperience += enemiesData[6].exp
        itemsChance += 10
    } if (enemy2Be === enemiesData[6].name) {
        enemy2.innerHTML = `<img src="${enemiesData[6].img}" alt="">`
        enemy2Data[6].LP = enemiesData[6].LP
        enemiesDataContainer[1].innerHTML = enemiesData[6].name
        enemy2LP.innerHTML = `${enemy2Data[6].LP}/${enemiesData[6].LP}`
        battleExperience += enemiesData[6].exp
        itemsChance += 10
    } if (enemy1Be === enemiesData[7].name) {
        enemy1.innerHTML = `<img src="${enemiesData[7].img}" alt="">`
        enemy1Data[7].LP = enemiesData[7].LP
        enemiesDataContainer[0].innerHTML = enemiesData[7].name
        enemy1LP.innerHTML = `${enemy1Data[7].LP}/${enemiesData[7].LP}`
        battleExperience += enemiesData[7].exp
        itemsChance += 11
    } if (enemy2Be === enemiesData[7].name) {
        enemy2.innerHTML = `<img src="${enemiesData[7].img}" alt="">`
        enemy2Data[7].LP = enemiesData[7].LP
        enemiesDataContainer[1].innerHTML = enemiesData[7].name
        enemy2LP.innerHTML = `${enemy2Data[7].LP}/${enemiesData[7].LP}`
        battleExperience += enemiesData[7].exp
        itemsChance += 11
    } if (enemy1Be === enemiesData[8].name) {
        enemy1.style.backgroundImage = 'url("./img/goblinKing.gif")'
        enemy1Data[8].LP = enemiesData[8].LP
        enemiesDataContainer[0].innerHTML = enemiesData[8].name
        enemy1LP.innerHTML = `${enemy1Data[8].LP}/${enemiesData[8].LP}`
        battleExperience += enemiesData[8].exp
    }
    enemy1.style.display = 'block'
    enemy2.style.display = 'block'
}

const battle = () => {
    if (scenario === 1) {
        field.style.backgroundImage = 'url("./img/redForestBattle.jpg")'
    } else {
        field.style.backgroundImage = 'url("./img/darkForestBattle.jpg")'
    }
    messageField.style.display = 'none'
    battleSection.style.display = 'flex'
    character.style.left = '20px'
    messageField.innerHTML = "You failed <br> to escape"
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
    if (turnIndicator.innerHTML === 'Your turn') {
        showAttackIcons('attack')
        clicked = true
    }
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
        let random = Math.floor(Math.random() * 4) + 1
        if (random <= 3) {
            enemy1.innerHTML = ''
            enemy2.innerHTML = ''
            checkWin()
        } else {
            messageField.style.margin = '50px 260px'
            messageField.innerHTML = "You failed <br> to escape"
            turnIndicator.innerHTML = 'Enemy turn'
            currentAction = 'enemyTurn'
            whichEnemy = 1
            damageAnimation.style.display = 'block'
            setTimeout(enemy1Turn, 3000);
            messageField.style.display = 'inline-block'
        }
    }
})


artsMenuButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (characterStats.AP >= 3) {
        currentArt = button.innerText
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
            } else if (currentArt === 'Ken') {
                attackAnimation.innerHTML = ken
            } else if (currentArt === 'Kik') {
                attackAnimation.innerHTML = kik
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
                enemy1LP.innerHTML = `${enemy1Data[5].LP -= damage}/${enemiesData[5].LP}`
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
        } else if (enemy1Be === enemiesData[6].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[6].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy1LP.innerHTML = `${enemy1Data[6].LP -= damage}/${enemiesData[6].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Koi') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[6].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[6].LP -= damage}/${enemiesData[6].LP}`        
                } else if (currentArt === 'Ken' || currentArt === 'Kik') {
                    damage = characterStats.artATT - enemiesData[6].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[6].LP -= damage}/${enemiesData[6].LP}`        
                };
            } action = false
        } else if (enemy1Be === enemiesData[7].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[7].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy1LP.innerHTML = `${enemy1Data[7].LP -= damage}/${enemiesData[7].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Koi') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[7].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[7].LP -= damage}/${enemiesData[7].LP}`        
                } else if (currentArt === 'Kik' || currentArt === 'Ken') {
                    damage = characterStats.artATT - enemiesData[7].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[7].LP -= damage}/${enemiesData[7].LP}`        
                };
            } action = false
        }  else if (enemy1Be === enemiesData[8].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[8].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy1LP.innerHTML = `${enemy1Data[8].LP -= damage}/${enemiesData[8].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Ken') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[8].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[8].LP -= damage}/${enemiesData[8].LP}`        
                } else if (currentArt === 'Kik' || currentArt === 'Koi') {
                    damage = characterStats.artATT - enemiesData[8].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy1LP.innerHTML = `${enemy1Data[8].LP -= damage}/${enemiesData[8].LP}`        
                };
            } action = false
        }
        damageAnimation.style.display = 'block'
        damageAnimation.style.left = '400px'
        damageAnimation.style.bottom = '50px'
        damageAnimation.innerHTML = `<h2>-${damage}</h2>`
        whichEnemy = 1
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
        } else if (enemy2Be === enemiesData[6].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[6].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy2LP.innerHTML = `${enemy2Data[6].LP -= damage}/${enemiesData[6].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Koi') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[6].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy2LP.innerHTML = `${enemy2Data[6].LP -= damage}/${enemiesData[6].LP}`        
                } else if (currentArt === 'Kik' || currentArt === 'Ken') {
                    damage = characterStats.artATT - enemiesData[6].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy2LP.innerHTML = `${enemy2Data[6].LP -= damage}/${enemiesData[6].LP}`        
                }
            } action = false
        } else if (enemy2Be === enemiesData[7].name) {
            if (currentAction === 'attack') {
                damage = characterStats.ATT - enemiesData[7].DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                enemy2LP.innerHTML = `${enemy2Data[7].LP -= damage}/${enemiesData[7].LP}`
            } else if (currentAction === 'art') {
                characterAP.innerHTML = `AP: ${characterStats.AP -= 3}/${characterStats.maxAP}`
                if (currentArt === 'Ken') {
                    damage = characterStats.artATT * 2 + randomDamage - enemiesData[7].artDEF
                    if (damage < 0 ) { damage = 0}
                    enemy2LP.innerHTML = `${enemy2Data[7].LP -= damage}/${enemiesData[7].LP}`        
                } else if (currentArt === 'Koi' || currentArt === 'Kik') {
                    damage = characterStats.artATT - enemiesData[7].artDEF + randomDamage
                    if (damage < 0 ) { damage = 0}
                    enemy2LP.innerHTML = `${enemy2Data[7].LP -= damage}/${enemiesData[7].LP}`        
                }
            } action = false
        }
        damageAnimation.style.display = 'block'
        damageAnimation.style.left = '200px'
        damageAnimation.style.bottom = '100px'
        damageAnimation.innerHTML = `<h2>-${damage}</h2>`
        whichEnemy = 1
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

const enemy1Turn = (enemy) => {
    if (enemy1Be !== '' || whichEnemy === 2) {
        let damage;
        let randomDamage = Math.floor(Math.random() * 5)
        damageAnimation.style.left = '0'
        damageAnimation.style.bottom = '0'

        if((enemy1Be === enemiesData[0].name && whichEnemy === 1) || enemy === 0) {
            damage = enemiesData[0].ATT - characterStats.DEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = bloodyAttack
            animation()
        } else if((enemy1Be === enemiesData[1].name && whichEnemy === 1) || enemy === 1) {
            damage = enemiesData[1].ATT - characterStats.DEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = plantVenom
            animation()
        } else if((enemy1Be === enemiesData[2].name && whichEnemy === 1) || enemy === 2) {
            damage = enemiesData[2].artATT - characterStats.artDEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = sonicAttack
            animation()
        } else if((enemy1Be === enemiesData[3].name && whichEnemy === 1) || enemy === 3) {
            if (randomDamage < 3) {
                damage = enemiesData[3].ATT - characterStats.DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                attackAnimation.innerHTML = crushAttack
                animation()
            } else {
                damage = enemiesData[3].artATT - characterStats.artDEF + randomDamage
                if (damage < 0 ) { damage = 0}
                attackAnimation.innerHTML = negativeAura
                animation()
            }
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
        } else if((enemy1Be === enemiesData[4].name && whichEnemy === 1) || enemy === 4) {
            damage = enemiesData[4].ATT - characterStats.DEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = energicBomb
            animation()
        } else if((enemy1Be === enemiesData[5].name && whichEnemy === 1) || enemy === 5) {
            damage = enemiesData[5].ATT - characterStats.DEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = crushAttack
            animation()
        } else if((enemy1Be === enemiesData[6].name && whichEnemy === 1) || enemy === 6) {
            damage = enemiesData[6].artATT - characterStats.artDEF + randomDamage
            if (damage < 0 ) { damage = 0}
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
            attackAnimation.innerHTML = fire
            animation()
        } else if((enemy1Be === enemiesData[7].name && whichEnemy === 1) || enemy === 7) {
            if (randomDamage < 3) {
                damage = enemiesData[7].ATT - characterStats.DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                attackAnimation.innerHTML = confusion
                animation()
            } else {
                damage = enemiesData[7].artATT - characterStats.artDEF + randomDamage
                if (damage < 0 ) { damage = 0}
                attackAnimation.innerHTML = bomb
                animation()
            }
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
        }  else if(enemy1Be === enemiesData[8].name) {
            if (randomDamage < 3) {
                damage = enemiesData[8].ATT - characterStats.DEF + randomDamage
                if (damage < 0 ) { damage = 0}
                attackAnimation.innerHTML = confusion
                animation()
            } else if (randomDamage < 5){
                damage = enemiesData[8].artATT - characterStats.artDEF + randomDamage
                if (damage < 0 ) { damage = 0}
                attackAnimation.innerHTML = electroShock
                animation()
            } else if (randomDamage = 5){
                damage = enemiesData[8].artATT - characterStats.artDEF + randomDamage * 1.5
                if (damage < 0 ) { damage = 0}
                attackAnimation.innerHTML = blueFlames
                animation()
            }
            damageAnimation.innerHTML = `<h2>-${damage}</h2>`
            characterLP.innerHTML = `LP: ${characterStats.LP -= damage}/${characterStats.maxLP}`
        } if (whichEnemy === 2) {
            setTimeout(timing, 3000)
        }
        messageField.style.display = 'none'
        gameOver()
        setTimeout(enemy2Turn, 3000,);
    } else {
        enemy2Turn()
    }
}

const enemy2Turn = () => {
    if (whichEnemy === 1 && enemy2Be !== '') {
        whichEnemy = 2
        if(enemy2Be === enemiesData[0].name) {
            enemy1Turn(0)
        } else if(enemy2Be === enemiesData[1].name) {
            enemy1Turn(1)
        } else if(enemy2Be === enemiesData[2].name) {
            enemy1Turn(2)
        } else if(enemy2Be === enemiesData[3].name) {
            enemy1Turn(3)
        } else if(enemy2Be === enemiesData[4].name) {
            enemy1Turn(4)
        } else if(enemy2Be === enemiesData[5].name) {
            enemy1Turn(5)
        } else if(enemy2Be === enemiesData[6].name) {
            enemy1Turn(6)
        } else if(enemy2Be === enemiesData[7].name) {
            enemy1Turn(7)
        }
    } else {timing()}
}

const timing = () => {turnIndicator.innerHTML = 'Your turn'}

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
    } else if ((enemy1LP.innerHTML.includes('-') || enemy1LP.innerHTML.charAt(0) === '0') && enemy1Be === enemiesData[8].name) {
        enemy1Be = ''
        checkWin()
    }
    setTimeout(expAndItems, 3000)
}

const gameOver = () => {
    if (characterLP.innerHTML.includes('-') || characterLP.innerHTML.charAt(4) === '0') {
        field.style.backgroundImage = `url('./img/gameOver.gif')`;
        restart.style.display = 'block';
        messageField.style.display = 'inline-block';
        messageField.style.margin = '40px 350px';
        messageField.style.backgroundColor = 'transparent';
        messageField.innerHTML = 'Your LP reached 0';
        character.style.display = 'none';
        battleSection.style.display = 'none';
        enemy1.style.display = 'none';
        enemy2.style.display = 'none';
        damageAnimation.style.display = 'none'
        attackAnimation.style.display = 'none'
        movement = false;  
    }
}

restart.onclick = () => {
    field.style.backgroundImage = "url('./img/darkForestEntrance.jpg')"
    character.style.display = 'block'
    restart.style.display = 'none'
    startGame.style.display = 'block'
    mainMenu.style.display = 'none'
    menu.style.display = 'none'
    page = 0
    startGameText.innerHTML = `Hello adventurous, I'm glad to see you came to help our hero to defeat <br> the goblin king who invaded this forest. <br> The path is full of powerfull enemies so be caferull on going ahead to quickly <br> since enemies get stronger and stronger as you move forward. <br> Sometimes may help go back and get stronger by defeating weaker enemies. <br> This is a rpg turn based, this means you can fight by declaring one action per turn. <br>
    You will be able to acces the following tutorial everytime you need from the menu.`
    rightArrow.style.display = 'block'
    messageField.style.display = 'none';
    messageField.style.backgroundColor = 'red'
    rightArrow.style.transform = 'none'
    rightArrow.style.left = 'unset'
    characterStats.maxLP = 32;
    characterStats.LP = 32;
    characterStats.maxAP = 12;
    characterStats.AP = 12;
    characterStats.ATT = 12;
    characterStats.DEF = 8;
    characterStats.artATT = 10;
    characterStats.artDEF = 8;
    characterLP.innerHTML = `LP: ${characterStats.LP}/${characterStats.maxLP}`
    characterAP.innerHTML = `AP: ${characterStats.AP}/${characterStats.maxAP}`
    winMessage.style.display = 'none'
    x = 0;
    y = 0;
    scenario = 1;
    character.style.left = 0;
    currentAction = '';
    currentArt = '';
    action = false;
    whichEnemy = 1 
    battleExperience = 0;
    totalExperience = 0;
    itemsChance = 0;
    battleEq = ''
    currentItem;
    ownEq = []; 
    itemsBag[0].quantity = 0;
    itemsBag[1].quantity = 0;
    slot1.forEach(slot => slot.innerHTML = `empty`)
    slot2.forEach(slot => slot.innerHTML = `empty`)
    eqListButton.forEach(eq => eq.style.display = 'none')
    eqImgs.forEach(eq => eq.style.display = 'none')    
    eqListButton[8].style.display = 'block'
    statsValue[0].innerText = characterStats.maxLP
    statsValue[1].innerText = characterStats.maxAP
    statsValue[2].innerText = characterStats.ATT
    statsValue[3].innerText = characterStats.DEF
    statsValue[4].innerText = characterStats.artATT
    statsValue[5].innerText = characterStats.artDEF
    totEXP.innerText = totalExperience
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
    if (itemsChance < 5 && random > 1) {
        itemsBag[0].quantity ++
        battleItems = 'LP potion'
        if (itemsChance < 5 && random >= 3) {
            itemsBag[1].quantity ++
            battleItems = 'LP potion && AP potion'
    }} else if (itemsChance < 9 && random > 1) {
        itemsBag[1].quantity ++
        battleItems = 'AP potion'
        if (itemsChance < 9 && random >= 3) {
            if(!ownEq.includes('Silver Armor')) {
                ownEq.push('Silver Armor')
                battleEq = 'Silver Armor'
            }
    }} else if (itemsChance < 11 && random > 1) {
        itemsBag[1].quantity += 2
        battleItems = '2 AP potion'
        if(!ownEq.includes('Silver Boots')) {
            ownEq.push('Silver Boots')
            battleEq = 'Silver Boots'
        }
        if (itemsChance < 11 && random >= 4) {
            if(!ownEq.includes('Regal Boots')) {
                ownEq.push('Regal Boots')
                battleEq = 'Regal Boots && Silver Boots'
            }
    }} else if (itemsChance < 14 && random > 1) {
        itemsBag[0].quantity ++
        itemsBag[1].quantity ++
        battleItems = 'AP potion && LP potion'
        if (itemsChance < 14 && random >= 4) {
            if(!ownEq.includes('Magic Sword')) {   
                ownEq.push('Magic Sword')
                battleEq = 'Magic Sword'
            }
    }} else if (itemsChance === 14) {
        if(!ownEq.includes('Strong Sword')) {   
            ownEq.push('Strong Sword')
            battleEq = 'Strong Sword'
        }
    } else if (itemsChance < 16 && random > 1) {
        itemsBag[0].quantity ++
        itemsBag[1].quantity ++
        battleItems = 'LP potion && AP potion'
        if (itemsChance <= 18 && random >= 3) {
            if(!ownEq.includes('Silver Elmet')) {   
                ownEq.push('Silver Elmet')
                battleEq = 'Silver Elmet'
            }
    }} else if (itemsChance <= 20 && random > 1) {
        itemsBag[0].quantity ++
        itemsBag[1].quantity ++
        battleItems = 'LP potion && AP potion'
        if (itemsChance <= 20 && random >= 3) {
            if(!ownEq.includes('Regal Elmet')) {   
                ownEq.push('Regal Elmet')
                battleEq = 'Regal Elmet'
            }
    }} else if (itemsChance <= 22 && random > 1) {
        itemsBag[0].quantity ++
        itemsBag[1].quantity ++
        battleItems = 'LP potion && AP potion'
        if (itemsChance <= 22 && random >= 3) {
            if(!ownEq.includes('Regal Armor')) {   
                ownEq.push('Regal Armor')
                battleEq = 'Regal Armor'
            }
        }
    }
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
        damageAnimation.style.display = 'block'
        whichEnemy = 1
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
        damageAnimation.style.display = 'block'
        whichEnemy = 1
        itemRenderer()    
    }
}


const checkWin = () => {
    if (enemy1Be === '' && enemySpots === 13) {
        enemy1.style.display = 'none'
        winMessage.style.display = 'block'
        winMessage.innerHTML = `Congrats, you made it! <br> You defeated the Goglin King <br> You should feel very proud of yourself <br> that wasnt't easy`
        restart.style.display = 'block'
        enemy1.style.backgroundImage = 'unset'
        field.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))  ,url('./img/afterBattle.jpg')`
        restart.style.display = 'block'
        battleSection.style.display = 'none'
        attackAnimation.style.display = 'none'
        damageAnimation.style.display = 'none'
    } else if (enemy1Be === '' && enemy2Be === '') {
        field.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))  ,url('./img/afterBattle.jpg')`
        winMessage.style.display = 'block'
        winMessage.innerHTML = `You Won <br> gained experience: ${battleExperience} <br> Gained items: ${battleItems} <br> Gained equip: ${battleEq}` 
        battleSection.style.display = 'none'
        continuee.style.display = 'block'
        battleExperience = 0
        battleItems = ''
        attackAnimation.style.display = 'none'
        damageAnimation.style.display = 'none'
    } else {
        field.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))  ,url('./img/afterBattle.jpg')`
        winMessage.style.display = 'block'
        winMessage.innerHTML = `You were able to escaped, <br> but you gained nothing` 
        battleSection.style.display = 'none'
        continuee.style.display = 'block'
        battleExperience = 0
        attackAnimation.style.display = 'none'
        damageAnimation.style.display = 'none'
    }
}

continuee.onclick = () => {
    if (scenario === 1) {
        field.style.backgroundImage = "url('./img/darkForestEntrance.jpg')"
        rightArrow.style.display = 'block'
    } else {
        field.style.backgroundImage = "url('./img/goblinForest.jpg')"
        goblinKing.style.display = 'block'
        rightArrow.style.display = 'block'
    }
    continuee.style.display = 'none'
    winMessage.style.display = 'none'
    enemy1.style.display = 'none'
    enemy2.style.display = 'none'
    movement = true
    mainMenu.style.display = 'block'
    battleEq = ''
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
    } else if (enemySpots === 7) {
        character.style.left = '140px'
    } else if (enemySpots === 8) {
        character.style.left = '260px'
    }else if (enemySpots === 9) {
        character.style.left = '350px'
    } else if (enemySpots === 10) {
        character.style.left = '400px'
    } else if (enemySpots === 11) {
        character.style.left = '520px'
    } else if (enemySpots === 12) {
        character.style.left = '600px'
    } else if (enemySpots === 13) {
        character.style.left = '680px'
    }
}
