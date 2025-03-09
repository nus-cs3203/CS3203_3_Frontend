"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Eye, EyeClosed } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ERROR_MESSAGE_API } from "@/constants/Constants"
import { emailFieldValidation } from "@/utils/FormValidation"
import { useRouter } from "next/navigation";
import { API_BASE_URL_USER_MANAGEMENT, LOGIN_ENDPOINT, SIGNIN_SERVER_ENDPOINT } from "@/constants/ApiRoutes";
import axios from "axios"
import { useAuth } from "@/context/AuthContext"

/**
This component represents the form for signing in an existing account
*/
const formSchema = z.object({
    email: emailFieldValidation,
    password: z.string({ message: 'Password cannot be empty.'})
})


export default function SignInForm() {
    //Access the authentication states
    const { isAuthenticated, login } = useAuth();
    const router = useRouter();


    //States
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSubmittingForm, setIsSubmittingForm] = useState(false)

    //Toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev: boolean) => !prev);
    };

    //Toast management
    const { toast } = useToast()

   
    // Define the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
 
    //Handler function after user presses sign up
    async function onSubmit({ email, password }: z.infer<typeof formSchema>) {
        setIsSubmittingForm(true)

        try {
            //Make API call to login
            const loginApiEndpoint = API_BASE_URL_USER_MANAGEMENT + '/' + LOGIN_ENDPOINT
            const apiResult = await axios.post(loginApiEndpoint,
                {
                    "email": email,
                    "password": password
                }
            )
            const jwtToken = apiResult.data.jwt


            if (jwtToken) {
                //Set cookie with JWT token
                await axios.post(SIGNIN_SERVER_ENDPOINT, {
                    "token": jwtToken
                })

                //Update global state
                login()

                //Successful, redirect to home page
                router.push('/')
            }

        } catch (error) {
            let message = ERROR_MESSAGE_API
            
            //Axios error
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    message = error.response?.data?.message;
                } else {
                    message = ERROR_MESSAGE_API
                }
            }

            //Display destructive toast
            toast({
                variant: "destructive",
                description: message,
                duration: 3000,
            })
        } finally {
            // Clean up
            setIsSubmittingForm(false)
        }
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                    <FormLabel className='text-yap-black-800 text-lg'>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Your email" type='email' className='sign-up-field' {...field} />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                    <FormLabel className='text-yap-black-800 text-lg'>Password</FormLabel>
                    <FormControl>
                        <div className='flex items-center space-x-2'>
                            <Input placeholder="Your password" type={isPasswordVisible ? "text" : "password"} className='sign-up-field' {...field} />
                            <div className='cursor-pointer text-yap-gray-800' onClick={togglePasswordVisibility}>
                                { isPasswordVisible ? <EyeClosed /> : <Eye /> }
                            </div>
                        </div>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Submit button */}
            <Button className='rounded-full bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 w-full text-base'
                type="submit"
                disabled={ isSubmittingForm }
                
            >{isSubmittingForm ? "Signing in..." : "Sign In" }</Button>
          </form>
        </Form>
      )
}