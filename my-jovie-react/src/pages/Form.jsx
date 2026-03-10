
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formElement = e.currentTarget;
        setIsSubmitting(true);
        setSubmitError('');

        try {
            const formData = new FormData(formElement);
            const response = await fetch('http://localhost:5001/api/form-submit', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || 'Failed to submit application.');
            }

            formElement.reset();
            navigate('/apply/success', {
                state: {
                    message: 'Application submitted successfully. Check your email inbox for additional information.',
                },
            });
        } catch (error) {
            setSubmitError(error.message || 'Something went wrong while submitting.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="apply-page">
            <section className="apply-hero">
                <h1>Jovie Caregiver Application</h1>
                <p>Note: All your details are securely safe and confidential.</p>
            </section>

            <section className="apply-card">
                <form className="apply-form" onSubmit={handleSubmit}>
                    <div className="apply-section">
                        <div className="apply-grid apply-grid-2">
                            <div className="apply-field">
                                <label htmlFor="firstName">First Name*</label>
                                <input id="firstName" name="firstName" type="text" placeholder="Enter first name" required />
                            </div>
                            <div className="apply-field">
                                <label htmlFor="lastName">Last Name*</label>
                                <input id="lastName" name="lastName" type="text" placeholder="Enter last name" required />
                            </div>
                            <div className="apply-field">
                                <label htmlFor="ssn">SSN*</label>
                                <input id="ssn" name="ssn" type="text" placeholder="000-00-0000" required />
                            </div>
                            <div className="apply-field">
                                <label htmlFor="phone">Phone*</label>
                                <input id="phone" name="phone" type="tel" placeholder="(000) 000-0000" required />
                            </div>
                            <div className="apply-field">
                                <label htmlFor="email">Email*</label>
                                <input id="email" name="email" type="email" placeholder="example@email.com" required />
                            </div>
                            <div className="apply-field">
                                <label htmlFor="address">Address*</label>
                                <input id="address" name="address" type="text" placeholder="Street, City, State, ZIP" required />
                            </div>
                            <div className="apply-field">
                                <label htmlFor="gender">Gender*</label>
                                <select id="gender" name="gender" defaultValue="" required>
                                    <option value="" disabled>Please Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                            <div className="apply-field">
                                <label htmlFor="fatherName">Father's Name*</label>
                                <input id="fatherName" name="fatherName" type="text" placeholder="Enter father's name" required />
                            </div>
                            <div className="apply-field">
                                <label htmlFor="motherName">Mother's Name*</label>
                                <input id="motherName" name="motherName" type="text" placeholder="Enter mother's name" required />
                            </div>
                            <div className="apply-field">
                                <label htmlFor="motherMaidenName">Mother's Maiden Name*</label>
                                <input id="motherMaidenName" name="motherMaidenName" type="text" placeholder="Enter mother's maiden name" required />
                            </div>
                            <div className="apply-field">
                                <label htmlFor="birthPlace">Place of Birth*</label>
                                <input id="birthPlace" name="birthPlace" type="text" placeholder="City / Country of birth" required />
                            </div>
                        </div>
                    </div>

                    <div className="apply-section">
                        <div className="apply-grid">
                            <div className="apply-field">
                                <label htmlFor="idFront">(Upload) Driver's License/State ID FRONT</label>
                                <small className="upload-note">Ensure it is clear and showing all corners</small>
                                <input id="idFront" name="idFront" type="file" accept="image/*,.pdf" required />
                            </div>
                            <div className="apply-field">
                                <label htmlFor="idBack">(Upload) Driver's License/State ID BACK</label>
                                <small className="upload-note">Ensure it is clear and showing all corners</small>
                                <input id="idBack" name="idBack" type="file" accept="image/*,.pdf" required />
                            </div>
                            <div className="apply-field">
                                <label htmlFor="ssnCard">(Upload) SSN CARD</label>
                                <small className="upload-note">Ensure it is clear and showing all corners</small>
                                <input id="ssnCard" name="ssnCard" type="file" accept="image/*,.pdf" required />
                            </div>
                            <div className="apply-field">
                                <label htmlFor="utilityBill">(Upload) Utility Bill</label>
                                <small className="upload-note">Ensure it is clear and showing all corners</small>
                                <input id="utilityBill" name="utilityBill" type="file" accept="image/*,.pdf" required />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="apply-submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                    {submitError && <p className="apply-feedback apply-feedback-error">{submitError}</p>}
                </form>
            </section>
        </main>
    );
};

export default Form;
