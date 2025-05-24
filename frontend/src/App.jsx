import React, { useEffect, useState } from 'react';
import API from './api';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    const res = await API.get('/');
    setItems(res.data);
  };

  const addItem = async () => {
    if (editingId) {
      await API.put(`/${editingId}`, { name });
      setEditingId(null);
    } else {
      await API.post('/', { name });
    }
    setName('');
    fetchItems();
  };

  const deleteItem = async (id) => {
    await API.delete(`/${id}`);
    fetchItems();
  };

  const editItem = (item) => {
    setName(item.name);
    setEditingId(item._id);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        bgcolor: '#f5f5f5',
        p: 2 // Padding on all sides for small screens
      }}
    >
      <Container 
        maxWidth="sm" 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <Paper 
          elevation={4} 
          sx={{
            p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
            width: '100%',
            maxWidth: '600px', // Maximum width for larger screens
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            CRUD App with MUI
          </Typography>

          <Box 
            sx={{
              display: 'flex',
              gap: 2,
              mb: 3,
              width: '100%',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'stretch' }
            }}
          >
            <TextField
              label="Enter Item"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ maxWidth: { sm: '400px' } }}
            />
            <Button
              variant="contained"
              color={editingId ? 'secondary' : 'primary'}
              onClick={addItem}
              size="large"
              sx={{
                width: { xs: '100%', sm: 'auto' },
                minWidth: '120px'
              }}
            >
              {editingId ? 'Update' : 'Add'}
            </Button>
          </Box>

          <List sx={{ 
            width: '100%',
            maxHeight: '400px',
            overflow: 'auto'
          }}>
            {items.map((item) => (
              <ListItem
                key={item._id}
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => editItem(item)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" onClick={() => deleteItem(item._id)}>
                      <Delete />
                    </IconButton>
                  </>
                }
                sx={{
                  bgcolor: 'background.paper',
                  mb: 1,
                  borderRadius: 1
                }}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default App;