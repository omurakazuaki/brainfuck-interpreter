import React from 'react';
import { Form, ButtonGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CodeFormProps {
  updateCode: (string) => void,
  runCode: () => void,
  stepCode: () => void,
  stop:() => void,
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
      <Form>
        <Form.Label>Code</Form.Label>
        <Form.Control as="textarea" aria-label="code" rows={10} onChange={this.handleChangeCode} />
        <ButtonGroup className="mr-5">
          <Button variant="info" onClick={this.handleClickRun}>RUN</Button>
          <Button variant="info" onClick={this.handleClickStep}>STEP</Button>
        </ButtonGroup>
        <Button variant="secondary" onClick={this.handleClickStop}>STOP</Button>
      </Form>
    );
  }
}
