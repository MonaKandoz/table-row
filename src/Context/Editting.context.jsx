import { createContext, useState } from "react";

var addData = (data, dataToAdd)=>{
   // find if data contains dataToAdd
   const existingData = data.find((d) => d.id === dataToAdd.id);

   // if found, increment quantity
   if (existingData) {
     return data.map((d) =>
       d === existingData ? dataToAdd : d
     );
   }

   return [...data, { ...dataToAdd }];
                  
};

export const EdittingContext = createContext({
  PrimaryKey: '',
  displayEditing: "block",
  addToData: () => {},
  data: [],
});
function getInitialData() {
  const data = localStorage.getItem("data");
  if (data === null || data === []) {
    return [];
  }
  return JSON.parse(data);
}
function getInitialPrimary() {
  const primary = localStorage.getItem("primary");
  if (primary === null || primary === []) {
    return '';
  }
  return primary;
}
export const EdittingProvidor = ({ children }) => {
  const [ displayEditing, setDisplayEditing ] = useState("none");
  const [primaryKey, setPrimaryKey] = useState(getInitialPrimary);
  const [data, setData] = useState(getInitialData);

  const addToData = (dataToAdd) => {
    setData(addData(data, dataToAdd));
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
  };

  return (
    <EdittingContext.Provider value={value}>
      {children}
    </EdittingContext.Provider>
  );
};
