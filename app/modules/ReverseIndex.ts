const reverseIndex = (currentIndex: number, length: number) => {
  const diff = length - currentIndex
  return diff < 10 ? `0${diff}` : diff
}

module.exports = { reverseIndex }
