import { useDeferredValue } from 'react';
import { useZoomLevel } from '../../hooks/useZoomLevel';
import Canvas from './canvas';

const CanvasContainer = () => {
  const { zoomLevel, setZoomLevel } = useZoomLevel();
  const deferredZoomLv = useDeferredValue(zoomLevel);

  const handleWheel = (event: React.WheelEvent) => {
    if (event.metaKey) {
      const dZoom = Math.min(0.25, Math.abs(event.deltaY) * 0.0002);
      if (event.deltaY > 0)
        setZoomLevel((prevZoom: number) => Math.min(prevZoom + dZoom, 1));
      if (event.deltaY < 0)
        setZoomLevel((prevZoom: number) => Math.max(prevZoom - dZoom, 0.1));
    }
  };

  return (
    <main onWheel={handleWheel} className="relative flex h-full w-screen">
      <Canvas zoomLevel={deferredZoomLv} />
    </main>
  );
};

export default CanvasContainer;
