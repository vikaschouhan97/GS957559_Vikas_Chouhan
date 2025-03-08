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
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ISkuData, setAddSkuDialog, setSkuData } from "../../slices/excelData";
import { RootState } from "../../store";
import "../store/index.css";
import { DeleteButtonRenderer } from "../store";
import { excelLinkUrl } from "../../constants";
import AddSkuDialog from "./addSkuDialog";

// Register AG Grid modules for features like filtering, row dragging, validation, and editing
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

  // Memoized styles to prevent unnecessary re-renders
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  // Column definitions for the AG Grid
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "",
      field: "delete",
      width: 50,
      cellRenderer: DeleteButtonRenderer, // Custom delete button component
    },
    { headerName: "SKU", field: "name", width: 300, editable: true },
    { headerName: "Price", field: "price", width: 150, editable: true },
    { headerName: "Cost", field: "cost", width: 150, editable: true },
  ]);

  // Handles cell value updates and updates Redux state
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

  // Default column definition for all columns
  const defaultColDef = {
    width: 170,
    valueSetter: handleValueSetter, // Assign custom value setter
  };

  // Handles grid initialization and data fetching
  const onGridReady = useCallback(async (params: GridReadyEvent) => {
    setGridApi(params.api);

    // Check if a file is stored in localStorage
    const localFile = localStorage.getItem("file");
    let blob: Blob;

    if (localFile) {
      // Convert Base64 string to Blob
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
      // Fetch the default Excel file from the server
      const response = await fetch(excelLinkUrl);
      blob = await response.blob();
    }

    if (!blob) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target?.result as string;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Read the "SKUs" worksheet from the Excel file
      const storesSheet = workbook.Sheets["SKUs"];
      const storeData: any[] = XLSX.utils.sheet_to_json(storesSheet);

      // Format the data into a structured array
      const formattedStoreData: ISkuData[] = storeData.map((row) => ({
        ID: row["ID"],
        name: row["Label"],
        price: row["Price"],
        cost: row["Cost"].toFixed(2), // Ensure cost is formatted correctly
      }));

      // Update Redux state with the formatted data
      dispatch(setSkuData(formattedStoreData));
    };

    // Read the file as an ArrayBuffer
    reader.readAsArrayBuffer(blob);
  }, []);

  // Handles reordering of rows after dragging
  const onDragStopped = useCallback(() => {
    if (!gridApi) return;

    // Reorder rows and update Redux state
    const newOrder = gridApi
      ?.getRenderedNodes()
      ?.map((node: any, index: number) => ({
        ...node.data,
        seqNo: index + 1,
      }));

    dispatch(setSkuData(newOrder));
  }, [gridApi, dispatch]);

  return (
    <MainWrapper sx={{ height: "85%" }}>
      <Box style={containerStyle}>
        <Box style={gridStyle}>
          <AgGridReact
            rowData={skuData} // Data for the grid
            columnDefs={columnDefs} // Column definitions
            //@ts-ignore
            defaultColDef={defaultColDef} // Default column behavior
            rowDragManaged={true} // Enable drag-and-drop row reordering
            onGridReady={onGridReady} // Callback when grid is ready
            onDragStopped={onDragStopped} // Handle row drag stop event
          />
        </Box>
      </Box>
      {/* Button to open the 'Add SKU' dialog */}
      <Button
        onClick={() => dispatch(setAddSkuDialog(true))}
        sx={{
          mt: 2,
          background: "gray",
          color: "#ffff",
          px: 2,
          "&:hover": { background: "gray", opacity: 0.7 },
        }}
      >
        Add SKU
      </Button>
      {/* Dialog component to add a new SKU */}
      <AddSkuDialog />
    </MainWrapper>
  );
};

export default GridExample;
