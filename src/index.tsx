import { View } from './components/view';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export { View };
