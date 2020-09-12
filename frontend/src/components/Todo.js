/**
 *  Ali_Mongi-L3T9-TODOapp+AUTHENTICATION
 * @Todo.js - main class that holds handlers for CRUD tasks
 */

import React from "react";
import TaskList from "../components/TaskList";
import TaskInput from "../components/TaskInput";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

class Todo extends React.Component {
  // initialize state vars
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      dbTasks: [],
      userId: this.props.userId,
      strategy: this.props.strategy,
      updateId: -1,
      editMode: false,
    };
    // context binding for events
    this.handleChange = this.handleChange.bind(this);
    this.taskAdd = this.taskAdd.bind(this);
    this.taskPrepEdit = this.taskPrepEdit.bind(this);
    this.taskEdit = this.taskEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.taskDelete = this.taskDelete.bind(this);
  }

  // if input changes
  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  // when task is ready, handle to store it
  taskAdd(event) {
    event.preventDefault();

    if (this.state.text.length === 0) {
      alert("Please key in a task!");
      return;
    } else {
      const addUrl = "/task/add";
      const fetchType = "POST";
      this.performFetch(addUrl, fetchType);
      this.clearAll();
    }
  }

  // load text box with task to edit
  taskPrepEdit(event) {
    const taskToEditIndex = event.target.id; // button-ID
    if (
      window.confirm(
        "Would you like to edit Task: " + (parseInt(taskToEditIndex) + 1) + " ?"
      )
    ) {
      this.setState({
        text: this.state.dbTasks[taskToEditIndex].task,
        updateId: event.target.value,
        editMode: true,
      });
    }
  }

  cancelEdit(event) {
    this.clearAll();
  }

  // allow a task to be edited
  taskEdit(event) {
    const editUrl = "/task/update";
    const fetchType = "PUT";
    const theUpdateId = this.state.updateId;
    this.performFetch(editUrl, fetchType, theUpdateId);
    this.clearAll();
  }

  // when we wish to remove a task that was added
  taskDelete(e) {
    const taskToRemoveIndex = e.target.id; // button-ID

    if (
      window.confirm(
        "Would you like to remove Task: " +
          (parseInt(taskToRemoveIndex) + 1) +
          " ?"
      )
    ) {
      const deleteUrl = "/task/delete";
      const fetchType = "DELETE";
      let deletionId = this.state.dbTasks[taskToRemoveIndex]._id;
      this.performFetch(deleteUrl, fetchType, deletionId);
    }
  }

  performFetch(fetchUrl, fetchType, fetchId) {
    const { text, userId } = this.state;
    let bodyData = {
      taskId: fetchId,
      userId: userId,
      task: text,
    };
    return fetch(fetchUrl, {
      method: fetchType,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
  }

  processFetch(fetchData) {
    fetchData
      .then((response) => response.json())
      .then((data) => alert(JSON.stringify(data)))
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // gets active dbTasks from database
  loadTasks() {
    const { userId } = this.state;
    //let userId = "1000090";

    fetch(`/task/index/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dbTasks: data,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // initialize
  componentWillMount() {
    this.loadTasks();
  }

  // any component changes
  componentDidUpdate(prevProps, prevState) {
    if (this.state.dbTasks !== prevState.dbTasks) {
      this.loadTasks();
    }
  }

  clearAll() {
    this.setState({ text: "", editMode: false });
  }

  render() {
    return (
      <Container fluid="sm">
        <Col className="todo">
          <div className="todoArea">
            <TaskList
              dbTasks={this.state.dbTasks}
              taskPrepEdit={this.taskPrepEdit}
              taskDelete={this.taskDelete}
            />
            <TaskInput
              text={this.state.text}
              handleChange={this.handleChange}
              taskAdd={this.taskAdd}
              taskEdit={this.taskEdit}
              editMode={this.state.editMode}
              cancelEdit={this.cancelEdit}
            />
          </div>
        </Col>
      </Container>
    );
  }
}

export default Todo;
