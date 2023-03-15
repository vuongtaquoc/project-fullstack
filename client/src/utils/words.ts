export const truncate = (sentence: string, amount: number = 50, tail: string = '...') => {
  const words = sentence.split(' ');

  if (amount >= words.length) {
    return sentence;
  }

  const truncated = words.slice(0, amount);
  return `${truncated.join(' ')}${tail}`;
}
