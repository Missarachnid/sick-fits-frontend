function add(a, b) {
  return a + b;
}

describe('Sample test 101', () => {
  it('works as expected', () => {
    // we run our expect statement to see if the test will pass
    expect(1).toEqual(1);
    // expect(2).toEqual('2'); - this will fail
  });
  it('adds two things together', () => {
    expect(1 + 1).toEqual(2);
    const age = 100;
    expect(age).toEqual(100);
  });

  it('runs the add function properly', () => {
    expect(add(1, 2)).toBeGreaterThanOrEqual(3);
  });
});
