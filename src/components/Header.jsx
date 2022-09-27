import './css/modallogin.css';
import './css/header.css';
import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModalLogin from './ModalLogin';
import ModalAlert from './ModalAlret';
import { getCookie, deleteCookie } from '../shared/cookie';
import { apis } from '../api';
import { BsBellFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLogin } from '../features/loginSlice';

function Header() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cookie = getCookie('refreshToken');
  const isLoggedIn = useSelector((state) => state.login.value);
  useEffect(() => {
    if (cookie !== undefined) {
      dispatch(setIsLogin(true));
    } else {
      dispatch(setIsLogin(false));
    }
  }, [cookie]);

  // 로그인 모달
  const [login, setLogin] = useState(false);
  const handleShowLogin = () => setLogin(true);
  const handleCloseLogin = () => setLogin(false);

  // 알림창 모달
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleLogout = () => {
    apis
      .logoutUser()
      .then((res) => {
        console.log(res);
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        deleteCookie('memberId');
        deleteCookie('nickname');
        deleteCookie('email');
        window.location.replace('/');
      })
      .catch((err) => {
        console.log(err.response.data.message);
        const errMessage = err.response.data.message;
        alert(errMessage);
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        deleteCookie('memberId');
        deleteCookie('nickname');
        deleteCookie('email');
      });
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        style={{
          backgroundColor: '#cce3de',
          fontWeight: '600',
        }}
      >
        <Container>
          <Navbar.Brand
            onClick={() => window.location.replace('/')}
            className="brand-logo"
          >
            SHOES 🍭 BOX
          </Navbar.Brand>
          {isLoggedIn ? (
            <Nav className="test">
              <BsBellFill onClick={handleShow} />
            </Nav>
          ) : null}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn ? (
                <Nav.Link onClick={() => navigate('/')} className="menu">
                  My Moments
                </Nav.Link>
              ) : null}
              <Nav.Link onClick={() => navigate('/aboutus')} className="menu">
                About us
              </Nav.Link>
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <>
                  {/* 로그인시 */}
                  <Nav.Link
                    onClick={() => navigate('/mypage')}
                    className="menu"
                  >
                    My Page
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout} className="menu">
                    Log Out
                  </Nav.Link>
                </>
              ) : (
                <>
                  {/* 비로그인시 */}
                  <Nav.Link onClick={handleShowLogin} className="menu">
                    Log In
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ModalLogin login={login} handleCloseLogin={handleCloseLogin} />
      <ModalAlert
        show={show}
        onHide={handleClose}
        backdrop="static"
        // memberId={memberId}
        // state={state}
        // setState={setState}
      />
    </>
  );
}

export default Header;
