import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const LogMaster = (props) => {
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    if (props.itemLog) {
      setCurrentItems(props.itemLog.slice(-100));
    }
  }, [props.itemLog]);

  return (
    <Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
      {currentItems.slice().reverse().map((item, index) => (
      <Grid key={index} container spacing={2}>
        <Grid item xs="auto">
            {new Date(item.date).toLocaleTimeString()}
        </Grid>
        <Grid item xs>
            {JSON.stringify(item.message, null, 2)}
        </Grid>
      </Grid>
      ))}
    </Box>
  );
}

export default LogMaster;