import { Box, Link, Typography } from "@mui/material";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.ante-images.hr">
                Ante images
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Footer() {
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                Ante image gallery
            </Typography>
            <Copyright />
        </Box>
    );
}

export default Footer;