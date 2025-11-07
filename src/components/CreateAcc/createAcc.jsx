import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const CreateAcc = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus('');
    
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
      } else {
        setStatus(data.error || 'Registration failed');
      }
    } catch (err) {
      setStatus('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Join NeighBuddy
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your skill swap account
          </p>
        </div>
        {success ? (
          <div className="text-center">
            <div className="text-green-600 text-lg font-medium mb-4">Account created successfully!</div>
            <p className="text-gray-600">You can now log in with your credentials.</p>
          </div>
        ) : (
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form className="mt-8 space-y-6">
                {status && <div className="text-red-600 text-sm text-center">{status}</div>}
                <div className="space-y-4">
                  <div>
                    <Field
                      type="text"
                      name="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Full name"
                      disabled={isSubmitting}
                    />
                    <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Email address"
                      disabled={isSubmitting}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                  <div>
                    <Field
                      type="password"
                      name="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Password"
                      disabled={isSubmitting}
                    />
                    <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default CreateAcc;