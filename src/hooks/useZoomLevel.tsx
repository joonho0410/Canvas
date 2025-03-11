import { ReactNode, createContext, useContext, useState } from 'react';

type ZoomLevelContextType = {
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
};
const zoomLevelContext = createContext<null | ZoomLevelContextType>(null);

export const ZoomLevelProvider = ({ children }: { children: ReactNode }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <zoomLevelContext.Provider value={{ zoomLevel, setZoomLevel }}>
      {children}
    </zoomLevelContext.Provider>
  );
};

export const useZoomLevel = () => {
  const context = useContext(zoomLevelContext);

  if (!context) {
    throw Error('ZoomLevelProvider의 내부에서 사용되어야 합니다.');
  }

  return context;
};
