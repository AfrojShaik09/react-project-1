export default function ContactInfo() {
  return (
    <div className="contact-info">
      <div className="info-card">
        <div className="info-icon">
          <i className="bi bi-geo-alt"></i>
        </div>
        <h3>Location</h3>
        <p>
          123 Business Street <br />
          New York, NY 10001 <br />
          United States
        </p>
      </div>

      <div className="info-card">
        <div className="info-icon">
          <i className="bi bi-telephone"></i>
        </div>
        <h3>Phone</h3>
        <p>
          <a href="tel:+12345678900">+1 (234) 567-8900</a>
          <br />
          Mon - Fri, 9am - 6pm EST
        </p>
      </div>

      <div className="info-card">
        <div className="info-icon">
          <i className="bi bi-envelope"></i>
        </div>
        <h3>Email</h3>
        <p>
          <a href="mailto:hello@store.com">hello@store.com</a>
          <br />
          We'll respond within 24 hours
        </p>
      </div>

      <div className="info-card">
        <div className="info-icon">
          <i className="bi bi-clock"></i>
        </div>
        <h3>Business Hours</h3>
        <p>
          Monday - Friday: 9am - 6pm <br />
          Saturday: 10am - 4pm <br />
          Sunday: Closed
        </p>
      </div>
    </div>
  );
}
