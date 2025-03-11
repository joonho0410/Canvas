import { useCallback } from 'react';
import { useDiagram } from '../../hooks/useDiagram';
import { RebornContentsType } from '../../type/rebornType';
import { makeCircle, makeRectangle } from '../../utils/makeDiagram';
import { downloadPNGFile, downloadSVGFile } from '../../utils/downloadFile';
import { useZoomLevel } from '../../hooks/useZoomLevel';
import { motion } from 'framer-motion';

function findContents(selected: RebornContentsType | '') {
  switch (selected) {
    case 'file':
      return <RibornContents.file />;
    case 'home':
      return <RibornContents.home />;
    case 'insert':
      return <RibornContents.insert />;
    case 'slideShow':
      return <RibornContents.slideShow />;
    default:
      return null;
  }
}
const RibornContents = ({
  selected,
}: {
  selected: RebornContentsType | '';
}) => {
  const currentContents = findContents(selected);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }} // 나타날 때 위에서 아래로
      animate={{ opacity: 1, y: 0 }}    // 애니메이션 끝 상태
      exit={{ opacity: 0, y: -10 }}      // 사라질 때 아래로
      transition={{ duration: 0.1 }}     // 애니메이션 시간
    >
      <div className="absolute border bg-gray-100 text-card-foreground shadow h-26 flex w-full flex-row items-center gap-x-1.5 rounded-lg px-1.5 py-2">
        {currentContents}
      </div>
    </motion.div>
  );
};

