import React from 'react';
import {Link} from "react-router-dom";

function Navigation() {
    return (
        <table>
            <tbody>
            <tr>
                <th>
                    <Link to="/">Home</Link>
                </th>
                <th>
                    <Link to="/create">Create Form</Link>
                </th>
            </tr>
            </tbody>
        </table>
    );
}
export default Navigation;