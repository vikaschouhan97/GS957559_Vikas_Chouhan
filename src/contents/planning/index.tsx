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
import { defaultColDef, rightAlignRule, cellClassRules } from "../../constants";

ModuleRegistry.registerModules([
  NumberEditorModule,
  TextEditorModule,
  CellStyleModule,
  ClientSideRowModelModule,
]);

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

  const onGridReady = async () => {
    try {
      const response = await fetch("https://res.cloudinary.com/dga7peviw/raw/upload/v1741378505/GSIV25_-_Sample_Data_bzxej5.xlsx");
      const blob = await response.blob();
      if (!blob) return;
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);

      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
          type: "array",
        });

        // Read "Calendar" worksheet
        const calendarSheet = workbook.Sheets["Calendar"];
        const calendarData: any[] = XLSX.utils.sheet_to_json(calendarSheet);

        // Read "Planning" worksheet
        const planningSheet = workbook.Sheets["Planning"];
        const planningData: any[] = XLSX.utils.sheet_to_json(planningSheet);

        // Read "SKUs" worksheet to get prices
        const skusSheet = workbook.Sheets["SKUs"];
        const skusData: any[] = XLSX.utils.sheet_to_json(skusSheet);

        // Create a lookup map for SKU prices
        const skuPriceMap: Record<string, any> = {};
        skusData.forEach(({ ID, Label, Price, Cost }) => {
          skuPriceMap[ID] = {
            price: parseFloat(Price),
            Label,
            cost: parseFloat(Cost),
          }; // Store SKU price
        });

        // Read "Store" worksheet to get Labels
        const storesSheet = workbook.Sheets["Stores"];
        const storeData: any[] = XLSX.utils.sheet_to_json(storesSheet);

        const storeMap: Record<string, number> = {};
        storeData.forEach(({ ID, Label }) => {
          storeMap[ID] = Label; // Store SKU price
        });

        // Extract Month & Week order from Calendar sheet
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

        // Merge Planning data into groupedData and compute Sales Dollar
        planningData.forEach(
          ({ Store, SKU, Week, "Sales Units": SalesUnits }) => {
            const price = skuPriceMap[SKU].price || 0; // Get price, default to 0 if not found
            const cost = skuPriceMap[SKU].cost || 0;
            const skuLabel = skuPriceMap[SKU].Label;
            const storeLabel = storeMap[Store];
            const salesDollar = price * SalesUnits; // Compute Sales Dollar
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

        // Sort by monthOrder and then by weekOrder
        const sortedData = monthOrder
          .map((month) => groupedData[month])
          .filter(Boolean) // Remove undefined entries
          .map((monthData) => ({
            ...monthData,
            children: monthData.children.sort(
              (a: any, b: any) =>
                weekOrder.indexOf(a.week) - weekOrder.indexOf(b.week)
            ),
          }));

        dispatch(setCalendarData(sortedData));
      };
    } catch (error) {
      //eslint-disable-next-line
      console.error("Error fetching data:", error);
    }
  };

  const [rowData, setRowData] = useState(
    calendarData[currentMonthIndex]?.children
      ?.map((items) => [...items.children])
      .flat() || []
  );

  useEffect(() => {
    setRowData(
      calendarData[currentMonthIndex]?.children
        ?.map((items) => [...items.children])
        .flat() || []
    );
  }, [calendarData]);

  const columnDefs: (ColDef | ColGroupDef)[] = [
    { headerName: "Store", field: "storeLabel", pinned: "left", width: 250 },
    { headerName: "SKU", field: "skuLabel", pinned: "left", width: 250 },
    {
      headerName: calendarData[currentMonthIndex]?.headerName,
      children: calendarData[currentMonthIndex]?.children?.map((item) => ({
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
            valueFormatter: (params) => `$${params.value}`,
            cellStyle: rightAlignRule,
            width: 130,
          },
          {
            headerName: "GM Dollars",
            field: "gmDollar",
            valueFormatter: (params) => `$${params.value}`,
            cellStyle: rightAlignRule,
            width: 130,
          },
          {
            headerName: "GM Percent",
            field: "gmPercent",
            valueFormatter: (params) => `${params.value}%`,
            cellStyle: rightAlignRule,
            cellClassRules,
            width: 130,
          },
        ],
      })),
    },
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
