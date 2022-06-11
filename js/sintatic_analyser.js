const sintaticAnalyser = {
    analyse: function() {
        if(!sintaticAnalyser.hasSetence()){
            console.log('Dont has setence to analyse!');
            return;
        }
        console.log('Analysing...')

        let setenceElement = document.getElementById('setence');
        let setenceValue = setenceElement.value;

        let tableParsing = sintaticAnalyser.calculateRows(setenceValue);
        sintaticAnalyser.fillTableResult(tableParsing);
    },
    hasSetence: function(){
        let setenceElement = document.getElementById('setence');
        let setenceValue = setenceElement.value;

        return setenceValue.length > 0;
    },
    calculateRows: function(setence) {
        let tableParsing = [];
        let stack = '$S';
        let input = `${setence}$`;
        let action = `Rejeitado em ${tableParsing.length} iterações.`

        const S = 'S';
        
        if(getProduction(S, input[0])){
            action = getProduction(S, input[0]);
        }

        tableParsing.push({
            stack: stack,
            input: input,
            action: action
        });

        let lastPositionTable = tableParsing[0];
        let isRunning = true;

        while(lastPositionTable.stack.length && isRunning){
            let lastLetterOnStack = lastPositionTable.stack[lastPositionTable.stack.length - 1];
            let firstLetterOnInput = lastPositionTable.input[0];

            if (lastPositionTable.stack.length > 0 || lastPositionTable.input.length > 0) {
                if(lastLetterOnStack != firstLetterOnInput) {
                    if (!(lastLetterOnStack == lastLetterOnStack.toUpperCase())) break;

                    if (tableObject[lastLetterOnStack] !== undefined && 
                        tableObject[lastLetterOnStack][firstLetterOnInput]) {
                        lastPositionTable.action = tableObject[lastLetterOnStack][firstLetterOnInput];
                        let actionReverse = this.reverseString(lastPositionTable.action);
                        let input = lastPositionTable.input;
                        let newStack = lastPositionTable.stack.slice(0, -1) + actionReverse;
                        
                        if (lastPositionTable.action == "&epsilon;") {
                            newStack = lastPositionTable.stack.slice(0, -1);
                        }

                        tableParsing.push({
                            stack: newStack,
                            input: input,
                            action: ''
                        }); 
                    } else {
                        isRunning = false;
                    }
                } else {

                    if(firstLetterOnInput == '$' && lastLetterOnStack == '$') break;
                    lastPositionTable.action = `Ler ${firstLetterOnInput}`;
                    let newStack = lastPositionTable.stack.slice(0, -1);
                    let input = lastPositionTable.input.substring(1);
                    tableParsing.push({
                        stack: newStack,
                        input: input,
                        action: ''
                    });
                }
                lastPositionTable = tableParsing[tableParsing.length - 1];
            } 
        }

        lastLetterOnStack = lastPositionTable.stack[lastPositionTable.stack.length - 1];
        firstLetterOnInput = lastPositionTable.input[0];

        if(lastLetterOnStack == '$' && firstLetterOnInput == '$'){
            lastPositionTable.action = `<strong>Aceito em ${tableParsing.length} iterações.</strong>`;
        } else {
            lastPositionTable.action = `<strong>Erro em ${tableParsing.length} iterações.</strong>`;
        }

        return tableParsing;
    },
    fillTableResult: function(tableParsing){
        this.cleanTableResult();
        Array.from(tableParsing).forEach((row, index) => {
            let lastLetterOnStack = row.stack[row.stack.length - 1];
            
            let tr = document.createElement('tr');
            tr.className = `row-${index}`;

            let tdStack = document.createElement('td');
            let tdInput = document.createElement('td');
            let tdAction = document.createElement('td');

            if(lastLetterOnStack == lastLetterOnStack.toUpperCase() && 
            1 < tableParsing.length - 1 &&
            lastLetterOnStack != '$') {
                tdStack.innerHTML = row.stack;
                tdInput.innerHTML = row.input;
                tdAction.innerHTML = `${lastLetterOnStack} ➜ ${row.action}`;
            } else {
                tdStack.innerHTML = row.stack;
                tdInput.innerHTML = row.input;
                tdAction.innerHTML = row.action;
            }

            tr.appendChild(tdStack);
            tr.appendChild(tdInput);
            tr.appendChild(tdAction);
            
            let tableBody = document.getElementById('parser');
            tableBody.appendChild(tr);
            
            this.scrollTable();
        });
    },
    cleanTableResult: function(){
        let tableBody = document.getElementById('parser');
        tableBody.innerHTML = '';
    },
    reverseString: function(str) {
        var splitString = str.split("");
        var reverseArray = splitString.reverse();
        var joinArray = reverseArray.join("");

        return joinArray;
    },
    scrollTable: function() {
        let element = document.getElementsByClassName('container-table');
        element[0].scrollTop = element[0].scrollHeight;

    }
}

