package com.example.bookmanagerreact.repository;

import com.example.bookmanagerreact.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBookRepo extends JpaRepository<Book, Long> {

}
