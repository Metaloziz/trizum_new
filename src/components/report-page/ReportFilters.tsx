import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from 'components/button/Button';
import { observer } from 'mobx-react-lite';
import franchiseService from '../../app/services/franchiseService';
import { getOptionMui } from '../../utils/getOption';

import groupsService from '../../app/services/groupsService';
import reportStore from '../../app/stores/reportStore';
import tariffsService from '../../app/services/tafiffService';

const ReportFilters: React.FC = observer(() => {
  const { getReports, clearQueryFieldsWithRequest, queryFields, cleanQueryFieldsWithoutRequest } =
    reportStore;

  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [franchiseOptions, setFranchiseOptions] = useState<JSX.Element[]>([]);
  const [groupOptions, setGroupOptions] = useState<JSX.Element[]>([]);
  const [tariffsOptions, setTariffsOptions] = useState<JSX.Element[]>([]);

  const getFranchises = async () => {
    const res = await franchiseService.getAll();
    const options = res.map(el => (el.id ? getOptionMui(el.id, el.shortName) : <></>));
    setFranchiseOptions(options);
  };

  const getTariffs = async () => {
    const res = await tariffsService.getAllTariffs();
    const options = res.map(el => (el.id ? getOptionMui(el.id, el.name) : <></>));
    setTariffsOptions(options);
  };

  const getGroups = async () => {
    if (queryFields.franchise_id) {
      const res = await groupsService.getGroups({
        perPage: 10000,
        franchiseId: queryFields.franchise_id,
        type: 'class',
      });
      reportStore.groups = res?.items;
      setGroupOptions(res?.items?.map(el => getOptionMui(el.id, el.name)));
    } else {
      setGroupOptions([]);
    }
  };
  const searchHandler = () => {
    queryFields.page = 0;
    getReports();
  };

  useEffect(() => {
    getFranchises();
    getTariffs();
    return () => {
      cleanQueryFieldsWithoutRequest();
    };
  }, []);

  useEffect(() => {
    getGroups();
  }, [queryFields.franchise_id]);

  return (
    <Box sx={{ marginTop: 2, marginBottom: 3 }}>
      <Accordion
        expanded={isOpenFilters}
        onChange={(_, expanded) => setIsOpenFilters(expanded)}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>????????????????????</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="??????????"
                fullWidth
                variant="outlined"
                onChange={({ currentTarget: { value } }) => (queryFields.cityName = value)}
                value={queryFields.cityName || ''}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="franchise">??????????????????????</InputLabel>
                <Select
                  labelId="franchise"
                  value={queryFields.franchise_id || ''}
                  onChange={({ target: { value } }) => (queryFields.franchise_id = value)}
                  label="??????????????????????"
                >
                  {franchiseOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="group">????????????</InputLabel>
                <Select
                  labelId="group"
                  value={queryFields.group_id || ''}
                  onChange={({ target: { value } }) => (queryFields.group_id = value)}
                  label="????????????"
                  disabled={!queryFields.franchise_id}
                >
                  {groupOptions}
                </Select>
                {!queryFields.franchise_id && (
                  <FormHelperText sx={{ position: 'absolute', bottom: -18, left: 0, color: 'red' }}>
                    ?????????????? ???????????????? ??????????????????????
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="?????????????? ??????????????"
                fullWidth
                variant="outlined"
                value={queryFields.last_name || ''}
                onChange={({ currentTarget: { value } }) => (queryFields.last_name = value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="?????? ??????????????"
                fullWidth
                variant="outlined"
                value={queryFields.first_name || ''}
                onChange={({ currentTarget: { value } }) => (queryFields.first_name = value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* isActive ?? user - true or false */}
              <FormControl fullWidth>
                <InputLabel id="status">????????????</InputLabel>
                <Select
                  labelId="status"
                  value={queryFields.is_active || ''}
                  onChange={({ target: { value } }) => (queryFields.is_active = value)}
                  label="????????????"
                >
                  <MenuItem value="true">????????????????</MenuItem>
                  <MenuItem value="false">???? ????????????????</MenuItem>
                  <MenuItem value="" />
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="payment">??????????????</InputLabel>
                <Select
                  labelId="payment"
                  value={queryFields.is_payed || ''}
                  onChange={({ target: { value } }) => (queryFields.is_payed = value)}
                  label="??????????????"
                >
                  <MenuItem value="true">??????????????</MenuItem>
                  <MenuItem value="false">???? ??????????????</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <DatePicker
                label="?????????????? ??"
                onChange={value => {
                  value && (queryFields.date_since = new Date(value));
                }}
                value={queryFields.date_since ? queryFields.date_since : new Date()}
                toolbarPlaceholder="???????? ???????????????? ??"
                renderInput={props => <TextField sx={{ width: '48%' }} {...props} />}
              />
              <DatePicker
                label="?????????????? ????"
                onChange={value => {
                  value && (queryFields.date_until = new Date(value));
                }}
                value={queryFields.date_until ? queryFields.date_until : new Date()}
                toolbarPlaceholder="???????? ???????????????? ????"
                renderInput={props => <TextField sx={{ width: '48%' }} {...props} />}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="tariff">????????????</InputLabel>
                <Select
                  labelId="tariff"
                  value={queryFields.tariff_id || ''}
                  onChange={({ target: { value } }) => (queryFields.tariff_id = value)}
                  label="??????????"
                >
                  {tariffsOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'space-between' }} />
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
            <Button variant="addExel">?????????????????? ?? Excel</Button>
            <Button onClick={clearQueryFieldsWithRequest}>????????????????</Button>
            <Button onClick={searchHandler}>??????????</Button>
          </Stack>
        </AccordionActions>
      </Accordion>
    </Box>
  );
});

export default ReportFilters;
