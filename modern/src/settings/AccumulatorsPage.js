import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  Accordion, AccordionSummary, AccordionDetails, makeStyles, Typography, Container, TextField, FormControl, Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from '../LocalizationProvider';
import OptionsLayout from './OptionsLayout';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    '& > *': {
      flexBasis: '33%',
    },
  },
  details: {
    flexDirection: 'column',
  },
}));

const AccumulatorsPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const t = useTranslation();

  const { id } = useParams();
  const position = useSelector((state) => state.positions.items[id]);

  const [item, setItem] = useState();

  useEffect(() => {
    if (position) {
      setItem({
        deviceId: parseInt(id, 10),
        hours: position.attributes.hours || 0,
        totalDistance: position.attributes.totalDistance || 0,
      });
    }
  }, [id, position]);

  const handleSave = async () => {
    const response = await fetch(`/api/devices/${id}/accumulators`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      history.goBack();
    }
  };

  return (
    <OptionsLayout>
      {item && (
        <Container maxWidth="xs" className={classes.container}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                {t('sharedRequired')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                margin="normal"
                type="number"
                value={item.hours}
                onChange={(event) => setItem({ ...item, hours: Number(event.target.value) })}
                label={t('positionHours')}
                variant="filled"
              />
              <TextField
                margin="normal"
                type="number"
                value={item.totalDistance}
                onChange={(event) => setItem({ ...item, totalDistance: Number(event.target.value) })}
                label={t('deviceTotalDistance')}
                variant="filled"
              />
            </AccordionDetails>
          </Accordion>
          <FormControl fullWidth margin="normal">
            <div className={classes.buttons}>
              <Button
                type="button"
                color="primary"
                variant="outlined"
                onClick={() => history.goBack()}
              >
                {t('sharedCancel')}
              </Button>
              <Button
                type="button"
                color="primary"
                variant="contained"
                onClick={handleSave}
              >
                {t('sharedSave')}
              </Button>
            </div>
          </FormControl>
        </Container>
      )}
    </OptionsLayout>
  );
};

export default AccumulatorsPage;