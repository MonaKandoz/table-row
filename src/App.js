import { useContext } from "react";
import { EdittingContext } from "./Context/Editting.context";

import Editing from "./Component/Editting/Editing";

function App() {
  var {
    setDisplayEditing,
    primaryKey,
    data
  } = useContext(EdittingContext);
  console.log(data, primaryKey);
  console.log(data !== [] && primaryKey !== "");
  return (
    <div className="App">
      <label htmlFor="OTPO">OTPO</label>
      <input
        type="text"
        id="OTPO"
        value={data  && primaryKey !== ''  ? data[primaryKey].otop : ""}
        readOnly
      />
      <button onClick={() => setDisplayEditing("flex")}>Edit</button>
      <Editing />
    </div>
  );
}

export default App;
