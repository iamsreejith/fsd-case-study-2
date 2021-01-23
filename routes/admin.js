var express = require('express');
var router = express.Router();
const Book = require('./../models/bookModel');
const Author = require('./../models/authorModel')

/* GET home page. */
router.get('/', async (req, res, next)=> {
  const books =  await Book.find();
  // console.log(books)
  res.render('admin/admin', { title: 'Express', books , layout: './layouts/adminLayout' });
});


router.get('/delete/:id', async (req,res)=>{
  const id = req.params.id
  // console.log(id)
  const result = await Book.deleteOne({ _id: id })
  

  res.redirect('/admin')

})


router.get('/addbook', (req, res)=>{
  res.render('admin/addbooks', {layout: './layouts/adminLayout'})
})


router.get('/addbook', function(req, res, next) {
  res.render('admin/addbooks', { title: 'Express', layout: './layouts/adminLayout' });
});

router.post("/addbook", async (req, res)=>{
  const title = req.body.title;
    const genre = req.body.genre;
    const description = req.body.description;
    const longDescription = req.body.longDescription;
    const authorName = req.body.authorName;
    const Short = req.body.Short;
    const Long = req.body.Long;
    const authorBooks = req.body.authorBooks;
    // console.log(req.body)
    const image = req.files.CoverImage;
    // console.log(image)
    image.mv('./public/images/bookImage/'+title+'.jpg',(err,done)=>{
      if(err){
          console.log(err);
      }
    })

    const sampleBook = {
        title,
        description,
        longDescription,
        genre,
        authorName,
        Short,
        Long,
        authorBooks
    };

    const testBook = await Book.create(sampleBook)
    res.redirect('/admin');

})

router.get('/addauthor', function(req, res, next) {
  res.render('admin/addauthor', { title: 'Express', layout: './layouts/adminLayout' });
});

router.post("/addauthor", async function(req, res) {
  const authorName = req.body.authorName;
  const Short = req.body.Shortdis;
  const Long = req.body.Longdis;
  const authorBooks = req.body.Wbooks;
  // console.log(req.body)
  // const image = re.file.CoverImgae

  const image = req.files.authorPhoto;
    // console.log(image)
    image.mv('./public/images/authorImage/'+authorName+'.jpg',(err,done)=>{
      if(err){
          console.log(err);
      }
    })


  const authorsDetails = {
      
      authorName,
      Short,
      Long,
      authorBooks
  };


  const auth = await Author.create(authorsDetails)

  // console.log(auth);

  res.redirect('/admin');

});

module.exports = router;
