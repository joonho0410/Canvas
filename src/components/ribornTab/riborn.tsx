import { useEffect, useState } from 'react';
import { RebornContentsType } from '../../type/rebornType';
import { useZoomLevel } from '../../hooks/useZoomLevel';
import useToggle from '../../hooks/useToggle';
import RibornContents from '../ribornContents/ribornContents';
import { AnimatePresence } from 'framer-motion';

const buttonCommon =
  'group relative flex cursor-pointer select-none flex-col items-center justify-center rounded px-2 py-1 text-sm transition-colors';
const buttonDefault =
  'font-medium text-neutral-500  duration-100 hover:bg-gray-200';
const buttonClicked =
  'duration-100 hover:bg-gray-200 font-bold text-neutral-700 underline decoration-[2px] underline-offset-8';

const buttons: { state: RebornContentsType; label: string }[] = [
  { state: 'file', label: '파일' },
  { state: 'home', label: '홈' },
  { state: 'insert', label: '삽입' },
  { state: 'slideShow', label: '슬라이드쇼' },
];

const Riborn = () => {
  const { setZoomLevel } = useZoomLevel();
  const [currentState, setCurrentState] = useState<RebornContentsType | ''>('');
  const [fixMode, switchMode] = useToggle();
  const [isOpen, switchOpen] = useToggle();

  const handleClick = (next: RebornContentsType) => {
    if (isOpen) {
      if (currentState === next && !fixMode) switchOpen(false);
      if (currentState !== next) setCurrentState(next);
    }
    if (!isOpen) {
      switchOpen();
      setCurrentState(next);
    }
  };

  useEffect(() => {
    if (fixMode) setZoomLevel(0.85);
    if (!fixMode) setZoomLevel(1);
  }, [fixMode]);

  useEffect(() => {
    const handleMenu = () => switchOpen(false);
    if (!fixMode)
      document.querySelector('main')?.addEventListener('click', handleMenu);
    return () => {
      if (!fixMode)
        document
          .querySelector('main')
          ?.removeEventListener('click', handleMenu);
    };
  }, [fixMode]);

  return (
    <>
      <div className="flex flex-row items-center justify-start gap-x-2">
        {buttons.map((button) => (
          <button
            key={button.state}
            onClick={() => handleClick(button.state)}
            onDoubleClick={() => switchMode()}
            className={`${buttonCommon} ${currentState === button.state ? buttonClicked : buttonDefault}`}
          >
            {button.label}
          </button>
        ))}
      </div>
      <div className="relative" style={{ height: '0px' }}>
        <AnimatePresence>
          {isOpen ? <RibornContents selected={currentState} /> : null}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Riborn;
