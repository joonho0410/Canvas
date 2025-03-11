import Footer from './components/footer/footer';
import Header from './components/header/header';
import CanvasContainer from './components/canvas/canvasContainer';
import { ZoomLevelProvider } from './hooks/useZoomLevel';
import { DiagramProvider } from './hooks/useDiagram';

function App() {
  return (
    <div className="flex h-screen w-screen flex-col justify-between bg-gray-100 text-black">
      <ZoomLevelProvider>
        <DiagramProvider>
          <div className="flex h-full w-full flex-col justify-between">
            <Header />
            <CanvasContainer />
          </div>
          <Footer />
        </DiagramProvider>
      </ZoomLevelProvider>
    </div>
  );
}

export default App;
