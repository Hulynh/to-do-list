import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    // Setting up state
    this.state = {
      userInput: "",
      list: [],
    };
    axios
      .get("http://localhost:3001/todo/api/all")
      .then((res) => {
        const list = res.data;
        console.log(list);
        this.setState({ list });
      })
      .catch((error) => console.log(error));
  }

  // Set a user input content
  updateInput(content) {
    this.setState({
      userInput: content,
    });
  }

  // Add item if user input is not empty
  addItem() {
    if (this.state.userInput !== "") {
      const userInput = this.state.userInput;
      console.log(userInput);
      // Update database item
      axios
        .post("http://localhost:3001/todo/api/create", { content: userInput })
        .then((res) => {
          const list = [...this.state.list];
          list.push(res.data);
          console.log(list);
          this.setState({
            list,
            userInput: "",
          });
        })
        .catch((error) => console.log(error));
    }
  }

  deleteItem(key) {
    console.log(key);
    axios
      .delete(`http://localhost:3001/todo/api/delete?id=${key}`)
      .then((res) => {
        console.log(res.data);
        const list = [...this.state.list];
        const updateList = list.filter((item) => item._id !== key);
        this.setState({
          list: updateList,
        });
      })
      .catch((error) => console.log(error));
  }

  editItem = (id, index) => {
    const todos = [...this.state.list];
    const editedTodo = prompt("Edit to do:");
    // edit list if input not null
    if (editedTodo !== null && editedTodo.trim() !== "") {
      //update to do on database
      axios
        .post("http://localhost:3001/todo/api/update", {
          id,
          content: editedTodo,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => console.log(error));
      let updatedTodos = [...todos];
      updatedTodos[index].content = editedTodo;
      this.setState({
        list: updatedTodos,
      });
    }
  };

  render() {
    return (
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: "bolder",
          }}
        >
          TODO LIST
        </Row>

        <hr />
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="add item . . . "
                size="lg"
                value={this.state.userInput}
                onChange={(item) => this.updateInput(item.target.value)}
                aria-label="add something"
                aria-describedby="basic-addon2"
              />
              <InputGroup>
                <Button
                  variant="dark"
                  className="mt-2"
                  onClick={() => this.addItem()}
                >
                  ADD
                </Button>
              </InputGroup>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {/* map over and print items */}
              {this.state.list.map((item, index) => {
                return (
                  <div key={item._id}>
                    <ListGroup.Item
                      variant="dark"
                      action
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.content}
                      <span>
                        <Button
                          style={{ marginRight: "10px" }}
                          variant="light"
                          onClick={() => this.deleteItem(item._id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="light"
                          onClick={() => this.editItem(item._id, index)}
                        >
                          Edit
                        </Button>
                      </span>
                    </ListGroup.Item>
                  </div>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
