// src/context/ExcelDataContext.jsx
import { createContext, useState } from "react";

export const ExcelDataContext = createContext();

export const ExcelDataProvider = ({ children }) => {
  const [excelData, setExcelData] = useState([]);
  const [columns, setColumns] = useState([]);

  return (
    <ExcelDataContext.Provider value={{ excelData, setExcelData, columns, setColumns }}>
      {children}
    </ExcelDataContext.Provider>
  );
};
