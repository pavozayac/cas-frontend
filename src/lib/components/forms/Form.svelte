<script lang="ts">
    import { createForm } from 'felte'
    import { validator } from '@felte/validator-yup'
    import reporter from '@felte/reporter-tippy'
    import { onMount, setContext } from 'svelte';
    
    export let submitAction: (value: any) => any
    export let validationSchema
    export let initialValues: Record<string, any> = null
    export let extraValidate: (any: any, any1: any) => {} = () => {return {}}
    export let onError: (errors: any) => any = (errors) => errors

    const { form, errors, data, createSubmitHandler, isSubmitting, isValid, handleSubmit, setField, setError, setTouched, validate, reset } = createForm({
        onSubmit: async values => {
            // console.log('bruh')
            // console.log(values)
            await submitAction(values)
        },
        onError: onError,
        validate: async (values) => await extraValidate(values, setTouched),
        extend: [validator, reporter({
            tippyProps: {
                trigger: 'submit'
            }
        })],
        validateSchema: validationSchema,
        initialValues: initialValues
    })
    // const key = 'formKey'
    // setContext(key, data)

    if (initialValues !== null) {
        console.log('Form valid', $errors);
        Object.entries(validationSchema).forEach(([key, value]) => {
            setError(key, null);
        })
    }


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
{@debug $data}
{@debug isValid}
{@debug $isSubmitting}
{@debug $errors}
{@debug $data} -->


<form use:form>
    <slot {errors} {data} {setField} {setError} {handleSubmit} {validate} ></slot>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%
    }
</style>

