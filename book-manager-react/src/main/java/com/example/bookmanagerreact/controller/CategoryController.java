package com.example.bookmanagerreact.controller;

import com.example.bookmanagerreact.model.Category;
import com.example.bookmanagerreact.service.iplm.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(value = ("*"))
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping(value = {"","/"})
    public ResponseEntity<List<Category>> getAll(){
        return new ResponseEntity<>((List<Category>) categoryService.findAll(), HttpStatus.OK);
    }
}
