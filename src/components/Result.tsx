import React from 'react';
import { Form } from 'react-bootstrap';

interface ResultProps {
  result: string
};

export default class Result extends React.Component<ResultProps> {

  render() {
    return (
      <Form>
        <Form.Label>Result</Form.Label>
        <Form.Row className="result">
          <pre className="m-4">
            {this.props.result}
          </pre>
        </Form.Row>
      </Form>
    );
  }
}
