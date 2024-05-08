import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import {Control, FieldPath} from 'react-hook-form'
import { z } from 'zod'
import { AuthformSchema } from '@/lib/utils'

const formSchema = AuthformSchema('sign-up');

interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string
}

const CustomInput = ({control, name, label, placeholder}: CustomInput) => {
  return (
    <div>
        <FormField control={control} name={name} render={({ field }) => (
            <FormItem>
                <div className='form-item'>
                    <FormLabel className='form-label'>{label}</FormLabel>
                </div>
                <div className='flex w-full flex-col'>
                    <FormControl>
                        <Input placeholder={placeholder} type={name === 'password' ? 'password' : 'text'} className='input-class' {...field}/>
                    </FormControl>
                    <FormMessage className='form-message mt-2'/>
                </div>
            </FormItem>
        )}/>
    </div>
  )
}

export default CustomInput