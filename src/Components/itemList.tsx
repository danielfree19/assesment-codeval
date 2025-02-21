import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import useStore from "../Store";
import { useEffect, useState } from "react";
import {  NavigateBefore, NavigateNext } from '@mui/icons-material';

import { ItemListActions } from "./itemListActions";
import {sortByDate, sortByName } from "../helpers";

export default function ItemList() {
    
    const {
        items,
        sortBy,
        page,
        nextPage,
        prevPage,
        maxPage,
        maxPerPage,
        selectItem,
        deleteItem,
        search,
        toggleNew
    } = useStore();
    
    const [data, setData ] = useState(items);
    useEffect(()=>{
        switch (sortBy) {
            case 'name':
                setData([...items].sort(sortByName))
                break;
            case 'date':
                setData([...items].sort(sortByDate))
                break;
        }
    },[items, sortBy]);


    
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            
            <ItemListActions/>
            
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    margin: '5px 0',
                    '& ul': { padding: 0 },
                }}
                subheader={<li />}
            >
            {
            data
            .filter(
                item => (
                    item.name.toLowerCase().includes(search.toLowerCase()) || 
                    item.description.toLowerCase().includes(search.toLowerCase())
                )
            )
            .slice(page * maxPerPage, page * maxPerPage + maxPerPage)
            .map((item) => (    
                <ListItem 
                    key={`item-${item.id}`} 
                    sx={{
                        cursor: 'pointer',
                        border: '1px black solid',
                        borderRadius: 1,
                        margin: '4px 0',
                        '&:hover': {
                            backgroundColor: '#9fc5f8'
                        }
                    }}
                >
                    <ListItemText 
                        sx={{
                            textAlign: 'center'
                        }} 
                        primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                            <img 
                                src={'https://placehold.co/125x50'}
                                alt="placeholder image"
                            />
                            <Box 
                                onClick={()=>{
                                    selectItem(item.id);
                                    toggleNew();
                                }} 
                                sx={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <Typography>
                                    {item.name}
                                </Typography>
                                <Typography>
                                    {item.description}
                                </Typography>
                            </Box>
                            <Button 
                                variant="contained"
                                color='secondary'
                                onClick={()=>deleteItem(item.id)}
                            >
                                Delete
                            </Button>
                        </Box>} 
                    />
                </ListItem>
            ))}
            </List>
            {/** pagination */}
            <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                <Button 
                    startIcon={<NavigateBefore/>} 
                    onClick={()=>prevPage()}
                    disabled={page == 0}
                >
                     Prev Page 
                </Button>
                    <Typography>
                        {page + 1} of {maxPage + 1}
                    </Typography>
                <Button 
                    endIcon={<NavigateNext/>} 
                    onClick={()=>nextPage()}
                    disabled={maxPage == page}
                >
                    Next Page
                </Button>
            </Box>
        </Box>
    )
}

