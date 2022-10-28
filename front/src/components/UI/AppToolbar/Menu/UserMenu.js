import React, {useState} from 'react';
import {Box, Button, Menu} from "@mui/material";
import {Link} from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import {useDispatch} from "react-redux";
import Avatar from '@mui/material/Avatar';
import {logoutRequest} from "../../../../store/actions/usersActions";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" paddingTop={1}>
            {user &&
              <>
                <Button component={Link} to="/my_cocktails" color="inherit"
                        sx={{marginRight: '20px'}}>
                    My cocktails
                </Button>
                <Button component={Link} to="/new_cocktail" color="inherit"
                sx={{marginRight: '20px'}}>
                Add cocktail
                </Button>
              </>
            }
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Button
                    id="basic-button"
                    color="inherit"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Hello, {user.displayName}!
                </Button>
                <Avatar
                    alt={user.displayName.toUpperCase()}
                    src={user.avatar}
                    sx={{marginLeft: '5px', marginBottom: '5px', bgcolor: '#ba000d'}}/>
            </Box>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => dispatch(logoutRequest())}>Logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;