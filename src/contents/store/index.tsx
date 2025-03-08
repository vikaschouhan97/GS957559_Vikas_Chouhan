import { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColDef,
  GridReadyEvent,
  ModuleRegistry,
  NumberFilterModule,
  RowApiModule,
  RowDragModule,
  TextFilterModule,
  ValidationModule,
} from "ag-grid-community";
import { MainWrapper } from "../planning";
import * as XLSX from "xlsx";
import { Box, Button, IconButton } from "@mui/material";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { useDispatch, useSelector } from "react-redux";
import {
  IStoreData,
  setAddStoreDialog,
  setStoreData,
} from "../../slices/excelData";
import { RootState } from "../../store";
import "./index.css";
import { excelLinkUrl } from "../../constants";
import AddStoreDialog from "./addStoreDialog";

// Register AG Grid modules
ModuleRegistry.registerModules([
  TextFilterModule,
  NumberFilterModule,
  RowDragModule,
  ClientSideRowModelModule,
  ValidationModule,
  RowApiModule,
]);

// Custom delete button renderer component for the grid
export const DeleteButtonRenderer = (props: any) => {
  const { storeData } = useSelector((state: RootState) => state.fileData);
  const dispatch = useDispatch();

  // Function to handle deleting a row
  const handleDelete = () => {
    const updatedData = storeData
      .filter((item: any) => item.ID !== props.data.ID)
      .map((item, index) => ({
        ...item,
        seqNo: index + 1, // Reassign sequence numbers after deletion
      }));

    dispatch(setStoreData(updatedData));
  };

  return (
    <IconButton onClick={handleDelete} size="small">
      <DeleteForeverSharpIcon />
    </IconButton>
  );
};

const GridExample = () => {
  const dispatch = useDispatch();
  const { storeData } = useSelector((state: RootState) => state.fileData);

  // Memoized styles to optimize performance
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  // Column definitions for AG Grid
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "", // Empty header for delete button column
      field: "delete",
      width: 50,
      cellRenderer: DeleteButtonRenderer,
    },
    {
      headerName: "S.No.",
      field: "seqNo",
      width: 100,
      rowDrag: true, // Enable row dragging
    },
    { headerName: "Store ID", field: "ID", width: 150, editable: true },
    { headerName: "Store Name", field: "Label", width: 250, editable: true },
    { headerName: "City", field: "City", width: 200, editable: true },
    { headerName: "State", field: "State", width: 100, editable: true },
  ]);

  // Function to update store data on cell value change
  const handleValueSetter = (params: any) => {
    const rowId = params.data.ID;
    const columnId = params.column.colId;
    if (params?.newValue) {
      const newData = storeData?.map((item) =>
        item.ID === rowId ? { ...item, [columnId]: params.newValue } : item
      );
      dispatch(setStoreData(newData));
    }
  };

  // Default column definitions
  const defaultColDef = {
    width: 170,
    valueSetter: handleValueSetter,
  };

  // Function to handle grid initialization and loading data
  const onGridReady = useCallback(async (params: GridReadyEvent) => {
    setGridApi(params.api);

    // Retrieve file data from localStorage if available
    const localFile = localStorage.getItem("file");
    let blob: Blob;

    if (localFile) {
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
      // Fetch default Excel file if local data is unavailable
      const response = await fetch(excelLinkUrl);
      blob = await response.blob();
    }

    if (!blob) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target?.result as string;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Read "Stores" worksheet from Excel file
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
    };

    reader.readAsArrayBuffer(blob);
  }, [localStorage.getItem("file"), dispatch]);

  const [gridApi, setGridApi] = useState<any>(null);

  // Function to update sequence numbers when row dragging stops
  const onDragStopped = useCallback(() => {
    if (!gridApi) return;

    const newOrder = gridApi
      ?.getRenderedNodes()
      ?.map((node: any, index: number) => ({
        ...node.data,
        seqNo: index + 1,
      }));

    dispatch(setStoreData(newOrder));
  }, [gridApi, dispatch]);

  return (
    <MainWrapper sx={{ height: "85%" }}>
      <Box style={containerStyle}>
        <Box style={gridStyle}>
          <AgGridReact
            rowData={storeData}
            columnDefs={columnDefs}
            //@ts-ignore
            defaultColDef={defaultColDef}
            rowDragManaged={true}
            onGridReady={onGridReady}
            onDragStopped={onDragStopped}
          />
        </Box>
      </Box>
      <Button
        onClick={() => dispatch(setAddStoreDialog(true))}
        sx={{
          mt: 2,
          background: "gray",
          color: "#ffff",
          px: 2,
          "&:hover": { background: "gray", opacity: 0.7 },
        }}
      >
        Add Store
      </Button>
      <AddStoreDialog />
    </MainWrapper>
  );
};

export default GridExample;
