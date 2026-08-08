import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage
    const existingMessages = JSON.parse(localStorage.getItem('kroos_contact_messages') || '[]');
    const newMessage = {
      id: 'msg_' + Date.now(),
      ...formData,
      date: new Date().toISOString(),
      status: 'Unread'
    };
    localStorage.setItem('kroos_contact_messages', JSON.stringify([newMessage, ...existingMessages]));

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          Have questions about our products, sizing, orders, or services? Our team is always ready to help you with fast and friendly support.
        </p>
      </div>

      <div className={styles.contactInfo}>
        <div className={styles.infoCard}>
          <div className={styles.iconWrapper}><MapPin size={24} /></div>
          <div className={styles.infoContent}>
            <h3>Store Address</h3>
            <p><strong>Kroos Store</strong><br/>08 Pham Hung, District 1<br/>Ho Chi Minh City, Vietnam</p>
          </div>
        </div>
        
        <div className={styles.infoCard}>
          <div className={styles.iconWrapper}><Phone size={24} /></div>
          <div className={styles.infoContent}>
            <h3>Phone</h3>
            <p>0988738556</p>
          </div>
        </div>
        
        <div className={styles.infoCard}>
          <div className={styles.iconWrapper}><Clock size={24} /></div>
          <div className={styles.infoContent}>
            <h3>Business Hours</h3>
            <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.iconWrapper}><Mail size={24} /></div>
          <div className={styles.infoContent}>
            <h3>Email</h3>
            <p>tonikroos08@gmail.com</p>
          </div>
        </div>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.contactForm}>
          <h2 className={styles.formTitle}>Send a Message</h2>
          
          {submitted ? (
            <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--color-light-gray)', borderRadius: 'var(--border-radius-md)' }}>
              <h3>Thank you for reaching out!</h3>
              <p style={{ marginTop: '1rem', color: 'var(--color-dark-gray)' }}>
                We have received your message and our concierge team will get back to you within 24 hours.
              </p>
              <Button 
                variant="outline-gold" 
                style={{ marginTop: '2rem' }}
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <Input 
                  label="Full Name" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required 
                />
                <Input 
                  label="Email Address" 
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </div>
              <Input 
                label="Subject" 
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                required 
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)', marginBottom: 'var(--spacing-md)' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-dark-gray)' }}>Message</label>
                <textarea 
                  className={styles.textarea}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  required 
                ></textarea>
              </div>
              <Button type="submit" variant="primary" size="lg">Send Message</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
