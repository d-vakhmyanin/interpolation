import { store } from './index';
import * as selectors from './myRedux/selectors';

// просто какие-то константы
let alpha: number;
let beta: number;
let epsilon: number;
let mu: number;
let d: number;

// отрезок вычислений значений функций
let a: number;
let b: number;

// число узлов интерполяции
let n: number;

// шаг
let h: number;
// ВАЖНО! h-не шаг вычисления значений функций!!!
// узлы интерполяции равноотстоящие, то есть Xi+1 - Xi = h (где i и i+1 - индексы узлов),
// причём X0=a, Xn=b, функция действительно вычисляется в этих точках, но не только в них

// симметричные разности
let deltas: number[];
type deltaType = {
  d: number;
  i: number;
  val: number;
};
let deltaStash: deltaType[];

export const setLocalParams = () => {
  const constants = selectors.getConstants(store.getState());

  alpha = constants.greek.alpha;
  beta = constants.greek.beta;
  epsilon = constants.greek.epsilon;
  mu = constants.greek.mu;
  d = constants.greek.delta;

  a = constants.area.A;
  b = constants.area.B;
  n = constants.area.n;

  h = (b - a) / n;
  recalculateDeltas();
};

export const recalculateDeltas = () => {
  deltas = [];
  deltaStash = [];
  for (let i = 0; i < 2 * n + 2; i++) deltas.push(delta(i, 0.5));
};

const delta = (degree: number, index: number): number => {
  const stashed = deltaStash.find((elem) => elem.d === degree && elem.i === index);
  if (stashed) {
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
  const val = alpha * Math.sin(beta * x) * Math.cos(epsilon / Math.pow(x - mu, 2));
  if (!isNaN(val)) return val;
  console.log(x);
  return 0;
};

export const calculate_dF = (x: number): number => {
  return (1 / h) * (calculate_F(x + h) - calculate_F(x));
};

////////////////////////интерполирующий полином и его разностная производная/////////////////////////
// полином не можем захардкодить как функцию, ведь он зависит от числа узлов интерполяции (n)
// чтобы посчитать значения полинома, нужно предварительно посчитать все симметричные разности и коэффициенты,
// на которые эти разности домножаются

// рекурентное вычисление коэфициента при симметричной разности в точке x=x0+t*h
// m-массив предыдущих коэффициентов
const coefficient = (t: number, m: number[]): number => {
  const l = m.length;
  if (l % 2 === 0) return m[l - 2] * (t + l / 2 - 1) * (t - l / 2);
  return (m[l - 1] * (t - 0.5)) / l;
};

// теперь можем считать полином в точке x
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
