import { Form } from 'react-bootstrap';

interface Props {
  result: string
};

const Result = (props: Props) => {
  return (
    <Form>
      <Form.Label>Result</Form.Label>
      <Form.Row className="result">
        <pre className="m-4">
          {props.result}
        </pre>
      </Form.Row>
    </Form>
  );
};

export default Result;
