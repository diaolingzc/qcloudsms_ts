import { calculateSignature } from '../src/util'

describe('tencentcloudsms:util', () => {
  test('util(): true', () => {
    expect(
      calculateSignature('5f03a35d00ee52a21327ab048186a2c4', '7226249334', 1457336869, ['13788888888', '13788888889']),
    ).toBe('be66bb4aeb54701ed0637d0996a0b75111d5b8eda9b3a71bdc579a3d26f3edfb')
  })
})