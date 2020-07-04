//! Dom's elements 
// convert button
let convertBtn = document.querySelector(".convert-btn");

//! calculus systems
// output
let inputSystem1 = document.querySelectorAll("input[name='input-calculus']")[0];
let inputSystem2 = document.querySelectorAll("input[name='input-calculus']")[1];
let inputSystem3 = document.querySelectorAll("input[name='input-calculus']")[2];
let inputSystem4 = document.querySelectorAll("input[name='input-calculus']")[3];
// input
let outputSystem1 = document.querySelectorAll("input[name='output-calculus']")[0];
let outputSystem2 = document.querySelectorAll("input[name='output-calculus']")[1];
let outputSystem3 = document.querySelectorAll("input[name='output-calculus']")[2];
let outputSystem4 = document.querySelectorAll("input[name='output-calculus']")[3];

// variables
let i = -1;
let nums = [];
let strNums = [];
let result;
let inputValue;
let reverseNums = [];
let n = -3;
let m = -1;
let tripleNums = [];
let quadrupleNums = [];

//! convert functions
//* From 2 to 10
function convertFrom2To10(inputValue) {
    inputValue.toString();
        while (i < inputValue.length) {
            for (let j = inputValue.length - 1; j >= 0; j--) {
                i++;
                nums.push(parseInt(inputValue.substr(i, 1) * Math.pow(2, j), 10));    
            }
        }
    
        nums.pop();
    
        result = nums.reduce(function (num1, num2) {
            return num1 + num2;
        });

        //* clearing data
        nums = [];
        document.querySelector("#calculus-system-value-field").value = '';
        inputValue = '';
        i = -1;

        return result;
}

//* From 10 to 2
function convertFrom10To2(inputValue) {
    while( i < inputValue * 10 ) {
        i++;
        nums.push(Math.floor(((inputValue /= 2) * 2 % 2)));
    }

    //* It makes our array reversed
    for (let q = nums.length; q >= 0; q--) {
        reverseNums.push(nums[q]);
    }

    //* getting rid of nulls
    reverseNums.splice(0, reverseNums.indexOf(1));
    
    strNums = reverseNums.map(function (stringNum) {
        return stringNum.toString();
    });

    result = strNums.reduce(function (num1, num2) {
        return num1 + num2; 
    });


    //* clearing data
    reverseNums = [];
    nums = [];
    document.querySelector("#calculus-system-value-field").value = '';
    inputValue = '';
    i = -1;

    return result;
}

//* From 2 to 8
function convertFrom2To8(inputValue) {
    while(i < (inputValue.length / 3) - 1) {
        i++;
        m++;
        n += 3;
        tripleNums.push(inputValue.substr(i + n - m, 3));
    }

    //* adding 0 to array if our length of the array is not divided by 3 
    if (inputValue.length % 3 != 0) {
    tripleNums[tripleNums.length - 1] += '0';
    }

    for (let i = 0; i < tripleNums.length; i++) {
            if (tripleNums[i].length + 1 <= 3) {
            tripleNums[i] += '0';
        }

        tripleNums[i] = parseInt(tripleNums[i].substr(0, 1) * Math.pow(2, 2), 10) 
        + parseInt(tripleNums[i].substr(1, 1) * Math.pow(2, 1), 10) 
        + parseInt(tripleNums[i].substr(2, 1) * Math.pow(2, 0), 10);
    }

    result = tripleNums.reduce(function (num1, num2) {
        return num1.toString() + num2.toString();
    });

    //* clearing data
    tripleNums = [];
    document.querySelector("#calculus-system-value-field").value = '';
    inputValue = '';
    i = -1;
    n = -3;
    m = -1;

    return result;
}

//* From 8 to 2
function convertFrom8To2(inputValue) {
    inputValue.toString();
    inputValue.toUpperCase();

    while (i < inputValue.length) {
        i++;
        nums.push(inputValue.substr(i, 1));
    }

    for (let i = 0; i < nums.length; i++) {
        switch (nums[i]) {
            case '1':
                nums[i] = '001';
                break;
            case '2':
                nums[i] = '010';
                break;
            case '3':
                nums[i] = '011';
                break;
            case '4':
                nums[i] = '100';
                break;
            case '5':
                nums[i] = '101';
                break;
            case '6':
                nums[i] = '110';
                break;
            case '7':
                nums[i] = '111';
                break;
            case '0': nums[i] = '000';
                break;
            }
        }

        result = nums.reduce(function(num1, num2){
            return num1.toString() + num2.toString();
        });


        //* clearing data
        nums = [];
        document.querySelector("#calculus-system-value-field").value = '';
        inputValue = '';
        i = -1;

        //* result
        return result;
}

