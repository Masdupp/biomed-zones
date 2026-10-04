import { compareStore } from './compare';

describe('compare store', () => {
  beforeEach(() => compareStore.clear());
  it('keeps at most four distinct cells, dropping the oldest', () => {
    ['a', 'b', 'b', 'c', 'd', 'e'].forEach((h) => compareStore.add(h));
    expect(JSON.parse(localStorage.getItem('bz-compare') ?? '[]')).toEqual(['b', 'c', 'd', 'e']);
  });
  it('removes cells', () => {
    compareStore.add('a');
    compareStore.add('b');
    compareStore.remove('a');
    expect(JSON.parse(localStorage.getItem('bz-compare') ?? '[]')).toEqual(['b']);
  });
});
