'use client';

import { useForm } from 'react-hook-form';

import { useUserService } from '_services';
import { Button, Card, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';

export default Register;

function Register() {
  const router = useRouter();
  const userService = useUserService();

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const fields = {
    firstName: register('firstName', { required: 'First Name is required' }),
    lastName: register('lastName', { required: 'Last Name is required' }),
    username: register('username', { required: 'Username is required' }),
    password: register('password', {
      required: 'Password is required',
      minLength: { value: 6, message: 'Password must be at least 6 characters' }
    })
  }

  async function onSubmit(user: any) {
    await userService.register(user);
  }

  return (
    <Card className='w-full sm:w-1/2'>
      <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Register</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <TextInput {...fields.firstName} type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} placeholder='John'/>
          <div className="invalid-feedback">{errors.firstName?.message?.toString()}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <TextInput {...fields.lastName} type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} placeholder='Smith' />
          <div className="invalid-feedback">{errors.lastName?.message?.toString()}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <TextInput {...fields.username} type="text" className={`form-control ${errors.username ? 'is-invalid' : ''}`} placeholder='johnsmith' />
          <div className="invalid-feedback">{errors.username?.message?.toString()}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <TextInput {...fields.password} type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder='Password'/>
          <div className="invalid-feedback">{errors.password?.message?.toString()}</div>
        </div>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <Button type="submit" disabled={formState.isSubmitting}>
            Register
          </Button>
          <Button type="button" color="light" onClick={() => router.push("/account/login")}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
