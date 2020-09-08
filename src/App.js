import React, {useState} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { TextField, Grid, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
axios.defaults.timeout = 100000;
axios.defaults.baseURL = 'http://localhost';
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const[tileData, SetTileData] = useState([])
  const[textData, SetString] = useState('')
  const[dataList, SetdataList] = useState([])
  const axios = require('axios');

  const GetList = () => {

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.get('https://localhost:44383/api/product/GetListByText?text=' + textData, {})
    .then(res => {
      const result = res.data;
      SetdataList(result);
    }).catch(error => {
      console.log(error)
    });

  };

  const classes = useStyles();
  return (
    <Container>
      <div style={{marginTop: 150}}>
      <div style={{position: 'relative', width: '500px'}}>
      <TextField label="Text" style={{width: '100%'}} onChange={(e) => SetString(e.target.value)}>
      </TextField >
      <Button variant="contained" color="secondary" style={{position: 'absolute', right: -100, bottom: 0}} onClick={() => GetList()}>
        Search
      </Button>
      </div>
          <Grid container spacing={1} style={{marginTop: 50}}>
            <Grid item xs={3}>
              <Paper className={classes.paper} style={{backgroundColor: '#E8DDDB', fontWeight:"bold"}}>Id</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper} style={{backgroundColor: '#E8DDDB', fontWeight:"bold"}}>ProductName</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper} style={{backgroundColor: '#E8DDDB', fontWeight:"bold"}}>ProductType</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper} style={{backgroundColor: '#E8DDDB', fontWeight:"bold"}}>Date</Paper>
            </Grid>
          </Grid>
        {dataList.map((data, index) => 
          <Grid container spacing={1} key={index}>
            <Grid item xs={3}>
              <Paper className={classes.paper}>{data.id}</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>{data.productName}</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>{data.productType}</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>{new Date(data.date).toLocaleDateString()}</Paper>
            </Grid>
          </Grid>
        )}
     
    </div>
    </Container>
  );
}

export default App;