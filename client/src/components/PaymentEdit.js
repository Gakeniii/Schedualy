import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState({
    credit_card: '',
    debit_card: '',
    insurance: '',
    angel_donation: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/payment-options/${id}`)
      .then(response => response.json())
      .then(data => {
        setPayment({
          credit_card: data.credit_card || '',
          debit_card: data.debit_card || '',
          insurance: data.insurance || '',
          angel_donation: data.angel_donation || '',
        });
      })
      .catch(error => console.error('Error fetching payment details:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setPayment((prevPayment) => ({
      ...prevPayment,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedPayment = {
      credit_card: payment.credit_card,
      debit_card: payment.debit_card,
      insurance: payment.insurance,
      angel_donation: payment.angel_donation,
    };

    try {
      const response = await fetch(`/payment-options/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPayment),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Payment details updated successfully');
        navigate('/patients');
      } else {
        alert('Failed to update payment details: ' + result.message);
      }
    } catch (error) {
      alert('Error updating payment details');
      console.error('Error updating payment details:', error);
    }

    setIsSubmitting(false);
  };

  return (
    <div id="edit-payment-container">
      <h2>Edit Payment Options</h2> <br></br>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="checkbox"
              name="credit_card"
              checked={payment.credit_card}
              onChange={handleChange}
            />
            Credit Card
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="debit_card"
              checked={payment.debit_card}
              onChange={handleChange}
            />
            Debit Card
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="insurance"
              checked={payment.insurance}
              onChange={handleChange}
            />
            Insurance
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="angel_donation"
              checked={payment.angel_donation}
              onChange={handleChange}
            />
            Angel Donation
          </label>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Update Payment'}
        </button>
      </form>
    </div>
  );
};

export default EditPayment;
