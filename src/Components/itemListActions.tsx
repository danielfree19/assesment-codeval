import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import useStore from "../Store";
import { Add } from "@mui/icons-material";
import { sortTypes } from "../dummy";

export function ItemListActions(){
    
    const {
        search,
        setSearch,
        toggleNew,
        resetSelection,
        sortBy,
        setSortBy
    } = useStore();

    const handleChange = (e: SelectChangeEvent) => {
        setSortBy(e.target.value);
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '40vw', gap: 2, flexWrap: 'wrap' }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        resetSelection();
                        toggleNew();
                    }}
                    startIcon={<Add/>}
                    color='info'
                >
                    Add
                </Button>
                <TextField
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FormControl >
                    <InputLabel id="select-label">Sort by</InputLabel>
                    <Select
                    labelId="select-label"
                    id="select"
                    value={sortBy}
                    label="Sort by"
                    onChange={handleChange}
                    
                    >
                        {
                        Object.values(sortTypes).map(
                            (sortType, index) => {
                                return <MenuItem key={index} value={sortType}>
                                    {sortType}
                                </MenuItem>
                            }
                        )}
                    </Select>
                </FormControl>
            </Box>
    )
}