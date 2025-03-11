import { useRef } from 'react';
import { RectangleType } from '../../type/diagramType';
import { useZoomLevel } from '../../hooks/useZoomLevel';

const Rectangle = ({
  width,
  height,
  top,
  left,
  backgroundColor,
  borderColor,
}: Omit<RectangleType, 'type'>) => {
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

  const rectangleStyle: React.CSSProperties = {
    position: 'absolute', // position을 absolute로 설정하여 위치를 지정
    top: top, // 상단 위치 설정
    left: left, // 좌측 위치 설정
    width: `${width}px`, // 사각형의 너비
    height: `${height}px`, // 사각형의 높이
    backgroundColor, // 사각형의 배경 색상 (원하는 색으로 변경 가능)
    border: `3px solid ${borderColor}`, // 테두리 두께는 3px로 설정
  };

  return (
    <div
      className="absolute z-30 cursor-grab overflow-visible active:cursor-grabbing react-draggable react-draggable-dragged"
      ref={diagramRef}
      onMouseDown={handleMouseDown}
      style={rectangleStyle}
    ></div>
  );
};

export default Rectangle;
