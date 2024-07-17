import { useNavigate } from "react-router-dom";
import DefaultPageContainer from "../components/containers/DefaultPageContainer";
import SettingsPageContainer from "../components/containers/SettingsPageContainer";
import NavBar from "../components/navigation/NavBar";
import { useCurrentGroupContext } from "../context/CurrentGroupProvider";
import axios from 'axios'
import CreateTabForm from "../components/forms/CreateTabForm";

// Page for creating a new tab
export default function CreateTab() {
    const navigate = useNavigate();
    const { currentGroup, handleSetCurrentGroup } = useCurrentGroupContext();

    // When user creates the tab, update the database with the new data, set the current group with the new
    // tab data, and navigate to the previous page
    const onCreate = (tab) => {
        console.log(tab);
        axios.post('http://localhost:8080/tabs', { ...tab  })
            .then(res => {
                console.log(res);
                if(res.data.data){
                    handleSetCurrentGroup({...currentGroup, tabs: [...currentGroup.tabs, res.data.data]});
                    navigate(-1);
                }
            })
            .catch(err => console.log(err))
    }

    // When user cancels the tab creation, navigate to the previous page
    const onCancel = () => {
        navigate(-1);
    }

    return( 
        <>
            <NavBar title="Create" create={false}></NavBar>
            <DefaultPageContainer>
                <SettingsPageContainer>
                    <CreateTabForm onCreate={onCreate} onCancel={onCancel}></CreateTabForm>
                </SettingsPageContainer>
            </DefaultPageContainer>
        </>
    )
}