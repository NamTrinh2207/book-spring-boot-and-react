import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import * as yup from "yup"
import {ErrorMessage, Field, Formik} from "formik";

const UpdateForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/books/views/${id}`)
            .then((response) => {
                setBook(response.data);
            })
            .catch(() => {
                alert("book not found");
            });

        axios
            .get("http://localhost:8080/category")
            .then((response) => {
                setCategories(response.data);
            })
            .catch(() => {
                alert("category list not found");
            });
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <Formik
            initialValues={{
                name: book.name,
                date: book.date,
                price: book.price,
                category: {
                    id: book.category.id,
                },
            }}
            validationSchema={yup.object({
                name: yup.string().min(3, "to short").max(20, 'to long').required("required"),
                price: yup.number().min(0, "must be greater than 0").required("required")
            })}
            onSubmit={(values) => {
                axios.put(`http://localhost:8080/books/update/${id}`, values)
                    .then(() => {
                        alert("Update success");
                        navigate('/');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }}>
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td><label htmlFor={"name"}>Name: </label></td>
                            <td><Field name={"name"}></Field></td>
                            <td><ErrorMessage name={"name"}></ErrorMessage></td>
                        </tr>
                        <tr>
                            <td><label htmlFor={"price"}>Price: </label></td>
                            <td><Field name={"price"}></Field></td>
                            <td><ErrorMessage name={"price"}></ErrorMessage></td>
                        </tr>
                        <tr>
                            <td><label htmlFor={"date"}>Date: </label></td>
                            <td><input
                                type="date"
                                {...formik.getFieldProps("date")}
                            />
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><label htmlFor={"category"}>Category: </label></td>
                            <td>
                                <select {...formik.getFieldProps("category.id")}>
                                    {categories.map(cate => (
                                        <option value={cate.id}>{cate.name}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type={"submit"}>Update</button>
                            </td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            )}
        </Formik>
    )
};

export default UpdateForm;
