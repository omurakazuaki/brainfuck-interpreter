import React from 'react';
import { Form, ButtonGroup, Button } from 'react-bootstrap';
import { Status } from '../core/Brainfuck';

interface CodeFormProps {
  updateCode: (string) => void,
  runCode: (boolean) => void,
  stepCode: () => void,
  stop:() => void,
  reset:() => void,
  status: Status,
  errorMessage: String
};

export default class CodeForm extends React.Component<CodeFormProps> {

  trace: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleClickRun = this.handleClickRun.bind(this);
    this.handleClickStep = this.handleClickStep.bind(this);
    this.handleClickStop = this.handleClickStop.bind(this);
    this.handleClickReset = this.handleClickReset.bind(this);
    this.trace = React.createRef();
  }

  handleChangeCode(e) {
    this.props.updateCode(e.target.value);
  }

  handleClickRun(_) {
    this.props.runCode(this.trace.current.checked);
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
          <Form.Row className="mb-1">
            <Form.Label>Code</Form.Label>
            <Form.Control as="textarea" aria-label="code" rows={10} onChange={this.handleChangeCode} />
          </Form.Row>
          <Form.Row className="mb-4">
            <p className="text-danger">{this.props.errorMessage}</p>
          </Form.Row>
          {/* <Form.Row className="mb-4">
            <Form.Label>Stdin</Form.Label>
            <Form.Control as="textarea" aria-label="stdin" rows={3} ref={this.stdin} />
          </Form.Row> */}
        </Form>
        <Form.Row className="d-flex">
          <div className="mr-auto">
            <ButtonGroup>
              <Button variant="secondary" onClick={this.handleClickStop} disabled={this.props.status !== Status.RUNNING}>STOP</Button>
              <Button variant="secondary" onClick={this.handleClickReset} disabled={this.props.status === null || (this.props.status !== Status.STOPPED && this.props.status !== Status.END)}>RESET</Button>
            </ButtonGroup>
          </div>
          <div className="mr-4">
            <Form.Check label="STEP TRACE" ref={this.trace} />
          </div>
          <div>
            <ButtonGroup>
              <Button variant="info" onClick={this.handleClickRun} disabled={this.props.status === null || this.props.status !== Status.STOPPED}>RUN</Button>
              <Button variant="info" onClick={this.handleClickStep} disabled={this.props.status === null || this.props.status !== Status.STOPPED}>STEP</Button>
            </ButtonGroup>
          </div>
        </Form.Row>
      </div>
    );
  }
}
