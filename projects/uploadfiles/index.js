const express = require('express')
const path = require('path')
const multer = require('multer')
// const upload = multer({dest:"uploads/"})



const app = express()
const PORT = 8000

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "./uploads")
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})

app.set("view engine", "ejs")
app.set("views",path.resolve('./views'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
    return res.render('home.ejs')

})

app.post('/upload', upload.single('profileImage'), (req, res) => {
    console.log(req.body)
    console.log(req.file)

   return res.redirect('/')
})


app.listen(PORT, ()=> console.log(`server is running on ${PORT}`))