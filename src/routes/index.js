const { Router } =  require('express');
const router = Router();
const fs = require('fs');
const uuid = require('uuid/v4');

const json_books = fs.readFileSync('src/books.json', 'utf-8')
let books = JSON.parse(json_books);

router.get('/', (req, res) => {
    res.render('index.ejs', {
        books
    })
    
});

router.post('/new-entry', (req, res) => {
    const { title, description , image, author} = req.body
    if( !title || !description || !author || !image ){
        res.status(400).send('Escribe todos los campos');
        return;

    }
    let newBook = {
        id: uuid(),
        title,
        description,
        image,
        author
    };
    books.push(newBook);
    

    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books),'utf-8';
    res.redirect('/');
});

router.get('/new-entry', (req, res) => {
    res.render('new-entry');
});

router.get('/delete/:id', (req, res)=>{
    books = books.filter(book => book.id != req.params.id);
    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books),'utf-8';
    res.redirect('/');
});
module.exports = router; 




 
 