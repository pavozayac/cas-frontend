<script lang="ts">
import { currentProfile, updateProfile, updateProfileAvatar } from "api/Profile";

import CenterWrapper from "lib/components/CenterWrapper.svelte";
import Container from "lib/components/Container.svelte";
import FileField from "lib/components/forms/FileField.svelte";
import Form from "lib/components/forms/Form.svelte";
import RadioGroup from "lib/components/forms/RadioGroup.svelte";
import Submit from "lib/components/forms/Submit.svelte";
import TextField from "lib/components/forms/TextField.svelte";
import ThinButton from "lib/components/generic/ThinButton.svelte";
import { profileAvatar, profileUpdateSchema } from "lib/validationSchemas";

</script>
{#await currentProfile()}
    
{:then profile}
    
<CenterWrapper>
        <div class="wrapper">
            <ThinButton target="/profiles/current" fullIconName="arrow_back" text="Back to profile" />
            <h1>Edit profile</h1>
            <div class="form-wrapper">   
                <Form initialValues={{
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    // post_visibility: profile.post_visibility
                }}
                  let:errors validationSchema={profileUpdateSchema} submitAction={updateProfile}>
                    <TextField {errors} name="first_name" type="text"/>
                    <TextField {errors} name="last_name" type="text"/>
                    <RadioGroup initialValue={0} text="Post visibility" name="post_visibility" items={{
                        'Only you can see your posts': 0,
                        'Only your group can see your posts': 1,
                        'Anybody can see your posts': 2
                    }}/>
                    <br/>
                    <Submit text="Update profile" />
                </Form>
            </div>
            <div class="form-wrapper">
                <Form let:errors validationSchema={profileAvatar} submitAction={updateProfileAvatar}>
                    <FileField {errors} name="file"/>
                    <Submit text="Change avatar"/>
                </Form>
            </div>
        </div>
</CenterWrapper>    
    
{/await}

<style>
    .wrapper {
        padding: 2rem;
        margin-top: 1rem;
        background: white;
        border-radius: .5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form-wrapper {
        margin-top: 2rem;
    }
</style>