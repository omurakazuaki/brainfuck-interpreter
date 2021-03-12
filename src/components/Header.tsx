import React from 'react';
import { Navbar } from 'react-bootstrap';
import logoSvg from '../svg/logo.svg';

export default class Header extends React.Component {

  render() {
    return (
      <header>
        <Navbar bg="dark">
          <Navbar.Brand href="#home">
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
}
