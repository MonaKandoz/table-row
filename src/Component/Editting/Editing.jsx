import React, { useContext } from "react";
import { EdittingContext } from "../../Context/Editting.context";
import Row from "../Row/Row";
import './Editing.css'

const Editing = () => {
  var {
    displayEditing,
    setDisplayEditing,
    data,
    setData,
    dataToView,
    setDataToView,
    setNewData,
    newData,
    primaryKey,
    setPrimaryKey,
  } = useContext(EdittingContext);

  var saveData = ()=>{
    if (dataToView !== null || dataToView !== []) {
      const duplicateAgancy = dataToView
        .map((e) => e["agancy"])
        .map((e, i, final) => final.indexOf(e) !== i && i)
        .filter((obj) => dataToView[obj])
        .map((e) => dataToView[e]["agancy"]);

      var length = document.getElementsByClassName("warning").length;
      for (var i = 0; i < length; i++) {
        document.getElementsByClassName("warning")[i].style.display = "none";
      }
      if (duplicateAgancy.length !== 0) {
        for (var j = 0; j < duplicateAgancy.length; j++) {
          var repeated = document.querySelectorAll(
            `.row_${duplicateAgancy[j]}`
          );
          for (var r = 0; r < repeated.length; r++) {
            var repeatedID = repeated[r].id;
            document
              .getElementById(repeatedID)
              .getElementsByClassName("warning")[0].style.display = "block";
          }
        }
      } else if (window.confirm("Are you sure?")) {
        setDisplayEditing("none");
        if (newData !== []) {
          setData(dataToView);
          for (var n = 0; n < newData.length; n++) {
            let dataToPost = newData[n];
            const existingData = data.find((d) => d.id === dataToPost.id);
             
            if (existingData){
              fetch(`http://localhost:3004/data/${dataToPost.id}`, {
                method: "PUT",
                body: JSON.stringify({
                  ...dataToPost,
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              }).catch((err) => {
                  console.log(err.message);
                });
            }else{
              fetch("http://localhost:3004/data", {
                method: "POST",
                body: JSON.stringify({
                  ...dataToPost,
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              }).catch((err) => {
                  console.log(err.message);
                });
              }
          }
          
        }

        fetch("http://localhost:3004/primary", {
          method: "POST",
          body: JSON.stringify({
            id: primaryKey,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle data
            localStorage.setItem("primary", data.id);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
    setNewData([]);
  }

  var cancelSaving = ()=>{
    setDisplayEditing("none");
    setPrimaryKey(localStorage.getItem("primary"));
    setDataToView(data);
  }

  var dataLength = dataToView.length;
  return (
    <div id="editting_win" style={{ display: `${displayEditing}` }}>
      <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
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
            {dataToView?.map((data, index) => {
              return (
                <Row
                  key={`data_${index}`}
                  index={data.id}
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
        <button className="edit-btn" onClick={() => saveData()}>
          Save
        </button>
        <button className="edit-btn" onClick={() => cancelSaving()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Editing;
