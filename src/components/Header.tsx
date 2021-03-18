import { Navbar } from 'react-bootstrap';
import logoSvg from '../svg/logo.svg';

const Header = () => {
  return (
    <header>
      <Navbar bg="dark">
        <Navbar.Brand href="">
          <div className='site-name'>
            <img
              alt=""
              src={logoSvg}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Brainfuck Interpreter
          </div>
        </Navbar.Brand>
      </Navbar>
    </header>
  );
}

export default Header;
