import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Menu, MenuItem,
  useMediaQuery, useTheme, Paper
} from '@mui/material';
import {
  Menu as MenuIcon,
  DashboardRounded as DashboardIcon,
  WorkRounded as WorkIcon,
  AssignmentRounded as AssignmentIcon,
  LogoutRounded as LogoutIcon,
  AccountCircle
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 280;

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Offres', icon: <WorkIcon />, path: '/jobs' },
    { text: 'Candidatures', icon: <AssignmentIcon />, path: '/applications' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ my: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ 
            width: 40, height: 40, borderRadius: '8px', 
            bgcolor: 'secondary.main', display: 'flex', 
            alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
          }}>
            <WorkIcon sx={{ color: 'white' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'white' }}>
            JobTracker
          </Typography>
        </Box>
      </Toolbar>
      
      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: '8px',
                py: 1.5,
                transition: 'all 0.2s',
                '&.Mui-selected': {
                  bgcolor: 'rgba(16, 185, 129, 0.15)',
                  color: 'secondary.light',
                  '& .MuiListItemIcon-root': { color: 'secondary.light' },
                  '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.2)' },
                },
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                },
                color: 'rgba(255, 255, 255, 0.7)',
                '& .MuiListItemIcon-root': { color: 'rgba(255, 255, 255, 0.7)' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 45 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontWeight: 600, fontSize: '0.95rem' }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, mt: 'auto' }}>
        <Paper sx={{ 
          p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', 
          borderRadius: 2, display: 'flex', 
          alignItems: 'center', gap: 2, color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <AccountCircle />
          </Avatar>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="body2" sx={{ fontWeight: 700, noWrap: true }}>
              Utilisateur
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', noWrap: true }}>
              Profil Actif
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <IconButton onClick={handleMenu} sx={{ ml: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: '1rem' }}>U</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: { 
                mt: 1.5, minWidth: 180, borderRadius: 2, 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
              }
            }}
          >
            <MenuItem onClick={handleLogout} sx={{ py: 1.5, gap: 1.5 }}>
              <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
              <Typography sx={{ fontWeight: 600 }}>Déconnexion</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 4 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Layout;
