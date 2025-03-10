import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWeek {
  headerName: string;
  week: string;
  children: [
    { Store: string; SKU: string; SalesUnits: string },
    { Store: string; SKU: string; SalesUnits: string }
  ];
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
  loader: boolean;
  addStoreDialog: boolean;
  addSkuDialog: boolean;
  fileAdded: boolean;
}

const initialState: IExcelState = {
  calendarData: [],
  storeData: [],
  skuData: [],
  loader: false,
  addStoreDialog: false,
  addSkuDialog: false,
  fileAdded: false,
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
    setExcelDataLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
    setAddStoreDialog: (state, action: PayloadAction<boolean>) => {
      state.addStoreDialog = action.payload;
    },
    setAddSkuDialog: (state, action: PayloadAction<boolean>) => {
      state.addSkuDialog = action.payload;
    },
    setFileAdded: (state, action: PayloadAction<boolean>) => {
      state.fileAdded = action.payload;
    },
  },
});

export const {
  setCalendarData,
  setStoreData,
  setSkuData,
  setExcelDataLoader,
  setAddStoreDialog,
  setAddSkuDialog,
  setFileAdded
} = excelDataSlice.actions;

export const reducer = excelDataSlice.reducer;
