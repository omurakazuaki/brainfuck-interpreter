import React from 'react';
import { Form, ButtonGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Status } from '../core/Brainfuck';

interface CodeFormProps {
  updateCode: (string) => void,
  runCode: () => void,
  stepCode: () => void,
  stop:() => void,
  reset:() => void,
  status: Status
};

export default class CodeForm extends React.Component<CodeFormProps> {

  constructor(props) {
    super(props);
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleClickRun = this.handleClickRun.bind(this);
    this.handleClickStep = this.handleClickStep.bind(this);
    this.handleClickStop = this.handleClickStop.bind(this);
    this.handleClickReset = this.handleClickReset.bind(this);
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

  handleClickReset(_) {
    this.props.reset();
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Label>Code</Form.Label>
          <Form.Row className="mb-4">
            <Form.Control as="textarea" aria-label="code" rows={18} onChange={this.handleChangeCode} />
          </Form.Row>
        </Form>
        <div className="d-flex">
          <div className="mr-auto">
            <ButtonGroup>
              <Button variant="secondary" onClick={this.handleClickStop} disabled={this.props.status !== Status.RUNNING}>STOP</Button>
              <Button variant="secondary" onClick={this.handleClickReset} disabled={this.props.status === null || this.props.status !== Status.STOPPED}>RESET</Button>
            </ButtonGroup>
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
