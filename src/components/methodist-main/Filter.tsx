import { useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ru from 'dayjs/locale/ru';
import { observer } from 'mobx-react';

import { MethodistMainFilterViewModel } from './models/MethodistMainFilterViewModel';

import { GroupLevels } from 'app/enums/GroupLevels';
import { Nullable } from 'app/types/Nullable';

interface FilterProps {
  onChange: (filter: Nullable<MethodistMainFilterViewModel>) => void;
}

export const Filter = observer((props: FilterProps) => {
  const _defaultFilter = (): MethodistMainFilterViewModel => ({
    title: '',
    level: '',
    createdAt: null,
  });

  const [filter, setFilter] = useState(_defaultFilter());
  const [open, setOpen] = useState(false);

  const applyFilter = () => {
    props.onChange(filter);
  };

  const clearFilter = () => {
    setOpen(false);
    setFilter(_defaultFilter());
    props.onChange(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ru}>
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
                <TextField
                  label="Наименование"
                  value={filter.title}
                  onChange={({ target: { value } }) =>
                    setFilter(prev => ({ ...prev, title: value }))
                  }
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Уровень</InputLabel>
                  <Select
                    value={filter.level}
                    label="Уровень"
                    onChange={({ target: { value } }) =>
                      setFilter(prev => ({ ...prev, level: value }))
                    }
                  >
                    <MenuItem value="">Не выбрано</MenuItem>
                    <MenuItem value={GroupLevels.easy}>{GroupLevels.easy}</MenuItem>
                    <MenuItem value={GroupLevels.medium}>{GroupLevels.medium}</MenuItem>
                    <MenuItem value={GroupLevels.hard}>{GroupLevels.hard}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <DatePicker
                  label="Дата создания"
                  inputFormat="DD.MM.YYYY"
                  mask="ДД.ММ.ГГГГ"
                  value={filter.createdAt}
                  onChange={date => setFilter(prev => ({ ...prev, createdAt: date }))}
                  renderInput={params => (
                    <TextField {...params} variant="outlined" size="small" fullWidth />
                  )}
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
              <Button
                variant="contained"
                size="small"
                startIcon={<SearchIcon fontSize="small" />}
                onClick={applyFilter}
                sx={{
                  alignSelf: 'flex-end',
                  backgroundColor: '#2e8dfd',
                }}
              >
                Применить
              </Button>
              <Button
                size="small"
                startIcon={<ClearIcon fontSize="small" />}
                onClick={clearFilter}
                sx={{
                  alignSelf: 'flex-end',
                }}
                color="error"
              >
                Сбросить
              </Button>
            </Stack>
          </AccordionActions>
        </Accordion>
      </Box>
    </LocalizationProvider>
  );
});
