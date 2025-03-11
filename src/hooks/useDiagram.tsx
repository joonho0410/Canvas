import { ReactNode, createContext, useContext, useState } from 'react';
import { CircleType, RectangleType } from '../type/diagramType';

type ZoomLevelContextType = {
  diagrams: (CircleType | RectangleType)[];
  setDiagrams: React.Dispatch<
    React.SetStateAction<(CircleType | RectangleType)[]>
  >;
};

const diagramContext = createContext<null | ZoomLevelContextType>(null);

export const DiagramProvider = ({ children }: { children: ReactNode }) => {
  const [diagrams, setDiagrams] = useState<(CircleType | RectangleType)[]>([]);

  return (
    <diagramContext.Provider value={{ diagrams, setDiagrams }}>
      {children}
    </diagramContext.Provider>
  );
};

export const useDiagram = () => {
  const context = useContext(diagramContext);

  if (!context) {
    throw Error('DiagramProvider의 내부에서 사용되어야 합니다.');
  }

  return context;
};
