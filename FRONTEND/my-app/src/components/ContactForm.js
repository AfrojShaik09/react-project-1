export default function ContactForm({
  formData,
  errors,
  isSubmitting,
  submitStatus,
  onChange,
  onSubmit,
}) {
  return (
    <form className="contact-form" onSubmit={onSubmit}>
      {submitStatus === "success" && (
        <div className="alert alert-success">
          <i className="bi bi-check-circle"></i>
          <span>Thank you! Your message has been sent successfully.</span>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="alert alert-error">
          <i className="bi bi-exclamation-circle"></i>
          <span>Failed to send message. Please try again.</span>
        </div>
      )}

      <div className="form-group">
        <label>Full Name *</label>
        <input
          name="name"
          className={`form-input ${errors.name && "error"}`}
          placeholder="Your full name"
          value={formData.name}
          onChange={onChange}
          disabled={isSubmitting}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          name="email"
          className={`form-input ${errors.email && "error"}`}
          placeholder="your@email.com"
          value={formData.email}
          onChange={onChange}
          disabled={isSubmitting}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Subject *</label>
        <input
          name="subject"
          className={`form-input ${errors.subject && "error"}`}
          placeholder="What is this about?"
          value={formData.subject}
          onChange={onChange}
          disabled={isSubmitting}
        />
        {errors.subject && (
          <span className="error-message">{errors.subject}</span>
        )}
      </div>

      <div className="form-group">
        <label>Message *</label>
        <textarea
          name="message"
          rows="5"
          className={`form-input ${errors.message && "error"}`}
          placeholder="Your message here..."
          value={formData.message}
          onChange={onChange}
          disabled={isSubmitting}
        />
        {errors.message && (
          <span className="error-message">{errors.message}</span>
        )}
      </div>

      <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Sending...
          </>
        ) : (
          <>
            <i className="bi bi-send"></i>
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
