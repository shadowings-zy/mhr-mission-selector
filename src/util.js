// 数组乱序
export const shuffleArray = (arr) => {
  for (let a = arr.length - 1; a > 0; a--) {
    const temp = arr[a];
    const randomIndex = Math.floor(Math.random() * a);
    arr[a] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
};