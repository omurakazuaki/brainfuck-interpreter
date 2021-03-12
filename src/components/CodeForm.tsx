import React from 'react';
import { Form, ButtonGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Status } from '../core/Brainfuck';

interface CodeFormProps {
  updateCode: (string) => void,
  runCode: () => void,
  stepCode: () => void,
  stop:() => void,
  status: Status
};

export default class CodeForm extends React.Component<CodeFormProps> {

  constructor(props) {
    super(props);
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleClickRun = this.handleClickRun.bind(this);
    this.handleClickStep = this.handleClickStep.bind(this);
    this.handleClickStop = this.handleClickStop.bind(this);
  }

  handleChangeCode(e) {
    this.props.updateCode(e.target.value);
  }

  handleClickRun(_) {
    this.props.runCode();
  }

  handleClickStep(_) {
    this.props.stepCode();
  }

  handleClickStop(_) {
    this.props.stop();
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Label>Code</Form.Label>
          <Form.Row className="mb-4">
            <Form.Control as="textarea" aria-label="code" rows={10} onChange={this.handleChangeCode} />
          </Form.Row>
        </Form>
        <div className="d-flex">
          <div className="mr-auto">
            <Button variant="secondary" onClick={this.handleClickStop} disabled={this.props.status !== Status.RUNNING}>STOP</Button>
          </div>
          <div>
            <ButtonGroup>
              <Button variant="info" onClick={this.handleClickRun} disabled={this.props.status === null || this.props.status !== Status.STOPPED}>RUN</Button>
              <Button variant="info" onClick={this.handleClickStep} disabled={this.props.status === null || this.props.status !== Status.STOPPED}>STEP</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}
