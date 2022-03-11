<script lang="ts">
    import { createGroup } from "api/Groups";
    import { groupSchema } from "lib/validationSchemas";
import { router } from "tinro";
import { announce } from "../announcer/announcer";
import FileField from "../forms/FileField.svelte";
    import Form from "../forms/Form.svelte";
import Submit from "../forms/Submit.svelte";
import TextArea from "../forms/TextArea.svelte";
    import TextField from "../forms/TextField.svelte";
</script>

<Form validationSchema={groupSchema} let:errors submitAction={async (values) => { 
        try {
            createGroup(values);
            router.goto('/groups');
            announce('Successfully created group.')
        } catch (err) {
            announce('Error: could not create group.')
        }
    }}>
    <div class="horizontal">
        <div style="flex: 2; margin-right: 1rem;">
            <TextField label="Group name" type="text" name="name" {errors} />
        </div>
        <div style="flex: 1;">
            <TextField
                label="Graduation year"
                type="number"
                min={new Date().getFullYear()}
                max={new Date().getFullYear()+2}
                placeholder={`${new Date().getFullYear()}`}
                name="graduation_year"
                {errors}
            />
        </div>
    </div>
    <TextArea name="description" {errors} placeholder="Description"/>
    <FileField label="Group avatar" name="file" {errors}/>
    <Submit text="Create group"/>
</Form>

<style>
    .horizontal {
        width: 100%;
        display: flex;
        flex: 1;
        flex-direction: row;
    }

</style>
