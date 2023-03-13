import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: '80vh' }} className='--pad'>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
