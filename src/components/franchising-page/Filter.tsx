import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FranchisingStore } from "./stores";
import SearchIcon from "@mui/icons-material/Search";
import { observer } from "mobx-react";

interface FilterProps {
    store: FranchisingStore;
}

export const Filter = observer((props: FilterProps) => {
    return <Box>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography>Фильтрация</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    {/* line 1*/}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Полное наименование"
                            value=""
                            onChange={() => { }}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Номер счета"
                            value=""
                            onChange={() => { }}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Телефон"
                            value=""
                            onChange={() => { }}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    {/* line 2*/}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Короткое наименование"
                            value=""
                            onChange={() => { }}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="E-mail"
                            value=""
                            onChange={() => { }}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="ИНН"
                            value=""
                            onChange={() => { }}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    {/* line 3*/}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Город"
                            value=""
                            onChange={() => { }}
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
            <AccordionActions>
                <Stack
                    spacing={1}
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                        width: "100%",
                        px: 1
                    }}
                >
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<SearchIcon fontSize="small" />}
                        onClick={() => { }}
                        sx={{
                            alignSelf: "flex-end",
                            backgroundColor: "#2e8dfd"
                        }}
                    >
                        Найти
                    </Button>
                    <Button
                        size="small"
                        startIcon={<ClearIcon fontSize="small" />}
                        onClick={() => { }}
                        sx={{
                            alignSelf: "flex-end"
                        }}
                        color="error"
                    >
                        Очистить
                    </Button>
                </Stack>
            </AccordionActions>
        </Accordion>
    </Box>
})