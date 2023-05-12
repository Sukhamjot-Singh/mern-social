import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import unicornbikeImg from './../assets/images/unicornbike.jpg'
import Grid from '@material-ui/core/Grid'
import auth from './../auth/auth-helper'
import FindPeople from './../user/FindPeople'
import Newsfeed from './../post/Newsfeed'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    textAlign: 'center'
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 400
  },
  cardbody: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,

  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a': {
      color: '#3f4771'
    }
  },
  footer: {
    fontWeight : 'bold'
  }
}))

export default function Home({ history }) {
  const classes = useStyles()
  const [defaultPage, setDefaultPage] = useState(false)

  useEffect(() => {
    setDefaultPage(auth.isAuthenticated())
    const unlisten = history.listen(() => {
      setDefaultPage(auth.isAuthenticated())
    })
    return () => {
      unlisten()
    }
  }, [])

  return (
    <div className={classes.root}>
      {!defaultPage &&
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <Typography variant="h3" className={classes.title}>
                MERN-SOCIAL
              </Typography>
              {/* <CardMedia className={classes.media} image={unicornbikeImg} title="Unicorn Bicycle" /> */}
              {/* <Typography variant="body2" component="p" className={classes.credit} color="textSecondary">Photo by <a href="https://unsplash.com/@boudewijn_huysmans" target="_blank" rel="noopener noreferrer">Boudewijn Huysmans</a> on Unsplash</Typography> */}
              <Typography className={classes.cardbody}>This is a social media website where you can follow people and post about whatever you like. People can see your posts, interact with them and can comment on them.</Typography>
              <CardContent>
                <Typography type="body1" className={classes.footer} component="p">
                  Welcome to the MERN-SOCIAL home page.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      }
      {defaultPage &&
        <Grid container spacing={8}>
          <Grid item xs={8} sm={7}>
            <Newsfeed />
          </Grid>
          <Grid item xs={6} sm={5}>
            <FindPeople />
          </Grid>
        </Grid>
      }
    </div>
  )
}
