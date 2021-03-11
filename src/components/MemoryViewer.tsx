import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form } from 'react-bootstrap';
import * as _ from 'lodash';

interface MemoryViewerProps {
  memory: Int8Array,
  ptr: number
};

export default class MemoryViewer extends React.Component<MemoryViewerProps> {

  memory() {
    if (!this.props.memory) {
      return null;
    }
    return _(this.props.memory)
      .chunk(16)
      .map((l, i) => <Row key={i}>{_.map(l, (m, j)=><Col key={i * 16 + j}><code className={this.props.ptr === i * 16 + j ? 'bg-light' : ''}>{`${m}`.padStart(3, '0')}</code></Col>)}</Row>)
      .value();
  }

  render() {
    return (
      <Form>
        <Form.Label>Memory Viewer</Form.Label>
        <Form.Row className="memory">
          {this.memory()}
        </Form.Row>
      </Form>
    );
  }
}
