import { Navbar } from 'react-bootstrap';
import githubSvg from '../svg/github.svg'

const Footer = () => {
  return (
    <footer>
      <Navbar bg="dark" className="d-flex justify-content-around">
        <Navbar.Brand href="https://github.com/omurakazuaki/brainfuck-interpreter" target="_blank">
          <div className='footer-link'>
            <img
              alt=""
              src={githubSvg}
              width="24"
              height="24"
              className="d-inline-block align-top"
            />{' '}
            source
          </div>
        </Navbar.Brand>
      </Navbar>
    </footer>
  );
}

export default Footer;
