import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWeek {
  headerName: string;
  week: string;
  children: [{ Store: string; SKU: string; SalesUnits: string }, { Store: string; SKU: string; SalesUnits: string }];
}

interface ICalendarData {
  headerName: string;
  monthCode: string;
  children: IWeek[];
}

interface IStoreData {
  seqNo: number;
  ID: string;
  Label: string;
  City: string;
  State: string;
}

interface IExcelState {
  calendarData: ICalendarData[];
  storeData: IStoreData[];
}

const initialState: IExcelState = {
  calendarData: [],
  storeData: [],
};

const excelDataSlice = createSlice({
  name: "excelData",
  initialState,
  reducers: {
    setCalendarData: (state, action: PayloadAction<any[]>) => {
        state.calendarData = action.payload;
    },
    setStoreData: (state, action: PayloadAction<any[]>) => {
        state.storeData = action.payload;
    },
  },
});

export const { setCalendarData, setStoreData } = excelDataSlice.actions;
export const reducer = excelDataSlice.reducer;
