import { Button, DialogActions, DialogContent, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Dialog, DialogTitle } from "./Dialog";

import { FranchisingStore } from "components/franchising-page/stores";
import { FranchisingViewModel } from "app/viewModels/FranchisingViewModel";
import { observer } from "mobx-react";
import { useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

interface AddOrEditDialogProps {
    store: FranchisingStore;
}

export const AddOrEditDialog = observer((props: AddOrEditDialogProps) => {
    const { store, store: { editingEntity } } = props;

    return <Dialog
        maxWidth="md"
        fullWidth
        onClose={store.closeDialog}
        open={store.isDialogOpen}
    >
        <DialogTitle onClose={store.closeDialog}>
            {store.editingEntity?.id ? "Редактирование записи" : "Добавление новой записи"}
        </DialogTitle>
        <DialogContent dividers>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="caption" color="textSecondary">Сведения об организации</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Полное наименование"
                        value={store.editingEntity.fullName}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.fullName = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Короткое наименование"
                        value={editingEntity.shortName}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.shortName = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Юр. адрес"
                        value={editingEntity.legalAddress}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.legalAddress = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Фактический адрес"
                        value={editingEntity.actualAddress}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.actualAddress = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Телефон"
                        value={editingEntity.phone}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.phone = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="E-mail"
                        value={editingEntity.email}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.email = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="ИНН"
                        value={editingEntity.inn}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.inn = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="ОГРН"
                        value={editingEntity.ogrn}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.ogrn = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="КПП"
                        value={editingEntity.kpp}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.kpp = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Город"
                        value={editingEntity.city}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.city = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" color="textSecondary">Банковские реквииты</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Наименование школы"
                        value={editingEntity.schoolName}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.schoolName = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <TextField
                        label=""
                        value=""
                        onChange={() => { }}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid> */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Наименование банка"
                        value={editingEntity.bankName}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.bankName = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Корр. счёт банка"
                        value={editingEntity.bankBill}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.bankBill = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="БИК банка"
                        value={editingEntity.bankBik}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.bankBik = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="ИНН банка"
                        value={editingEntity.bankInn}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.bankInn = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="КПП банка"
                        value={editingEntity.bankKpp}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.bankKpp = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Расчётный счёт"
                        value={editingEntity.checkingAccount}
                        onChange={({ currentTarget: { value } }) => store.editingEntity.checkingAccount = value}
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button
                onClick={store.addOrEdit}
            >
                {store.editingEntity?.id ? "Изменить" : "Добавить"}
            </Button>
        </DialogActions>
    </Dialog>
});