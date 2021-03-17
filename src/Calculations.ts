//просто какие-то константы
const alpha = 1;
const beta = 1;
const epsilon = 1;
const mu = 1;
const d = 1;

//отрезок вычислений значений функций
const a = -10;
const b = 10;

//число узлов интерполяции
const n = 10;
//шаг
const h = (b - a) / n;
//ВАЖНО! h-не шаг вычисления значений функций!!!
//узлы интерполяции равноотстоящие, то есть Xi+1 - Xi = h (где i и i+1 - индексы узлов),
//причём X0=a, Xn=b, функция действительно вычисляется в этих точках, но не только в них

//симметричные разности
//зависят только от a, b и n, вычисляются только при изменении этих параметров
let deltas: number[];
type deltaType = {
  d: number;
  i: number;
  val: number;
};
let deltaStash: deltaType[];

export const recalculateDeltas = () => {
  deltas = [];
  deltaStash = [];
  for (let i = 0; i < 2 * n + 2; i++) deltas.push(delta(i, 0.5));
  console.log(deltas);
};

const delta = (degree: number, index: number): number => {
  const stashed = deltaStash.find((elem) => elem.d === degree && elem.i === index);
  if (stashed) {
    console.log('stash read!');
    return stashed.val;
  }

  if (degree === 0) {
    const value = calculate_F(a + index * h);
    deltaStash.push({
      d: 0,
      i: index,
      val: value
    });

    return value;
  }
  const complexDelta1 = delta(degree - 1, index + 0.5);
  const complexDelta2 = delta(degree - 1, index - 0.5);

  deltaStash.push({
    d: degree,
    i: index,
    val: complexDelta1 - complexDelta2
  });
  return complexDelta1 - complexDelta2;
};

////////////////////////целевая функция и её разностная производная//////////////////////////////////
export const calculate_F = (x: number): number => {
  //if (x === mu) return Infinity;
  return alpha * Math.sin(beta * x) * Math.cos(epsilon / Math.pow(x - mu, 2));
};

export const calculate_dF = (x: number): number => {
  return (1 / h) * (calculate_F(x + h) - calculate_F(x));
};

////////////////////////интерполирующий полином и его разностная производная/////////////////////////
//полином не можем захардкодить как функцию, ведь он зависит от числа узлов интерполяции (n)
//чтобы посчитать значения полинома, нужно предварительно посчитать все симметричные разности и коэффициенты,
//на которые эти разности домножаются

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
  let sum = 0;
  for (let i = 0; i < 2 * n + 2; i++) {
    m.push(coefficient(t, m));
    sum += m[i] * deltas[i];
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

/////////////////////вычисление иксов и узлов интерполяции////////////////
export const calculateX = (): number[] => {
  const arr: number[] = [];
  for (let x = a; x <= b; x += d) arr.push(x);
  return arr;
};

export const calculateXn = (): number[] => {
  const arr: number[] = [];
  for (let x = a; x <= b; x += h) arr.push(x);
  return arr;
};

////////////////////вычисление функций в точках/////////////////////////////
export const calculateFunction = (arr: number[], func: (x: number) => number): number[] => {
  return arr.map((elem) => func(elem));
};
