const {Router} = require('express')
const multer  = require('multer')
const router = Router()
const path = require('path')

const Blog = require('../models/blogs')
const Comment = require('../models/comments')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}- ${file.originalname}`
    cb(null, filename)
  }
})
const upload = multer({ storage: storage })

router.get('/add', (req,res)=>{
    res.render('addblog.ejs',{
        user:req.user
    })
})

router.get('/:id', async(req,res)=>{
    const blog = await Blog.findById(req.params.id).populate('createdBy')
    const comments = await Comment.find({blogId:req.params.id}).populate('createdBy')

    return res.render('blog.ejs',{
        user: req.user,
        blog,
        comments
    })
    
})

router.post('/add', upload.single('coverImage'), async(req,res)=>{
    const { title, body} = req.body
    const blog = await Blog.create({
        coverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user._id,
        title,
        body,
        
    })

    return res.redirect(`/blog/${blog._id}`)
})

router.post('/comment/:blogId', async(req, res)=>{

    console.log("what is comment")
 
     await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})

module.exports = router