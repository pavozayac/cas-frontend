import * as yup from 'yup'

export const signInFormSchema = yup.object({
    email: yup.string().email().required('Email address is required'),
    password: yup.string().required('Password is required')
})