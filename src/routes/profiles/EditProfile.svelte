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
    import Notifications from "lib/components/notifications/Notifications.svelte";
    import { announce } from "lib/components/announcer/announcer";

    const [profileStore, reload] = swr(currentProfile, "currentProfile", []);
</script>

<Nav />
<Notifications />
<SideMenu />

{#await currentProfile() then profile}
    <CenterWrapper>
        <Container
            style="background: white; padding: 1rem; border-radius: .5rem; box-sizing: border-box;"
        >
            <CenterWrapper>
                <!-- <div class="wrapper"> -->
                <LeftCenterRightFlex>
                    <ThinButton
                        slot="left"
                        target="/profiles/current"
                        fullIconName="arrow_back"
                        text="Back to profile"
                    />
                    <h1 slot="center">Edit profile</h1>
                </LeftCenterRightFlex>
                <div class="separator">
                    <h3>Personal information</h3>
                </div>
                <div class="form-wrapper">
                    <Form
                        initialValues={{
                            first_name: profile.first_name,
                            last_name: profile.last_name,
                            post_visibility: String(profile.post_visibility),
                        }}
                        let:errors
                        let:data={formData}
                        let:setFields
                        validationSchema={profileUpdateSchema}
                        submitAction={async (values) => {
                            try {
                                await updateProfile(values);
                                reload();
                                announce("Successfully updated profile.");
                            } catch (err) {
                                announce("Error: could not update profile.");
                            }
                        }}
                    >
                        <Divider>
                            <TextField {errors} name="first_name" type="text" />
                            <TextField {errors} name="last_name" type="text" />
                        </Divider>

                        <br />
                        <Submit text="Update data" />
                    </Form>
                </div>
                <div class="form-wrapper">
                    <div class="separator">
                        <h3>Profile avatar</h3>
                    </div>

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
                        submitAction={async (values) => {
                            try {
                                await updateProfileAvatar(values);
                                announce('Successfully updated profile avatar.');
                            } catch (err) {
                                announce('Error: could not update profile avatar.');
                            }

                        }}
                    >
                        <FileField {errors} name="file" />
                        <Submit
                            text={profile.avatar
                                ? "Change avatar"
                                : "Upload avatar"}
                        />
                    </Form>
                    {#if profile.group_id}
                        <div class="separator">
                            <h3>Current group</h3>
                        </div>
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
                <!-- </div> -->
            </CenterWrapper>
        </Container>
    </CenterWrapper>
{/await}

<style>
    .separator {
        width: 100%;
        display: flex;
        height: 3rem;
        background: var(--bg-grey);
        justify-content: center;
        align-items: center;
        border-radius: 1rem;
        box-sizing: border-box;
        margin-bottom: 1rem;
        margin-top: 1rem;
        font-family: Rubik, sans-serif;
    }

    .form-wrapper {
        margin-top: 1rem;
        width: 100%;
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
