import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const List = () => {
    const [book, setBook] = useState([]);
    const [check, setCheck] = useState(true);
    useEffect(() => {
        axios.get("http://localhost:8080/books")
            .then(response => setBook(response.data))
            .catch(() => alert("books list not fount"))
    }, [check])
    return (
        <div>
            <table border={1}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th colSpan={2}>Action</th>
                </tr>
                </thead>
                <tbody>
                {book.map(book => (
                    <tr key={book.id}>
                        <td>{book.name}</td>
                        <td>{book.price}</td>
                        <td>{book.date}</td>
                        <td>{book.category.name}</td>
                        <td>
                            <button onClick={() => deleteBook(book.id)}>Delete</button>
                        </td>
                        <td><button><Link to={`/update/${book.id}`}>Update</Link></button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

    function deleteBook(id) {
        axios.delete(`http://localhost:8080/books/${id}`)
            .then(() => {
                alert("delete book is id " + id + " success")
                setCheck(!check)
            })
            .catch(() => alert("delete failed"))
    }
}

export default List;