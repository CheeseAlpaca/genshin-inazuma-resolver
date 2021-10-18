import './App.css';
import { useState } from 'react';
import search from './core/search';
import {
  TextareaAutosize,
  CardContent,
  Button,
  Box,
  TextField,
  Typography,
  Card
} from '@mui/material';

function App() {
  const [origin, setOrigin] = useState('2, 1, 1, 3');
  const [target, setTarget] = useState('0, 0, 0, 0');
  const [effect, setEffect] = useState(`
    [0, 1],
    [0, 1, 2],
    [1, 2, 3],
    [2, 3]
  `);
  const [result, setResult] = useState(null);
  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  }
  const handleTargetChange = (event) => {
    setTarget(event.target.value);
  }
  const handleEffectChange = (event) => {
    setEffect(event.target.value);
  }
  const onButtonClick = () => {
    const o = JSON.parse(`[${origin}]`);
    const t = JSON.parse(`[${target}]`);
    const e = JSON.parse(`[${effect}]`);
    setResult(search(o, t, e));
  }
  
  return (
    <Box sx={{
      p: '1.5rem'
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <TextField
          required
          label="Original Value"
          value={origin}
          onChange={handleOriginChange}
          sx={{ m: 2 }}
        />
        <TextField
          required
          label="Target Value"
          value={target}
          onChange={handleTargetChange}
          sx={{ m: 2 }}
        />
        <Box 
          sx={{ m: 2 }}
        >
          <TextareaAutosize
            minRows={5}
            style={{ width: "100%" }}
            value={effect}
            onChange={handleEffectChange}
          />
        </Box>
        <Button
          sx={{ m: 2 }}
          variant="contained"
          onClick={onButtonClick}
        >
          Calculate
        </Button>
        <Card variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Result (0 index): 
            </Typography>
            <Typography variant="h5" component="div">
              {result}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default App;
