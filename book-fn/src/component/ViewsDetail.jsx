import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const ViewsDetail = () => {
    const {id} = useParams();
    const [bookDetail, setBookDetail] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/books/views/${id}`)
            .then((response) => {
                setBookDetail(response.data)
            })
            .catch(() => {
                alert("book detail not found")
            })
    }, [])
    return (
        <div>
            <ul key={bookDetail.id}>
                <li><h2>{bookDetail.name}</h2></li>
                <li>{bookDetail.price}</li>
                <li>{bookDetail.date}</li>
                <li>{bookDetail.category?.name}</li>
            </ul>
        </div>
    )
};

export default ViewsDetail;