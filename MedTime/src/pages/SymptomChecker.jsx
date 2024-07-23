import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Footer from '../components/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Chatbot from '../components/Chatbot';
import './SymptomChecker.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2462ea',
    },
    background: {
      default: '#FFC107',
    },
    text: {
      primary: '#333333',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeightSemiBold: 600,
  },
});

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [symptom, setSymptom] = useState('');
  const [description, setDescription] = useState('');

  const handleAddSymptom = () => {
    setSymptoms([...symptoms, { symptom, description, date: new Date().toLocaleDateString() }]);
    setSymptom('');
    setDescription('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CssBaseline />
        <AppBar position="static" color="primary">
          <Toolbar className="header">
            <Typography variant="h6" component="div" sx={{ fontWeight: theme.typography.fontWeightSemiBold }}>
              Symptom Checker Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={{ mt: 8, mb: 4, flex: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: theme.typography.fontWeightSemiBold }}>
            Welcome to the Symptom Checker Dashboard
          </Typography>
          <Typography variant="body1" gutterBottom>
            Here you can log and track your symptoms.
          </Typography>

          <Box component="form" sx={{ mt: 4, mb: 4 }}>
            <TextField
              label="Symptom"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              fullWidth
              InputProps={{
                style: {
                  backgroundColor: '#ffffff',
                  borderColor: '#ffffff',
                },
              }}
              InputLabelProps={{
                style: {
                  color: '#ffffff',
                },
              }}
              className="form-field"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ffffff',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ffffff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffffff',
                  },
                },
              }}
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              InputProps={{
                style: {
                  backgroundColor: '#ffffff',
                  borderColor: '#ffffff',
                },
              }}
              InputLabelProps={{
                style: {
                  color: '#ffffff',
                },
              }}
              className="form-field"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ffffff',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ffffff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffffff',
                  },
                },
              }}
            />
            <Button variant="contained" color="primary" onClick={handleAddSymptom} className="button-primary">
              Add Symptom
            </Button>
          </Box>

          <Grid container spacing={2}>
            {symptoms.map((item, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card className="card">
                  <CardContent>
                    <Typography variant="h6" className="text-dark" sx={{ fontWeight: theme.typography.fontWeightSemiBold }}>
                      {item.symptom}
                    </Typography>
                    <Typography variant="body2" className="text-dark" sx={{ fontWeight: theme.typography.fontWeightSemiBold }}>
                      {item.description}
                    </Typography>
                    <Typography variant="caption" className="date">
                      {item.date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Footer />
        <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
          <Chatbot />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SymptomChecker;