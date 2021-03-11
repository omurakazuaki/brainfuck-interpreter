import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import * as _ from 'lodash';

interface CodeViewerProps {
  code: string,
  codePointer: number
};

export default class CodeViewer extends React.Component<CodeViewerProps> {

  code() {
    if (!this.props.code) {
      return null;
    }
    return _([...this.props.code])
      .map((c, i) => <code key={i} className={this.props.codePointer === i ? 'bg-light' : ''}>{c}</code>)
      .value();
  }

  render() {
    return (
      <Form>
        <Form.Label>Code Viewer</Form.Label>
        <Form.Row  className="code">
          {this.code()}
        </Form.Row>
      </Form>
    );
  }
}
