import { useState } from 'react';
import { contact } from '../../data/portfolioData';
import { MailIcon, PhoneIcon, LinkedInIcon, MapPinIcon, CodeIcon, StarIcon } from '../Icons';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const send = () => {
    const body = `${form.message}\n\nFrom: ${form.name} (${form.email})`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(form.subject || 'Hello from your portfolio')}&body=${encodeURIComponent(body)}`;
  };
  return (
    <div className="page active">
      <div className="section-header">
        <div className="section-title">Get in <span>Touch</span></div>
        <div className="section-sub">Always open to interesting conversations</div>
      </div>
      <div className="contact-grid">
        <a href={`mailto:${contact.email}`} className="contact-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="contact-icon"><MailIcon /></div>
          <div className="contact-info">
            <div className="contact-label">Email</div>
            <div className="contact-val">{contact.email}</div>
          </div>
        </a>
        <div className="contact-card">
          <div className="contact-icon"><PhoneIcon /></div>
          <div className="contact-info">
            <div className="contact-label">Phone</div>
            <div className="contact-val">{contact.phone}</div>
          </div>
        </div>
        <a href={contact.linkedinUrl} target="_blank" rel="noreferrer" className="contact-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="contact-icon"><LinkedInIcon /></div>
          <div className="contact-info">
            <div className="contact-label">LinkedIn</div>
            <div className="contact-val">{contact.linkedin}</div>
          </div>
        </a>
        <a href={contact.githubUrl} target="_blank" rel="noreferrer" className="contact-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="contact-icon"><CodeIcon /></div>
          <div className="contact-info">
            <div className="contact-label">GitHub</div>
            <div className="contact-val">{contact.github}</div>
          </div>
        </a>
        <a href={contact.devpostUrl} target="_blank" rel="noreferrer" className="contact-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="contact-icon"><StarIcon /></div>
          <div className="contact-info">
            <div className="contact-label">Devpost</div>
            <div className="contact-val">{contact.devpost}</div>
          </div>
        </a>
        <div className="contact-card">
          <div className="contact-icon"><MapPinIcon /></div>
          <div className="contact-info">
            <div className="contact-label">Location</div>
            <div className="contact-val">{contact.location}</div>
          </div>
        </div>
      </div>
      <div className="contact-form">
        <h3>// Send a Message</h3>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-input" type="text" placeholder="Jane Smith" value={form.name} onChange={update('name')} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="jane@example.com" value={form.email} onChange={update('email')} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Subject</label>
          <input className="form-input" type="text" placeholder="Let's collaborate!" value={form.subject} onChange={update('subject')} />
        </div>
        <div className="form-group">
          <label className="form-label">Message</label>
          <textarea className="form-textarea" placeholder="Tell me about your project or opportunity..." value={form.message} onChange={update('message')} />
        </div>
        <button className="form-submit" onClick={send}>Send Message ✦</button>
      </div>
    </div>
  );
}
