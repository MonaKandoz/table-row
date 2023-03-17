import { createContext, useState, useEffect } from "react";

var addData = (data, dataToAdd)=>{
  if(data !== []){
   // find if data contains dataToAdd
   const existingData = data.find((d) => d.id === dataToAdd.id);

   // if found, increment quantity
   if (existingData) {
     return data.map((d) =>
       d === existingData ? dataToAdd : d
     );
   }
  }

   return [...data, { ...dataToAdd }];
                  
};

export const EdittingContext = createContext({
  PrimaryKey: '',
  displayEditing: "block",
  addToData: () => {},
  data: [],
});

export const EdittingProvidor = ({ children }) => {
  const [ displayEditing, setDisplayEditing ] = useState("none");
  const [primaryKey, setPrimaryKey] = useState('');
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [dataToView, setDataToView] = useState(data);
 
  useEffect(() => {
    fetch("http://localhost:3004/data")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setDataToView(json);
      });

      fetch("http://localhost:3004/primary")
        .then((res) => res.json())
        .then((json) => {
          setPrimaryKey(json.id);
          localStorage.setItem("primary", json.id);
        });
  }, []);

  const addToData = (dataToAdd) => {
    setDataToView(addData(dataToView, dataToAdd));
    setNewData(addData(newData, dataToAdd));
    return;
  };
  const value = {
    displayEditing,
    setDisplayEditing,
    primaryKey,
    setPrimaryKey,
    addToData,
    data,
    setData,
    newData,
    dataToView,
    setDataToView,
    setNewData,
  };
  
  return (
    <EdittingContext.Provider value={value}>
      {children}
    </EdittingContext.Provider>
  );
};
