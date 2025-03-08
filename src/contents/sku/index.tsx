import { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColDef,
  GridReadyEvent,
  ModuleRegistry,
  NumberEditorModule,
  NumberFilterModule,
  RowApiModule,
  RowDragModule,
  TextEditorModule,
  TextFilterModule,
  ValidationModule,
} from "ag-grid-community";
import { MainWrapper } from "../planning";
import * as XLSX from "xlsx";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ISkuData, setSkuData } from "../../slices/excelData";
import { RootState } from "../../store";
import "../store/index.css";
import { DeleteButtonRenderer } from "../store";
import { excelLinkUrl } from "../../constants";

ModuleRegistry.registerModules([
  TextFilterModule,
  NumberFilterModule,
  RowDragModule,
  ClientSideRowModelModule,
  ValidationModule,
  NumberEditorModule,
  TextEditorModule,
  RowApiModule,
]);

const GridExample = () => {
  const dispatch = useDispatch();
  const [gridApi, setGridApi] = useState<any>(null);
  const { skuData } = useSelector((state: RootState) => state.fileData);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "",
      field: "delete",
      width: 50,
      cellRenderer: DeleteButtonRenderer,
    },
    { headerName: "SKU", field: "name", width: 300, editable: true },
    { headerName: "Price", field: "price", width: 150, editable: true },
    { headerName: "Cost", field: "cost", width: 150, editable: true },
  ]);

  const handleValueSetter = (params: any) => {
    const rowId = params.data.ID;
    const columnId = params.column.colId;
    if (params?.newValue) {
      const newData = skuData?.map((item) =>
        item.ID === rowId ? { ...item, [columnId]: params.newValue } : item
      );
      dispatch(setSkuData(newData));
    } else return;
  };
  const defaultColDef = {
    width: 170,
    valueSetter: handleValueSetter,
  };

  const onGridReady = useCallback(async (params: GridReadyEvent) => {
    setGridApi(params.api);

    const response = await fetch(excelLinkUrl);
    const blob = await response.blob();

    if (!blob) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target?.result as string;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Read "Stores" worksheet
      const storesSheet = workbook.Sheets["SKUs"];
      const storeData: any[] = XLSX.utils.sheet_to_json(storesSheet);

      // Format the data
      const formattedStoreData: ISkuData[] = storeData.map((row) => ({
        ID: row["ID"],
        name: row["Label"],
        price: row["Price"],
        cost: row["Cost"].toFixed(2),
      }));
      dispatch(setSkuData(formattedStoreData));
    };

    reader.readAsArrayBuffer(blob);
  }, []);

  const onDragStopped = useCallback(() => {
    if (!gridApi) return;

    const newOrder = gridApi
      ?.getRenderedNodes()
      ?.map((node: any, index: number) => ({
        ...node.data,
        seqNo: index + 1, // Recalculate sequence numbers
      }));

    dispatch(setSkuData(newOrder)); // Update Redux state
  }, [gridApi, dispatch]);

  return (
    <MainWrapper sx={{ height: "85%" }}>
      <Box style={containerStyle}>
        <Box style={gridStyle}>
          <AgGridReact
            rowData={skuData}
            columnDefs={columnDefs}
            //@ts-ignore
            defaultColDef={defaultColDef}
            rowDragManaged={true}
            onGridReady={onGridReady}
            onDragStopped={onDragStopped}
          />
        </Box>
      </Box>
    </MainWrapper>
  );
};

export default GridExample;
