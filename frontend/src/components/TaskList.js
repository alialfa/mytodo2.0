/**
 *  Ali_Mongi-L3T9-TODOapp+AUTHENTICATION
 * @TaskList.js - main task event area to allow update/delete triggers for todo tasks
 */
import React from "react";
import Row from "react-bootstrap/Row";

// iterate through tasks, display them with their delete buttons
const TaskList = (props) => {
  const tList = props.dbTasks.map((item, index) => {
    return (
      <div class="taskRow">
        <Row>
          <button
            onClick={props.taskPrepEdit}
            id={index}
            value={item._id}
            class="taskBtn taskBtnEdit"
          >
            ~
          </button>
          <button
            onClick={props.taskDelete}
            id={index}
            value={item._id}
            class="taskBtn taskBtnDelete"
          >
            x
          </button>
          <li>{item.task}</li>
        </Row>
      </div>
    );
  });

  return (
    <div class="taskList">
      <ol>{tList}</ol>
    </div>
  );
};

export default TaskList;
