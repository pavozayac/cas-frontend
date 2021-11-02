<script lang="ts">
    import { createForm } from 'felte'
    import { validator } from '@felte/validator-yup'
    import reporter from '@felte/reporter-tippy'
import { onMount } from 'svelte';
    
    export let submitAction
    export let validationSchema

    const { form, errors, data, createSubmitHandler, isSubmitting, isValid, handleSubmit } = createForm({
        onSubmit: (values) => {
            // console.log('bruh')
            // console.log(values)
            submitAction(values)
        },
        extend: [validator, reporter({
            tippyProps: {
                trigger: 'submit'
            }
        })],
        validateSchema: validationSchema,
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
    <slot {errors} {handleSubmit} ></slot>
</form>

