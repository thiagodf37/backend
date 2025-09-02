import {soma, divisao} from './index.js';
if(soma(1, 1) === 2)console.log("passou 1!");
else console.error("Deu ruin 1!");
if(soma(1, 0) === 1)console.log("passou 2!");
else console.error("Deu ruin 2!")
if(soma(1, -1) === 0)console.log("passou 3!");
else console.error("Deu ruin 3!")
if(divisao(1, 1) === 1)console.log("passou 4!");
else console.error("Deu ruin 4!")
if(divisao(6, 3) === 2)console.log("passou 5!");
else console.error("Deu ruin 5!")
if(divisao(1, 0) === undefined)console.log("passou 6!");
else console.error("Deu ruin 6!")