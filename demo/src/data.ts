import rn from 'random-number';

const lgGen = rn.generator({
  min: 1000,
  max: 9999,
  integer: true,
});

const smGen = rn.generator({
  min: 100,
  max: 500,
  integer: true,
});

export function getLgData(size = 100): Record<string, string | number>[] {
  return Array.from({ length: size }, (_, i) => ({
    name: `Page ${i}`,
    uv: lgGen(),
    pv: lgGen(),
    amt: lgGen(),
  }));
}

export function getSmPieData(size = 10): Record<string, string | number>[] {
  return Array.from({ length: size }, (_, i) => ({
    name: `Group ${i}`,
    value: smGen(),
  }));
}

export function getLgPieData(size = 10): Record<string, string | number>[] {
  return Array.from({ length: size }, (_, i) => ({
    name: `Group ${i}`,
    value: lgGen(),
  }));
}
