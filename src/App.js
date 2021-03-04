import { Chart } from './chart';

export const App = () => {
  return (
    <div style={{ width: '95vw', height: '95vh' }}>
      {'Привет'}
      <Chart leftBorder={-10} RightBorder={10} step={0.1} />
    </div>
  );
};
