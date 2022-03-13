import * as yup from 'yup'

const onlyLetters = /^[\p{L}\s]*$/gu;


export const signInFormSchema = yup.object({
    email: yup.string().email('The email must have format example@examplemail.com').required('Email address is required.'),
    password: yup.string().required('Password is required.')
})

export const registerSchema = yup.object({
    email: yup.string().email('The email must have format example@examplemail.com').required('Email address is required.'),
    password: yup.string().min(8, 'Password must have at least 8 characters.').test('Safety test', 'Password must contain at least 1 uppercase character, at least 1 lowercase character and at least 1 digit.', value => {
        return value.toUpperCase() != value && value.toLowerCase() != value && /\d/.test(value)
    }).required('Password is required.'),
    repeat_password: yup.string().required('Password is required.').oneOf([yup.ref('password')], 'Passwords must match.'),
    first_name: yup.string().required('First name is required.').matches(onlyLetters, 'Must only contain letters.'),
    last_name: yup.string().required('Last name is required.').matches(onlyLetters, 'Must only contain letters.'),
})

export const profileUpdateSchema = yup.object({
    first_name: yup.string().required('First name is required.').matches(onlyLetters, 'Must only contain letters.'),
    last_name: yup.string().required('Last name is required.').matches(onlyLetters, 'Must only contain letters.'),
})

export const editProfileSchema = yup.object({
    fist_name: yup.string().required('First name is required.').matches(onlyLetters, 'Must only contain letters.'),
    last_name: yup.string().required('Last name is required.').matches(onlyLetters, 'Must only contain letters.'),
})

export const profileAvatar = yup.object({
    file: yup.mixed().required('File required.').test('Size test', 'File is too large.', value => value.size <= 5000000),
})

yup.addMethod(yup.mixed, 'anyTrue', function anyTrue(message){
    return this.test('any-true', message, function (v) {
        const { path, createError } = this;

        console.log(Object.entries(v))
        console.log(Object.entries(v).filter(([key,val])=> key != "length").some(
            ([key, val]) => {
                return val == true; 
            }
        ))
        if (Object.entries(v).every(
            ([key, val]) => {
                return val == false; 
            }
        )){
            console.log('error created')
            return createError({ path, message: message ?? 'At least one must be chosen.'});
        }

        return true;
    })  
})

export const addReflectionSchema = yup.object().shape({
    title: yup.string().required('Title is required.'),
    text_content: yup.string().required('Text content is required.'),
    tags: yup.array().of(yup.string()).required(),
    // categories: yup.array().transform(v => v === [] ? null : v).of(yup.string()).min(1, 'At least one category is required').required('Categories are required'),
    post_visibility: yup.string().oneOf(["0", "1", "2"]).required('Post visibility is required.'),
    categories_error: yup.mixed().nullable(),
    creativity: yup.boolean().required(),
    activity: yup.boolean().required(),
    service: yup.boolean().required(),
    files: yup.array().ensure().required(),
    oneTag: yup.string().nullable(),
}).test(function (v) {
    const valid = ['creativity', 'activity', 'service'].some(field => v[field] == true);

    if (valid) return true;
    return this.createError({
        path: 'categories_error',
        message: 'At least one category must be chosen.'
    })
})

export const editReflectionSchema = yup.object().shape({
    title: yup.string().required('Title is required.'),
    text_content: yup.string().required('Text content is required.'),
    tags: yup.array().of(yup.string()).required(),
    post_visibility: yup.string().oneOf(["0", "1", "2"]).required('Post visibility is required.'),
    categories_error: yup.mixed().nullable(),
    creativity: yup.boolean().required(),
    activity: yup.boolean().required(),
    service: yup.boolean().required(),
    // categories: yup.mixed().test({ name: 'anyTrue', test: function(values) {
    //     const valid = ['creativity', 'activity', 'service'].some(field => values[field] == true);

    //     if (valid) return true;
    //     return this.createError({
    //         path: 'cat_error    ',
    //         message: 'At least one category must be chosen'
    //     })
    // }}).required(),
    // categories: yup.array().transform(value => value === [] ? null : value).of(yup.string()).min(1, 'At least one category is required').required('Categories are required'),
    delete_uuids: yup.array().of(yup.string()).nullable(),
    attachments: yup.array().nullable(),
    files: yup.array().nullable(),
    oneTag: yup.string().nullable(),
    }).test(function (v) {
    const valid = ['creativity', 'activity', 'service'].some(field => v[field] == true);

    if (valid) return true;
    return this.createError({
        path: 'categories_error',
        message: 'At least one category must be chosen.'
    })
})

export const passwordRecoverySchema = yup.object().shape({
    email: yup.string().email('The email must have format example@examplemail.com').required('The email address is required.'),
})

export const passowrdResetSchema = yup.object().shape({
    email: yup.string().email('The email must have format example@examplemail.com').required('The email address is required.'),
    password: yup.string().min(8, 'Password must have at least 8 characters.').test('Safety test', 'Password must contain at least 1 uppercase character, at least 1 lowercase character and at least one digit..', value => {
        return value.toUpperCase() != value && value.toLowerCase() != value && /\d/.test(value)
    }).required('Password is required.'),
    repeat_password: yup.string().required('Password is required').oneOf([yup.ref('password')], 'Passwords must match.'),
})

export const commentSchema = yup.object().shape({
    content: yup.string().max(200, 'Comment is too long. (Maximum 200 characters.)').required('Cannot post an empty comment.')
})

export const groupSchema = yup.object().shape({
    name: yup.string().required('Group name is required.'),
    description: yup.string().required('Description is required.'),
    graduation_year: yup.number().min(new Date().getFullYear()).max(new Date().getFullYear() + 2).required('Graduation year is required.'),
    file: yup.mixed().test('Size test', 'File is too large.', value => value ? value.size <= 5000000 : false).required('File is required.'),
})

export const groupUpdateSchema = yup.object().shape({
    name: yup.string().required('Group name required.'),
    description: yup.string().required('Description required.'),
    graduation_year: yup.number().min(new Date().getFullYear()).max(new Date().getFullYear() + 2).required('Graduation year required.'),
    file: yup.mixed().test('Size test', 'File is too large.', value => value ? value.size <= 5000000 : true),
})

export const joinGroupSchema = yup.object().shape({
    code: yup.string().required('Code is required')
})

export const notificationSchema = yup.object().shape({
    content: yup.string().required('Content is required.'),
    searchBox: yup.string().nullable(),
    recipients: yup.array().of(yup.number()).required()
})