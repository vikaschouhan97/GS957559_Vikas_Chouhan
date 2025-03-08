import React, { useState } from "react";
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
{
  /* eslint-disable */
}
const ChartExample = () => {
  const [currentData, setCurrentData] = useState<{ [key: string]: any[] }>({});
  const [selectedStore, setSelectedStore] = useState<string>("");

  const { storeData } = useSelector((state: RootState) => state.fileData);

  const dispatch = useDispatch();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const planningSheet: any = XLSX.utils.sheet_to_json(
        workbook.Sheets["Planning"],
        { header: 1 }
      );
      const skuSheet = XLSX.utils.sheet_to_json(workbook.Sheets["SKUs"], {
        header: 1,
      });

      // Read "Stores" worksheet
      const storesSheet = workbook.Sheets["Stores"];
      const storeData: any[] = XLSX.utils.sheet_to_json(storesSheet);

      // Format the data
      const formattedStoreData: IStoreData[] = storeData.map((row, index) => ({
        seqNo: row["Seq No."] || index + 1,
        ID: row["ID"],
        Label: row["Label"],
        City: row["City"],
        State: row["State"],
      }));
      dispatch(setStoreData(formattedStoreData));

      const skuMap: any = skuSheet.reduce((acc: any, row: any) => {
        acc[row[0]] = { price: row[4], cost: row[5] };
        return acc;
      }, {});

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
      console.log("formattedData", { ...formattedData });
      setCurrentData(formattedData);
      setSelectedStore(Object.keys(formattedData)[0] || "");
    };
    reader.readAsArrayBuffer(file);
  };

  const chartData = currentData[selectedStore] || [];

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
        <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
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
              <AgCharts options={options} style={{ width: "100%", height: "95%" }} />
          </>
        )}
      </div>
    </MainWrapper>
  );
};

export default ChartExample;
