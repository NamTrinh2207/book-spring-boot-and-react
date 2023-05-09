package com.example.bookmanagerreact.service;

import java.util.Optional;

public interface IGenericService<T> {
    Iterable<T> findAll();

    T save(T t);

    Optional<T> findById(Long id);

    void remove(Long id);
}
