import React, { useContext } from "react";
import { EdittingContext } from "../../Context/Editting.context";
import Row from "../Row/Row";
import './Editing.css'

const Editing = () => {
  var { displayEditing, setDisplayEditing, data, setData, primaryKey, setPrimaryKey } =
    useContext(EdittingContext);

  var saveData = ()=>{
    if (data !== null || data !== []) {
      const existingAgancy = data.find(
        (d) => d.agancy === data[primaryKey].agancy && d !== data[primaryKey]
      );
      var length = document.getElementsByClassName("warning").length;
      for( var i =0; i<length; i++){
        document.getElementsByClassName("warning")[i].style.display = "none";
      }
      if (existingAgancy) {
        document
          .getElementById(`row_${primaryKey}`)
          .getElementsByClassName("warning")[0].style.display = "block";
        document
          .getElementById(`row_${existingAgancy.id}`)
          .getElementsByClassName("warning")[0].style.display = "block";
      } else if (window.confirm("Are you sure?")) {
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("primary", primaryKey);
        setDisplayEditing('none')
      }
    }
    
  }

  var cancelSaving = ()=>{
    setDisplayEditing("none");
    setPrimaryKey(localStorage.getItem("primary"));
    setData(JSON.parse(localStorage.getItem("data")));
  }

  var dataLength = data.length;
  return (
    <div id="editting_win" style={{ display: `${displayEditing}` }}>
      <div style={{maxHeight: '300px', overflowY: 'scroll'}}>
        <table>
          <thead>
            <tr>
              <th>Agency</th>
              <th>OTOP</th>
              <th>Primary</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((data, index) => {
              return (
                <Row
                  key={`data_${index}`}
                  index={index}
                  rowData={data}
                />
              );
            })}
            <Row
              key={`data_${dataLength}`}
              index={dataLength}
              rowData={{
                agancy: "",
                otop: "",
                primary: false,
              }}
            />
          </tbody>
        </table>
      </div>
      <div>
        <button className="edit-btn" onClick={() => saveData()}>Save</button>
        <button className="edit-btn"  onClick={() => cancelSaving()}>Cancel</button>
      </div>
    </div>
  );
};

export default Editing;
