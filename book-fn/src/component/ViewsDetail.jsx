import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useParams} from "react-router-dom";

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
    },[])
    return (
        <div>
            <table border={1}>
                <tbody>
                    <tr key={bookDetail.id}>
                        <td>{bookDetail.name}</td>
                        <td>{bookDetail.price}</td>
                        <td>{bookDetail.date}</td>
                        <td>{bookDetail.category?.name}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default ViewsDetail;