import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, FormHelperText } from "@mui/material";
import useStore from "../Store";
import { Add } from "@mui/icons-material";
import { sortTypes } from "../dummy";
import { useState } from "react";

export function ItemListActions(){
    
    const {
        search,
        setSearch,
        toggleNew,
        resetSelection,
        sortBy,
        setSortBy
    } = useStore();

    const [searchError, setSearchError] = useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        // Validate search input
        if (value.length > 100) {
            setSearchError('Search query too long (max 100 characters)');
            return;
        }
        
        // Clear error if valid
        setSearchError('');
        setSearch(value);
    };

    const handleSortChange = (e: SelectChangeEvent) => {
        const value = e.target.value;
        
        // Validate sort option
        if (!Object.values(sortTypes).includes(value)) {
            console.error('Invalid sort option:', value);
            return;
        }
        
        setSortBy(value);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '40vw', gap: 2, flexWrap: 'wrap' }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        resetSelection();
                        toggleNew(true);
                    }}
                    startIcon={<Add/>}
                    color='info'
                >
                    Add
                </Button>
                <FormControl error={!!searchError}>
                    <TextField
                        label="Search items..."
                        value={search} 
                        onChange={handleSearchChange}
                        error={!!searchError}
                        helperText={searchError || `${search.length}/100 characters`}
                        variant="outlined"
                        size="small"
                    />
                </FormControl>
                <FormControl size="small">
                    <InputLabel id="select-label">Sort by</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={sortBy}
                        label="Sort by"
                        onChange={handleSortChange}
                    >
                        {
                        Object.values(sortTypes).map(
                            (sortType, index) => {
                                return <MenuItem key={index} value={sortType}>
                                    {sortType.charAt(0).toUpperCase() + sortType.slice(1)}
                                </MenuItem>
                            }
                        )}
                    </Select>
                    <FormHelperText>Choose how to sort items</FormHelperText>
                </FormControl>
            </Box>
    )
}