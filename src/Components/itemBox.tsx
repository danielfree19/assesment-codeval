import { Button, Card, CardContent, CardHeader, CardMedia, styled, TextField } from "@mui/material";
import useStore from "../Store";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { Item } from "../dummy";

interface ItemBoxProps {
    id: number,
    newItem: boolean
}

/**
 * id unique
 * name length 30
 * description length 200 optional
 * price larger then 0
 * date
 */

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
        resetSelection
    } = useStore();
    
    const initialItem = useMemo(()=>({
        id: 0,
        name: '',
        description: '',
        price: 0,
        createDate: new Date()
    }),[]);

    const [item, setItem] = useState<Item>(initialItem);

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

    const handleChangeName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const name = event.target.value;
        if (name.length >= 30)
            return;
        setItem((prevItem) => 
            ({
                ...prevItem,
                name
            })
        );
    }

    const handleChangeDesc = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const description = event.target.value;
        if(description.length == 200 )  
            return;
        setItem((prevItem) => 
            ({
                ...prevItem,
                description
            })
        );
    }

    const handleChangePrice = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const price = parseFloat(event.target.value);
        if (price < 0) 
            return
        setItem((prevItem) => 
            ({
                ...prevItem,
                price
            })
        );
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        
        if(newItem){
            const itemToSend: Item = {
                ...item,
                createDate: new Date(),
                id: getNewId()
            }
            addItem(itemToSend);
            toggleNew();

        }
        else 
            updateItem(item);
        resetSelection();
        setItem(initialItem);
    }

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
            <CardContent >
                <form className="CardForm" onSubmit={handleSubmit}>
                    <TextField 
                        id="name" 
                        label="Name" 
                        variant="outlined" 
                        onChange={handleChangeName}
                        value={item.name}
                    />
                    <TextField 
                        id="description" 
                        label="Description" 
                        variant="outlined" 
                        multiline
                        minRows={3}
                        onChange={handleChangeDesc}
                        value={item.description}
                    />
                    <TextField 
                        id="price" 
                        label="Price" 
                        variant="outlined" 
                        type="number"
                        onChange={handleChangePrice}
                        value={item.price}
                    />
                    <Button 
                        type="submit" 
                        variant="contained"
                        disabled={item.price <= 0 || item.name.length == 0}
                    >
                        Save
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}