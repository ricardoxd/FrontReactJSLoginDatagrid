import React from 'react';
import { Link } from 'react-router-dom';

class Inicio extends React.Component {
    render() {
        return (
            <div>
                <Link to={`/login`}>
                Iniciar sesion
                </Link>
            </div>
        );
    }
}
export default Inicio;