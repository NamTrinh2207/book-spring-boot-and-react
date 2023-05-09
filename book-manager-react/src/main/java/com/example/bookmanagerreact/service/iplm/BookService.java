package com.example.bookmanagerreact.service.iplm;

import com.example.bookmanagerreact.model.Book;
import com.example.bookmanagerreact.repository.IBookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookService implements IBookService {
    @Autowired
    private IBookRepo bookRepo;

    @Override
    public Iterable<Book> findAll() {
        return bookRepo.findAll();
    }

    @Override
    public Book save(Book book) {
        return bookRepo.save(book);
    }

    @Override
    public Optional<Book> findById(Long id) {
        return bookRepo.findById(id);
    }

    @Override
    public void remove(Long id) {
        bookRepo.deleteById(id);
    }
}
