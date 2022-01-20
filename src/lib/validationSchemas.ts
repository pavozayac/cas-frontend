import * as yup from 'yup'

export const signInFormSchema = yup.object({
    email: yup.string().email('The email must have format example@examplemail.com').required('Email address is required'),
    password: yup.string().required('Password is required')
})

export const registerSchema = yup.object({
    email: yup.string().email('Must be a valid email').required('Email address is required'),
    password: yup.string().min(8, 'Password must have at least 8 characters').test('Safety test', 'Password must contain at least 1 uppercase character, at least 1 lowercase character and at least 1 digit', value => {
        return value.toUpperCase() != value && value.toLowerCase() != value && /\d/.test(value)
    }).required('Password is required'),
    repeat_password: yup.string().required('Password is required').oneOf([yup.ref('password')], 'Passwords must match'),
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    post_visibility: yup.number().oneOf([0, 1, 2]).required('Post visibility is required'),
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
    file: yup.mixed().required('File required').test('Size test', 'File too large', value => value.size <= 5000000),
})

export const addReflectionSchema = yup.object().shape({
    title: yup.string().required('Title required'),
    text_content: yup.string().required('Text content required'),
    tags: yup.array().of(yup.string()).required(),
    categories: yup.array().transform(value => value === [] ? null : value).of(yup.string()).min(1, 'At least one category is required').required('Categories are required'),
    files: yup.array().of(yup.object()).required(),
    oneTag: yup.string().nullable(),
})

export const editReflectionSchema = yup.object().shape({
    attachments: yup.mixed().nullable(),
    title: yup.string().required('Title required'),
    text_content: yup.string().required('Text content required'),
    tags: yup.array().of(yup.string()).required(),
    // categories: yup.array().nullable(),
    // categories: yup.array().transform(value => value === [] ? null : value).of(yup.string()).min(1, 'At least one category is required').required('Categories are required'),
    delete_uuids: yup.array().of(yup.string()).nullable(),
    files: yup.array().nullable(),
    oneTag: yup.string().nullable(),
})

export const passwordRecoverySchema = yup.object().shape({
    email: yup.string().email('The email must have format example@examplemail.com').required('The email address is required'),
})

export const passowrdResetSchema = yup.object().shape({
    email: yup.string().email('The email must have format example@examplemail.com').required('The email address is required'),
    password: yup.string().min(8, 'Password must have at least 8 characters').test('Safety test', 'Password must contain at least 1 uppercase character, at least 1 lowercase character and at least one digit.', value => {
        return value.toUpperCase() != value && value.toLowerCase() != value && /\d/.test(value)
    }).required('Password is required'),
    repeat_password: yup.string().required('Password is required').oneOf([yup.ref('password')], 'Passwords must match'),
})

export const commentSchema = yup.object().shape({
    content: yup.string().max(200, 'Comment too long').required('Cannot post empty comment')
})

export const groupSchema = yup.object().shape({
    name: yup.string().required('Group name required'),
    description: yup.string().required('Description required'),
    graduation_year: yup.number().min(new Date().getFullYear()).max(new Date().getFullYear() + 2).required('Graduation year required'),
    file: yup.mixed().test('Size test', 'File too large', value => value ? value.size <= 5000000 : false).required('File required'),
})

export const groupUpdateSchema = yup.object().shape({
    name: yup.string().required('Group name required'),
    description: yup.string().required('Description required'),
    graduation_year: yup.number().min(new Date().getFullYear()).max(new Date().getFullYear() + 2).required('Graduation year required'),
    file: yup.mixed().test('Size test', 'File too large', value => value ? value.size <= 5000000 : true),
})

export const joinGroupSchema = yup.object().shape({
    code: yup.string().required('Code is required')
})