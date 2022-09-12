const gamePlayImg = document.querySelector('#game_play img');
const yourNumberField = document.querySelector('#your_number');
const revealedNumber = document.querySelector('#revealed-number');

gamePlayImg.addEventListener('click', async () => {

    const randomNumber = getRandomNumber()
    const yourNumber = yourNumberField.value
    if(!yourNumber){
        alert('please enter you number')
        return
    }
    if(yourNumber > 10){
        alert('please enter a number between 0 and 10')
        return
    }
    if(randomNumber == yourNumber){
        revealedNumber.style.display='block'
        revealedNumber.style.color='green'
        revealedNumber.innerHTML = `<em>${randomNumber}</em> <p>Correct number</p>`
    }else{
        revealedNumber.style.display='block'
        revealedNumber.style.color='red'
        revealedNumber.innerHTML = `<em>${randomNumber}</em> <p>Wrong number</p>`
    }
})

const getRandomNumber = () => {
    //get random number between 0 and 10
    return Math.floor(Math.random() * 11);
}