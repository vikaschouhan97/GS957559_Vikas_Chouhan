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

interface IExcelState {
  calendarData: ICalendarData[];
}

const initialState: IExcelState = {
  calendarData: [],
};

const excelDataSlice = createSlice({
  name: "excelData",
  initialState,
  reducers: {
    setCalendarData: (state, action: PayloadAction<any[]>) => {
        state.calendarData = action.payload;
    },
  },
});

export const { setCalendarData } = excelDataSlice.actions;
export const reducer = excelDataSlice.reducer;
