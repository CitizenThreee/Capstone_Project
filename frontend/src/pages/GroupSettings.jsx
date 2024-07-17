import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import SettingsPageContainer from "../components/containers/SettingsPageContainer";
import GroupSettingsForm from "../components/forms/GroupSettingsForm";
import NavBar from "../components/navigation/NavBar";
import { useCurrentGroupContext } from "../context/CurrentGroupProvider";

// Page for the group settings, where the owner can update group details such as name, banner, description
export default function GroupSettings() {
    const { currentGroup } = useCurrentGroupContext();

    return(
        <>
            <NavBar create={false} title={currentGroup.name} group={true}></NavBar>
            <DefaultPageContainer offset="60">
                <SettingsPageContainer>
                    <GroupSettingsForm/>
                </SettingsPageContainer>
            </DefaultPageContainer>
        </>
    )
}