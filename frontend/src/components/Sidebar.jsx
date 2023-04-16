import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Drawer, Typography, List, ListItemText, ListItemButton, ListItem, } from '@mui/material'
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240

export const Sidebar = (props) => {

    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        {
            text: 'Consumer',
            path: null
        },
        {
            text: 'Post a Job',
            path: '/'
        },
        {
            text: 'Maker',
            path: null
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
                            xs: drawerWidth * 0.66
                        }
                    }
                }}
                sx={{
                    width: {
                        md: drawerWidth,
                        xs: drawerWidth * 0.66
                    }
                }}
            >
                <div>
                    <Typography
                        variant='h4'
                        fontWeight='bold'
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

                        const text = <ListItemText 
                            disableTypography
                            primary={<Typography
                                fontWeight={item.path == null
                                    ?   'bold'
                                    :   'normal'
                                }
                            >
                                {item.text}
                            </Typography>}
                        />

                        const component = item.path === null?
                            <ListItem
                                key={item.text}
                            >
                                {text}
                            </ListItem> : <ListItemButton
                                key={item.text}
                                selected={location.pathname === item.path}
                                sx={{
                                    pl: 4
                                }}
                                onClick={(e) => {
                                    navigate(item.path)
                                }}
                            >
                                {text}
                            </ListItemButton>

                        return component
                    })}
                </List>
            </Drawer>
            <div className='w-full p-8'>
                {props.children}
            </div>
        </div>
    )
}
