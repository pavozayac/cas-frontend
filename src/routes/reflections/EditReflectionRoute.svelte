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
    import TagButton from "lib/components/reflections/TagButton.svelte";
    import TagsList from "lib/components/reflections/TagsList.svelte";
    import MultipleFileField from "lib/components/forms/MultipleFileField.svelte";
    import FileList from "lib/components/reflections/FileList.svelte";
    import Checkboxes from "lib/components/forms/Checkboxes.svelte";
    import Submit from "lib/components/forms/Submit.svelte";
    import { getReflection, updateReflection } from "api/Reflection";
    import type { Reflection } from "api/Reflection";



import { swr } from "api/swr";

    export let reflection_id: number;

    function extraValidate(values, setTouched) {
        const errors = {};
        console.log(values);
        console.log("Valuestags: " + values.tags);
        console.log("Valuesfiles: " + values.files);

        if (typeof values.tags === "undefined" || values?.tags.length < 1) {
            errors.oneTag = "Must have at least one tag";
        }

        if (typeof values.files === "undefined" || values?.files.length < 1) {
            errors.attachments = "Must have at least one attachment";
        }

        return errors;
    }

    const [reflectionStore] = swr(getReflection, "editReflection", [reflection_id]);

    function transformInitialValues(reflection: Reflection) {
        let newTags = Array();
        reflection.tags.forEach(tag => newTags.push(tag.name));
        reflection.tags = newTags;

        return reflection;
    }
</script>

<Nav />
<SideMenu />

{#await $reflectionStore then reflection}
<CenterWrapper>
    <Container>
        <div class="wrapper">
            <h1>Edit a reflection</h1>
            <Form
                {extraValidate}
                initialValues={transformInitialValues(reflection)}
                validationSchema={addReflectionSchema}
                let:errors
                let:data={formData}
                let:setField
                let:validate
                submitAction={async values => await updateReflection(values, reflection_id)}
            >
                <TextField {errors} name="title" type="text" />
                <TextArea {errors} name="text_content" />
                <TextField
                    let:value
                    {errors}
                    name="oneTag"
                    label="Tag"
                    placeholder="Tag"
                    type="text"
                >
                    <TagButton {validate} {formData} {setField} />
                </TextField>
                <TagsList {formData} />
                <div data-felte-reporter-tippy-position-for="categories" />
                <Checkboxes
                    {errors}
                    name="categories"
                    text="Categories"
                    items={{
                        Creativity: "creativity",
                        Activity: "activity",
                        Service: "service",
                    }}
                />
                <MultipleFileField {formData} {errors} name="attachments" />
                <FileList {formData} />
                <Submit text="Post" />
            </Form>
        </div>
    </Container>
</CenterWrapper>
{/await}

<style>
    .wrapper {
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        border-radius: 0.5rem;
    }
</style>
