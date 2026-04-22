import { useState } from "react";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import "./ContactUs.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = (d) => {
    const e = {};
    if (!d.name.trim()) e.name = "Name is required";
    if (!d.email.trim()) e.email = "Email is required";
    if (!d.subject.trim()) e.subject = "Subject is required";
    if (!d.message.trim() || d.message.length < 10)
      e.message = "Min 10 characters required";
    return e;
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const err = validate(formData);
    if (Object.keys(err).length) return setErrors(err);

    setErrors({});
    setIsSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Send us a message!</p>
      </div>

      <div className="contact-container">
        <ContactInfo />
        <ContactForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          submitStatus={submitStatus}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
