package com.example.bookmanagerreact.repository;

import com.example.bookmanagerreact.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoryRepo extends JpaRepository<Category, Long> {
    Category getCategoryById(Long id);
}
