const sintaticAnalyser = {
    analyse: function() {
        if(!sintaticAnalyser.hasSetence()){
            console.log('Dont has setence to analyse!');
            return;
        }
        console.log('Analysing...')
    },
    hasSetence: function(){
        let setenceElement = document.getElementById('setence');
        let setenceValue = setenceElement.value;

        return setenceValue.length > 0;
    }
}

