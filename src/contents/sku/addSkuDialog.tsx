import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setAddSkuDialog, setSkuData } from "../../slices/excelData";

export default function AddSkuDialog() {
  const dispatch = useDispatch();
  const { addSkuDialog, skuData } = useSelector(
    (state: RootState) => state.fileData
  );

  // State for form fields
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [id, setId] = useState("");

  // Validation states
  const [error, setError] = useState("");

  // Check if ID already exists
  const isIdExists = (id: string) =>
    skuData.some((item: any) => item.ID === id);

  const handleClose = () => {
    dispatch(setAddSkuDialog(false));
    setSku("");
    setPrice("");
    setCost("");
    setId("");
    setError("");
  };

  const handleSave = () => {
    if (!sku || !price || !cost || !id) {
      setError("All fields are required.");
      return;
    }
    if (isIdExists(id)) {
      setError("ID already exists. Please use a unique ID.");
      return;
    }
    if (isNaN(Number(price)) || isNaN(Number(cost))) {
      setError("Price and Cost must be valid numbers.");
      return;
    }
    dispatch(
      setSkuData([
        ...skuData,
        { ID: id, name: sku, price: parseFloat(price), cost: parseFloat(cost) },
      ])
    );
    handleClose();
  };

  return (
    <Dialog open={addSkuDialog} onClose={handleClose}>
      <DialogTitle>Add New SKU</DialogTitle>
      <DialogContent>
        <TextField
          label="SKU"
          fullWidth
          margin="dense"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />
        <TextField
          label="Price ($)"
          fullWidth
          margin="dense"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={isNaN(Number(price))}
          helperText={isNaN(Number(price)) ? "Enter a valid price" : ""}
        />
        <TextField
          label="Cost ($)"
          fullWidth
          margin="dense"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          error={isNaN(Number(cost))}
          helperText={isNaN(Number(cost)) ? "Enter a valid cost" : ""}
        />
        <TextField
          label="ID"
          fullWidth
          margin="dense"
          value={id}
          onChange={(e) => setId(e.target.value)}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            background: "red",
            color: "#ffff",
            "&:hover": { background: "red", opacity: 0.7 },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          sx={{
            background: "gray",
            color: "#ffff",
            "&:hover": { background: "gray", opacity: 0.7 },
          }}
          disabled={!sku || !price || !cost || !id}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
