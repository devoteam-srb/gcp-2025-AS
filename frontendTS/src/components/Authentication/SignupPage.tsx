import { useState } from 'react';

import user from '../../assets/user.webp';

import './SignupPage.css';
import { useForm } from 'react-hook-form';
import { signup } from '../../services/userService';
import type { SignupFormData } from '../../interface/UserInterface';

export function SignupPage() {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const { register, handleSubmit } = useForm<SignupFormData>({});

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data, profilePic);
      window.location.href = '/';
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <section className="align_center signup_form_page">
      <form
        className="signup_authentication_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>

        <div className="signup_image_input_section">
          <div className="signup_image_preview">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="signup_image_label">
            Upload Image
          </label>
          <input
            type="file"
            onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
            id="file-ip-1"
            className="signup_image_input"
          />
        </div>

        <div className="signup_form_inputs">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="signup_form_text_input"
              type="text"
              {...register('name')}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="signup_form_text_input"
              type="email"
              {...register('email')}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="signup_form_text_input"
              type="password"
              {...register('password')}
            />
          </div>

          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              className="signup_form_text_input"
              type="password"
              {...register('confirmPassword')}
            />
          </div>

          <div className="signup_textarea_section">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              className="signup_input_textarea"
              {...register('deliveryAddress')}
            />
          </div>
        </div>

        <button className="search_button signup_form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}
