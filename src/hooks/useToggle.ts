import { useState, useCallback } from 'react';

// 기본 값으로 'false' 설정 (필요시 true로 설정 가능)
const useToggle = (initialState: boolean = false) => {
  const [state, setState] = useState(initialState);

  // 토글 함수
  const toggle = useCallback((f: boolean | undefined = undefined) => {
    if (f !== undefined) {
      setState(f);
      return;
    }
    setState((prevState) => !prevState);
  }, []);

  return [state, toggle] as const;
};

export default useToggle;
