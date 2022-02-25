<script lang="ts">
    import {
        currentProfile,
        leaveGroup,
        updateProfile,
        updateProfileAvatar,
    } from "api/Profile";
    import { swr } from "api/swr";
    import { avatarSrc, route } from "api/utils";

    import CenterWrapper from "lib/components/CenterWrapper.svelte";
    import Container from "lib/components/Container.svelte";
    import FileField from "lib/components/forms/FileField.svelte";
    import Form from "lib/components/forms/Form.svelte";
    import RadioGroup from "lib/components/forms/RadioGroup.svelte";
    import Submit from "lib/components/forms/Submit.svelte";
    import TextField from "lib/components/forms/TextField.svelte";
    import Divider from "lib/components/generic/Divider.svelte";
    import LeftCenterRightFlex from "lib/components/generic/LeftCenterRightFlex.svelte";
    import ThinButton from "lib/components/generic/ThinButton.svelte";
    import Nav from "lib/components/navigation/Nav.svelte";
    import SideMenu from "lib/components/navigation/SideMenu.svelte";
    import { profileAvatar, profileUpdateSchema } from "lib/validationSchemas";
    import { getGroup } from "api/Groups";
    import InformationTile from "lib/components/generic/InformationTile.svelte";
    import { router } from "tinro";

    const [profileStore, reload] = swr(currentProfile, "currentProfile", []);
</script>

<Nav />
<SideMenu />

{#await currentProfile() then profile}
    <CenterWrapper>
        <Container>
            <CenterWrapper>
                <div class="wrapper">
                    <LeftCenterRightFlex>
                        <ThinButton
                            slot="left"
                            target="/profiles/current"
                            fullIconName="arrow_back"
                            text="Back to profile"
                        />
                        <h2 slot="center">Edit profile</h2>
                    </LeftCenterRightFlex>
                    <div class="form-wrapper">
                        <Form
                            initialValues={{
                                first_name: profile.first_name,
                                last_name: profile.last_name,
                                post_visibility: String(
                                    profile.post_visibility
                                ),
                            }}
                            let:errors
                            let:data={formData}
                            let:setField
                            validationSchema={profileUpdateSchema}
                            submitAction={async (values) => {
                                await updateProfile(values);
                                reload();
                            }}
                        >
                            <TextField {errors} name="first_name" type="text" />
                            <TextField {errors} name="last_name" type="text" />

                            <br />
                            <Submit text="Update profile" />
                        </Form>
                    </div>
                    <div class="form-wrapper">
                        {#if profile.avatar}
                            <div class="avatar-wrapper">
                                <img
                                    class="avatar-preview"
                                    src={avatarSrc(profile.avatar)}
                                    alt="Profile avatar"
                                />
                            </div>
                        {/if}

                        <Form
                            let:errors
                            validationSchema={profileAvatar}
                            submitAction={updateProfileAvatar}
                        >
                            <FileField {errors} name="file" />
                            <Submit
                                text={profile.avatar
                                    ? "Change avatar"
                                    : "Upload avatar"}
                            />
                        </Form>
                        {#if profile.group_id}
                            {#await getGroup(profile.group_id) then group}
                                <InformationTile
                                    iconName="people"
                                    label="Group"
                                    style="margin-bottom: 1rem; margin-top: 1rem;"
                                    >{group.name}</InformationTile
                                >
                                <Submit
                                    on:click={async () => {
                                        await leaveGroup();
                                        router.goto("/profiles/current");
                                    }}
                                    red
                                    text="Leave group"
                                />
                            {/await}
                        {/if}
                    </div>
                </div>
            </CenterWrapper>
        </Container>
    </CenterWrapper>
{/await}

<style>
    .wrapper {
        width: 40rem;
        padding: 2rem;
        margin-top: 1rem;
        background: white;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form-wrapper {
        margin-top: 1rem;
    }

    .avatar-wrapper {
        display: flex;
        justify-content: center;
    }

    .avatar-preview {
        object-fit: cover;
        height: 10rem;
        width: 10rem;
        border-radius: 9999px;
    }
</style>
