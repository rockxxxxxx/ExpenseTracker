import "./App.css";

import Navigation from "./router/Navigation";
import Signup from "./component/signup/Signup";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Signup />
    </div>
  );
}

export default App;
