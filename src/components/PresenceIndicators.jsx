import React from 'react';
import styles from '../../styles/Editor.module.css';

const PresenceIndicators = () => {
  return (
    <div id="presence-indicators" className={styles['presence-indicators']}>
      <div className={`${styles['presence-user']} ${styles['current']}`}>Current User</div>
      <div className={`${styles['presence-user']} ${styles['other']}`}>Other User 1</div>
      <div className={`${styles['presence-user']} ${styles['other']}`}>Other User 2</div>
    </div>
  );
};

export default PresenceIndicators;
