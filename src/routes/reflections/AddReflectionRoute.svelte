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
    import { postReflection } from "api/Reflection";

    function extraValidate(values, setTouched, setError) {
        const errors = {};
        console.log(values);
        console.log("Valuestags: " + values.tags);
        console.log("Valuesfiles: " + values.files);

        if (typeof values.tags === "undefined" || values?.tags.length < 1) {
            errors.oneTag = "Must have at least one tag";
        } else {
            setError('tags', null);
        }

        if (typeof values.files === "undefined" || values?.files.length < 1) {
            errors.attachments = "Must have at least one attachment";
        } else {
            setError('attachments', null);
        }
        // if (true){
        // // if (values.categories && values?.categories.length > 1) {
        //     setTouched('categories')
        // }

        return errors;
    }
</script>

<Nav />
<SideMenu />

<CenterWrapper>
    <Container>
        <div class="wrapper">
            <h1>Post a reflection</h1>
            <Form
                {extraValidate}
                validationSchema={addReflectionSchema}
                let:errors
                let:data={formData}
                let:touched
                let:setField
                let:setError
                let:validate
                submitAction={async values => {console.log(values); await postReflection(values)}}
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
                <TagsList {setError} {formData} />
                <div data-felte-reporter-tippy-position-for="categories" />
                <Checkboxes
                    {touched}
                    {errors}
                    name="categories"
                    text="Categories"
                    {formData}
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
