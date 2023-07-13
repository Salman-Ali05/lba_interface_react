import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, SpeedDial, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import CreatePopup from './CreatePopup';
import UpdatePopup from './UpdatePopup';
import DeletePopup from './DeletePopup';

const ProductsList = () => {
    const [productsList, setListProducts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [activeFilter, setActiveFilter] = useState('tout');
    const [isPopupOpenCreate, setIsPopupOpenCreate] = useState(false);
    const [isPopupOpenUpdate, setIsPopupOpenUpdate] = useState(false);
    const [isPopupOpenDelete, setIsPopupOpenDelete] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5500/api/produits');
            setListProducts(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    const handlePopupOpenCreate = () => {
        setIsPopupOpenCreate(true);
    };

    const handlePopupCloseCreate = () => {
        setIsPopupOpenCreate(false);
    };

    const handlePopupOpenUpdate = (product) => {
        setSelectedProduct(product);
        setIsPopupOpenUpdate(true);
    };

    const handlePopupCloseUpdate = () => {
        setSelectedProduct(null);
        setIsPopupOpenUpdate(false);
    };

    const handlePopupOpenDelete = (product) => {
        setSelectedProduct(product);
        setIsPopupOpenDelete(true);
    };

    const handlePopupCloseDelete = () => {
        setSelectedProduct(null);
        setIsPopupOpenDelete(false);
    };

    const filteredProducts = productsList.filter((product) => {
        const productName = product.name.toLowerCase();
        const search = searchValue.toLowerCase();
        const filter = activeFilter.toLowerCase();

        if (filter === 'tout') {
            return productName.includes(search);
        } else {
            return productName.includes(search) && product.type.toLowerCase() === filter;
        }
    });

    return (
        <div className='container'>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 0, right: 0 }}
                icon={<AddIcon />}
                onClick={handlePopupOpenCreate}
            />

            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
            >
                <Button
                    variant='contained'
                    color='primary'
                    sx={{
                        backgroundColor: activeFilter === 'tout' ? 'secondary.main' : '',
                    }}
                    className='filterButton'
                    onClick={() => handleFilterChange('tout')}
                >
                    Tout
                </Button>

                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: activeFilter === 'phone' ? 'secondary.main' : '',
                    }}
                    className='filterButton'
                    onClick={() => handleFilterChange('phone')}
                >
                    Téléphones
                </Button>

                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: activeFilter === 'laptop' ? 'secondary.main' : '',
                    }}
                    className='filterButton'
                    onClick={() => handleFilterChange('laptop')}
                >
                    Ordinateurs
                </Button>
            </Box>

            <TextField
                id='standard-basic'
                label='Chercher un produit'
                variant='standard'
                className='searchBar'
                value={searchValue}
                onChange={handleSearchChange}
            />

            <br />
            <br />

            <div className='cardProductContainer'>
                {filteredProducts.map((product) => (
                    <div className='cardProduct' key={product.id}>
                        <DeleteIcon
                            className='deleteIcon'
                            onClick={() => handlePopupOpenDelete(product)}
                            sx={{
                                color: 'danger.main',
                                cursor: 'pointer',
                            }}
                        />
                        <EditIcon
                            className='editIcon'
                            onClick={() => handlePopupOpenUpdate(product)}
                            sx={{
                                color: 'secondary.main',
                                cursor: 'pointer',
                            }}
                        />
                        {product.type === 'phone' ? (
                            <img src='./fake_phone.png' width='300wh' height='200vh' alt='Product' />
                        ) : (
                            <img src='./fake_laptop.png' width='300wh' height='200vh' alt='Product' />
                        )}
                        <Typography variant='body1' color='secondary'>
                            Nom : {product.name}
                        </Typography>
                        <Typography variant='body1' color='secondary'>
                            Type : {product.type}
                        </Typography>
                        <Typography variant='body1' color='secondary'>
                            Prix : {product.price} €
                        </Typography>
                        <Typography variant='body1' color='secondary'>
                            Note : {product.rating}
                        </Typography>
                        <Typography variant='body1' color='secondary'>
                            Garantie : {product.warranty_years} ans
                        </Typography>
                        <Typography
                            variant='body1'
                            sx={{
                                color: product.available ? 'success.main' : 'danger.main',
                            }}
                        >
                            {product.available ? 'Disponible' : 'Non disponible'}
                        </Typography>
                    </div>
                ))}
            </div>

            {isPopupOpenCreate && <CreatePopup onClose={handlePopupCloseCreate} />}
            {
                isPopupOpenUpdate && (
                    <UpdatePopup product={selectedProduct} onClose={handlePopupCloseUpdate} />
                )
            }
            {
                isPopupOpenDelete && (
                    <DeletePopup product={selectedProduct} onClose={handlePopupCloseDelete} />
                )
            }
        </div >
    );
};

export default ProductsList;
