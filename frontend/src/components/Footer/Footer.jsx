import React from 'react';

const Footer = () => {
  return (
    <footer style={{ marginTop: '100px' }}>
      &copy; {new Date().getFullYear()} Slim Mom Apps created by{' '}
      <em>Team 2: "NUEROLOGICAL"</em>
    </footer>
  );
};

export default Footer;
