import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Drawer, Typography, List, ListItemText, ListItemButton, } from '@mui/material'
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240

export const Sidebar = (props) => {

    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        {
            text: 'Post a Job',
            path: '/'
        },
        {
            text: 'All Jobs',
            path: '/maker'
        },
    ]

    return (
        <div className='flex'>
            <Drawer
                variant='permanent'
                anchor='left'
                PaperProps={{
                    sx: {
                        width: {
                            md: drawerWidth,
                            xs: drawerWidth/2
                        }
                    }
                }}
                sx={{
                    width: {
                        md: drawerWidth,
                        xs: drawerWidth/2
                    }
                }}
            >
                <div>
                    <Typography
                        variant='h5'
                        sx={{
                            padding: theme.spacing(2)
                        }}
                    >
                        Meyd.it
                    </Typography>
                </div>

                {/* Lists / links */}
                <List>
                    {menuItems.map(item => {
                        return <ListItemButton
                            key={item.text}
                            selected={location.pathname === item.path}
                            onClick={(e) => {
                                navigate(item.path)
                            }}
                        >
                            <ListItemText 
                                primary={item.text}
                            />
                        </ListItemButton>
                    })}
                </List>
            </Drawer>
            <div className='w-full p-8'>
                {props.children}
            </div>
        </div>
    )
}
