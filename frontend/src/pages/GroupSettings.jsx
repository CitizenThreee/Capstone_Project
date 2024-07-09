import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import GroupSettingsContainer from "../components/containers/GroupSettingsContainer";
import InnerPageContainer from "../components/containers/InnerPageContainer";
import NavBar from "../components/navigation/NavBar";
import TabBar from "../components/navigation/TabBar";
import { useCurrentGroupContext } from "../context/CurrentGroupProvider";

export default function GroupSettings() {
    const { currentGroup } = useCurrentGroupContext();

    return(
        <>
            <NavBar create={false} title={currentGroup.name} group={true}></NavBar>
            <TabBar></TabBar>
            <DefaultPageContainer offset="100">
                <GroupSettingsContainer></GroupSettingsContainer>
            </DefaultPageContainer>
        </>
    )
}