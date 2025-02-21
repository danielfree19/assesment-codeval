import { Box } from "@mui/material";
import Header from "../Components/header";
import ItemList from "../Components/itemList";
import ItemBox from "../Components/itemBox";
import useStore from "../Store";

export default function Main() {
    const selectedItem = useStore(state => state.selectedItem);
    const newItem = useStore(state => state.new);
    return (<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Header />
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '95vw'}}>
            <ItemList />
            {
                (selectedItem !== undefined || newItem) && <ItemBox id={selectedItem || -1} newItem={newItem} />
            }
        </Box>        
    </Box>)
}