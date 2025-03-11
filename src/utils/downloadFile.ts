import html2canvas from 'html2canvas-pro';

export const downloadPNGFile = () => {
  const canvas = document.getElementById('canvas') as HTMLDivElement;

  if (canvas) {
    // 캔버스 스타일을 리셋 (그림자 및 굴곡 효과 제거)
    const originalStyle = canvas.style.cssText; // 원래 스타일을 저장
    canvas.style.boxShadow = 'none'; // 그림자 효과 제거
    canvas.style.borderRadius = '0'; // 굴곡 제거
    canvas.style.position = 'absolute';

    // html2canvas로 캡처
    html2canvas(canvas).then((canvas) => {
      // 캡처한 캔버스를 Data URL로 변환
      const imgDataUrl = canvas.toDataURL('image/png');

      // PNG 다운로드 링크 생성
      const pngLink = document.createElement('a');
      pngLink.href = imgDataUrl;
      pngLink.download = 'screenshot.png';
      pngLink.click();

      // PNG 다운로드 후 원래 스타일로 복원
      canvas.style.cssText = originalStyle;
    });
  }
};

export const downloadSVGFile = (zoomLevel: number) => {
  const canvas = document.getElementById('canvas') as HTMLDivElement;

  if (canvas) {
    // 캔버스 스타일을 리셋 (그림자 및 굴곡 효과 제거)
    const originalStyle = canvas.style.cssText; // 원래 스타일을 저장
    canvas.style.position = 'absolute';
    canvas.style.boxShadow = 'none'; // 그림자 효과 제거
    canvas.style.borderRadius = '0'; // 굴곡 제거

    // html2canvas로 캡처
    html2canvas(canvas).then((canvas) => {
      // 캡처한 캔버스를 Data URL로 변환
      const imgDataUrl = canvas.toDataURL('image/png');

      // 캡처한 캔버스의 크기 동적으로 가져오기
      const width = canvas.width;
      const height = canvas.height;

      // SVG로 변환
      const svgBlob = new Blob(
        [
          `<svg xmlns="http://www.w3.org/2000/svg" width="${width / zoomLevel}" height="${height / zoomLevel}">
                        <image href="${imgDataUrl}" width="${width / zoomLevel}" height="${height / zoomLevel}"/>
                    </svg>`,
        ],
        { type: 'image/svg+xml' }
      );
      const svgUrl = URL.createObjectURL(svgBlob);

      // SVG 다운로드 링크 생성
      const svgLink = document.createElement('a');
      svgLink.href = svgUrl;
      svgLink.download = 'screenshot.svg';
      svgLink.click();

      // URL 해제
      URL.revokeObjectURL(svgUrl);

      // 원래 스타일로 복원
      canvas.style.cssText = originalStyle;
    });
  }
};
