"use client"
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { AuthformSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.action'
import PlaidLink from './PlaidLink'

const AuthForm = ({type}:{type:string}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setisLoading]=useState(false);

    const formSchema = AuthformSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      })

      const onSubmit = async (data: z.infer<typeof formSchema>)=> {
        setisLoading(true)
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            if(type === 'sign-up'){
                const newUser = await signUp(data)
                setUser(newUser)
            };
            if(type === 'sign-in'){
                const response = await signIn({
                    email: data.email,
                    password: data.password
                })
                if(response) router.push('/')
             }
        } catch (error) {
            
        }
        finally{
            setisLoading(false)
        }
        setisLoading(false)
      }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href='/' className='mb-12 cursor-pointer flex items-center gap-2'>
                <Image src='/icons/logo.svg' alt='Dyna Bank Logo' width={34} height={34}/>
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Dyna Bank</h1>
            </Link>
            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                    <p className='text-16 font-normal text-gray-600'>{user ? 'Link your account to get started' : 'Please enter your details'}</p>
                </h1>
            </div>
        </header>
        {/* {user ? ( */}
            <div>
                <PlaidLink user={user} variant='primary'/>
            </div>
         {/* ): ( */}
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {type === 'sign-up' &&(
                            <>
                                <div className='flex gap-4'>
                                    <CustomInput control={form.control} name='firstName' label='First name' placeholder='Enter your first name'/>
                                    <CustomInput control={form.control} name='lastName' label='Last name' placeholder='Enter your last name'/>
                                </div>
                                <CustomInput control={form.control} name='address' label='Address' placeholder='Enter your specific address'/>
                                <CustomInput control={form.control} name='city' label='City' placeholder='Enter your city'/>
                                <div className='flex gap-4'>
                                    <CustomInput control={form.control} name='state' label='State' placeholder='example: lagos'/>
                                    <CustomInput control={form.control} name='zipCode' label='Zip Code' placeholder='example: 101212'/>
                                </div>
                                <div className='flex gap-4'>
                                    <CustomInput control={form.control} name='dob' label='Date of Birth' placeholder='yyyy-mm-dd'/>
                                    <CustomInput control={form.control} name='bvn' label='BVN' placeholder='exammple: 1234567890'/>
                                </div>
                            </>
                        )}
                        <CustomInput control={form.control} name='email' label='Email' placeholder='Enter your email'/>
                        <CustomInput control={form.control} name='password' label='Password' placeholder='Enter your pasword'/>
                        <div className='flex flex-col gap-4'>
                            <Button type="submit" className='form-btn' disabled={isLoading}>{isLoading ? (
                                <>
                                    <Loader2 size={20} className='animate-spin'/> &nbsp; Loading... 
                                </>
                                )
                                : type === 'sign-in' ? 'Sign In' : 'Sign up'}
                            </Button>
                        </div>
                    </form>
                </Form>
                <footer className='flex justify-center gap-1'>
                    <p className='text-14 font-normal text-gray-600'>{type === 'sign-in'? "Dont't have an account" : "Already have an account"}</p>
                    <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                        {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                    </Link>
                </footer>
            </>
        {/* )} */}
    </section>
  )
}

export default AuthForm