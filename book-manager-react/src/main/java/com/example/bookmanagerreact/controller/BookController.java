package com.example.bookmanagerreact.controller;

import com.example.bookmanagerreact.model.Book;
import com.example.bookmanagerreact.service.iplm.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(value = ("*"))
@RequestMapping("/books")
public class BookController {

    @Autowired
    private IBookService bookService;

    @GetMapping(value = {"","/"})
    public ResponseEntity<List<Book>> getAll(){
        return new ResponseEntity<>((List<Book>) bookService.findAll(), HttpStatus.OK);

    }

    @PostMapping("/create")
    public ResponseEntity<Book> save(@RequestBody Book book){
        return new ResponseEntity<>(bookService.save(book), HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book book){
        Optional<Book>bookOptional = bookService.findById(id);
        if(bookOptional.isPresent()) {
            book.setId(id);
            return new ResponseEntity<>(bookService.save(book), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable Long id){
        Optional<Book>bookOptional = bookService.findById(id);
        if(bookOptional.isPresent()) {
            bookService.remove(id);
            return new ResponseEntity<>(bookOptional.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("views/{id}")
    public ResponseEntity<Book> viewDetail(@PathVariable Long id){
        Optional<Book>bookOptional = bookService.findById(id);
        return bookOptional.map(books ->
                new ResponseEntity<>(books, HttpStatus.OK)).orElseGet(()->
                new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
