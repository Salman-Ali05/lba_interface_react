import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const CreatePopup = ({ onClose }) => {
    
    const theme = useTheme();

    const [inputState, setInputState] = useState({
        name: '',
        type: '',
        price: '',
        rating: '',
        warranty_years: '',
        available: 'true',
    });

    const handleChangeInput = (name, value) => {
        setInputState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:5500/api/produits/create', {
            method: 'POST',
            body: JSON.stringify(inputState),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error('Erreur lors de la création du produit', error);
            });
        alert("Produit ajouté avec succès !");
        onClose();
    };

    return (
        <div className="popup">
            <div className="overlay" onClick={onClose}></div>
            <div className="popup-content">
                <Typography variant="h3">Ajouter un produit :</Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    className='generalForm'
                >
                    <div>
                        <TextField
                            required
                            id="standard-required"
                            label="Nom"
                            variant="standard"
                            name='name'
                            value={inputState.name}
                            onChange={(event) => handleChangeInput('name', event.target.value)}
                        />

                        <TextField
                            required
                            id="standard-required"
                            label="Type"
                            variant="standard"
                            name='type'
                            value={inputState.type}
                            onChange={(event) => handleChangeInput('type', event.target.value)}
                        />

                        <TextField
                            required
                            id="standard-required"
                            label="Price"
                            variant="standard"
                            type='number'
                            name='price'
                            value={inputState.price}
                            onChange={(event) => handleChangeInput('price', event.target.value)}
                        />

                        <TextField
                            required
                            id="standard-required"
                            label="Rating"
                            variant="standard"
                            name='rating'
                            value={inputState.rating}
                            onChange={(event) => handleChangeInput('rating', event.target.value)}
                        />

                        <TextField
                            required
                            id="standard-required"
                            label="Garantie"
                            variant="standard"
                            name='warranty_years'
                            value={inputState.warranty_years}
                            onChange={(event) => handleChangeInput('warranty_years', event.target.value)}
                        />
                        <Button type="submit" style={{ color: theme.palette.white.main, backgroundColor: theme.palette.success.main }}>Ajouter</Button>
                    </div>
                </Box>
                <button onClick={onClose} className='close-popup'><CloseIcon /></button>
            </div>
        </div>
    );
};
CreatePopup.propTypes = {
    onClose: PropTypes.func.isRequired,
};
export default CreatePopup;
