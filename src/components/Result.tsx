import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

interface ResultProps {
  result: string
};

export default class Result extends React.Component<ResultProps> {

  render() {
    return (
      <Form>
        <Form.Label>Result</Form.Label>
        <Form.Row>
        {this.props.result}
        </Form.Row>
      </Form>
    );
  }
}
