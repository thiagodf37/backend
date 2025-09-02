const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('calcularMediaAluno deve estar definida', () => {
    expect(calcularMediaAluno).toBeDefined();
  });
 

test('lança erro se a1 ou a2 não forem informadas', () => {
  expect(() => calcularMediaAluno()).toThrow('Notas a1 ou a2 não informadas');
});

test('lança erro se a1 ou a2 forem negativas', () => {
  expect(() => calcularMediaAluno(-1, 5)).toThrow('Notas a1 ou a2 não podem ser negativas');
});

test('calcula média base quando a3 não é informada', () => {
  expect(calcularMediaAluno(5, 7)).toBeCloseTo(5 * 0.4 + 7 * 0.6);
});

test('lança erro se a3 for negativa', () => {
  expect(() => calcularMediaAluno(5, 7, -1)).toThrow('Nota a3 não pode ser negativa');
});

test('calcula média usando a melhor combinação entre a1, a2 e a3', () => {
  const a1 = 8, a2 = 6, a3 = 9;
  expect(calcularMediaAluno(a1, a2, a3)).toBeCloseTo(Math.max(
    a1 * 0.4 + a2 * 0.6,
    a1 * 0.4 + a3 * 0.6,
    a3 * 0.4 + a2 * 0.6
  ));
});
