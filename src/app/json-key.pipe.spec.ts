import { JsonKeyPipe } from './json-key.pipe';

describe('JsonKeyPipe', () => {
  it('create an instance', () => {
    const pipe = new JsonKeyPipe();
    expect(pipe).toBeTruthy();
  });
});
