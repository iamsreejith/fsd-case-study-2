var express = require('express');
var router = express.Router();
var User = require('./../models/newUserModel')
const Book = require('./../models/bookModel');
const Author = require('./../models/authorModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users/login', {  layout: './layouts/loginLayout'  });
});
router.get('/signup', function(req, res, next) {
  res.render('users/signup', {   layout: './layouts/loginLayout' });
});


router.get('/home', function(req, res, next) {
  res.render('users/index', {  });
});

 

router.get('/authors', async (req, res, next)=> {
  const authors =  await Author.find();
  res.render('users/authors', {  authors });
});
  

router.get('/authors/:id', async (req, res, next)=> {
  const id = req.params.id
  const author =  await Author.find({_id : id});
  // console.log(author)
  res.render('users/view_author', {  author });
});
  
  

// router.get('/login', function(req, res, next) {
//   res.render('users/login', {  });
// });






router.get("/books", async function(req, res) {
  const books = await Book.find();
  // console.log(books);
  res.render('users/books', {title: 'Library App', heading : 'Library' , books } )
});

router.get('/books/:id', async (req,res)=>{
  const id = req.params.id
  const SingleBook = await Book.find({ _id: id })
  // console.log(SingleBook[0].title)
  // console.log(SingleBook);
  res.render('users/view_book', {title: 'Library App', heading : 'Library' , SingleBook} )
})



  router.post("/login", async function(req, res) {
    const Users = await User.find();  
    let isLoggedIn = false;
    let admin = false
    var username = req.body.name;
    var passw = req.body.pass;
    for (i = 0; i < Users.length; i++) {
        if (Users[i].Uname == username && Users[i].Password == passw) {
            isLoggedIn = true;
            if(Users[i].Uname == 'admin' ){
              admin = true
            }
        }
        // console.log(admin)
    }
    if (isLoggedIn) {
        if(admin){
          res.redirect('/admin')
        }
        else{
          res.redirect("/home");
        }
    } else {
        res.redirect("/");
    }
    // console.log(Users);
    // res.render('books', {title: 'Library App', , heading : 'Library' , books } )
});
router.post("/signup", async function(req, res) {
  // console.log(req.body)
  const Uname = req.body.Uname;
  const Password = req.body.Password;
  const Address = req.body.Address;
  const Phone = req.body.Phone;
  const UserDetails = {
      Uname,
      Password,
      Address,
      Phone
  };
  const NewUser = await User.create(UserDetails)

  // console.log(auth);

  res.redirect('/login');

});
module.exports = router;