import { Form } from 'react-bootstrap';
import * as _ from 'lodash';

interface Props {
  code: string,
  codePointer: number,
  breakPoints: number[],
  onSetBreakPoint: (number) => void,
};

const CodeViewer = (props: Props) => {

  const handleClickToken = (e) => {
    const bp = Number(e.target.getAttribute('data-key'));
    props.onSetBreakPoint(bp);
  };

  const className = (index: number) => {
    const isBreakPoints = props.breakPoints.includes(index);
    const isCurrent = index === props.codePointer;
    if (isBreakPoints && isCurrent) {
      return 'token bg-secondary px-1';
    } else if (isBreakPoints) {
      return 'token bg-danger px-1';
    } else if (isCurrent) {
      return 'token bg-info px-1';
    } else {
      return 'token px-1';
    }
  };

  const code = () => {
    if (!props.code) {
      return null;
    };
    return _([...props.code, 'EOF'])
      .map(c => c === ' ' ? '\u00A0': c)
      .map((c, i) => c === '\n' ? <br key={i} /> : <span onClick={handleClickToken} data-key={i} key={i} className={className(i)}>{c}</span>)
      .value();
  }

  return (
    <Form>
      <Form.Label>Code Viewer</Form.Label>
      <Form.Row  className="code">
        {code()}
      </Form.Row>
    </Form>
  );
}

export default CodeViewer;
