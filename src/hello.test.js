import hello from './hello-ts';

describe('hello', () => {
  it('executes as expected', async () => {
    const response = await hello({});
    expect(response).toMatchSnapshot();
  });
});
