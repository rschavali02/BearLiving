"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TAuthCredentialsValidator, AuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import Image from 'next/image';

const Page = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const onSubmit = async (data: TAuthCredentialsValidator) => {
    console.log('Form submitted with data:', data); // Log the form submission data

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('User registered successfully');
        reset(); // Reset the form fields
      } else {
        console.error('Error registering user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-start justify-start lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-start space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image src="/BearLiving.png" alt="Bear Living" className="h-30 w-40" width={50} height={50} />
            <h1 className="text-2xl font-bold">
              Enter your Email, Join our Waitlist
            </h1>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    {...register('email')}
                    className={cn({
                      "focus-visible: ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com" />
                  {errors.email && <span className="text-red-500">Email is required</span>}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    {...register('password')}
                    type='password'
                    className={cn({
                      "focus-visible: ring-red-500": errors.password,
                    })}
                    placeholder="password" />
                  {errors.password && <span className="text-red-500">Password is required</span>}
                </div>

                <Button type="submit">
                  Sign up
                </Button>
              </div>
            </form>

            {/* Back to Home Button */}
            <Link href="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
