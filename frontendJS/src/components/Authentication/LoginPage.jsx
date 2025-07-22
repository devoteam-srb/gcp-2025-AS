import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import './LoginPage.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z
    .string()
    .min(3, { message: 'Email must be at least 3 characters long' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

const LoginPage = () => {
  //DEO ZA useREF!
  //   const nameRef = useRef(null);
  //   const phoneRef = useRef(null);
  // const navigate = useNavigate();
  const [formError, setFormError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  //DEO ZA useState
  //   const [user, setUser] = useState({
  //     name: '',
  //     phone: '',
  //   });
  //Zajedno useState i useRef
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // const user = {
  //     //   name: '',
  //     //   phone: 0,
  //     // };
  //OVE DVE LINIJE SU ZA useREF
  //     // user.name = nameRef.current.value;
  //     // user.phone = parseInt(phoneRef.current.value);

  //     // console.log(user);
  //     console.log(user);
  //   };

  const onSubmit = async (formData) => {
    try {
      await login(formData);
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFormError(error.response.data.message);
      }
    }
  };
  return (
    <section className="align_center form_page">
      <form
        action=""
        className="authentication_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              //   ref={nameRef} - ZA useREF
              className="form_text_input"
              placeholder="Enter your email address"
              //   onChange={(e) => setUser({ ...user, name: e.target.value })} -ZA USESTATE
              {...register('email')}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              //   ref={phoneRef} //OVO je za useREF
              className="form_text_input"
              placeholder="Enter your password"
              //   onChange={(e) =>
              //     setUser({ ...user, phone: parseInt(e.target.value) })
              //   } -- ovo je za USESTATE
              {...register('password')}
              //   value={user.name} //POGLEDAJ OVO
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
