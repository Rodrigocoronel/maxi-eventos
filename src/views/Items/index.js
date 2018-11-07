import React from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import {Link} from 'react-router-dom';

import { Button, Card, CardBody, CardGroup, CardHeader, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import {api} from '../../actions/_request'

import * as actions from '../../actions/dash';



class Items extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			data : [],
		}
	}

	componentDidMount(){

		let _self = this;
		let {data} = this.state;

		api().get('/getItemsOrg/').then(function(response){
			_self.setState({data : response.data});
		});
	}

	edit(evt,id){
		evt.preventDefault();
		this.props.history.push('/app/dashboard/edit/'+id);
	}

	render(){

		const cols = [{
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
		    	Header: 'Descripcion',
		    	accessor: 'descripcion'
		  	}, {
		  		Header: 'Precio',
		  		accessor : 'precio'
		  	}];

		
		let columns = cols;

		

		let {data}  = this.state;
		
		return(
			<div className="">
		        <Container>
		          	<Row className="justify-content-center">
			        	<Col xs="12">
		              		<Card>
		              			<CardBody>
		              				<div className="float-right">
		              					<Link to="/app/dashboard/agregar">
			              					<button className="btn btn-primary" type="button">
											<i className="fa fa-plus-square"></i>&nbsp;Agregar</button>
										</Link>
									</div>
		              			</CardBody>
		              		</Card>
		                	<Card>
			                  	<CardBody>
									<CardHeader>Lista de ordenes</CardHeader>
									<ReactTable
										getTrProps={(state, rowInfo, column) => {                   
		                                  	if(rowInfo === undefined){
		                                         
		                                          	return{

		                                          	}
		                                    	}else{
		                                           return{
		                                            onDoubleClick: (e) => {
		                                              this.props.history.push('/app/dashboard/edit/'+rowInfo.original.id);
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

export default connect(mapStateToProps, actions)(Items)