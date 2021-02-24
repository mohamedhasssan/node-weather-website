
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('../src/utils/geocode.js')
const forecast = require('../src/utils/forecast.js')
const port = process.env.PORT || 3000


// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')



//setup handlebards engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


// app.get('', (req, res) => {


//     res.render('index', {
//         title: 'Weather',
//         name: 'Mohamed Hassan'

//     })


// })


app.get('/about', (req, res) => {

    res.render('about', {

        title: 'About Us',
        description: 'This is an about us page and it contains information about us.'


    })

})


app.get('/help', (req, res) => {

    res.render('help', {

        title: 'Help Section',
        description: 'This is a help section'


    })

})




//main weather app


app.get('', (req, res) => {

if (!req.query.address){

    
 return res.render('index', {message: 'Please enter an address'})

}

geocode (req.query.address, (error,data)=>{

if (error) {


 res.send(error)


} else {

forecast (data.latitude ,data.longitude , (error,forcdata) => {

if (error) {

 res.send(error)

} else {

    res.render('index',   {

        forecast: forcdata.description,
        location2: data.location,
        temperature:forcdata.temperature,
        RealFeel: forcdata.feels
        
    })



}






})
 
}





})










    })




app.get('/products', (req,res)=>{

if (!req.query.search) {

return res.send({
error:"please provide a search term"

}) 

}


console.log(req.query.search)


res.send({
products:[]


})

})








// error message on help

app.get('/help/*', (req,res)=>{

    res.render('404',{
        
        message: "Help Article Not Found"
    })
    
    })
    

//404 page

app.get('*', (req,res)=>{

    res.render('404',{
        
        message: "Page not found"
})

})




app.listen(port, () => {

    console.log('server is up on port .' + port)

})
