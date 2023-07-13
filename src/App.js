import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProductsList from './components/ProductsList';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1B2150',
      },
      secondary: {
        main: '#0015BB',
      },
      white: {
        main: 'white',
      },
      danger: {
        main: '#DF4759',
      },
      success: {
        main: '#42BA96'
      }
    },
  });

  return (
    <>
      <img src='./accueil_background.png' className='accueilImg' />
      <div className="App">
        <ThemeProvider theme={theme}>
          <ProductsList />
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
