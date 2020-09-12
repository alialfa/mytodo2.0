/**
 *  Ali_Mongi-L3T9-TODOapp+AUTHENTICATION
 * @TaskInput.js - main task event area to allow create/read/update for todo tasks
 */
import React from "react";
import { Row } from "react-bootstrap";

const TaskInput = (props) => {
  var addShow, updateShow;
  if (props.editMode === false) {
    addShow = "showElement";
    updateShow = "hideElement";
  } else {
    updateShow = "showElement";
    addShow = "hideElement";
  }
  return (
    <div class="taskInput">
      <hr></hr>

      <Row>
        <h6>What do you wanna do ?</h6>
        <input type="text" value={props.text} onChange={props.handleChange} />
      </Row>
      <Row className="taskButtons">
        <button class={`btnTasks ${addShow}`} onClick={props.taskAdd}>
          add task
        </button>
        <button class={`btnTasks ${updateShow}`} onClick={props.taskEdit}>
          update
        </button>
        <button class={`btnTasks ${updateShow}`} onClick={props.cancelEdit}>
          cancel
        </button>
      </Row>
      <hr></hr>
    </div>
  );
};

export default TaskInput;
