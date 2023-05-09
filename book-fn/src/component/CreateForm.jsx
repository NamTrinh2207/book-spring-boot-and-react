import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Formik} from "formik";
import axios from "axios";
import * as yup from "yup";

const CreateForm = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/category")
            .then(response => {
                setCategory(response.data)
            }).catch(() => {
            alert("category list not fount")
        })
    }, [])
    return (
        <Formik
            initialValues={{
                name: '',
                date: '',
                price: '',
                category: {
                    id: ''
                }
            }}
            validationSchema={yup.object({
                name: yup.string().min(3, "to short").max(20, 'to long').required("required"),
                price: yup.number().min(0, "must be greater than 0").required("required")
            })}
            onSubmit={(values) => {
                axios.post("http://localhost:8080/books/create", values)
                    .then(() => {
                        alert("create success")
                        navigate("/")
                    })
                    .catch(error => alert(error.getMessage))
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
                            <td><input type="date" {...formik.getFieldProps("date")}/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><label htmlFor={"category"}>Category: </label></td>
                            <td>
                                <select {...formik.getFieldProps("category.id")}>
                                    <option value="">-Select category--</option>
                                    {category.map(cate => (
                                        <option value={cate.id}>{cate.name}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type={"submit"}>Create</button>
                            </td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            )}
        </Formik>
    );
};

export default CreateForm;