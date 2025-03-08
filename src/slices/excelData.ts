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

export interface IStoreData {
  seqNo: number;
  ID: string;
  Label: string;
  City: string;
  State: string;
}

export interface ISkuData {
  ID: string;
  name: string;
  price: string;
  cost: string;
}

interface IExcelState {
  calendarData: ICalendarData[];
  storeData: IStoreData[];
  skuData: ISkuData[];
}

const initialState: IExcelState = {
  calendarData: [],
  storeData: [],
  skuData: [],
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
    setSkuData: (state, action: PayloadAction<any[]>) => {
        state.skuData = action.payload;
    },
  },
});

export const { setCalendarData, setStoreData, setSkuData } = excelDataSlice.actions;
export const reducer = excelDataSlice.reducer;
