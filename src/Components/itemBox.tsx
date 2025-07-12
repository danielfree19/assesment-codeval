import { Button, Card, CardContent, CardHeader, CardMedia, styled, TextField, Alert } from "@mui/material";
import useStore from "../Store";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { Item } from "../dummy";

interface ItemBoxProps {
    id: number,
    newItem: boolean
}

interface ValidationErrors {
    name?: string;
    description?: string;
    price?: string;
}

/**
 * Validation rules:
 * - id: unique
 * - name: required, 1-30 characters
 * - description: optional, max 200 characters
 * - price: required, positive number, max 999999
 */

const validateItem = (item: Item, existingItems: Item[], isNew: boolean): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    // Name validation
    if (!item.name.trim()) {
        errors.name = "Name is required";
    } else if (item.name.length > 30) {
        errors.name = "Name must be 30 characters or less";
    } else if (item.name.length < 2) {
        errors.name = "Name must be at least 2 characters";
    }
    
    // Check for duplicate names (excluding current item)
    if (item.name.trim()) {
        const isDuplicate = existingItems.some(existingItem => 
            existingItem.name.toLowerCase() === item.name.toLowerCase() && 
            (isNew || existingItem.id !== item.id)
        );
        if (isDuplicate) {
            errors.name = "An item with this name already exists";
        }
    }
    
    // Description validation
    if (item.description.length > 200) {
        errors.description = "Description must be 200 characters or less";
    }
    
    // Price validation
    if (item.price <= 0) {
        errors.price = "Price must be greater than 0";
    } else if (item.price > 999999) {
        errors.price = "Price cannot exceed 999,999";
    } else if (isNaN(item.price)) {
        errors.price = "Price must be a valid number";
    }
    
    return errors;
};

export default function ItemBox(props: ItemBoxProps) {
    const { id, newItem } = props;

    const Image = styled('img')({
        margin: '0 15px'
    });
    
    const {
        getItem,
        getNewId,
        addItem,
        updateItem,
        toggleNew,
        resetSelection,
        items
    } = useStore();
    
    const initialItem = useMemo(()=>({
        id: 0,
        name: '',
        description: '',
        price: 0,
        createDate: new Date()
    }),[]);

    const [item, setItem] = useState<Item>(initialItem);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<{[key: string]: boolean}>({});

    useEffect(()=>{
        if (newItem !== undefined && newItem === false){
            const item = getItem(id);
            setItem(item);    
        } else {
            setItem({
                ...initialItem,
            });
        }
    },[getItem, id, initialItem, newItem]);

    // Real-time validation
    useEffect(() => {
        const validationErrors = validateItem(item, items, newItem);
        setErrors(validationErrors);
    }, [item, items, newItem]);

    const handleChangeName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const name = event.target.value;
        setItem((prevItem) => ({
            ...prevItem,
            name
        }));
        setTouched(prev => ({ ...prev, name: true }));
    }

    const handleChangeDesc = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const description = event.target.value;
        setItem((prevItem) => ({
            ...prevItem,
            description
        }));
        setTouched(prev => ({ ...prev, description: true }));
    }

    const handleChangePrice = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const price = parseFloat(event.target.value) || 0;
        setItem((prevItem) => ({
            ...prevItem,
            price
        }));
        setTouched(prev => ({ ...prev, price: true }));
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Mark all fields as touched
        setTouched({ name: true, description: true, price: true });
        
        // Check if there are any validation errors
        const validationErrors = validateItem(item, items, newItem);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        if(newItem){
            const itemToSend: Item = {
                ...item,
                createDate: new Date(),
                id: getNewId()
            }
            addItem(itemToSend);
            toggleNew(false);
        } else {
            updateItem(item);
        }
        
        resetSelection();
        setItem(initialItem);
        setTouched({});
        setErrors({});
    }

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <Card 
            sx={{
                border: '1px black solid',
                minWidth: 500,
            }}   
        >
            <CardHeader title={`${newItem ? "New Item" : item.name} Details`}/>
            <CardMedia>
                <Image src="https://placehold.co/250x150" alt="placeholder image"/>
            </CardMedia>
            <CardContent>
                {hasErrors && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        Please fix the errors below before saving.
                    </Alert>
                )}
                <form className="CardForm" onSubmit={handleSubmit}>
                    <TextField 
                        id="name" 
                        label="Name" 
                        variant="outlined" 
                        onChange={handleChangeName}
                        value={item.name}
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField 
                        id="description" 
                        label="Description" 
                        variant="outlined" 
                        multiline
                        minRows={3}
                        onChange={handleChangeDesc}
                        value={item.description}
                        error={touched.description && !!errors.description}
                        helperText={touched.description ? errors.description || `${item.description.length}/200 characters` : ''}
                        fullWidth
                        margin="normal"
                    />
                    <TextField 
                        id="price" 
                        label="Price" 
                        variant="outlined" 
                        type="number"
                        onChange={handleChangePrice}
                        value={item.price}
                        error={touched.price && !!errors.price}
                        helperText={touched.price && errors.price}
                        required
                        fullWidth
                        margin="normal"
                        inputProps={{ min: 0, step: 0.01 }}
                    />
                    <Button 
                        type="submit" 
                        variant="contained"
                        disabled={hasErrors}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Save
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}