import React from "react";
import { Row, Col, Table,Button,Modal,Form} from "react-bootstrap";
import axios from 'axios';
import ReactPaginate from "react-paginate";


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaydata: "",
      offset: 0,
      perPage: 6,
      currentPage: 0,
      pageCount: 0,
      first_name:"",
      last_name:"",
      email:"",
      editid:"",
      editcontactmodal:false
    };
    this.deletehandler = this.deletehandler.bind(this);
    this.Edithandler = this.Edithandler.bind(this);
    this.Updatechangehandler = this.Updatechangehandler.bind(this);
  }

  async componentDidMount() {
    const [firstResponse, secondResponse] = await Promise.all([
      axios.get(`https://reqres.in/api/users?page=1`),
      axios.get(`https://reqres.in/api/users?page=2`)
    ]);
   
     const response=[...firstResponse.data.data,...secondResponse.data.data]
    
     if (response !== undefined) {
      const Paginationdata = response.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      this.setState({
        displaydata: Paginationdata,
        alldata:response
      });

      this.setState({
        pageCount: Math.ceil(response.length / this.state.perPage),
      });
    }
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    const nextdata = this.state.alldata.slice(
      offset,
      offset + this.state.perPage
    );
    this.setState({
      currentPage: selectedPage,
      offset: offset,
      displaydata: nextdata,
    });
  }
  
  deletehandler=(event)=>{
        const teamPlayers = this.state.displaydata.findIndex(x => x.id == event.target.id);
        this.state.displaydata.splice(teamPlayers, 1);
        this.setState({
        displaydata:this.state.displaydata
       })
  }

  Edithandler = (event) => {
    var edit_id = event.target.id;
    const data =this.state.displaydata.find((item) => item.id == edit_id);
    this.setState({
      editcontactmodal: !this.state.editcontactmodal,
      editid: edit_id,
      first_name: data.first_name, 
      last_name: data.last_name,
      email: data.email,
    });
  };

  Updatechangehandler = (event) => { 
   this.setState({[event.target.name]:event.target.value})
  }

  updated_submithandler = (event) => {
    event.preventDefault();
    this.setState({
      editcontactmodal: !this.state.editcontactmodal,
    });
    if (this.state!== "") {
      const Data = this.state.displaydata.find((item) => item.id == this.state.editid);
      Data.first_name = this.state.first_name;
      Data.last_name =this.state.last_name;
      Data.email =this.state.email;
      this.setState({
        displaydata:this.state.displaydata
      })
    }
  };


  modalClosehandle = (event) => {
    this.setState({
      editcontactmodal: false,
    });
  };
 



  render() {
    var allList = this.state.displaydata;
    if(allList.loading && allList==undefined){
      var list= "<h3>Please Wait ...</h3>"
     }
    if(!allList.loading && allList!=="" ){
       list = allList.map(
        (item)=>
        <tr key={item.id}> 
            <td>{item.id}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
            <td>
                <Button variant="primary mr-2 "> <i className="fa fa-pencil-square-o" aria-hidden="true" id={item.id} onClick={this.Edithandler} ></i></Button> 
                <Button variant="primary mr-2 "> <i className="fa fa-trash" aria-hidden="true" id={item.id} onClick={this.deletehandler} ></i></Button> 
            </td>
        </tr>
        )
      }

    return (

      <div className="tablepart" style={{ textAlign: "center" }}>
        <h2>User Info</h2>
        <div className="table_part">
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list}
            </tbody>
          </Table>

          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />

           <Modal show={this.state.editcontactmodal} onHide={this.modalClosehandle}>
              <Modal.Header closeButton >
                <Modal.Title>Edit Contact </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.updated_submithandler}>
                    <Row>
                      <Col sm={12}>
                        <Form.Control type="hidden"name="id" value={this.state.edit_id}/>
                        <Form.Group >
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text"  onChange={this.Updatechangehandler} name="first_name"  value={this.state.first_name}  required />
                                 
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> Last Name</Form.Label>
                          <Form.Control type="text"  onChange={this.Updatechangehandler}  name="last_name"  value={this.state.last_name}  required />
                               
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> Email</Form.Label>
                          <Form.Control  type="email" onChange={this.Updatechangehandler}  name="email"  value={this.state.email}  required />
                            
                        </Form.Group>
                      </Col>
                      
                      <Col sm={12}>
                        <Form.Group className="text-right">
                          <Button  variant="secondary"  className="themesflat-button blue mr-2"  onClick={this.modalClosehandle}> Cancel </Button>
                          <Button  variant="success"  type="submit"  className="themesflat-button blue"> Save </Button>
                        </Form.Group>
                      </Col>
                    </Row>
                </Form>
              </Modal.Body>
            </Modal>

        </div>
      </div>
    );
  }
}

export default Main;