RibornContents.file = () => {
  const { zoomLevel } = useZoomLevel();

  return (
    <div className="flex h-full w-fit px-0.5 flex-col items-center justify-between">
      <div className="flex flex-row gap-x-0.5">
        <div
          onClick={() => downloadSVGFile(zoomLevel)}
          className="flex cursor-not-allowed flex-col items-center gap-y-1 rounded px-1.5 py-0.5 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer"
        >
          <img
            className="size-10 rounded stroke-neutral-600 px-2 select-none saturate-0"
            src="https://dword-liart.vercel.app/assets/SVG_Logo-Bm1lD3ZF.svg"
          />
          <span className="select-none text-[12.7px] font-medium text-neutral-600">
            SVG로 저장
          </span>
        </div>
        <div
          onClick={downloadPNGFile}
          className="flex cursor-not-allowed flex-col items-center gap-y-1 rounded px-1.5 py-0.5 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-image size-10 rounded stroke-neutral-600 px-2 select-none"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
          </svg>
          <span className="select-none text-[12.7px] font-medium text-neutral-600">
            PNG로 저장
          </span>
        </div>
      </div>
      <div className="select-none text-xs text-neutral-600">저장</div>
    </div>
  );
};
RibornContents.home = () => {
  return (
    <>
      <div className="flex h-full w-fit px-0.5 flex-col items-center justify-between">
        <div className="flex flex-row gap-x-0.5">
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-undo2 size-8 cursor-not-allowed rounded stroke-neutral-600 p-2 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200"
              data-state="closed"
            >
              <path d="M9 14 4 9l5-5"></path>
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-redo2 size-8 cursor-not-allowed rounded stroke-neutral-600 p-2 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200"
              data-state="closed"
            >
              <path d="m15 14 5-5-5-5"></path>
              <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"></path>
            </svg>
            <div className="select-none text-xs text-neutral-600">
              실행 취소
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-px bg-neutral-300"></div>

      <div className="flex h-full w-fit px-0.5 flex-col items-center justify-between">
        <div className="flex flex-row gap-x-0.5">
          <div className="flex cursor-not-allowed flex-col items-center gap-y-1 rounded px-1.5 py-0.5 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clipboard-paste size-10 rounded stroke-neutral-600 px-2 select-none stroke-[1.45px]"
            >
              <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"></path>
              <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10"></path>
              <path d="m17 10 4 4-4 4"></path>
            </svg>
            <span className="select-none text-[12.7px] font-medium text-neutral-600">
              붙여넣기
            </span>
          </div>
          <div className="flex flex-col gap-y-0.5 px-0.5">
            <div className="flex cursor-not-allowed flex-row items-center justify-start gap-x-0.5 rounded p-1 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-scissors size-5 rounded stroke-neutral-600 p-0.5"
              >
                <circle cx="6" cy="6" r="3"></circle>
                <path d="M8.12 8.12 12 12"></path>
                <path d="M20 4 8.12 15.88"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M14.8 14.8 20 20"></path>
              </svg>
              <span className="text-xs font-medium select-none text-neutral-600">
                자르기
              </span>
            </div>
            <div className="flex cursor-not-allowed flex-row items-center justify-start gap-x-0.5 rounded p-1 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-files size-5 rounded stroke-neutral-600 p-0.5"
              >
                <path d="M20 7h-3a2 2 0 0 1-2-2V2"></path>
                <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"></path>
                <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"></path>
              </svg>
              <span className="text-xs font-medium select-none text-neutral-600">
                복사
              </span>
            </div>
          </div>
        </div>
        <div className="select-none text-xs text-neutral-600">클립보드</div>
      </div>
      <div className="h-full w-px bg-neutral-300"></div>

      <div className="flex h-full w-fit px-0.5 flex-col items-center justify-between">
        <div className="flex flex-row gap-x-0.5">
          <div className="flex cursor-not-allowed flex-col items-center gap-y-1 rounded px-1.5 py-0.5 transition-all duration-100 hover:bg-red-100 active:bg-red-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trash2 size-10 rounded stroke-red-500 stroke-[1.45px] px-2"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" x2="10" y1="11" y2="17"></line>
              <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
            <span className="select-none text-[12.7px] font-medium text-red-600">
              삭제
            </span>
          </div>
        </div>
        <div className="select-none text-xs text-neutral-600">삭제</div>
      </div>
      <div className="h-full w-px bg-neutral-300"></div>

      <div className="flex h-full w-fit px-0.5 flex-col items-center justify-between">
        <div className="flex flex-row gap-x-0.5">
          <div className="flex flex-row items-start gap-x-2">
            <div className="flex cursor-not-allowed flex-col items-center gap-y-1 rounded px-1.5 py-0.5 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-plus2 size-10 rounded stroke-neutral-600 stroke-[1.45px] px-2"
              >
                <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M3 15h6"></path>
                <path d="M6 12v6"></path>
              </svg>
              <span className="select-none text-[12.7px] font-medium text-neutral-600">
                새 슬라이드
              </span>
            </div>
            <div className="flex flex-col items-start gap-y-0.5 px-0.5">
              <div className="flex cursor-not-allowed flex-row items-center justify-start gap-x-0.5 rounded p-1 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-scan-text size-5 rounded stroke-neutral-600 p-0.5"
                >
                  <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                  <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                  <path d="M7 8h8"></path>
                  <path d="M7 12h10"></path>
                  <path d="M7 16h6"></path>
                </svg>
                <span className="text-xs font-medium select-none text-neutral-600">
                  복사
                </span>
              </div>
              <div className="flex cursor-not-allowed flex-row items-center justify-start gap-x-0.5 rounded p-1 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-layout-panel-top size-5 rounded stroke-neutral-600 stroke-[2px] p-0.5"
                >
                  <rect width="18" height="7" x="3" y="3" rx="1"></rect>
                  <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                  <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                </svg>
                <span className="text-xs font-medium select-none text-neutral-600">
                  템플릿
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="select-none text-xs text-neutral-600">새 슬라이드</div>
      </div>
      <div className="h-full w-px bg-neutral-300"></div>
    </>
  );
};
RibornContents.insert = () => {
  const { setDiagrams } = useDiagram();

  const makeDiagram = useCallback((type: 'circle' | 'rectangle') => {
    if (type === 'circle') setDiagrams((prev) => [...prev, makeCircle()]);
    if (type === 'rectangle') setDiagrams((prev) => [...prev, makeRectangle()]);
  }, []);

  return (
    <>
      <div className="flex h-full w-fit px-0.5 flex-col items-center justify-between">
        <div className="flex flex-row gap-x-0.5">
          <div className="flex cursor-not-allowed flex-col items-center gap-y-1 rounded px-1.5 py-0.5 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-plus2 size-10 rounded stroke-neutral-600 stroke-[1.45px] px-2"
            >
              <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              <path d="M3 15h6"></path>
              <path d="M6 12v6"></path>
            </svg>
            <span className="select-none text-[12.7px] font-medium text-neutral-600">
              새 슬라이드
            </span>
          </div>
        </div>
        <div className="select-none text-xs text-neutral-600">슬라이드</div>
      </div>
      <div className="h-full w-px bg-neutral-300"></div>

      <div className="flex h-full w-fit px-0.5 flex-col items-center justify-between">
        <div className="flex cursor-not-allowed flex-col items-center gap-y-1 rounded px-1.5 py-0.5 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-text-select size-10 rounded stroke-neutral-600 px-2 select-none"
          >
            <path d="M5 3a2 2 0 0 0-2 2"></path>
            <path d="M19 3a2 2 0 0 1 2 2"></path>
            <path d="M21 19a2 2 0 0 1-2 2"></path>
            <path d="M5 21a2 2 0 0 1-2-2"></path>
            <path d="M9 3h1"></path>
            <path d="M9 21h1"></path>
            <path d="M14 3h1"></path>
            <path d="M14 21h1"></path>
            <path d="M3 9v1"></path>
            <path d="M21 9v1"></path>
            <path d="M3 14v1"></path>
            <path d="M21 14v1"></path>
            <line x1="7" x2="15" y1="8" y2="8"></line>
            <line x1="7" x2="17" y1="12" y2="12"></line>
            <line x1="7" x2="13" y1="16" y2="16"></line>
          </svg>
          <span className="select-none text-[12.7px] font-medium text-neutral-600">
            텍스트 상자
          </span>
        </div>
        <div className="select-none text-xs text-neutral-600">텍스트</div>
      </div>
      <div className="h-full w-px bg-neutral-300"></div>

      <div className="flex h-full w-fit px-0.5 flex-col items-center justify-between">
        <div className="flex flex-row gap-x-0.5">
          <div className="flex cursor-not-allowed flex-col items-center gap-y-1 rounded px-1.5 py-0.5 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-image size-10 rounded stroke-neutral-600 px-2 select-none stroke-[1.55px]"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
              <circle cx="9" cy="9" r="2"></circle>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
            </svg>
            <span className="select-none text-[12.7px] font-medium text-neutral-600">
              그림
            </span>
          </div>
          <div className="flex cursor-not-allowed flex-col items-center gap-y-1 rounded px-1.5 py-0.5 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-video size-10 rounded stroke-neutral-600 px-2 select-none stroke-[1.6px]"
            >
              <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
              <rect x="2" y="6" width="14" height="12" rx="2"></rect>
            </svg>
            <span className="select-none text-[12.7px] font-medium text-neutral-600">
              비디오
            </span>
          </div>
        </div>
        <div className="select-none text-xs text-neutral-600">미디어</div>
      </div>
      <div className="h-full w-px bg-neutral-300"></div>

      <div className="flex h-full w-fit px-0.5 flex-col items-center justify-between">
        <div className="flex flex-row gap-x-0.5">
          <div
            onClick={() => makeDiagram('rectangle')}
            className="flex cursor-not-allowed flex-col items-center gap-y-1 rounded px-1.5 py-0.5 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-rectangle-horizontal size-10 rounded stroke-neutral-600 px-2 select-none stroke-[1.6px]"
            >
              <rect width="20" height="12" x="2" y="6" rx="2"></rect>
            </svg>
            <span className="select-none text-[12.7px] font-medium text-neutral-600">
              사각형
            </span>
          </div>
          <div
            onClick={() => makeDiagram('circle')}
            className="flex cursor-not-allowed flex-col items-center gap-y-1 rounded px-1.5 py-0.5 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle size-10 rounded stroke-neutral-600 px-2 select-none stroke-[1.6px]"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <span className="select-none text-[12.7px] font-medium text-neutral-600">
              원
            </span>
          </div>
        </div>
        <div className="select-none text-xs text-neutral-600">도형</div>
      </div>
      <div className="h-full w-px bg-neutral-300"></div>
    </>
  );
};
RibornContents.slideShow = () => {
  return (
    <>
      <div className="flex h-full w-fit px-0.5 flex-col items-center justify-between">
        <div className="flex flex-row gap-x-0.5">
          <div className="flex cursor-not-allowed flex-col items-center gap-y-1 rounded px-1.5 py-0.5 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-presentation size-10 rounded px-2 select-none bg-green-50 stroke-green-600"
            >
              <path d="M2 3h20"></path>
              <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path>
              <path d="m7 21 5-5 5 5"></path>
            </svg>
            <span className="select-none text-[12.7px] font-medium text-neutral-600">
              처음부터
            </span>
          </div>
          <div className="flex cursor-not-allowed flex-col items-center gap-y-1 rounded px-1.5 py-0.5 transition-all duration-100 hover:bg-neutral-100 active:bg-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-presentation size-10 rounded px-2 select-none bg-blue-50 stroke-blue-600"
            >
              <path d="M2 3h20"></path>
              <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"></path>
              <path d="m7 21 5-5 5 5"></path>
            </svg>
            <span className="select-none text-[12.7px] font-medium text-neutral-600">
              현재 슬라이드부터
            </span>
          </div>
        </div>
        <div className="select-none text-xs text-neutral-600">슬라이드쇼</div>
      </div>
    </>
  );
};

export default RibornContents;
