import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";

export const SideBarItems = [
  {
    id: "01",
    name: "Store",
    icon: StoreOutlinedIcon,
    link: "/store",
  },
  {
    id: "02",
    name: "SKU",
    icon: CategoryOutlinedIcon,
    link: "/sku",
  },
  {
    id: "03",
    name: "Planning",
    icon: BarChartOutlinedIcon,
    link: "/planning",
  },
  {
    id: "04",
    name: "Charts",
    icon: InsertChartOutlinedIcon,
    link: "/charts"
  },
];

export const cellClassRules = {
  "green-color": (params: any) => params.value >= 80,
  "yellow-color": (params: any) => params.value >= 50 && params.value < 80,
  "orange-color": (params: any) => params.value >= 30 && params.value < 50,
  "red-color": (params: any) => params.value < 30,
};

export const rightAlignRule = {
  textAlign: "right",
  width: 130,
};

export const defaultColDef = {
  sortable: true,
};
