const tableObject = {
    S: {a: 'aAc'},
    A: {b: 'Cc', c: "&epsilon;"},
    B: {b: 'bSa', c: 'cCb'},
    C: {b: 'bBa'}
};

function getProduction(rule, letter) {
    return tableObject[rule][letter];
}