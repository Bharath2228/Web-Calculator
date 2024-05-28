const keys = document.querySelectorAll('.key')
const displayInput = document.querySelector(".display .input")
const displayOutput = document.querySelector(".display .output")

let input = "";

keys.forEach(key => {
    let value = key.dataset.key;
    
    key.addEventListener('click', () => {
        if (value == "clear"){
            input = "";
            displayInput.innerHTML = "";
            displayOutput.innerHTML = "";
        }else if(value == "backspace"){
            input = input.slice(0, -1)
            displayInput.innerHTML = cleanInput(input);
        }else if(value == "="){
            // let result = eval(PrepareInput(input));  // gonna change it later
            let result = CalculationFunction(input)
            displayOutput.innerHTML = cleanOutput(result);

        }else if(value == "brackets"){
            if(input.indexOf("(") == -1 || 
               input.indexOf("(") != -1 && 
               input.indexOf(")") != -1 && 
               input.lastIndexOf("(") < input.lastIndexOf(")")){
                input += "(";
            } else if(input.indexOf("(") != -1 && 
                      input.indexOf(")") == -1 || 
                      input.indexOf("(") != -1 && 
                      input.indexOf(")") != -1 && 
                      input.lastIndexOf("(") > input.lastIndexOf(")")){
                input += ")";
            } 

            displayInput.innerHTML = cleanInput(input);
        } else{
            if (ValidateInput(value)){
                input += value;
                displayInput.innerHTML = cleanInput(input);
            }
        }
    }) 
    }
)

function cleanInput(input){
    let input_array = input.split("")

    for(let i = 0; i < input_array.length; i++){
        if (input_array[i] == '*'){
            input_array[i] = `<span class="operator">x</span>`;
        } else if(input_array[i] == '/'){
            input_array[i] = `<span class="operator">÷</span>`;
        } else if (input_array[i] == '-'){
            input_array[i] = `<span class="operator">-</span>`;
        } else if(input_array[i] == '+'){
            input_array[i] = `<span class="operator">+</span>`;
        }else if (input_array[i] == '('){
            input_array[i] = `<span class="brackets">(</span>`;
        } else if (input_array[i] == ')'){
            input_array[i] = `<span class="brackets">)</span>`;
        } else if(input_array[i] == '%'){
            input_array[i] = `<span class = "percent">%</span>`;
        }
    }

    return input_array.join('')
}

function cleanOutput(output){
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];

    output_array = output_string.split("")

    if (output_array.length > 3){
        for (let i = output_array.length - 3; i > 0; i -= 3){
            output_array.splice(i, 0, ",")
        }
    }

    if (decimal) {
        output_array.push(".");
        output_array.push(decimal);
    }

    return output_array.join("");
}

function PrepareInput(input){
    let input_array = input.split("")

    for (let i = 0; i < input_array.length; i++){
        if(input_array[i] == "%"){
            input_array[i] == "/100"
        }
    }

    return input_array.join("")
}

function ValidateInput(value){
    let last_input = input.slice(-1)
    let operators = ["+", "-", "*", "/"]

    if(value == "." && last_input == "."){
        return false
    }

    if (operators.includes(value)){
        if (operators.includes(last_input)){
            return false;
        }
        return true;
    }

    return true;
}

function CalculationFunction(expression){

    expression_array = expression.split('');

  for (let element in expression_array) {
    if (expression_array[element] === ' ') {
      expression_array.splice(element, 1);
    }
  }

  let currNumber = [];
  let operator = [];

  for (let char in expression_array) {
    if (!isNaN(expression_array[char])) {
      currNumber.push(expression_array[char]);
    } else {
      operator.push(expression_array[char]);
      if (currNumber.length > 0) {
        currNumber.push(parseFloat(currNumber.join('')));
        currNumber = [];
      }
    }
  }

  if (currNumber.length > 0) {
    currNumber.push(parseFloat(currNumber.join('')));
  }

  let result = currNumber[0];
  for (let i = 0; i < operator.length; i++) {
    const num2 = currNumber[i + 1];
    switch (operator[i]) {
      case "+":
        result += num2;
        break;
      case "-":
        result -= num2;
        break;
      case "*":
        result *= num2;
        break;
      case "/":
        if (num2 === 0) {
          return "Error: Division by zero";
        }
        result /= num2;
        break;
    }
  }

  return result;
}