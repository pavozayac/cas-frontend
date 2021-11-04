<script lang="ts">
import { login } from "api/Auth";

import CenterWrapper from "lib/components/CenterWrapper.svelte";
import Container from "lib/components/Container.svelte";
import Form from "lib/components/forms/Form.svelte";
import TextArea from "lib/components/forms/TextArea.svelte";
import TextField from "lib/components/forms/TextField.svelte";
import Nav from "lib/components/navigation/Nav.svelte";
import SideMenu from "lib/components/navigation/SideMenu.svelte";
import { addReflectionSchema } from "lib/validationSchemas";
import { subscribe } from "svelte/internal";
import TagButton from 'lib/components/reflections/TagButton.svelte'
import TagsList from "lib/components/reflections/TagsList.svelte";
import MultipleFileField from "lib/components/forms/MultipleFileField.svelte";
import FileList from 'lib/components/reflections/FileList.svelte'
import Checkboxes from "lib/components/forms/Checkboxes.svelte";
import Submit from 'lib/components/forms/Submit.svelte'
import { postReflection } from "api/Reflection";

</script>

<Nav/>
<SideMenu/>

<CenterWrapper>
<Container>
<div class="wrapper">
    <h1>Post a reflection</h1>
    <Form validationSchema={addReflectionSchema} let:errors let:data={formData} let:setField let:validate submitAction={postReflection}>
        <TextField {errors} name="title" type="text"/>
        <TextArea {errors} name="text_content"/>
        <TextField let:value {errors} name="oneTag" label="Tag" placeholder="Tag" type="text">
            <TagButton {validate} {formData} {setField} />
        </TextField>
        <TagsList {formData}/>
        <MultipleFileField {formData} {errors} name="attachments" />
        <div data-felte-reporter-tippy-position-for="categories" />
        <Checkboxes {errors} name="categories" text="Categories" items={{
            'Creativity': 'creativity',
            'Activity': 'activity',
            'Service': 'service'
        }}/>
        <FileList {formData} />
        <Submit text="Post"/>
    </Form>

</div>
</Container>
</CenterWrapper>

<style>
    .wrapper {
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        border-radius: .5rem;
    }
</style>