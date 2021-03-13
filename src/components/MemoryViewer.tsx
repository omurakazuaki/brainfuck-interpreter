import { Row, Col, Form } from 'react-bootstrap';
import * as _ from 'lodash';

interface Props {
  memory: Int8Array,
  ptr: number
};

const MemoryViewer = (props: Props) => {
  const memory = () => {
    if (!props.memory) {
      return null;
    }
    return _(props.memory)
      .chunk(16)
      .map((l, i) => <Row key={i}>{_.map(l, (m, j)=><Col key={i * 16 + j}><code className={props.ptr === i * 16 + j ? 'bg-light' : ''}>{`${m}`.padStart(3, '0')}</code></Col>)}</Row>)
      .value();
  }

  return (
    <Form>
      <Form.Label>Memory Viewer</Form.Label>
      <Form.Row className="memory">
        {memory()}
      </Form.Row>
    </Form>
  );
};

export default MemoryViewer;