//* From 2 to 16
function convertFrom2To16(inputValue) {
    inputValue.toString();

        n = -4;
        while(i < (inputValue.length / 4) - 1) {
            i++;
            m++;
            n += 4;
            quadrupleNums.push(inputValue.substr(i + n - m, 4));
        }

        //* adding 0 to array if our length of the array is not divided by 4 
        if (inputValue.length % 4 != 0) {
            quadrupleNums[quadrupleNums.length - 1] += '0';
        }

        for (let i = 0; i < quadrupleNums.length; i++) {
            if (quadrupleNums[i].length + 1 <= 4) {
                quadrupleNums[i] += '0';
            }

            if (quadrupleNums[i].length + 1 <= 4) {
                quadrupleNums[i] += '0';
            }

            switch (quadrupleNums[i].toUpperCase()) {
                case '0000': 
                    nums[i] = '0';
                    break;

                case '0001':
                    nums[i] = '1';
                    break;

                case '0010':
                    nums[i] = '2';
                    break;

                case '0011':
                    nums[i] = '3';
                    break;

                case '0100':
                    nums[i] = '4';
                    break;

                case '0101':
                    nums[i] = '5';
                    break;

                case '0110':
                    nums[i] = '6';
                    break;

                case '0111':
                    nums[i] = '7';
                    break;

                case '1000':
                    nums[i] = '8';
                    break;

                case '1001':
                    nums[i] = '9';
                    break;

                case '1010':
                    nums[i] = 'A';
                    break;

                case '1011':
                    nums[i] = 'B';
                    break;

                case '1100':
                    nums[i] = 'C';
                    break;

                case '1101':
                    nums[i] = 'D';
                    break;

                case '1110':
                    nums[i] = 'E';
                    break;

                case '1111':
                    nums[i] = 'F';
                    break;
            }
        }

        result = nums.reduce(function(num1, num2){
            return num1 + num2;
        });

        //* clearing data
        quadrupleNums = [];
        document.querySelector("#calculus-system-value-field").value = '';
        inputValue = '';
        i = -1;
        n = -4;
        m = -1;

        return result;
}

//* From 16 to 2
function convertFrom16To2(inputValue){
    inputValue.toString();

    while (i < inputValue.length) {
        i++;
        nums.push(inputValue.substr(i, 1));
    }

    for (let i = 0; i < nums.length; i++) {
        switch (nums[i].toUpperCase()) {
            case '0': nums[i] = '000';
                break;
            case '1':
                nums[i] = '0001';
                break;
            case '2':
                nums[i] = '0010';
                break;
            case '3':
                nums[i] = '0011';
                break;
            case '4':
                nums[i] = '0100';
                break;
            case '5':
                nums[i] = '0101';
                break;
            case '6':
                nums[i] = '0110';
                break;
            case '7':
                nums[i] = '0111';
                break;
            case '8':
                nums[i] = '1000';
                break;
            case '9':
            nums[i] = '1001';
                break;
            case 'A':
                nums[i] = '1010';
                break;
            case 'B':
                nums[i] = '1011';
                break;
            case 'C':
                nums[i] = '1100';
                break;
            case 'D':
                nums[i] = '1101';
                break;
            case 'E':
                nums[i] = '1110';
                break;
            case 'F':
                nums[i] = '1111';
                break;
        }
    }

    result = nums.reduce(function(num1, num2){
        return num1.toString() + num2.toString();
    });

    //* clearing data
    nums = [];
    document.querySelector("#calculus-system-value-field").value = '';
    inputValue = '';
    i = -1;

    return result;
}


