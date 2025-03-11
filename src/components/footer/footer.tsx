import { useDeferredValue } from 'react';
import { useZoomLevel } from '../../hooks/useZoomLevel';

const Footer = () => {
  const { zoomLevel, setZoomLevel } = useZoomLevel();
  const deferredZoomLv = useDeferredValue(zoomLevel);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newZoom = parseFloat(event.target.value);
    setZoomLevel(newZoom);
  };

  return (
    <footer className="relative z-20 flex h-6 w-full flex-row items-center justify-between border-t border-neutral-300 px-4">
      <div></div>
      <div className="flex h-full flex-row items-center gap-x-2">
        <button
          className="h-full px-3 outline-none hover:bg-neutral-200"
          onClick={() =>
            setZoomLevel((prev: number) => Math.max(prev - 0.01, 0.1))
          }
        >
          -
        </button>
        <input
          type="range"
          min={0.1}
          max={1}
          step={0.01}
          value={deferredZoomLv}
          onChange={handleSliderChange}
          className="relative flex h-1 w-full flex-1 grow overflow-hidden rounded-full bg-neutral-300"
          style={{ width: '100px' }}
        />
        <button
          className="h-full px-3 outline-none hover:bg-neutral-200"
          onClick={() =>
            setZoomLevel((prev: number) => Math.max(prev + 0.01, 0.1))
          }
        >
          +
        </button>
        <div className="w-10 select-none text-center text-xs font-medium tracking-tight text-neutral-500">
          {Math.floor(deferredZoomLv * 100)}%
        </div>
      </div>
    </footer>
  );
};

export default Footer;
