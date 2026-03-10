import { Link, useLocation } from 'react-router-dom';

const SubmitSuccess = () => {
  const location = useLocation();
  const message =
    location.state?.message ||
    'Application submitted successfully. Check your email inbox for additional information.';

  return (
    <main className="apply-page">
      <section className="apply-hero">
        <h1>Application Submitted</h1>
      </section>

      <section className="apply-card submit-success-card">
        <p className="submit-success-message">{message}</p>
        <div className="submit-success-actions">
          <Link to="/" className="apply-submit submit-success-btn">Back to Home</Link>
          <Link to="/apply" className="apply-submit submit-success-btn">Submit Another Application</Link>
        </div>
      </section>
    </main>
  );
};

export default SubmitSuccess;
