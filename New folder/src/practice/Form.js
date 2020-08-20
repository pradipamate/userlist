import React from "react";
import { Row, Col, Button,Container} from "react-bootstrap";
import { connect } from "react-redux";
import {SignUp} from './actions/form';
import Main from "./Main";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Fname:"",
      Lname:"",
      Semail:"",
      Spassword:"",
      Lemail: "",
      Lpassword: "",
      login: "no",
      loginscreen:true
    };
   this.onchangehandler=this.onchangehandler.bind(this)
  }

  onchangehandler=(event)=>{
    this.setState({
        [event.target.name] : event.target.value
    })
  }

  signUp=()=>{
    var Sdata={firstname:this.state.Fname,lastname:this.state.Lname,email:this.state.Semail,password:this.state.Spassword}
    this.props.dispatch(SignUp(Sdata))
    this.setState({ Fname:"",
            Lname:"",
            Semail:"",
            Spassword:"",
            loginscreen:false
          })

 }

  handle_Lemail = (event) => {
    this.setState({ Lemail: event.target.value });
  };

  handle_Lpassword = (event) => {
    this.setState({ Lpassword: event.target.value });
  };

  Login = () => {
    var allUsers = this.props.signUpData;
    function search(nameKey, allUsers) {
      for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email === nameKey) {
          return allUsers[i];
        }
      }
    }
    var resultObject = search(this.state.Lemail, allUsers);
    if (resultObject != undefined) {
      if (
        resultObject.email == this.state.Lemail &&
        resultObject.password == this.state.Lpassword
      ) {
        alert("Login Successfully");
        this.setState({ login: "yes" });
      } else {
        alert("login failed");
        this.setState({ login: "not",loginscreen:true});
      }
    } else {
      alert("please use valid credentials");
    }

    this.setState({ Lemail: "", Lpassword: "" });
  };

  render() {
    return (
      
       <Row className="custom_row"  style={{ border: "15px solid rgb(111, 201, 217)", color: "#2a283d",height:"100vh" }} >
        {this.state.login == "yes" ? (
          <Container>
            <Row>
                <Main />
             </Row>
          </Container>
        ) : (
          <Container>
              
              <div id="signup" style={ this.state.loginscreen ? { display:'block'} : {display : 'none'}}>
                  <Row className="custom_row form" style={{ background: "#2a283d" }}>
                    <Col md={12} className="text-center text-white" >
                      <h2 className="text-center"> Sign Up </h2>
                    </Col>
                      <Col md={12} className="">
                          <input type="text"
                            name="Fname" 
                            onChange={this.onchangehandler} 
                            value={this.state.Fname}
                             placeholder="first name"  required
                             />
                          <input type="text"
                             name="Lname" 
                              onChange={this.onchangehandler} 
                             value={this.state.Lname} 
                             placeholder="last name"   required
                             />
                          <input type="email"
                            name="Semail"
                            onChange={this.onchangehandler}
                             value={this.state.Semail}
                              placeholder="Email adress"  required
                              />
                           <input type="password" 
                            name="Spassword"  
                            onChange={this.onchangehandler}
                           value={this.state.Spassword}  
                            placeholder="Set password" required
                            />
                           <Button type="submit" className="btn btn-info getstart text-center" onClick={this.signUp}>
                        Login
                    </Button>
                    </Col>
                  </Row>
              </div>

              <div id="login"  style={ !this.state.loginscreen ? { display:'block'} : {display : 'none'}} >
                <Row className="custom_row form" style={{ background: "#2a283d" }}>
                  <Col md={12} className="text-center text-white">
                    <h2 className="text-center"> Login </h2>
                  </Col>
                  <div id="login">
                    <Col md={12}>
                      <input
                        type="text"
                        onChange={this.handle_Lemail}
                        value={this.state.Lemail}
                        placeholder="Username"
                        required
                      />
                      <input
                        type="password"
                        onChange={this.handle_Lpassword}
                        value={this.state.Lpassword}
                        placeholder="Password" required
                      />
                      <Button
                        type="submit"
                        className="btn btn-info getstart text-center"
                        onClick={this.Login} >
                        Login
                      </Button>
                    </Col>
                  </div>
                </Row>
              </div>

          </Container>
        )}
      </Row>
    );
  }
}

const mapStatetToProps = (state) => {
  return {
    signUpData: state.SignUp,
  };
};

export default connect(mapStatetToProps)(Form);
