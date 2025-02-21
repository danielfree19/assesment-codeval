import { Box, Typography } from "@mui/material";

export default function Header() {
 return (<Box sx={{ 
        width: '100vw', 
        backgroundColor: '#9fc5f8',
        padding: 3,
        textAlign: "left",
        marginBottom: 4
    }}>
    <Typography variant="h4">
        My Store
    </Typography>
 </Box>)
}