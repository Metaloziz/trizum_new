import { FunctionComponent } from 'react';
import styles from './ButtonPlay.module.scss';

const ButtonPlay: FunctionComponent = () => {
  return (
    <div className={styles.buttonPlay}>
      <div className={styles.playPic}>
        <svg width='73' height='75' viewBox='0 0 73 75' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M69.1339 45.1443C74.1346 41.2749 74.1346 33.7252 69.1339 29.8558C54.0212 18.1622 37.1458 8.94524 19.1393 2.54999L15.8497 1.38166C9.55633 -0.853515 2.90883 3.40448 2.05684 9.90091C-0.323633 28.052 -0.323633 46.9481 2.05684 65.0992C2.90882 71.5956 9.55632 75.8536 15.8497 73.6184L19.1392 72.4501C37.1458 66.0548 54.0212 56.8379 69.1339 45.1443Z'
            fill='url(#paint0_linear_11252_1420)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_11252_1420'
              x1='0.271484'
              y1='37.5002'
              x2='72.8844'
              y2='37.5002'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#7F28D9' />
              <stop offset='1' stopColor='#7427CC' />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p>Играть</p>
    </div>
  );
};

export default ButtonPlay;
