import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';
import loginImg from '../../assets/login.svg';

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className='container hero'>
        <div className='hero-text'>
          <h1>ezCompliance Software Solution</h1>
          <p>ISO Compliance System (ICS)</p>
          <p>
            A management system standard which sets out the requirements and
            provides guidelines for establishing, developing, implementing,
            evaluating, maintaining, and continually improving a compliance
            management system (CMS).
          </p>
          <p>
            The International Organization for Standardization (ISO) is an
            international organization that sets worldwide proprietary,
            commercial, and industry standards. ISO has issued thousands of
            standards aimed to support organizations in delivering products and
            services that are of higher quality, safer, more secure, and
            environmentally friendly. ISO standards are important because they
            provide organizations and their customers with a shared benchmark of
            quality and safety of processes, services, products. Well-known ISO
            standards include ISO 9001 for quality management systems, ISO 20000
            for IT service management systems, ISO 27001 for IT security
            management systems, ISO 14001 for environmental management systems,
            and ISO 45001 for occupational health and safety. While not required
            by law for all industries, ISO certifications are highly regarded
            and internationally recognized.
          </p>
          <div className='hero-buttons --flex-start'>
            <button className='--btn --btn-danger'>
              <Link to={'/register'}>Register</Link>
            </button>
            <button className='--btn --btn-primary2'>
              <Link to={'/login'}>Login</Link>
            </button>
          </div>
        </div>

        <div className='hero-image'>
          <img src={loginImg} alt='Inventory' />
        </div>
      </section>
    </>
  );
};

export default Home;
