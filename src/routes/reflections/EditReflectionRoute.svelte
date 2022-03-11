<script lang="ts">
    import { login } from "api/Auth";

    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import Form from "lib/components/forms/Form.svelte";
    import TextArea from "lib/components/forms/TextArea.svelte";
    import TextField from "lib/components/forms/TextField.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import { editReflectionSchema } from "lib/validationSchemas";
    import { subscribe } from "svelte/internal";
    import TagButton from "lib/components/reflections/TagButton.svelte";
    import TagsList from "lib/components/reflections/TagsList.svelte";
    import MultipleFileField from "lib/components/forms/MultipleFileField.svelte";
    import FileList from "lib/components/reflections/FileList.svelte";
    import Checkboxes from "lib/components/forms/Checkboxes.svelte";
    import Submit from "lib/components/forms/Submit.svelte";
    import {
        deleteReflection,
        getReflection,
        updateReflection,
    } from "api/Reflection";
    import type { Reflection } from "api/Reflection";

    import { swr } from "api/swr";
    import DeleteFileField from "lib/components/forms/DeleteFileField.svelte";

    import { router } from "tinro";
    import LeftCenterRightFlex from "lib/components/generic/LeftCenterRightFlex.svelte";
    import ThinButton from "lib/components/generic/ThinButton.svelte";
    import ConfirmModal from "lib/components/generic/ConfirmModal.svelte";
    import RadioGroup from "lib/components/forms/RadioGroup.svelte";
    import Notifications from "lib/components/notifications/Notifications.svelte";
    import { announce } from "lib/components/announcer/announcer";

    export let reflection_id: number;

    function extraValidate(values, setTouched) {
        const errors = {};
        // console.log(values);
        // console.log("Valuestags: " + values.tags);
        // console.log("Valuesfiles: " + values.files);

        if (typeof values.tags === "undefined" || values?.tags.length < 1) {
            errors.oneTag = "Must have at least one tag";
        }

        // if (Object.entries(values.categories).every(([key, value]) => value == false)){
        //     errors['categories'] = "At least one category is required"
        //     console.log("Cats are looose")
        // }

        if (
            values.delete_uuids.length == values.attachments.length &&
            (!values.files || (values.files && values.files.length == 0))
        ) {
            console.log("fileediterrors");
            errors.oneFile = "There must be at least one file attached";
        }

        return errors;
    }

    const [reflectionStore] = swr(getReflection, "editReflection", [
        reflection_id,
    ]);

    function transformInitialCategories(reflection: Reflection) {
        let cats = new Array();

        if (reflection.creativity) {
            cats.push("creativity");
        }
        if (reflection.activity) {
            cats.push("activity");
        }
        if (reflection.service) {
            cats.push("service");
        }

        console.log("cats", cats);

        // return cats;

        return {
            creativity: reflection.creativity,
            activity: reflection.activity,
            service: reflection.service,
        };
    }

    function transformInitialValues(reflection: Reflection) {
        let newTags = [];
        reflection.tags.forEach((tag) => newTags.push(tag.name));

        console.log("transformed cats", transformInitialCategories(reflection));

        return {
            title: reflection.title,
            text_content: reflection.text_content,
            tags: newTags,
            post_visibility: reflection.post_visibility,
            // categories: Array(...transformInitialCategories(reflection)),
            ...transformInitialCategories(reflection),
            delete_uuids: [],
            attachments: reflection.attachments,
            files: [],
            oneTag: null,
            id: reflection.id,
        };
    }
</script>

<Nav />
<Notifications />
<SideMenu />

{#await $reflectionStore then reflection}
    <CenterWrapper>
        <Container>
            <CenterWrapper>
                <div class="wrapper">
                    <LeftCenterRightFlex>
                        <div slot="right">
                            <ConfirmModal
                                let:show
                                text="Are you sure you want to delete this reflection?"
                                confirmText="Delete"
                                denyText="Cancel"
                            >
                                <ThinButton
                                    action={() => {
                                        show(() => {
                                            try {
                                                deleteReflection(reflection_id);
                                                announce('Successfully deleted reflection.')
                                                router.goto("/");
                                            } catch (err) {
                                                announce('Error: could not delete reflection.')
                                            }
                                        });
                                    }}
                                    style="float: right;"
                                    text="Delete reflection"
                                    fullIconName="delete"
                                />
                            </ConfirmModal>
                        </div>
                    </LeftCenterRightFlex>
                    <h1>Now editing: {reflection.title}</h1>
                    <Form
                        initialValues={transformInitialValues(reflection)}
                        validationSchema={editReflectionSchema}
                        let:errors
                        let:data={formData}
                        let:touched
                        let:setFields
                        let:setErrors
                        let:validate
                        {extraValidate}
                        submitAction={(values) => {
                            try {
                                updateReflection(values, reflection_id);
                                announce('Successfully updated reflection.')
                                router.goto("/profiles/current");
                            } catch (err) {
                                announce('Error: could not update reflection.')
                            }
                        }}
                    >
                        <!-- {errors.subscribe(val => console.log(val))} -->
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
                            <TagButton {validate} {formData} {setFields} />
                        </TextField>
                        <TagsList {setErrors} {formData} />
                        <div
                            data-felte-reporter-tippy-position-for="categories_error"
                        />
                        <Checkboxes
                            {touched}
                            {errors}
                            name="categories"
                            text="Categories"
                            items={{
                                Creativity: "creativity",
                                Activity: "activity",
                                Service: "service",
                            }}
                            {formData}
                        />
                        <RadioGroup
                            {formData}
                            initialValue={Number(reflection.post_visibility)}
                            text="Post visibility"
                            name="post_visibility"
                            items={{
                                "Only you and the coordinator can see your posts": 0,
                                "Only your group can see your posts": 1,
                                "Anybody can see your posts": 2,
                            }}
                        />
                        <DeleteFileField
                            {formData}
                            {errors}
                            reflection={transformInitialValues(reflection)}
                        />
                        <MultipleFileField
                            {formData}
                            {errors}
                            name="oneFile"
                            text="New attachments"
                        />
                        <FileList {formData} />
                        <Submit text="Update" />
                    </Form>
                </div>
            </CenterWrapper>
        </Container>
    </CenterWrapper>
{/await}

<style>
    h1 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .wrapper {
        width: 40rem;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        border-radius: 0.5rem;
    }
</style>
