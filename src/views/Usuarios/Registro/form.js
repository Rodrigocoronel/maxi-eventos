import React, { Component } from 'react';
//import { Button, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';

import * as actions from '../../../actions/dash.js';

import {api} from '../../../actions/_request'

import { Button, Card, CardBody, CardHeader, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

//import {api} from '../../actions/_request';

const VentanaDeMensaje = (props) => 
(
	<div className="card">
		<div className="card-header">
			<strong> {props.tipo} </strong>
		</div>
		<div className="card-body">
			<div className={props.estilo} role="alert">
				<strong> {props.mens} </strong>
			</div>
		</div>
	</div>
)

class Registro extends Component {

	constructor(props){
		super(props)

		this.state={
			user:{
				id : '',
				name : '',
				email : '',
				password : '',
				rol : '',
			},
			rows : [],
			action : 'save_user',
			    
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.cantidadChange = this.cantidadChange.bind(this);
	}

	componentDidMount(){

		let _self= this;
		let {rows, user} = this.state;
		let {params} = this.props.match;

		if(params.id) {
			api().get("/getUserByid/"+params.id)
			.then(function(response){
				if(response.status == 200){
					rows = response.data.items;
					user = response.data;
					_self.setState({
						rows : rows,
						user : user,
						action : 'edit_user'
					})
				}

			});
		}else{
			api().get("/items")
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

	handleSubmit(evt){
		
		evt.preventDefault();
		let _self = this;
		let {user,rows,action} = this.state;

		let items = [];

		let save = true;

		rows.some(function(obj) {

			items.push({
				item_id : obj.item_id,
				precio : obj.precio
			})

		});

		user.items= items;

		if(action == 'save_user'){
			api().post('/registerUser', user).then(function(response){
				_self.props.history.push('/app/usuarios');
			});
		}else{
			api().put('/updateUser/'+user.id, user).then(function(response){
				_self.props.history.push('/app/usuarios');
			});
		}
		

	}

	handleInputChange(event){
		let {user} = this.state;
		const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    user[name] = value;

	    this.setState({
	      user : user
	    });
	}

	handleSelectChange(evt){

		let {user} = this.state;
		const value = evt === null ? null : evt.target.value;

		user.rol = value;

		this.setState({user: user})
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

	render() {

		let{user , rows} = this.state;
		return (
			<div>
				<Row>
	        		<Col xs="12" sm="6">
						<Card>
							<CardHeader> <strong> Registro de usuarios </strong> </CardHeader>
							<CardBody>
								<form action="" method="post" onSubmit={this.handleSubmit}>
									<div className="form-group">
										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fa fa-user"></i>
												</span>
											</div>
											<input 
												className="form-control" 
												id="input1-group1" 
												type="text" 
												name="name" 
												placeholder="Username"
												value={user.name}
												onChange={this.handleInputChange}
												required
											/>
										</div>
									</div>
									<div className="form-group">
										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fa fa-envelope"></i>
												</span>
											</div>
											<input 
												className="form-control" 
												id="email" 
												type="email" 
												name="email" 
												placeholder="Correo electronico" 
												value={user.email}
												onChange={this.handleInputChange}
												required
											/>
										</div>
									</div>
									<div className="form-group">
										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fa fa-asterisk"></i>
												</span>
											</div>
											<input 
												className="form-control" 
												id="pass" 
												type="password" 
												name="password" 
												placeholder="Password" 
												value={user.password}
												onChange={this.handleInputChange}
												required
											/>
										</div>
									</div>
									<div className="form-group">
										<div className="input-group">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fa fa-user-secret"></i>
												</span>
											</div>
											<select className="form-control" id="rol" name="rol" onChange={this.handleSelectChange} value={user.rol}>
												<option value="0">Rol</option>
												<option value="1">Técnico</option>
												<option value="2">Admin</option>
											</select>
										</div>
									</div>
									<div className="form-group">
										<div className="pull-right">
											<button  className="btn btn-primary" type="submit">Guardar</button>
										</div>
									</div>
								</form>
							</CardBody>
						</Card>
					</Col>
					<Col xs="12" sm="6">
					{
						user.rol==1 &&
						<Card>
							<CardHeader>Items</CardHeader>
							<CardBody>
								<div className="row">
									<div className="col-12 col-md-12">
										<table className="table">
									        <thead>
									            <tr>
									                <th>Servicio</th>
									                <th>Precio</th>
									            </tr>
									        </thead>
									        <tbody>
									            {this.state.rows.map((item, i) => 
								            		<tr key={i}>
								                		<td width="50%">
								                			{item.descripcion}
								                			  
								                		</td>
							                			<td width="25%">
							                					<Input type="number" name="precio" value={item.precio} onChange={(e)=>this.cantidadChange(e,i)}/>
							                			</td>
								            		</tr>
									            )}
									        </tbody>
									    </table>
									</div>
								</div>
							</CardBody>
						</Card>
					}
					</Col>
				</Row>
			</div>
        );
	}
}

function mapStateToProps(state, ownProps) {
    return {
        auth : state.auth
    }
};

export default connect(mapStateToProps, actions)(Registro)