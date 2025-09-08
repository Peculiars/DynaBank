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
    placeholder: string,
    type?: string
}

const CustomInput = ({control, name, label, placeholder, type}: CustomInput) => {
  return (
    <div>
        <FormField control={control} name={name} render={({ field }) => (
            <FormItem>
                <div className='form-item'>
                    <FormLabel className='form-label'>{label}</FormLabel>
                </div>
                <div className='flex w-full flex-col'>
                    <FormControl>
                        <Input 
                            placeholder={placeholder} 
                            type={type || (name === 'password' ? 'password' : 'text')} 
                            className='input-class' 
                            {...field}
                            {...(type === 'date' && {
                                pattern: "\\d{4}-\\d{2}-\\d{2}",
                                onFocus: (e) => {
                                    e.target.type = 'date';
                                },
                                onBlur: (e) => {
                                    if (!e.target.value) {
                                        e.target.type = 'text';
                                    }
                                }
                            })}
                        />
                    </FormControl>
                    <FormMessage className='form-message mt-2'/>
                </div>
            </FormItem>
        )}/>
    </div>
  )
}

export default CustomInput