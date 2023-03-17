import React, { useContext } from "react";
import { EdittingContext } from "../../Context/Editting.context";

const Row = (props) => {
  var { primaryKey, setPrimaryKey, addToData, setData, dataToView } =
    useContext(EdittingContext);
  var { index, rowData } = props;
 
  var changeData = () => {
    addToData(
      {
        id: index,
        agancy: document.getElementById(`agancy_${index}`).value,
        otop: document.getElementById(`otop_${index}`).value
      }
    );
  };
  var setPrimary = () => {
    setPrimaryKey(index);
  };

  var resetData = ()=>{
    if (window.confirm("Are you sure?")) {
     /*  setPrimaryKey( localStorage.getItem("primary"))
      setData(JSON.parse(localStorage.getItem("data"))); */
      if(primaryKey === index){
         setPrimaryKey("")
      }
    }
  }
 
  return (
    <>
      <tr
        className={`row_${rowData.agancy}`}
        id={`${rowData.agancy}_${rowData.id}`}
      >
        <td style={{ position: "relative" }}>
          <select
            id={`agancy_${index}`}
            className="Agancy input"
            name="agancy"
            defaultValue={rowData.agancy ? rowData.agancy : "default"}
            onChange={() => changeData()}
          >
            <option disabled value="default"></option>
            <option value="88">88: ABCDDE</option>
            <option value="AF">AF: American Tissue Serviers Foundation</option>
            <option value="BU">ConnectLife (fomerly UNYTS)</option>
            <option value="BX">BXP Bovine</option>
            <option value="CN">Honor Bridge</option>
            <option value="DA">Donor Aliance</option>
            <option value="DN">Donor Network of Arizona</option>
            <option value="KM">Midwest Trasplant Network</option>
          </select>
          <span className="warning">!</span>
        </td>
        <td>
          <input
            id={`otop_${index}`}
            type="text"
            name="OTOP"
            className="input"
            value={rowData.otop ? rowData.otop : ""}
            onChange={() => changeData()}
            autoFocus={dataToView.length - 1 === index ? "autofocus" : ""}
          />
        </td>
        <td>
          <label className="container">
            <input
              id={`primary_${index}`}
              type="radio"
              className="primary input"
              name="primary"
              value={rowData.otop}
              checked={parseInt(primaryKey) === index ? true : false}
              onChange={() => setPrimary()}
              disabled={dataToView.length === index ? "disabled" : ""}
            />
            <span className="checkmark"></span>
          </label>
        </td>
        <td>
          <button
            className="del-btn"
            onClick={() => resetData(index)}
            disabled={dataToView.length === index ? "disabled" : ""}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Row;
