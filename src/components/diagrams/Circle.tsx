import { useRef } from 'react';
import { useZoomLevel } from '../../hooks/useZoomLevel';
import { CircleType } from '../../type/diagramType';

const Circle = ({
  radius,
  top,
  left,
  backgroundColor,
  borderColor,
}: Omit<CircleType, 'type'>) => {
  const diagramRef = useRef<null | HTMLDivElement>(null);
  const { zoomLevel } = useZoomLevel();

  const handleMouseDown = (e: React.MouseEvent) => {
    const diagram = diagramRef.current;
    if (!diagram) return;
    const parent = diagram.parentElement;

    const shiftX = e.clientX - diagram.getBoundingClientRect().left;
    const shiftY = e.clientY - diagram.getBoundingClientRect().top;

    function moveAt(pageX: number, pageY: number) {
      if (!diagram) return;
      diagram.style.left =
        (pageX - shiftX - parent!.getBoundingClientRect().left) / zoomLevel +
        'px';
      diagram.style.top =
        (pageY - shiftY - parent!.getBoundingClientRect().top) / zoomLevel +
        'px';
    }

    function onMouseMove(event: MouseEvent) {
      moveAt(event.pageX, event.pageY);
    }

    // mousemove로 공을 움직입니다.
    document.addEventListener('mousemove', onMouseMove);

    // 공을 드롭하고, 불필요한 핸들러를 제거합니다.
    document.onmouseup = function () {
      diagram.style.zIndex = '0';
      document.removeEventListener('mousemove', onMouseMove);
      document.onmouseup = null;
    };
  };

  const circleStyle: React.CSSProperties = {
    position: 'absolute', // 부모 요소에 대한 상대적인 위치
    top: top, // top 값을 픽셀 단위로 설정
    left: left, // left 값을 픽셀 단위로 설정
    width: `${radius * 2}px`, // 원의 너비는 반지름의 두 배
    height: `${radius * 2}px`, // 원의 높이는 반지름의 두 배
    borderRadius: '50%', // 원을 만들기 위한 border-radius
    backgroundColor: backgroundColor, // 기본 배경색 (원하는 색으로 변경 가능)
    border: `3px solid ${borderColor}`, // 테두리 두께는 3px로 설정
  };

  return (
    <div
      className="absolute z-30 cursor-grab overflow-visible active:cursor-grabbing react-draggable react-draggable-dragged"
      ref={diagramRef}
      onMouseDown={handleMouseDown}
      style={circleStyle}
    />
  );
};

export default Circle;
