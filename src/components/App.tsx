import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Brainfuck, Status } from '../core/Brainfuck';
import Header from './Header';
import CodeForm from './CodeForm';
import Result from './Result';
import CodeViewer from './CodeViewer';
import MemoryViewer from './MemoryViewer';
import Footer from './Footer';
import '../css/App.scss';

const App = () => {

  const [interpreter, setInterpreter] = useState<Brainfuck>(null);
  const [code, setCode] = useState<string>(null);
  const [stdin, setStdin] = useState<string[]>([]);
  const [codePointer, setCodePointer] = useState<number>(null);
  const [memory, setMemory] = useState<Int8Array>(null);
  const [ptr, setPtr] = useState<number>(null);
  const [status, setStatus] = useState<Status>(null);
  const [breakPoints, setBreakPoints] = useState<number[]>([]);
  const [result, setResult] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(null);

  const handleChangeCode = (code: string) => {
    try {
      const newInterpreter = new Brainfuck(code, {
        write: (n: number) => {
          if (n < 0) return;
          setResult(s => s + String.fromCodePoint(n));
        },
        onChangeCodePointer: setCodePointer,
        onChangeMemory: (memory: Int8Array, ptr: number) => {
          setMemory(memory);
          setPtr(ptr);
        },
        onChangeStatus: setStatus,
      });
      setInterpreter(newInterpreter);
      initState(newInterpreter);
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  const initState = (newInterpreter: Brainfuck) => {
      setCode(newInterpreter.code);
      setBreakPoints(newInterpreter.breakPoints);
      setResult('');
      setErrorMessage(null);
  }

  return (
    <div className="d-flex flex-column">
      <Header/>
      <Container className='base' fluid={true}>
        <Row>
          <Col sm={4}>
            <Row className="m-4">
              <Col>
                <CodeForm
                  status={status}
                  errorMessage={errorMessage}
                  stdin={stdin.join('')}
                  onUpdateCode={handleChangeCode}
                  onUpdateStdin={stdin => {
                    const stdinBuf = [...stdin];
                    interpreter.opt.read = () => {
                      const char = stdinBuf.shift();
                      setStdin([...stdinBuf]);
                      return char?.charCodeAt(0) || -1;
                    }
                  }}
                  onRun={trace => interpreter.run(trace)}
                  onStep={() => interpreter.step()}
                  onStop={() => interpreter.stop()}
                  onReset={() => {
                    interpreter.reset();
                    initState(interpreter)
                    }
                  } />
              </Col>
            </Row>
            <Row>
              <Col className="m-4">
                <Result result={result} />
              </Col>
            </Row>
          </Col>
          <Col sm={8}>
            <Row>
              <Col className="m-4">
                <CodeViewer
                  code={code}
                  codePointer={codePointer}
                  breakPoints={breakPoints}
                  onSetBreakPoint={bp => {
                    interpreter.setBreakPoint(bp);
                    setBreakPoints([...interpreter.breakPoints]);
                    }
                  } />
              </Col>
            </Row>
            <Row>
              <Col className="m-4">
                <MemoryViewer
                  memory={memory}
                  ptr={ptr} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
};

export default App;
