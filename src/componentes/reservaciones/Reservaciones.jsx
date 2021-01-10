import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './Reservaciones.css';

class Reservaciones extends React.Component {
    columns = [
        { field: 'bookingId', headerName: 'BookingId', type: 'number', width: 130 },
        {
          field: 'fullName',
          headerName: 'Cliente',
          sortable: false,
          width: 160,
          filterable: false,
          valueGetter: (params) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
        },
        { field: 'bookingTime', filterable: false, sortable: false, headerName: 'Fecha de Creación', width: 200 },
        { field: 'streetAddress', filterable: false, sortable: false, headerName: 'Dirección', width: 250 },
        {
          field: 'bookingPrice',
          headerName: 'Precio',
          type: 'number',
          width: 110,
        },
      ];
    constructor(...args) {
        super(...args);
        this.state = {
            lists:[]
        };
        this.getBookings = this.getBookings.bind(this);
        this.listAdd = this.listAdd.bind(this);
        this.getBookings();
      }
      getBookings() {
        if (localStorage.getItem('token')){
            fetch('https://dev.tuten.cl/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true',{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'adminemail': 'testapis@tuten.cl',
                'token': localStorage.getItem('token'),
                'app': 'APP_BCK'
                },
            })
            .then((response) => response.json())
            .then((data) => {
                let list = [];
                data.forEach(element => {
                    const id = Math.random()+''+new Date().getTime();
                    list.push({
                        id,
                        bookingId: element.bookingId,
                        firstName: element.tutenUserClient.firstName,
                        lastName: element.tutenUserClient.lastName,
                        bookingTime: new Date(element.bookingTime).toDateString(),
                        streetAddress: element.locationId.streetAddress,
                        bookingPrice: element.bookingPrice
                    });
                });
                this.listAdd(list);
            }).catch(error => {
                
            });
        } else {
            this.props.history.push('/login');
        }
    }
    listAdd(list) {
        this.setState({lists:list})
    }
    render() {
        return (
            <div className="container">
                <h2>Reservaciones</h2>
                <div className="grid">
                    <DataGrid rows={this.state.lists} columns={this.columns} pageSize={5} showToolbar />
                </div>
            </div>
        );
    }
}
export default Reservaciones;