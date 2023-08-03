'use client';

import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';

import { useUserService } from '_services';
import { useRouter } from 'next/navigation';

export default Login;

function Login() {
  const router = useRouter();
  const userService = useUserService();

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const fields = {
    username: register('username', { required: 'Username is required' }),
    password: register('password', { required: 'Password is required' })
  };

  async function onSubmit({ username, password }: any) {
    await userService.login(username, password);
  }

  return (
    <Card className='w-full sm:w-1/2'>
      <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Login</h4>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <div className="mb-2 block">
            <Label
              htmlFor="username"
              value="Username"
            />
          </div>
          <TextInput
            id="username"
            type="text"
            placeholder="John Smith"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            required
            {...fields.username}
          />
          <div className="invalid-feedback">{errors.username?.message?.toString()}</div>
        </div>
        <div className="mb-3">
          <div className="mb-2 block">
            <Label
              htmlFor="password1"
              value="Password"
            />
          </div>
          <TextInput
            id="password1"
            placeholder="********"
            required
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            type="password"
            {...fields.password}
          />
          <div className="invalid-feedback">{errors.password?.message?.toString()}</div>
        </div>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <Button type="submit" disabled={formState.isSubmitting}>
            Submit
          </Button>
          <Button type="button" color="light" onClick={() => router.push("/account/register")}>
            Register
          </Button>
        </div>
      </form>
    </Card>
  );
}
