import React from 'react'; // Ensure this import is present
import useWindowDimensions from '../../services/hooks/useWindowDimensions.js'; // Add the .js extension
import s from './CalculatorPage.module.css';
import DailyCaloriesForm from '../../components/DailyCaloriesForm/DailyCaloriesForm.jsx'; // Add the .jsx extension
import SideBar from '../../components/SideBar/SideBar.jsx';
import Container from '../../components/Container/Container.jsx';
import Footer from '../../components/Footer/Footer.js';

const CalculatorPage = () => {
  const { width } = useWindowDimensions();

  return (
    <>
      {width < 1280 && (
        <main className={s.section}>
          <h1 className="visually-hidden">Calculator Page</h1>
          <div className={s.calculator}>
            <Container>
              <DailyCaloriesForm />
            </Container>
          </div>
          <div className={s.sidebar}>
            <Container>
              <SideBar />
              <Footer />
            </Container>
          </div>
        </main>
      )}
      {width > 1279 && (
        <Container>
          <main className={s.section}>
            <h3 className="visually-hidden">Calculator Page</h3>
            <div className={s.calculator}>
              <DailyCaloriesForm />
            </div>
            <SideBar />
          </main>
          <Footer />
        </Container>
      )}
    </>
  );
};

export default CalculatorPage;
