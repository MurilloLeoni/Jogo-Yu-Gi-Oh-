//Criando um objeto que guarda objetos(estado)
const state = {
    //Objeto pontuação
    score: { 
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
        computer: document.getElementById("computer-field-card"),
    },
    //Objeto do player e do computer
    playerSides : {
        player1: "player-cards",
        player1BOX: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector("#computer-cards"),
    },
    //Objeto de interações
    actions: {
        button: document.getElementById("next-duel"),
    },
};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
};

//Const criada para facilitar a chamada da imagem
const pathImages = "./src/assets/icons/";

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
        id:1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf: [2],
        LoseOf: [0],
    },
    {
        id:2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf: [1],
    },
];

//Função para gerar cartas randômicas
async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

//Função para criar Imagem das cartas dinamicamente
async function createCardImage(IdCard,fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener("mouseover", () =>{
            drawSelectCard(IdCard);
        });

        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }
    return cardImage;
}

//Função para '"levar" cartas ao duelo
async function setCardsField (cardId){

    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}
//Função para adicionar botão de empate
async function drawButton(text){
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";
}
//Função para modificar o placar
async function updateScore(){
    state.score.score_box.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}
//Função para checar quem ganhou ou perdeu
async function checkDuelResults(playerCardId, computerCardId){
    let duelResults = "Draw";
    let playerCard = cardData[playerCardId];

    if (playerCard.WinOf.includes(computerCardId)) {
        duelResults = "win";
        state.score.playerScore++;
    }

    if (playerCard.LoseOf.includes(computerCardId)) {
        duelResults = "lose";
        state.score.computerScore++;
    }

    await playAudio(duelResults);

    return duelResults
}

//Função para remover todas as cartas após o player selecionar uma para o duelo
async function removeAllCardsImages(){
    let {computerBOX, player1BOX} = state.playerSides;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

//Função criada para selecionar qual carta escolher, pelo mouseover
async function drawSelectCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute : " + cardData[index].type;

}

//Função para distribuir as cartas para o player e computer
async function drawCards(cardsNumbers, fieldSide){
    for (let i = 0; i < cardsNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard,fieldSide);  
        
        document.getElementById(fieldSide).appendChild(cardImage);
    }
}
//Função para resetar duelo
async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}
//Função para tocar música
async function playAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    
    try{
    audio.volume = 0.1;
    audio.play();
    } catch {}
}
//Função para inicar
function init(){
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);

    const bgm = document.getElementById("bgm");
    bgm.volume = 0.2;
    bgm.play();
}

init();
