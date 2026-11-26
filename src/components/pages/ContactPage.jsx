import { useState } from 'react';
import { contact } from '../../data/portfolioData';
import { MailIcon, PhoneIcon, MapPinIcon } from '../Icons';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const [pick, setPick] = useState(false);
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(false);
  const subject = form.subject || 'Hello from your portfolio';
  const body = `${form.message}\n\nFrom: ${form.name}${form.email ? ` (${form.email})` : ''}`;
  const enc = encodeURIComponent;
  const send = () => {
    if (!form.message.trim()) { setErr('Write a short message first.'); return; }
    setErr(''); setPick(true);
  };
  const links = {
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(contact.email)}&su=${enc(subject)}&body=${enc(body)}`,
    outlook: `https://outlook.office.com/mail/deeplink/compose?to=${enc(contact.email)}&subject=${enc(subject)}&body=${enc(body)}`,
    app: `mailto:${contact.email}?subject=${enc(subject)}&body=${enc(body)}`,
  };
  const copy = async () => {
    const text = `To: ${contact.email}\nSubject: ${subject}\n\n${body}`;
    try { await navigator.clipboard.writeText(text); } catch {
      const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select();
      document.execCommand('copy'); t.remove();
    }
    setCopied(true); setTimeout(() => setCopied(false), 2500);
  };
  const [emailCopied, setEmailCopied] = useState(false);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(contact.email); } catch { /* ignore */ }
    setEmailCopied(true); setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="page active ct">
      <section className="ct-left">
        <div className="ct-kicker">// Let's connect</div>
        <h2 className="ct-title">Say <em>hello.</em></h2>
        <p className="ct-sub">Projects, opportunities, or a good conversation.</p>
        <div className="ct-open"><i />Open to Summer 2027 internships</div>
        <div className="ct-rule" />
        <div className="ct-label">Email me directly</div>
        <a className="ct-email" href={`mailto:${contact.email}`}>{contact.email}</a>
        <button className="ct-copy" onClick={copyEmail}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2" /></svg>
          {emailCopied ? 'Copied ✓' : 'Copy email'}
        </button>
        <div className="ct-links">
          <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href={contact.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={contact.devpostUrl} target="_blank" rel="noopener noreferrer">Devpost ↗</a>
        </div>
        <div className="ct-meta"><span className="ct-ic"><PhoneIcon /></span><a href={`tel:${contact.phone.replace(/\D/g, '')}`}>{contact.phone}</a></div>
        <div className="ct-meta"><span className="ct-ic"><MapPinIcon /></span>{contact.location}</div>
        <div className="ct-letter-wrap" aria-hidden="true">
          <img className="ct-letter" src="./stickers/letter-set.png" alt="" draggable="false" />
          <span className="ct-sign">Betül</span>
        </div>
      </section>

      <section className="ct-mail" aria-label="Write me a message">
        <div className="ct-mail-bar">
          <span className="ct-ic"><MailIcon /></span><span className="ct-file">new-message.eml</span>
          <span className="ct-draft">{pick ? 'Ready' : 'Draft'}</span>
        </div>
        <div className="ct-mail-body">
          <div className="ct-to"><span>To</span>{contact.name || 'Betül Cetintas'}</div>
          <div className="ct-row">
            <label className="ct-field"><span>Your name</span>
              <input type="text" placeholder="Name" value={form.name} onChange={update('name')} autoComplete="name" />
            </label>
            <label className="ct-field"><span>Your email</span>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={update('email')} autoComplete="email" />
            </label>
          </div>
          <label className="ct-field"><span>Subject</span>
            <input type="text" placeholder="What are you working on?" value={form.subject} onChange={update('subject')} />
          </label>
          <label className="ct-field"><span>Message</span>
            <textarea placeholder="Tell me a little about it..." value={form.message} onChange={update('message')} />
          </label>
          {err && <div className="send-err">{err}</div>}
          {!pick ? (
            <div className="ct-send-row">
              <button className="ct-send" onClick={send}>
                <span className="ct-ic"><MailIcon /></span>Send message →
              </button>
            </div>
          ) : (
            <div className="send-pick">
              <div className="send-pick-title">How do you want to send it?</div>
              <div className="send-pick-row">
                <a className="send-opt" href={links.gmail} target="_blank" rel="noreferrer">Gmail</a>
                <a className="send-opt" href={links.outlook} target="_blank" rel="noreferrer">Outlook</a>
                <a className="send-opt" href={links.app}>Mail app</a>
                <button className="send-opt" onClick={copy}>{copied ? 'Copied ✓' : 'Copy message'}</button>
              </div>
              <div className="send-pick-note">Your message is already filled in.</div>
              <button className="send-back" onClick={() => setPick(false)}>← edit message</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
