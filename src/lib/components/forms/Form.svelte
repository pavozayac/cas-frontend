<script lang="ts">
    import { createForm } from 'felte'
    import { validator } from '@felte/validator-yup'
    import reporter from '@felte/reporter-tippy'
    import { onMount, setContext } from 'svelte';
    
    export let submitAction: (value: any) => any
    export let validationSchema
    export let initialValues: Record<string, any> = null
    export let extraValidate: (any: any, any1: any, any2?: any) => {} = () => {return {}}
    export let onError: (errors: any) => any = (errors) => errors
    export let style = '';
    export let transform: (values) => Record<any, any> = (v) => v;

    const { form, errors, data, createSubmitHandler, isSubmitting, isValid, handleSubmit, setFields, setErrors, setTouched, validate, reset, touched } = createForm({
        onSubmit: async values => {
            // console.log('bruh')
            // console.log(values)
            try {
                await submitAction(values);
            } catch (err) {
                console.log('Form submission failed due to: ', err);
            }

        },
        onError: onError,
        extend: [validator, reporter({
            tippyProps: {
                trigger: 'submit',
                allowHTML: true
            }
        })],
        validateSchema: validationSchema,

        validate: (values) => extraValidate(values, setTouched, setErrors),
        initialValues: initialValues,
        transform: transform
    })
    // const key = 'formKey'
    // setContext(key, data)
    // onMount(() => {
    //     if (initialValues !== undefined && initialValues !== null) {
    //         console.log('Form valid', $errors);
    //         Object.entries(validationSchema).forEach(([key, value]) => {
    //             setError(key, null);
    //         })
    //     }
    // })


    // const altSubmit = createSubmitHandler({
    //     onSubmit: ()}
    // })
    // isSubmitting.subscribe((value)=>{
    //     console.log($isValid)
    //     console.log($errors)
    //     if (value == true && $isValid == true){
    //         submitAction($data)
    //     }
    // })
</script>
<!-- 
{@debug isValid}
{@debug $isSubmitting}
{@debug $data} -->
{@debug $errors}
{@debug $data}

<form {style} use:form>
    <slot {errors} {data} {setFields} {setErrors} {handleSubmit} {validate} {touched}></slot>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%
    }
</style>