//! event's handlers
convertBtn.addEventListener("click",() => {
    event.preventDefault();

    //* Input value
    inputValue = document.querySelector("#calculus-system-value-field").value;

    if( inputValue == '' ) {
        alert("Вы не заполнили пустое поле!");
    } else {
    //* It will output error if our system calculus are similar
    if (inputSystem1.checked == true && outputSystem1.checked == true 
        || inputSystem2.checked == true && outputSystem2.checked == true
        || inputSystem3.checked == true && outputSystem3.checked == true
        || inputSystem4.checked == true && outputSystem4.checked == true) {
        alert("Вы выбрали одинаковые системы счисления!");
    }

    //* converting from 2 to 10 calculus system
    if (inputSystem1.checked == true && outputSystem3.checked == true) {
        if ( inputValue.includes('2') || inputValue.includes('3') 
        || inputValue.includes('4') || inputValue.includes('5') 
        || inputValue.includes('6') || inputValue.includes('7') 
        || inputValue.includes('8') || inputValue.includes('9')
        || inputValue.includes('A') || inputValue.includes('B') 
        || inputValue.includes('C') || inputValue.includes('D') 
        || inputValue.includes('E') || inputValue.includes('F')) {
        alert("Число, которое вы ввели не соответствует числу двоичного кода!");
        }
        else{
            convertFrom2To10(inputValue);
            alert("Ответ: " + result);
        }
    }

    //* converting from 10 to 2 calculus system
    if (inputSystem3.checked == true && outputSystem1.checked == true) {
        if (inputValue.includes('A') ||
        inputValue.includes('B') || inputValue.includes('C') ||
        inputValue.includes('D') || inputValue.includes('E') ||
        inputValue.includes('F')) {
            alert("Число, которое вы ввели не соответствует числу десятиричного кода!");
        }
        else{
            convertFrom10To2(inputValue);
            alert("Ответ: " + result);
        }
    }

    //* converting from 2 to 8 calculus system
    if (inputSystem1.checked == true && outputSystem2.checked == true) {
        if ( inputValue.includes('2') || inputValue.includes('3') 
        || inputValue.includes('4') || inputValue.includes('5') 
        || inputValue.includes('6') || inputValue.includes('7') 
        || inputValue.includes('8') || inputValue.includes('9')
        || inputValue.includes('A') || inputValue.includes('B') 
        || inputValue.includes('C') || inputValue.includes('D') 
        || inputValue.includes('E') || inputValue.includes('F')) {
        alert("Число, которое вы ввели не соответствует числу двоичного кода!");
        }
        else{
            convertFrom2To8(inputValue);
            alert("Ответ: " + result);
        }
    }

    //* converting from 8 to 2 calculus system
    if (inputSystem2.checked == true && outputSystem1.checked == true) {
        if (inputValue.includes('9') || inputValue.includes('A') ||
        inputValue.includes('B') || inputValue.includes('C') ||
        inputValue.includes('D') || inputValue.includes('E') ||
        inputValue.includes('F')) {
            alert("Число, которое вы ввели не соответствует числу восьмеричного кода!");
        }
        else{
            convertFrom8To2(inputValue);
            alert("Ответ: " + result);
        }
    }

    //* converting from 2 to 16 calculus system
    if(inputSystem1.checked == true && outputSystem4.checked == true) {
        if ( inputValue.includes('2') || inputValue.includes('3') 
        || inputValue.includes('4') || inputValue.includes('5') 
        || inputValue.includes('6') || inputValue.includes('7') 
        || inputValue.includes('8') || inputValue.includes('9')
        || inputValue.includes('A') || inputValue.includes('B') 
        || inputValue.includes('C') || inputValue.includes('D') 
        || inputValue.includes('E') || inputValue.includes('F')) {
        alert("Число, которое вы ввели не соответствует числу двоичного кода!");
        }
        else{
            convertFrom2To16(inputValue);
            alert("Ответ: " + result);
        }
    }

    //* converting from 16 to 2 calculus system
    if(inputSystem4.checked == true && outputSystem1.checked == true) {
        convertFrom16To2(inputValue);
        alert("Ответ: " + result);
    }

    //* converting from 8 to 10 calculus system
    if(inputSystem2.checked == true && outputSystem3.checked == true) {
        if (inputValue.includes('9') || inputValue.includes('A') ||
        inputValue.includes('B') || inputValue.includes('C') ||
        inputValue.includes('D') || inputValue.includes('E') ||
        inputValue.includes('F')) {
            alert("Число, которое вы ввели не соответствует числу восьмеричного кода!");
        }
        else{
            convertFrom8To2(inputValue);
            convertFrom2To10(result);
            alert("Ответ: " + result);  
        }
    }

    //* converting from 10 to 8 calculus system
    if(inputSystem3.checked == true && outputSystem2.checked == true) {
        if (inputValue.includes('A') ||
        inputValue.includes('B') || inputValue.includes('C') ||
        inputValue.includes('D') || inputValue.includes('E') ||
        inputValue.includes('F')) {
            alert("Число, которое вы ввели не соответствует числу восьмеричного кода!");
        }
        else{
            convertFrom10To2(inputValue);
            convertFrom2To8(result);
            alert("Ответ: " + result);  
        }
    }

    //* converting from 8 to 16 calculus system
    if(inputSystem2.checked == true && outputSystem4.checked == true) {
        if (inputValue.includes('9') || inputValue.includes('A') ||
        inputValue.includes('B') || inputValue.includes('C') ||
        inputValue.includes('D') || inputValue.includes('E') ||
        inputValue.includes('F')) {
            alert("Число, которое вы ввели не соответствует числу десятиричного кода!");
        }
        else{
            convertFrom8To2(inputValue);
            convertFrom2To16(result);
            alert("Ответ: " + result);  
        }
    }

    //* converting from 16 to 8 calculus system
    if(inputSystem4.checked == true && outputSystem2.checked == true) {
        convertFrom16To2(inputValue);
        convertFrom2To8(result);
        alert("Ответ: " + result);  
    }

    //* converting from 10 to 16 calculus system
    if(inputSystem3.checked == true && outputSystem4.checked == true) {
        if (inputValue.includes('A') ||
        inputValue.includes('B') || inputValue.includes('C') ||
        inputValue.includes('D') || inputValue.includes('E') ||
        inputValue.includes('F')) {
            alert("Число, которое вы ввели не соответствует числу десятиричного кода!");
        }
        else{
            convertFrom10To2(inputValue);
            convertFrom2To16(result);
            alert("Ответ: " + result);  
        }
    }

    //* converting from 16 to 10 calculus system
    if(inputSystem4.checked == true && outputSystem3.checked == true) {
        convertFrom16To2(inputValue);
        convertFrom2To10(result);
        alert("Ответ: " + result);  
    }
}
});