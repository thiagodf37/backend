const calculadora = require ('../src/calculadora.js');

describe("testa as funcoes da calculadora.js", function() {


test("2 + 2 = 4?", function(){
expect(calculadora.soma(2, 2)).toBe(4);
});

test("2 + 0 = 2?", function(){
    expect(calculadora.soma(2 , 0)).toBe(2);
    });

test("2*2=4", function(){
    expect(calculadora.multiplicacao).toBeDefined();
});
test("multiplica inteiro com inteiro da inteiro?", function(){
expect(calculadora.multiplicacao).toBeDefined();
expect(calculadora.multiplicacao(2, 2)).toBeDefined(4);
expect(calculadora.multiplicacao(2, 0)).toBeDefined(0);
expect(calculadora.multiplicacao(2, -1)).toBeDefined(-2);
expect(calculadora.multiplicacao(-2, 1)).toBeDefined(2);
})

test("nao pode dividir por ZERO", function(){
expect(calculadora.divisao).toBeDefined();
expect(() => calculadora.divisao(2, 0)).toThrow("divisão por zero")

})
}