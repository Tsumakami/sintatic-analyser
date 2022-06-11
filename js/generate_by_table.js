const generateSentence = { 
    automaticGenerator: function(){
        //generateSentence.clear();
        
        let sentenceElement = document.getElementById('setence');
        let sentence = tableObject['S']['a'];
        let index = 0;
        while(true){
            if(isUpperCase(sentence[index])){
                let randomValue = 0;
                
                randomValue = randomResult(tableObject[sentence[index]], true);

                if(randomValue == "&epsilon;"){
                    console.log(sentence[index]);                    
                    sentence = sentence.replace(sentence[index], "");
                    console.log(sentence);
                    break;
                }

                sentence = sentence.replace(sentence[index], randomValue);
                console.log(sentence);

                index = 0;
            }
            index = index + 1;
        }

        sentenceElement.value = sentence;
    },
    initTableGenerator: function(){
        let tds = document.getElementById('tablePreview').getElementsByTagName('td');
        var next = 'S';

        Array.from(tds).forEach(td => {
            generateSentence.listenMouseOver(td);
            generateSentence.listenMouseLeave(td);
            generateSentence.listenClick(td);
        });
    },
    listenClick: function(target) {
        target.addEventListener('click', (event) => {
            let setenceElement = document.getElementById('setence');        
            let target = event.target;
            let text = target.innerHTML;

            let rule = text.substring(0, 1);
            let action = text.substring(2, text.length);
            
            let setenceValue = setenceElement.value;

            if(action != 'ε'){
                if (setenceValue == '') {
                    setenceValue = action;
                } else {
                    setenceValue = setenceValue.replace(rule, action);
                }
            }else {
                setenceValue = setenceValue.replace(rule, '');
            }

            setenceElement.value = setenceValue;
        });
        
    },
    listenMouseOver: function(target) {
        target.addEventListener('mouseover', (event) => {
            let target = event.target;
            let text = target.innerHTML;
            let setenceElement = document.getElementById('setence');
            let setenceValue = setenceElement.value;

            if(setenceValue.length == 0) {
                next = 'S';
            }

            for (var i=0; i< setenceValue.length;i++) {
                if (setenceValue[i] == setenceValue[i].toUpperCase()) {
                    next = setenceValue[i].toUpperCase();
                    break;
                } else {
                    next = "";
                }
            }

            let stayOnRule = target.parentElement.className === next;

            if(text != '-' && stayOnRule){
                target.style.backgroundColor = '#ade3de';
                target.style.cursor = 'pointer';
            }
        });
    },
    listenMouseLeave: function(target) {
        target.addEventListener('mouseleave', (event) => {
            let target = event.target;
            let text = target.innerHTML;

            if(text != '-'){
                target.style.backgroundColor = 'white';
                target.style.cursor = '';
            }
        });
    },
    clear: function() {
        let setenceElement = document.getElementById('setence');
        setenceElement.value = '';
    }
}

function isUpperCase(character) {
    return character == character.toUpperCase();
}

function randomResult(object, notEpsilon=false) {
    if(Object.keys(object).length > 1){
        let randomValue = Math.floor(Math.random() * Object.keys(object).length);
        
        if(notEpsilon && Object.values(object)[randomValue] == "&episilon"){
            randomValue = 0;
        }

        return Object.values(object)[randomValue];
    }else if(Object.keys(object).length == 1) {
        return Object.values(object)[0];
    }
}

generateSentence.initTableGenerator();