import React, { useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    SelectChangeEvent,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import MuiPhoneNumber from 'material-ui-phone-number';

import Button from '../button/Button';

import { Roles } from 'app/stores/appStore';
import InformationItem from 'components/information-item/InformationItem';
import CustomSelect, { Option } from 'components/select/CustomSelect';


export const Filter = () => {

    const [open, setOpen] = useState(false);
    const [city, setCity] = React.useState('');
    const [selectedRole, setSelectedRole] = useState<Option>();

    const [mainData, setMainData] = React.useState<Date | null>(
        new Date('2015-08-18T21:11:54'),
    );

    const handleChangeMainData = (newValue: Date | null) => {
        setMainData(newValue);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setCity(event.target.value);
    };

    const [bornDate, setBornDaate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );
  
    const handleChangeBornData = (newValue: Date | null) => {
        setBornDaate(newValue);
    };


    return (
        <Box>
            <Accordion
                expanded={open}
                onChange={(_, expanded) => setOpen(expanded)}
                TransitionProps={{ unmountOnExit: true }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Фильтрация</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <DesktopDatePicker
                                label="Дата "
                                inputFormat="DD/MM/YYYY"
                                value={mainData}
                                onChange={handleChangeMainData}
                                renderInput={params => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Оплачен</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={city}
                                    label="Город"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Оплачен</MenuItem>
                                    <MenuItem value={20}>Неоплачен</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <DesktopDatePicker
                                label="Дата рождения"
                                inputFormat="DD/MM/YYYY"
                                value={bornDate}
                                onChange={handleChangeBornData}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Город</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={city}
                                    label="Город"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Москва</MenuItem>
                                    <MenuItem value={20}>Санкт-Петербург</MenuItem>
                                    <MenuItem value={30}>Красноярск</MenuItem>
                                </Select>
                            </FormControl>
                            {selectedRole && (selectedRole.value as Roles) === Roles.Student && (
                                <InformationItem variant="select" title="Группа" />
                            )}
                        </Grid>
                        {/* line 2 */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Короткое наименование"
                                // value={filter.shortName}
                                // onChange={({ target: { value } }) =>
                                //   setFilter(prev => ({ ...prev, shortName: value }))
                                // }
                                fullWidth
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="E-mail"
                                // value={filter.email}
                                // onChange={({ target: { value } }) => setFilter(prev => ({ ...prev, email: value }))}
                                fullWidth
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="ИНН"
                                // value={filter.inn}
                                // onChange={({ target: { value } }) =>
                                //   numberWithoutLeadingZero(value, () =>
                                //     setFilter(prev => ({ ...prev, inn: value })),
                                //   )
                                // }
                                fullWidth
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        {/* line 3 */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Город"
                                // value={filter.city}
                                // onChange={({ target: { value } }) => setFilter(prev => ({ ...prev, city: value }))}
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
                            width: '100%',
                            px: 1,
                        }}
                    >
                        <Button size="small">Применить</Button>
                        <Button size="small" variant="reset" onClick={() => { setOpen(false) }}>
                            Сбросить
                        </Button>
                    </Stack>
                </AccordionActions>
            </Accordion>
        </Box>
    );
};
