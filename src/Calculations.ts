//просто какие-то константы
const alpha = 1;
const beta = 1;
const epsilon = 1;
const mu = 1;

//отрезок вычислений значений функций
const a = -10;
const b = 10;

//число узлов интерполяции
const n = 50;
//шаг
const h = (b - a) / n;
//ВАЖНО! h-не шаг вычисления значений функций!!!
//узлы интерполяции равноотстоящие, то есть Xi+1 - Xi = h (где i и i+1 - индексы узлов),
//причём X0=a, Xn=b, функция действительно вычисляется в этих точках, но не только в них

////////////////////////целевая функция и её разностная производная//////////////////////////////////
export const calculate_F = (x: number): number => {
  if (x === mu) return Infinity;
  return alpha * Math.sin(beta * x) * Math.cos(epsilon / Math.pow(x - mu, 2));
};

export const calculate_dF = (x: number): number => {
  return (1 / h) * (calculate_F(x + h) - calculate_F(x));
};

////////////////////////интерполирующий полином и его разностная производная/////////////////////////
//полином не можем захардкодить как функцию, ведь он зависит от числа узлов интерполяции (n)
//чтобы посчитать значения полинома, нужно предварительно посчитать все симметричные разности и коэффициенты,
//на которые эти разности домножаются

//симметричные разности
const delta = (degree: number, index: number): number => {
  if (degree === 0) return calculate_F(a + index * h);

  const complexDelta1 = delta(degree - 1, index + 0.5);
  const complexDelta2 = delta(degree - 1, index - 0.5);
  return complexDelta1 - complexDelta2;
};

//рекурентное вычисление коэфициента при симметричной разности в точке x=x0+t*h
//m-массив предыдущих коэффициентов
const coefficient = (t: number, m: number[]): number => {
  const l = m.length;
  if (l % 2 === 0) return m[l - 2] * (t + l / 2 - 1) * (t - l / 2);
  return (m[l - 1] * (t - 0.5)) / l;
};

//теперь можем считать полином в точке x
export const calculate_Pn = (x: number): number => {
  const t = (x - a) / h;
  const m = [1];
  const df = [delta(0, 0.5)];
  let sum = 0;
  for (let i = 0; i < 2 * n + 2; i++) {
    m.push(coefficient(t, m));
    df.push(delta(i + 1, 0.5));
    sum += m[i] * df[i];
  }

  return sum;
};

export const calculate_dPn = (x: number): number => {
  return (1 / h) * (calculate_Pn(x + h) - calculate_Pn(x));
};

////////////////////////////////погрешность////////////////////////////////
export const calculate_Rn = (x: number): number => {
  return Math.abs(calculate_F(x) - calculate_Pn(x));
};
