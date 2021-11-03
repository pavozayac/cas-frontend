<script lang="ts">
    import { createForm } from 'felte'
    import { validator } from '@felte/validator-yup'
    import reporter from '@felte/reporter-tippy'
    import { onMount } from 'svelte';
    
    export let submitAction
    export let validationSchema
    export let initialValues: Record<string, any> = {}

    const { form, errors, data, createSubmitHandler, isSubmitting, isValid, handleSubmit, setField } = createForm({
        onSubmit: async values => {
            // console.log('bruh')
            // console.log(values)
            await submitAction(values)
        },
        extend: [validator, reporter({
            tippyProps: {
                trigger: 'submit'
            }
        })],
        validateSchema: validationSchema,
        initialValues: initialValues
    })


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
{@debug $isSubmitting} -->

<form use:form>
    <slot {errors} {data} {setField} {handleSubmit} ></slot>
</form>

