import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Drawer, Typography, Divider, Box } from '@material-ui/core';
import { CryptoState } from '../../CryptoContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 350,
    padding: theme.spacing(3),
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Roboto, sans-serif",
    backgroundColor: "#f8f9fa",
    boxShadow: "0px 0px 12px rgba(0,0,0,0.2)",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  picture: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing(2),
    backgroundColor: "#04b5e5",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  logout: {
    marginTop: theme.spacing(2),
    backgroundColor: "#04b5e5",
    color: "#fff",
    fontWeight: 600,
    '&:hover': {
      backgroundColor: "#039ac7",
    },
  },
  avatarTrigger: {
    height: 38,
    width: 38,
    cursor: "pointer",
    backgroundColor: "#04b5e5",
  },
}));

export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const { user, setAlert } = CryptoState();

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfully!"
    });
    toggleDrawer("right", false);
  };

  return (
    <div>
      <Avatar
        onClick={toggleDrawer("right", true)}
        className={classes.avatarTrigger}
        src={user.photoURL}
        alt={user.displayName || user.email}
      />

      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        <Box className={classes.container}>
          <div className={classes.profile}>
            <Avatar
              className={classes.picture}
              src={user.photoURL}
              alt={user.displayName || user.email}
            />
            <Typography variant="h6" align="center" style={{ fontWeight: 600 }}>
              {user.displayName || user.email}
            </Typography>
            <Divider style={{ width: "100%" }} />
          </div>

          <Button
            variant='contained'
            className={classes.logout}
            onClick={logOut}
          >
            Log Out
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}
