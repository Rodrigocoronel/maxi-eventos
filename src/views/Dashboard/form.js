import React from 'react'
import { connect } from 'react-redux';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import {Link} from 'react-router-dom';

import Moment from 'moment';

import { Button, Card, CardBody, CardHeader, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import {api} from '../../actions/_request'

import * as actions from '../../actions/dash';

class Dashboard extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			orden:{
				id : '',
				orden_servicio: '',
				telefono : '',
				fecha : Moment().format('Y-MM-DD'),	
			},
			rows : [],
			action : 'save_order',
		}

		this.handeInputChange = this.handeInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		let _self = this;
		let {rows} = this.state;
		let {orden} = this.state;
		let {params} = this.props.match;

		let {user} = this.props.auth;

		if(params.id) {
			api().get("/getOrderByid/"+params.id)
			.then(function(response){
				if(response.status == 200){
					rows = response.data.items;
					orden = response.data;
					_self.setState({
						rows : rows,
						orden : orden,
						action : 'edit_order'
					})
				}

			});
		}else{
			api().get("/itemsByUser/"+user.id)
			.then(function(response){
				if(response.status == 200){
					rows = response.data;
					_self.setState({
						rows : rows
					})
				}

			});
		}

		
	}

	handeInputChange(event){
		let {orden} = this.state;
		const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    orden[name] = value;

	    this.setState({
	      orden : orden
	    });
	}

	cantidadChange(evt , index){
		let {rows} = this.state;

		const target = evt.target;
		const value = target.value;
		const name = target.name;

		rows[index][name] = value;

		this.setState({
			rows : rows
		}) 
	}

	handleSubmit(evt){

		evt.preventDefault();

		let _self = this;
		let {orden, rows, action} = this.state;
		let items = [];

		let save = true;

		rows.some(function(obj) {

			items.push({
				item_id : obj.item_id,
				cantidad : parseFloat(obj.cantidad),
				precio : obj.precio
			})

		});

		orden.items= items;

		if(orden.orden_servicio == '')
			save = false
		if(orden.telefono == '')
			save = false
		if(orden.fecha == '')
			save = false

		let suma = 0;
		for (let x in orden.items){
			suma += orden.items[x].cantidad;
		}

		if(suma == 0){
			save = false
		}

		console.log('suma',suma)

		if(save){
			if(action == 'save_order'){
				api().post('/guardarOrden' , orden)
				.then(function(response){
					_self.props.history.push('/app/dashboard');
				});
			}else{
				api().put('/updateOrden/'+orden.id , orden)
				.then(function(response){
					_self.props.history.push('/app/dashboard');
				});
			}
			
		}
	}

	render(){
		let {orden} = this.state;

		let {user} = this.props.auth;
		return(
			<div className="">
		        <Container>
		          	<Row className="justify-content-center">
			        	<Col xs="12">
		              		<Card>
		              			<CardHeader>
									<strong>Datos Orden</strong>
									<small></small>
								</CardHeader>
		              			<CardBody>
		              				<Row>
		              					<Col xs="12" sm="4">
				              				<div className="form-group">
												<label htmlFor="name">#Orden de servicio</label>
												<input 
													className="form-control" 
													id="name" 
													type="text" 
													placeholder=""
													name="orden_servicio"
													value={orden.orden_servicio}
													onChange={this.handeInputChange}
												/>
											</div>
										</Col>
										<Col xs="12" sm="4">
				              				<div className="form-group">
												<label htmlFor="telefono">Telefono</label>
												<input 
													className="form-control"
													id="telefono" 
													type="text" 
													placeholder=""
													name="telefono"
													value={orden.telefono}
													onChange={this.handeInputChange}
												/>
											</div>
										</Col>
										<Col xs="12" sm="4">
				              				<div className="form-group">
												<label htmlFor="fecha">Fecha</label>
												<input 
													className="form-control" 
													id="fecha" 
													type="date" 
													placeholder=""
													name="fecha"
													value={orden.fecha}
													onChange={this.handeInputChange}
												/>
											</div>
										</Col>
									</Row>
		              			</CardBody>
		              		</Card>
		              		<Card>
		              			<CardHeader><strong>Servicios</strong></CardHeader>
			                  	<CardBody>
									<div className="row">
										<div className="col-12 col-md-12">
											<table className="table">
										        <thead>
										            <tr>
										                <th>Servicio</th>
										                <th>Cantidad</th>
										                { 
									                		user.rol == 2 &&
									                		<th>Precio</th>
									                	}
										            </tr>
										        </thead>
										        <tbody>
										            {this.state.rows.map((item, i) => 
									            		<tr key={i}>
									                		<td width="50%">
									                			{item.descripcion}
									                			  
									                		</td>
									                		<td width="25%">
									                			<Input type="number" name="cantidad" value={item.cantidad} onChange={(e)=>this.cantidadChange(e,i)}/>
									                		</td>
									                		{ 
									                			user.rol == 2 &&
									                			<td width="25%">
									                					<Input type="number" name="precio" value={item.precio} onChange={(e)=>this.cantidadChange(e,i)}/>
									                			</td>
									                		}
									            		</tr>
										            )}
										        </tbody>
										    </table>
										</div>
									</div>
							  	</CardBody>
							</Card>
							<Card>
								<CardBody>
									<div className="float-right">
										<button onClick={this.handleSubmit} className="btn btn-primary" type="button">Guardar</button>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
    return {
        auth : state.auth
    }
};

export default connect(mapStateToProps, actions)(Dashboard)