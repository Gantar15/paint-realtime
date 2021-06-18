import Canvas from './components/Canvas';
import SettingBar from './components/SettingBar';
import ToolBar from './components/ToolBar';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import "./styles/app.scss";


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/:id'>
            <ToolBar></ToolBar>
            <SettingBar></SettingBar>
            <Canvas></Canvas>
          </Route>
          <Redirect to={`h${new Date().getTime().toString(16)}`}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
