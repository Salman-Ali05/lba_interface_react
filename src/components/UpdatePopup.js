import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const UpdatePopup = ({ product, onClose }) => {

    const theme = useTheme();

    const [inputState, setInputState] = useState({
        name: product.name,
        type: product.type,
        price: product.price,
        rating: product.rating,
        warranty_years: product.warranty_years,
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

        fetch(`http://localhost:5500/api/produits/update/${product._id}`, {
            method: 'POST',
            body: JSON.stringify(inputState),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
        alert("Produit modifé avec succès !");
        onClose();
    };

    return (
        <div className="popup">
            <div className="overlay" onClick={onClose}></div>
            <div className="popup-content">
                <Typography variant='h5' style={{ color: theme.palette.primary.main }}>Modifier le produit : <b>{product.name}</b></Typography>

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
                            name='type'
                            variant="standard"
                            value={inputState.type}
                            onChange={(event) => handleChangeInput('type', event.target.value)}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Prix"
                            variant="standard"
                            name='price'
                            type='number'
                            value={inputState.price}
                            onChange={(event) => handleChangeInput('price', event.target.value)}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Note"
                            variant="standard"
                            name='rating'
                            type='number'
                            value={inputState.rating}
                            onChange={(event) => handleChangeInput('rating', event.target.value)}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Garantie"
                            variant="standard"
                            name='warranty_years'
                            type='number'
                            value={inputState.warranty_years}
                            onChange={(event) => handleChangeInput('warranty_years', event.target.value)}
                        />

                        <Button style={{ color: theme.palette.white.main, backgroundColor: theme.palette.success.main }} type="submit">Modifier</Button>

                    </div>
                </Box>
                <button onClick={onClose} className='close-popup'><CloseIcon /></button>
            </div>
        </div>
    );
};

UpdatePopup.propTypes = {
    product: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default UpdatePopup;
