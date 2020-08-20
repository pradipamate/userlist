import React from "react";
import { connect } from "react-redux";
import { Fetchingstart,deleteaction} from "./actions/main";
import { Row, Col, Table,Button} from "react-bootstrap";
import Datatable from 'react-bs-datatable';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: "",
      tasks: [
        { name: "First", category: "task" },
        { name: "Second", category: "task" },
        { name: "Three", category: "task" },
        { name: "Four", category: "task" },
        { name: "Five", category: "task" },
        { name: "Six", category: "task" },
      ],
    };
    this.deletehandler = this.deletehandler.bind(this);
    this.Edithandler = this.Edithandler.bind(this);
  }

  componentDidMount() {
   // this.props.dispatch(Fetchingstart());
    fetch("https://reqres.in/api/users?page=1")
      .then((result) => result.json())
      .then((result) => {
         this.setState({
           userdata:result.data
         })
         console.log(result,"data");
      });
  }
  
  Edithandler=(event)=>{

  }

  deletehandler=(event)=>{
     // this.props.dispatch(deleteaction(event.target.id))
       console.log("event.target.id",event.target.id)
       let modifieddata=this.state.userdata.findIndex(x => x.id == event.target.id);
       console.log(modifieddata);
       let newdata=this.state.userdata.splice(modifieddata, 1);
       this.setState({
        userdata:newdata
       })
  }
 


  render() {
    var allList = this.state.userdata;
    console.log("allList",allList);

    if(allList.loading && allList==undefined){
     var list= "<h3>Please Wait ...</h3>"
    }
    if(!allList.loading && allList!=="" ){
      var list = allList.map(
        (item)=>
        <tr key={item.id}> 
            <td>{item.id}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
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
           
        </div>
      </div>
    );
  }
}

const mapStatetToProps = (state) => {
  // console.log("state from form",state)
  return {
    alldata: state.MainReducer,
  };
};

export default connect(mapStatetToProps)(Main);
