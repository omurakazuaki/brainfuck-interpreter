import React from 'react';
import { Form } from 'react-bootstrap';
import * as _ from 'lodash';

interface CodeViewerProps {
  code: string,
  codePointer: number,
  breakPoints: number[],
  setBreakPoint: (number) => void,
};

export default class CodeViewer extends React.Component<CodeViewerProps> {

  constructor(props) {
    super(props);
    this.handleClickToken = this.handleClickToken.bind(this);
  }

  code() {
    if (!this.props.code) {
      return null;
    }
    const className = (index: number) => {
      const isBreakPoints = this.props.breakPoints.includes(index);
      const isCurrent = index === this.props.codePointer;
      if (isBreakPoints && isCurrent) {
        return 'token bg-secondary px-1';
      } else if (isBreakPoints) {
        return 'token bg-danger px-1';
      } else if (isCurrent) {
        return 'token bg-info px-1';
      } else {
        return 'token px-1';
      }
    }

    return _([...this.props.code])
      .map(c => c === ' ' ? '\u00A0': c)
      .map((c, i) => c === '\n' ? <br key={i} /> : <span onClick={this.handleClickToken} data-key={i} key={i} className={className(i)}>{c}</span>)
      .value();
  }

  handleClickToken(e) {
    const bp = Number(e.target.getAttribute('data-key'));
    this.props.setBreakPoint(bp);
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
