import { v4 as uuidv4 } from 'uuid';
import { RectangleType, CircleType } from '../type/diagramType';

const getRandomColor = (): string => {
  const randomValue = () => Math.floor(Math.random() * 256); // 0~255 범위의 무작위 숫자 생성
  return `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
};

export const makeRectangle = (): RectangleType => {
  return {
    type: 'rectangle',
    id: uuidv4(),
    width: Math.floor(Math.random() * 150) + 50,
    height: Math.floor(Math.random() * 150) + 50,
    left: `${Math.floor(Math.random() * 500) + 250}px`,
    top: `${Math.floor(Math.random() * 500) + 250}px`,
    backgroundColor: getRandomColor(),
    borderColor: getRandomColor(),
  };
};

export const makeCircle = (): CircleType => {
  return {
    type: 'circle',
    id: uuidv4(),
    radius: Math.floor(Math.random() * 50) + 10,
    left: `${Math.floor(Math.random() * 500) + 250}px`,
    top: `${Math.floor(Math.random() * 500) + 250}px`,
    backgroundColor: getRandomColor(),
    borderColor: getRandomColor(),
  };
};
