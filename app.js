const http = require('http')
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

//create  helper function to get the root directory path
const rootDir = require('./util/path')

const app = express()
// tell express to use 'pug' as view engine
app.set('view engine', 'pug')
// tell express to look for templetes in views dir // by default express checks for templetes in view dir only
app.set('views','views')

//seperate out routes, provide modular code
const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// middleware to notify express parse request body 
app.use(bodyParser.urlencoded({extended : false})) 

// notify express to not to handle public folder, generally all static files goes into these folders
app.use(express.static(path.join(rootDir,'public')))
app.use('/admin',adminData.routes)
app.use(shopRoutes) 

// to handle 404 page
app.use((req,res,next)=>{
    res.status(404).render('404')
})

app.listen(3000)
