import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const DeletePopup = ({ product, onClose }) => {
    const theme = useTheme();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:5500/api/produits/delete/${product._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
        alert("Produit supprimé avec succès !");
        onClose();
    };

    return (
        <div className="popup">
            <div className="overlay" onClick={onClose}></div>
            <div className="popup-content">
                <Typography variant='h5'>Supprimer le produit : <b>{product.name}</b></Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    className='deleteForm'
                >
                    <Typography variant='body1'>Cette action est irréversible !</Typography>

                    <Button
                        type="submit"
                        style={{ color: theme.palette.white.main, backgroundColor: theme.palette.danger.main }}
                        size="small"
                        className='deleteButton'
                    >
                        Oui
                    </Button>

                    <Button type="submit"
                        style={{ color: theme.palette.white.main, backgroundColor: theme.palette.success.main }}
                        size="small"
                        className='noDeleteButton'
                    >
                        Non
                    </Button>

                </Box>

                <button onClick={onClose} className='close-popup'><CloseIcon /></button>
            </div>
        </div>
    );
};

DeletePopup.propTypes = {
    product: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DeletePopup;
