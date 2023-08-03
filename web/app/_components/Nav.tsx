'use client';

import { useState } from 'react';

import { useUserService } from '_services';
import { Navbar, Spinner } from 'flowbite-react';

export { Nav };

function Nav() {
  const [loggingOut, setLoggingOut] = useState<boolean>(false);
  const userService = useUserService();

  async function logout() {
    setLoggingOut(true);
    await userService.logout();
  }

  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand
        href="https://flowbite-react.com"
      >
        <img
          alt="Logo"
          className="w-12 h-12"
          src="/next.svg"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          active
          href="#"
        >
          Home
        </Navbar.Link>
        <Navbar.Link href="/doctors">
          Doctors
        </Navbar.Link>
        <Navbar.Link onClick={logout} disabled={loggingOut}>
          {
            loggingOut
            ? <Spinner />
            : <span>Logout</span>
          }
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}