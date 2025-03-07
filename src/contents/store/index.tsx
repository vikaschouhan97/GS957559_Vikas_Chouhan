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
import { Box, IconButton } from "@mui/material";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { useDispatch, useSelector } from "react-redux";
import { setStoreData } from "../../slices/excelData";
import { RootState } from "../../store";

ModuleRegistry.registerModules([
  TextFilterModule,
  NumberFilterModule,
  RowDragModule,
  ClientSideRowModelModule,
  ValidationModule,
  RowApiModule,
]);

const GridExample = () => {
  const dispatch = useDispatch();

  const { storeData } = useSelector((state: RootState) => state.fileData);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const DeleteButtonRenderer = (props: any) => {
    const { storeData } = useSelector((state: RootState) => state.fileData);
    const handleDelete = () => {
      const updatedData = storeData
        .filter((item: any) => item.ID !== props.data.ID)
        .map((item, index) => ({
          ...item,
          seqNo: index + 1,
        }));

      dispatch(setStoreData(updatedData));
    };
    return (
      <IconButton onClick={handleDelete} size="small" color="error">
        <DeleteForeverSharpIcon />
      </IconButton>
    );
  };
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "",
      field: "delete",
      width: 100,
      cellRenderer: DeleteButtonRenderer,
    },
    {
      headerName: "S.No.",
      field: "seqNo",
      width: 100,
      rowDrag: true,
      editable: true,
    },
    { headerName: "Store ID", field: "ID", width: 150, editable: true },
    { headerName: "Store Name", field: "Label", width: 250, editable: true },
    { headerName: "City", field: "City", width: 200, editable: true },
    { headerName: "State", field: "State", width: 100, editable: true },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 170,
    };
  }, []);

  const onGridReady = useCallback(async (params: GridReadyEvent) => {
    setGridApi(params.api);

    const response = await fetch("/assets/file/sampleFile.xlsx");
    const blob = await response.blob();

    if (!blob) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target?.result as string;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Read "Stores" worksheet
      const storesSheet = workbook.Sheets["Stores"];
      const storeData: any[] = XLSX.utils.sheet_to_json(storesSheet);

      // Format the data
      const formattedStoreData: any = storeData.map((row, index) => ({
        seqNo: row["Seq No."] || index + 1,
        ID: row["ID"],
        Label: row["Label"],
        City: row["City"],
        State: row["State"],
      }));
      dispatch(setStoreData(formattedStoreData));
    };

    reader.readAsArrayBuffer(blob);
  }, []);

  const [gridApi, setGridApi] = useState<any>(null);

  const onDragStopped = useCallback(
    () => {
      if (!gridApi) return;

      const newOrder = gridApi?.getRenderedNodes()?.map((node: any, index: number) => ({
        ...node.data,
        seqNo: index + 1, // Recalculate sequence numbers
      }));

      dispatch(setStoreData(newOrder)); // Update Redux state
    },
    [gridApi, dispatch]
  );

  return (
    <MainWrapper sx={{ height: "85%" }}>
      <Box style={containerStyle}>
        <Box style={gridStyle}>
          <AgGridReact
            rowData={storeData}
            columnDefs={columnDefs}
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
