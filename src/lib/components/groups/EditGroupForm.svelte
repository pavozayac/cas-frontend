<script lang="ts">
    import { createGroup, getGroup, updateGroup } from "api/Groups";
    import { swr } from "api/swr";
    import { groupSchema, groupUpdateSchema } from "lib/validationSchemas";
import { router } from "tinro";
    import FileField from "../forms/FileField.svelte";
    import Form from "../forms/Form.svelte";
    import Submit from "../forms/Submit.svelte";
    import TextArea from "../forms/TextArea.svelte";
    import TextField from "../forms/TextField.svelte";
    import { announce } from "lib/components/announcer/announcer";

    export let group_id: string;

    let [groupStore, reload] = swr(getGroup, "group", [group_id]);
</script>

{#await $groupStore then group}
    <Form
        initialValues={group}
        validationSchema={groupUpdateSchema}
        let:errors
        submitAction={async (values) => {
            try {
                await updateGroup(values, group_id);
                router.goto('/groups');
                announce('Successfully updated group.');
            } catch (err) {
                announce('Error: could not update group.');
            }
        }}
    >
        <div class="horizontal">
            <div style="flex: 2; margin-right: 1rem;">
                <TextField
                    label="Group name"
                    type="text"
                    name="name"
                    {errors}
                />
            </div>
            <div style="flex: 1;">
                <TextField
                    label="Graduation year"
                    type="number"
                    min={new Date().getFullYear()}
                    max={new Date().getFullYear() + 2}
                    placeholder={`${new Date().getFullYear()}`}
                    name="graduation_year"
                    {errors}
                />
            </div>
        </div>
        <TextArea name="description" {errors} placeholder="Description" />
        <FileField label="Group avatar" name="file" {errors} />
        <Submit text="Update group" />
    </Form>
{/await}

<style>
    .horizontal {
        width: 100%;
        display: flex;
        flex: 1;
        flex-direction: row;
    }
</style>
