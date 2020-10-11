const args = process.argv;
if(args.count <3 ){
    console.log("not enough arguments");
    process.exit();
}
const fileName = args[2];
const data = require(`./${fileName}`);
function setupMachine(d){
    return {
        state: '0',
        headPosition: d.initialTapePosition,
        tape: d.tape,
        rules: d.rules
    };
}

let machine = setupMachine(data);
let stateOfTape = machine.state;
let positionOfHead = machine.headPosition;
let program = machine.rules;
let makeTapeToArray = machine.tape.split("");
let tapeCurrent = makeTapeToArray[positionOfHead];

function executeStep(){
    for(let rule of program){
        if (checkOfRule(rule)){
            executeRule(rule);
        }
    }
}

let i = 0;
while (i !== executeStep()){
    printMachine();
}
function checkOfRule(rule){
    let ruleState = rule.state;
    let ruleRead = rule.read;
    return (ruleState === stateOfTape && ruleRead === tapeCurrent );
}

function executeRule(rule){
    let ruleWrite = rule.write;
    let move = rule.move;
    let nextState = rule.nextState;

    if(move === 'L'){
        makeTapeToArray[positionOfHead] = ruleWrite;
        if (nextState === 'X'){
            process.exit();

        }else {
            stateOfTape = nextState;
        }

        positionOfHead--;
        tapeCurrent = makeTapeToArray[positionOfHead];

    } else if(move === 'R'){
        makeTapeToArray[positionOfHead] = ruleWrite;
        if (nextState === 'X'){
            process.exit();

        }else {
            stateOfTape = nextState;
        }

        positionOfHead++;
        tapeCurrent = makeTapeToArray[positionOfHead];
    }
}

function printMachine(){
    console.log(makeTapeToArray.join(''));
}


