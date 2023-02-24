import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        name: props.title,
        cost: props.cost,
        category: props.category,
    });

    const handleChangeValues = (values) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [values.target.id]: values.target.value,
        }));
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleEditGame = () => {
        Axios.put("http://localhost:3001/edit", {
            id: editValues.id,
            name: editValues.name,
            cost: editValues.cost,
            category: editValues.category,
        }).then(() => {
            props.setListCard(
                props.listCard.map((value) => {
                    return value.idgames == editValues.idgames ?
                        {
                            id: editValues.id,
                            name: editValues.name,
                            cost: editValues.cost,
                            category: editValues.category,
                        } : value;
                })
            );
        });
        handleClose();
    };

    const handleDeleteGame = () => {
        Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
            props.setListCard(
                props.listCard.filter((value) => {
                    return value.id != editValues.id;
                })
            );
        });
        handleClose();
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Editar</DialogTitle>

                <DialogContent>
                    <TextField disabled margin="dense" id="id" label="id" defaultValue={props.id} type="text" fullWidth />

                    <TextField autofocus margin="dense" id="name" label="Nome do Jogo" defaultValue={props.title} type="text" onChange={handleChangeValues} fullWidth />

                    <TextField autofocus margin="dense" id="cost" label="Valor do Jogo" defaultValue={props.cost} type="text" onChange={handleChangeValues} fullWidth />

                    <TextField autofocus margin="dense" id="category" label="Categoria do Jogo" defaultValue={props.category} type="text" onChange={handleChangeValues} fullWidth />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>

                    <Button onClick={() => handleDeleteGame()} color="primary">Excluir</Button>

                    <Button onClick={() => handleEditGame()} color="primary">Salvar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}