import {useState, createRef} from 'react';
import { Form, ButtonGroup, Button } from 'react-bootstrap';
import { Status } from '../core/Brainfuck';

interface Props {
  onUpdateCode: (string) => void,
  onRun: (boolean) => void,
  onStep: () => void,
  onStop:() => void,
  onReset:() => void,
  status: Status,
  errorMessage: String
};

const CodeForm = (props: Props) => {

  const [ trace ] = useState<React.RefObject<HTMLInputElement>>(createRef());

  const handleChangeCode = (e) => {
    props.onUpdateCode(e.target.value);
  };

  const handleClickRun = (_) => {
    props.onRun(trace.current.checked);
  };

  const handleClickStep = (_) => {
    props.onStep();
  };

  const handleClickStop = (_) => {
    props.onStop();
  };

  const handleClickReset = (_) => {
    props.onReset();
  };

  return (
    <div>
      <Form>
        <Form.Row className="mb-1">
          <Form.Label>Code</Form.Label>
          <Form.Control as="textarea" aria-label="code" rows={10} onChange={handleChangeCode} />
        </Form.Row>
        <Form.Row className="mb-4">
          <p className="text-danger">{props.errorMessage}</p>
        </Form.Row>
        {/* <Form.Row className="mb-4">
          <Form.Label>Stdin</Form.Label>
          <Form.Control as="textarea" aria-label="stdin" rows={3} ref={this.stdin} />
        </Form.Row> */}
      </Form>
      <Form.Row className="d-flex">
        <div className="mr-auto">
          <ButtonGroup>
            <Button variant="secondary" onClick={handleClickStop} disabled={props.status !== Status.RUNNING}>STOP</Button>
            <Button variant="secondary" onClick={handleClickReset} disabled={props.status === null || (props.status !== Status.STOPPED && props.status !== Status.END)}>RESET</Button>
          </ButtonGroup>
        </div>
        <div className="mr-4">
          <Form.Check label="STEP TRACE" ref={trace} />
        </div>
        <div>
          <ButtonGroup>
            <Button variant="info" onClick={handleClickRun} disabled={props.status === null || props.status !== Status.STOPPED}>RUN</Button>
            <Button variant="info" onClick={handleClickStep} disabled={props.status === null || props.status !== Status.STOPPED}>STEP</Button>
          </ButtonGroup>
        </div>
      </Form.Row>
    </div>
  );
}

export default CodeForm;
