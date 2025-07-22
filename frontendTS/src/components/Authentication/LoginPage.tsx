import { useForm } from 'react-hook-form';
import './LoginPage.css';
import type { LoginFormData } from '../../interface/UserInterface';
import { login } from '../../services/userService';

export function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormData>({});

  async function onSubmit(data: LoginFormData) {
    try {
      await login(data);
      window.location.href = '/';
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.message);
      }
    }
  }

  return (
    <section className="align_center login_form_page">
      <form
        className="login_authentication_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login Form</h2>
        <div className="login_form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="login_form_text_input"
              {...register('email')}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="login_form_text_input"
              {...register('password')}
            />
          </div>
          <button type="submit" className="search_button login_form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
