<script lang="ts">
    import { createGroup } from "api/Groups";
    import { groupSchema } from "lib/validationSchemas";
    import Form from "../forms/Form.svelte";
import Submit from "../forms/Submit.svelte";
    import TextField from "../forms/TextField.svelte";
</script>

<Form submitAction={createGroup} validationSchema={groupSchema} let:errors>
    <div class="horizontal">
        <div style="flex: 3; margin-right: 1rem;">
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
