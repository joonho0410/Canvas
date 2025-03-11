import { useEffect, useRef } from 'react';
import { useDiagram } from '../../hooks/useDiagram';
import { CircleType, RectangleType } from '../../type/diagramType';
import Circle from '../diagrams/Circle';
import Rectangle from '../diagrams/Rectangle';

const drawDiagram = (diagram: CircleType | RectangleType) => {
  const { id, top, left, backgroundColor, borderColor } = diagram;
  const commonProps = {
    key: id,
    id,
    top,
    left,
    backgroundColor,
    borderColor,
  };

  switch (diagram.type) {
    case 'rectangle':
      const { width, height } = diagram;
      return (
        <Rectangle {...commonProps} key={id} width={width} height={height} />
      );
    case 'circle':
      const { radius } = diagram;
      return <Circle {...commonProps} key={id} radius={radius} />;
    default:
      return null;
  }
};

const Canvas = ({ zoomLevel }: { zoomLevel: number }) => {
  const { diagrams } = useDiagram();
  const canvasRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current)
      canvasRef.current.style.transform = `scale(${zoomLevel})`;
  }, [zoomLevel]);

  return (
    <div
      id="main"
      className="absolute flex h-full w-full flex-col items-center justify-center overflow-auto"
    >
      <div
        id="canvas"
        ref={canvasRef}
        className="flex rounded-lg border-[0.35px] border-neutral-300 bg-white shadow-xl print:rounded-none print:shadow-none"
        style={{
          width: '1600px',
          height: '900px',
          minWidth: '1600px',
          minHeight: '900px',
          transition: 'transform 0.2s ease',
        }}
      >
        {diagrams.map((diagram) => drawDiagram(diagram))}
      </div>
    </div>
  );
};

export default Canvas;
