import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Brainfuck, Status } from '../core/Brainfuck';
import Header from './Header';
import CodeForm from './CodeForm';
import Result from './Result';
import CodeViewer from './CodeViewer';
import MemoryViewer from './MemoryViewer';
import Footer from './Footer';
import '../css/App.scss';

interface AppProps {}

interface AppState {
  code: string
  result: string
  memory: Int8Array
  ptr: number
  codePointer: number,
  status: Status,
  breakPoints: number[]
};

export default class App extends React.Component<AppProps, AppState> {

  brainfuck: Brainfuck;
  result: string

  constructor(props) {
    super(props);
    this.state = {
      code: null,
      result: '',
      memory: null,
      ptr: null,
      codePointer: null,
      status: null,
      breakPoints: []
    };
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleRunCode = this.handleRunCode.bind(this);
    this.handleStepCode = this.handleStepCode.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSetBreakPoint = this.handleSetBreakPoint.bind(this);
    this.result = '';
  }

  handleChangeCode(code: string) {
    this.brainfuck = new Brainfuck(code, {
      write: this.handleUpdateResult.bind(this),
      codePointTracer: this.handleUpdateCodePointer.bind(this),
      MemoryTracer: this.handleUpdateMemory.bind(this),
      onChangeStatus: this.handleChangeStatus.bind(this),
    });
    this.setState({
      code: this.brainfuck.code,
      breakPoints: this.brainfuck.breakPoints,
      result: ''
    });
    this.result = '';
  }

  handleUpdateResult(n: number) {
    this.result += String.fromCodePoint(n);
    this.setState({
      result: this.result
    });
  }

  handleUpdateCodePointer(codePointer: number) {
    this.setState({codePointer});
  }

  handleUpdateMemory(memory: Int8Array, ptr: number) {
    this.setState({memory, ptr});
  }

  handleRunCode() {
    this.brainfuck.run();
  }

  handleStepCode() {
    this.brainfuck.step();
  }

  handleStop() {
    this.brainfuck.stop();
  }

  handleReset() {
    this.brainfuck.reset();
    this.setState({
      code: this.brainfuck.code,
      breakPoints: this.brainfuck.breakPoints,
      result: ''
    });
    this.result = '';
  }

  handleChangeStatus(status) {
    this.setState({status});
  }

  handleSetBreakPoint(bp: number) {
    this.brainfuck.setBreakPoints(bp);
    this.setState({
      breakPoints: this.brainfuck.breakPoints
    });
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <Header/>
        <Container className='base' fluid={true}>
          <Row>
            <Col sm={4}>
              <Row className="m-4">
                <Col>
                  <CodeForm
                    status={this.state.status}
                    updateCode={this.handleChangeCode}
                    runCode={this.handleRunCode}
                    stepCode={this.handleStepCode}
                    stop={this.handleStop}
                    reset={this.handleReset} />
                </Col>
              </Row>
              <Row>
                <Col className="m-4">
                  <Result result={this.state.result} />
                </Col>
              </Row>
            </Col>
            <Col sm={8}>
              <Row>
                <Col className="m-4">
                  <CodeViewer
                    code={this.state.code}
                    codePointer={this.state.codePointer}
                    breakPoints={this.state.breakPoints}
                    setBreakPoint={this.handleSetBreakPoint} />
                </Col>
              </Row>
              <Row>
                <Col className="m-4">
                  <MemoryViewer
                    memory={this.state.memory}
                    ptr={this.state.ptr} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Footer/>
      </div>
    );
  }
}
