import * as yup from 'yup'

export const signInFormSchema = yup.object({
    email: yup.string().email('Must be a valid email').required('Email address is required'),
    password: yup.string().required('Password is required')
})

export const registerSchema = yup.object({
    email: yup.string().email('Must be a valid email').required('Email address is required'),
    password: yup.string().required('Password is required'),
    repeat_password: yup.string().required('Password is required').oneOf([yup.ref('password')], 'Passwords must match'),
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    post_visibility: yup.number().oneOf([0,1,2]).required('Post visibility is required')
})

export const profileUpdateSchema = yup.object({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
})

export const editProfileSchema = yup.object({
    fist_name: yup.string().required('First name required'),
    last_name: yup.string().required('Last name required'),
})

export const profileAvatar = yup.object({
    file: yup.mixed().required('File required').test('Size test', 'File too large', value=>value.size <= 5000000, )
})

export const addReflectionSchema = yup.object({
    title: yup.string().required(),
    text_content: yup.string().required(),
    tags: yup.string().required(),
    oneTag: yup.string().nullable(),
})