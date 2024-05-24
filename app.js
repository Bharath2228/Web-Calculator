const display = document.getElementById('number-el')

let values = []

function append(input){
    display.textContent += input;
    values = Array.from(display.textContent)
}

function calculate(){

    try{
        display.textContent = eval(display.textContent)
    }
    catch(error){
        display.textContent = "Error"
    }
    
}

function removeele(){
     values.pop()
     display.textContent = values.join('')
}

function clearDisp(){
    display.textContent = "";
    values = []
}
