import Canvas from './components/Canvas';
import SettingBar from './components/SettingBar';
import ToolBar from './components/ToolBar';

import "./styles/app.scss";


function App() {
  return (
    <div className="App">
      <ToolBar></ToolBar>
      <SettingBar></SettingBar>
      <Canvas></Canvas>
    </div>
  );
}

export default App;
