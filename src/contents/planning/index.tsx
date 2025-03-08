import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  CellStyleModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  NumberEditorModule,
  TextEditorModule,
} from "ag-grid-community";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { Box, styled } from "@mui/material";
import "./index.css";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { setCalendarData } from "../../slices/excelData";
import { RootState } from "../../store";
import {
  defaultColDef,
  rightAlignRule,
  cellClassRules,
  excelLinkUrl,
} from "../../constants";

// Register AG Grid modules required for this component
ModuleRegistry.registerModules([
  NumberEditorModule,
  TextEditorModule,
  CellStyleModule,
  ClientSideRowModelModule,
]);

// Styled wrapper for the data grid
export const MainWrapper = styled(Box)(() => ({
  width: "100%",
  marginLeft: "170px",
  height: "93%",
  marginTop: "60px",
  padding: "16px",
  background: "#d0d0d0",
}));

const DataViewer: React.FC = () => {
  const dispatch = useDispatch();
  const [currentMonthIndex] = useState(0);
  const { calendarData } = useSelector((state: RootState) => state.fileData);

  // Fetch and process Excel data on grid initialization
  const onGridReady = async () => {
    try {
      const localFile = localStorage.getItem("file");
      let blob: Blob;

      if (localFile) {
        // Convert base64 stored file back to a Blob
        const base64Data = JSON.parse(localFile);
        const byteCharacters = atob(base64Data.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        blob = new Blob([byteArray], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
      } else {
        // Fetch file from a predefined URL if not found in local storage
        const response = await fetch(excelLinkUrl);
        blob = await response.blob();
      }

      if (!blob) return;
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);

      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
          type: "array",
        });

        // Extract data from relevant worksheets
        const calendarSheet = workbook.Sheets["Calendar"];
        const calendarData: any[] = XLSX.utils.sheet_to_json(calendarSheet);

        const planningSheet = workbook.Sheets["Planning"];
        const planningData: any[] = XLSX.utils.sheet_to_json(planningSheet);

        const skusSheet = workbook.Sheets["SKUs"];
        const skusData: any[] = XLSX.utils.sheet_to_json(skusSheet);

        // Create a lookup map for SKU prices
        const skuPriceMap: Record<string, any> = {};
        skusData.forEach(({ ID, Label, Price, Cost }) => {
          skuPriceMap[ID] = {
            price: parseFloat(Price),
            Label,
            cost: parseFloat(Cost),
          };
        });

        // Create a lookup map for Store labels
        const storesSheet = workbook.Sheets["Stores"];
        const storeData: any[] = XLSX.utils.sheet_to_json(storesSheet);

        const storeMap: Record<string, number> = {};
        storeData.forEach(({ ID, Label }) => {
          storeMap[ID] = Label;
        });

        // Organize Calendar data by Month and Week
        const monthOrder: string[] = [];
        const weekOrder: string[] = [];
        const groupedData: { [month: string]: any } = {};

        calendarData.forEach((row) => {
          const {
            "Month Label": monthLabel,
            "Week Label": weekLabel,
            Week,
          } = row;

          if (!monthOrder.includes(monthLabel)) monthOrder.push(monthLabel);
          if (!weekOrder.includes(Week)) weekOrder.push(Week);

          if (!groupedData[monthLabel]) {
            groupedData[monthLabel] = { headerName: monthLabel, children: [] };
          }

          let weekData = groupedData[monthLabel].children.find(
            (w: any) => w.week === Week
          );
          if (!weekData) {
            weekData = { headerName: weekLabel, week: Week, children: [] };
            groupedData[monthLabel].children.push(weekData);
          }
        });

        // Integrate Planning data and calculate financial metrics
        planningData.forEach(
          ({ Store, SKU, Week, "Sales Units": SalesUnits }) => {
            const price = skuPriceMap[SKU].price || 0;
            const cost = skuPriceMap[SKU].cost || 0;
            const skuLabel = skuPriceMap[SKU].Label;
            const storeLabel = storeMap[Store];
            const salesDollar = price * SalesUnits;
            const gmDollar = salesDollar - SalesUnits * cost;
            const gmPercent = Math.trunc((gmDollar / salesDollar) * 100) || 0;

            Object.values(groupedData).forEach((monthData: any) => {
              const weekData = monthData.children.find(
                (w: any) => w.week === Week
              );
              if (weekData) {
                weekData.children.push({
                  Store,
                  SKU,
                  SalesUnits,
                  SalesDollar: salesDollar.toFixed(2),
                  skuLabel,
                  storeLabel,
                  gmDollar: gmDollar.toFixed(2),
                  gmPercent,
                });
              }
            });
          }
        );

        // Sort data to ensure consistent ordering
        const sortedData = monthOrder
          .map((month) => groupedData[month])
          .filter(Boolean)
          .map((monthData) => ({
            ...monthData,
            children: monthData.children.sort(
              (a: any, b: any) =>
                weekOrder.indexOf(a.week) - weekOrder.indexOf(b.week)
            ),
          }));

        // Update Redux store with processed data
        dispatch(setCalendarData(sortedData));
      };
    } catch (error) {
      //eslint-disable-next-line
      console.error("Error fetching data:", error);
    }
  };

  // Initialize row data from Redux state
  const [rowData, setRowData] = useState(
    calendarData[currentMonthIndex]?.children
      ?.map((items) => [...items.children])
      .flat() || []
  );

  // Update row data when calendar data changes
  useEffect(() => {
    setRowData(
      calendarData[currentMonthIndex]?.children
        ?.map((items) => [...items.children])
        .flat() || []
    );
  }, [calendarData]);

  // Define AG Grid column definitions
  const columnDefs: (ColDef | ColGroupDef)[] = [
    { headerName: "Store", field: "storeLabel", pinned: "left", width: 250 },
    { headerName: "SKU", field: "skuLabel", pinned: "left", width: 250 },
    ...(calendarData ?? []).map((month) => ({
      headerName: month.headerName,
      children: (month.children ?? []).map((item) => ({
        headerName: item.headerName,
        children: [
          {
            headerName: "Sales Units",
            field: "SalesUnits",
            cellStyle: rightAlignRule,
            width: 130,
          },
          {
            headerName: "Sales Dollars",
            field: "SalesDollar",
            valueFormatter: (params: any): any => `$${params.value}`,
            cellStyle: rightAlignRule,
            width: 130,
          },
          {
            headerName: "GM Dollars",
            field: "gmDollar",
            valueFormatter: (params: { value: number }) => `$${params.value}`,
            cellStyle: rightAlignRule,
            width: 130,
          },
          {
            headerName: "GM Percent",
            field: "gmPercent",
            valueFormatter: (params: { value: number }) => `${params.value}%`,
            cellStyle: rightAlignRule,
            cellClassRules,
            width: 130,
          },
        ],
      })),
    })),
  ];

  return (
    <MainWrapper>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        modules={[ClientSideRowModelModule]}
        debug
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
      />
    </MainWrapper>
  );
};

export default DataViewer;
