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

// 获取window宽高
export const getWindowWidthAndHeight = () => {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  }
}