import React from 'react';
import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'primary', // primary, secondary, gold, outline-gold
  size = 'md', // sm, md, lg
  fullWidth = false,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  ...props
}) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className
  ].join(' ').trim();

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;
