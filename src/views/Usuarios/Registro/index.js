import React, { Component } from 'react';

import { connect } from 'react-redux';

import {Link} from 'react-router-dom';

import * as actions from '../../../actions/dash.js';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { Button, Card, CardBody, CardGroup, CardHeader, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import {api} from '../../../actions/_request'


class Registro extends Component {

	constructor(props){
		super(props)

		this.state={
			data : [],
			    
		}
	}

	componentDidMount(){
		let _self = this;
		let {data} = this.state;

		api().get('/getUsers').then(function(response){
			_self.setState({data : response.data});
		});
	}

	edit(evt,id){
		evt.preventDefault();
		this.props.history.push('/app/usuarios/edit/'+id);
	}

	render() {

		const columns = [{
		    Header: 'Controles',
		    filterable: false,
		    sortable: false,
		    maxWidth:80,
		    Cell: (row) =>
		    {
	        	return(
		            <div className="text-left">
		                <Button
		                 color="success" 
		                 className="btn-sm" 
		                 onClick={(evt)=>this.edit(evt, row.original.id)}>
		                   Edit
		                </Button>                                              
		                 
		            </div>
	        	)
		    }},{
		    	Header: 'Nombre',
		    	accessor: 'name'
		  	}, {
		  		Header: 'rol',
		  		accessor : 'rol'
		  	}, {
		    	Header: 'Email',
		    	accessor: 'email',
		  	}];

		let{user, data} = this.state;
		
		return (

			<div>
        		<div className="col-lg-6 col-sm-12">
        			<Card>
              			<CardBody>
              				<div className="float-right">
              					<Link to="/app/usuarios/registro">
	              					<button className="btn btn-primary" type="button">
									<i className="fa fa-plus-square"></i>&nbsp;Agregar</button>
								</Link>
							</div>
              			</CardBody>
              		</Card>
					<Card>
	                  	<CardBody>
							<CardHeader>Lista de Usuarios</CardHeader>
							<ReactTable
								getTrProps={(state, rowInfo, column) => {                   
	                              	if(rowInfo === undefined){
	                                     
	                                      	return{

	                                      	}
	                                	}else{
	                                       return{
	                                        onDoubleClick: (e) => {
	                                          this.props.history.push('/app/usuarios/edit/'+rowInfo.original.id);
	                                        }
	                                    } 
	                                }
	                          	}}
					    		data={data}
					    		columns={columns}
					    		defaultPageSize={10}
					  		/>
					  	</CardBody>
					</Card>
				</div>
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