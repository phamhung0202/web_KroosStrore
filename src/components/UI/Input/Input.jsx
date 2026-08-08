import React, { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(({ 
  label, 
  error, 
  icon: Icon, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        {Icon && (
          <div className={styles.iconWrapper}>
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          className={`${styles.input} ${Icon ? styles.hasIcon : ''} ${error ? styles.error : ''}`}
          {...props}
        />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
