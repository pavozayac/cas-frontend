<script lang="ts">
import CenterWrapper from "lib/components/CenterWrapper.svelte";
import Container from "lib/components/Container.svelte";
import Form from "lib/components/forms/Form.svelte";
import TextArea from "lib/components/forms/TextArea.svelte";
import TextField from "lib/components/forms/TextField.svelte";
import Nav from "lib/components/navigation/Nav.svelte";
import SideMenu from "lib/components/navigation/SideMenu.svelte";
import { addReflectionSchema } from "lib/validationSchemas";
import { subscribe } from "svelte/internal";


</script>

<Nav/>
<SideMenu/>

<CenterWrapper>
<Container>
<div class="wrapper">
    <h1>Post a reflection</h1>
    <Form validationSchema={addReflectionSchema} let:errors let:data let:setField submitAction={()=>console.log()}>
        <TextField {errors} name="title" type="text"/>
        <TextArea {errors} name="text_content"/>
        <TextField let:value {errors} name="oneTag" label="Tag" placeholder="Tag" type="text">
            <button type="button" on:click={()=>{
                data.subscribe(values=>{
                    console.log(values)
                })
            }} class="add-tag-button">Add</button>
        </TextField>
    </Form>

</div>
</Container>
</CenterWrapper>

<style>
    .add-tag-button {
        font-family: Rubik, sans-serif;
        cursor: pointer;
        padding: 1rem;
        height: 100%;
        background: var(--accent-blue);
        color: white;
        border-radius: 9999px;
    }

    .wrapper {
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        border-radius: .5rem;
    }
</style>