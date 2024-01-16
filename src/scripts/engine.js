//Criando um objeto que guarda objetos(estado)
const state = {
    //Objeto pontuação
    score:{ 
        playerScore: 0,
        computerScore: 0,
        score_box: document.getElementById("score_points"),
    },
    //Objeto das imagens
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    //Objeto das cartas se confrontando
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card")
    },
    //Objeto de interações
    actions: {
        button: document.getElementById("next-duel"),
    },
};

const playerSides = {
    player1: "player-field-card",
    computer: "computer-field-card",
}

//Const criada para facilitar a chamada da imagem
const pathImages = ".src/assests/icons/";

//Lista de cartas
const cardData = [
    {
        id:0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf: [1],
        LoseOf: [2],
    },
    {
        id:0,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf: [2],
        LoseOf: [0],
    },
    {
        id:0,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf: [1],
    },
];

const players = {
    player1: "player-cards",
}

async function drawCards(cardsNumbers, fieldSide){
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard,fieldSide);  
        
        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

function init(){
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
}

init();
