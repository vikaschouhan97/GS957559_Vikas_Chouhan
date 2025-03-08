import React, { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
import * as XLSX from "xlsx";
import {
  AgBarSeriesOptions,
  AgCategoryAxisOptions,
  AgChartOptions,
  AgLineSeriesOptions,
  AgNumberAxisOptions,
} from "ag-charts-community";
import { MainWrapper } from "../planning";
import { IStoreData, setStoreData } from "../../slices/excelData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { excelLinkUrl } from "../../constants";

const ChartExample = () => {
  const [currentData, setCurrentData] = useState<{ [key: string]: any[] }>({});
  const [selectedStore, setSelectedStore] = useState<string>("");

  const { storeData, fileAdded } = useSelector(
    (state: RootState) => state.fileData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleFileUpload();
  }, []);

  useEffect(() => {
    handleFileUpload();
  }, [fileAdded]);

  const handleFileUpload = async () => {
    const localFile = localStorage.getItem("file");
    let blob: Blob;

    // Retrieve file from local storage if available, otherwise fetch from external URL
    if (localFile) {
      const base64Data = JSON.parse(localFile);
      const byteCharacters = atob(base64Data.split(",")[1]); // Decode Base64
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      blob = new Blob([byteArray], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
    } else {
      const response = await fetch(excelLinkUrl);
      blob = await response.blob();
    }

    if (!blob) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      // Extract data from relevant sheets
      const planningSheet: any = XLSX.utils.sheet_to_json(
        workbook.Sheets["Planning"],
        { header: 1 }
      );
      const skuSheet = XLSX.utils.sheet_to_json(workbook.Sheets["SKUs"], {
        header: 1,
      });

      // Extract store data
      const storesSheet = workbook.Sheets["Stores"];
      const storeData: any[] = XLSX.utils.sheet_to_json(storesSheet);

      // Format store data for Redux state
      const formattedStoreData: IStoreData[] = storeData.map((row, index) => ({
        seqNo: row["Seq No."] || index + 1,
        ID: row["ID"],
        Label: row["Label"],
        City: row["City"],
        State: row["State"],
      }));
      dispatch(setStoreData(formattedStoreData));

      // Create a mapping of SKU price and cost
      const skuMap: any = skuSheet.reduce((acc: any, row: any) => {
        acc[row[0]] = { price: row[4], cost: row[5] };
        return acc;
      }, {});

      // Aggregate data by store and week
      const storeAggregatedData: any = {};
      for (let i = 1; i < planningSheet.length; i++) {
        const [store, sku, week, salesUnits] = planningSheet[i];
        if (!skuMap[sku]) continue;
        const { price, cost } = skuMap[sku];

        const salesDollars = salesUnits * price;
        const gmDollars = salesDollars - salesUnits * cost;
        const gmPercent = salesDollars ? gmDollars / salesDollars : 0;

        if (!storeAggregatedData[store]) storeAggregatedData[store] = {};
        if (!storeAggregatedData[store][week])
          storeAggregatedData[store][week] = {
            gmDollars: 0,
            gmPercent: 0,
            count: 0,
          };

        storeAggregatedData[store][week].gmDollars += gmDollars;
        storeAggregatedData[store][week].gmPercent += gmPercent;
        storeAggregatedData[store][week].count++;
      }

      // Format aggregated data for chart display
      const formattedData: { [key: string]: any[] } = {};
      Object.keys(storeAggregatedData).forEach((store) => {
        formattedData[store] = Object.keys(storeAggregatedData[store]).map(
          (week) => ({
            week,
            gmDollars: storeAggregatedData[store][week].gmDollars,
            gmPercent:
              storeAggregatedData[store][week].gmPercent /
              storeAggregatedData[store][week].count,
          })
        );
      });
      setCurrentData(formattedData);
      setSelectedStore(Object.keys(formattedData)[0] || "");
    };
    reader.readAsArrayBuffer(blob);
  };

  // Retrieve chart data for the selected store
  const chartData = currentData[selectedStore] || [];

  // Define chart configuration options
  const options: AgChartOptions = {
    title: { text: "Gross Margin" },
    data: chartData,
    series: [
      {
        type: "bar",
        xKey: "week",
        yKey: "gmDollars",
        yName: "GM Dollars",
      } as AgBarSeriesOptions,
      {
        type: "line",
        xKey: "week",
        yKey: "gmPercent",
        yName: "GM %",
      } as AgLineSeriesOptions,
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        label: { rotation: -90 },
      } as AgCategoryAxisOptions,
      {
        type: "number",
        position: "left",
        keys: ["gmDollars"],
        tick: { count: 10 },
      } as AgNumberAxisOptions,
      {
        type: "number",
        position: "right",
        keys: ["gmPercent"],
        label: { format: ".0%" },
        tick: { count: 10 },
      } as AgNumberAxisOptions,
    ],
  };

  return (
    <MainWrapper>
      <div style={{ width: "100%", height: "100%" }}>
        {Object.keys(currentData).length > 0 && (
          <>
            <label>Select Store: </label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              {Object.keys(currentData).map((store) => (
                <option key={store} value={store}>
                  {storeData?.find((s) => s.ID === store)?.Label}
                </option>
              ))}
            </select>
            <AgCharts
              options={options}
              style={{ width: "100%", height: "95%" }}
            />
          </>
        )}
      </div>
    </MainWrapper>
  );
};

export default ChartExample;
