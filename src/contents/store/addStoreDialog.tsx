import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setAddStoreDialog, setStoreData } from "../../slices/excelData";

export default function AddStoreDialog() {
  const dispatch = useDispatch();
  const { addStoreDialog, storeData } = useSelector(
    (state: RootState) => state.fileData
  );

  // State for form fields
  const [store, setStore] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [id, setId] = useState("");

  // Validation states
  const [error, setError] = useState("");

  // Check if ID already exists
  const isIdExists = (id: string) =>
    storeData.some((item: any) => item.ID === id);

  const handleClose = () => {
    dispatch(setAddStoreDialog(false));
    setStore("");
    setCity("");
    setState("");
    setId("");
    setError("");
  };

  const handleSave = () => {
    if (!store || !city || !state || !id) {
      setError("All fields are required.");
      return;
    }

    if (isIdExists(id)) {
      setError("ID already exists. Please use a unique ID.");
      return;
    }

    dispatch(
      setStoreData([
        ...storeData,
        {
          seqNo: storeData.length + 1,
          City: city,
          State: state,
          Label: store,
          ID: id,
        },
      ])
    );

    handleClose();
  };

  return (
    <Dialog open={addStoreDialog} onClose={handleClose}>
      <DialogTitle>Add New Store</DialogTitle>
      <DialogContent>
        <TextField
          label="Store"
          fullWidth
          margin="dense"
          value={store}
          onChange={(e) => setStore(e.target.value)}
        />
        <TextField
          label="City"
          fullWidth
          margin="dense"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="State"
          fullWidth
          margin="dense"
          value={state}
          onChange={(e) => setState(e.target.value)}
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
          disabled={!store || !city || !state || !id}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
