import { useContext } from "react";
import { EdittingContext } from "./Context/Editting.context";

import Editing from "./Component/Editting/Editing";

function App() {
  var { setDisplayEditing, primaryKey, dataToView } = useContext(EdittingContext);
    
  return (
    <div className="App">
      <label htmlFor="OTPO">OTPO</label>
      <input
        type="text"
        id="OTPO"
        value={
          dataToView !== [] && primaryKey !== ""
            ? dataToView[primaryKey].otop
            : ""
        }
        readOnly
      />
      <button onClick={() => setDisplayEditing("flex")}>Edit</button>
      <Editing />
    </div>
  );
}

export default App;
