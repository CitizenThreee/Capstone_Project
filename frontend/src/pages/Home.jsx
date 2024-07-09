import NavBar from "../components/navigation/NavBar"
import DefaultPageContainer from "../components/containers/DefaultPageContainer"
import { useUserContext } from "../context/UserProvider"
import { useEffect, useState } from "react";
import FilterBarContainer from "../components/containers/FilterBarContainer";
import { useUserGroupsContext } from "../context/UserGroupsProvider";
import UserGroupsContainer from "../components/containers/UserGroupsContainer";
import GroupSearchContainer from "../components/containers/GroupSearchContainer";
import { useNavigate } from "react-router-dom";

const groups = 
[
    {
        name: "Hiking Enthusiasts",
        description: "A group for people who love hiking and outdoor adventures.",
        location: "Denver",
        bannerImageURL: "https://wallpaperaccess.com/full/99845.jpg"
    },
    {
        name: "Book Club",
        description: "A community of book lovers who meet monthly to discuss various books.",
        location: "Seattle",
        bannerImageURL: "https://www.jconnectseattle.org/wp-content/uploads/2021/01/iStock-1173671270-2048x784.jpg"
    },
    {
        name: "Tech Innovators",
        description: "A group for tech enthusiasts to share ideas and work on projects together.",
        location: "San Francisco",
        bannerImageURL: "https://static.vecteezy.com/system/resources/previews/000/693/934/original/dark-blue-technology-and-high-tech-abstract-background-vector.jpg"
    },
    {
        name: "Fitness Friends",
        description: "Join us for weekly workout sessions and stay fit together.",
        location: "Austin",
        bannerImageURL: "https://menslifeadvice.com/wp-content/uploads/2018/04/shutterstock_435565456.jpg"
    },
    {
        name: "Foodies United",
        description: "Exploring new restaurants and sharing culinary experiences.",
        location: "Chicago",
        bannerImageURL: "https://img-cdn.thepublive.com/filters:format(webp)/local-samosal/media/post_banners/hSzaxmSjrVO5k66tRi9D.jpeg"
    },
    {
        name: "Art Aficionados",
        description: "A group for art lovers to visit galleries and discuss art.",
        location: "New York",
        bannerImageURL: "https://www.pixelstalk.net/wp-content/uploads/2016/07/HD-Free-Art-Pictures.jpg"
    },
    {
        name: "Music Lovers",
        description: "Meet up to enjoy live music and discuss the latest in the music scene.",
        location: "Los Angeles",
        bannerImageURL: "https://wallpapercave.com/wp/BTRHWai.jpg"
    },
    {
        name: "Cycling Club",
        description: "Weekly cycling trips and events for cyclists of all levels.",
        location: "Portland",
        bannerImageURL: "https://omgnepal.com/wp-content/uploads/2020/07/Best-Beginner-Road-Bikes-gear-patrol-full-lead.jpg"
    },
    {
        name: "Photography Buffs",
        description: "A group for photographers to share tips, techniques, and photo walks.",
        location: "Miami",
        bannerImageURL: "https://chi-nese.com/wp-content/uploads/2021/03/phofessional-photographer.jpg"
    },
    {
        name: "Gaming Guild",
        description: "Connect with fellow gamers for multiplayer sessions and game nights.",
        location: "Boston",
        bannerImageURL: "https://miro.medium.com/v2/resize:fit:4192/1*yj9_ugyJn6XQ5Da9IqCXyg.jpeg"
    }
]

export default function Home() {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { userGroups } = useUserGroupsContext();
    const [ searching, setSearching ] = useState(false);
    const [ search, setSearch ] = useState("");
    const [ filters, setFilters ] = useState({});
    const [ showFilter, setShowFilter ] = useState(false);
    
    const onSearch = (value) => {
        setSearch(value);
    }

    const onCreate =() => {
        navigate("/create")
    }
    
    useEffect(() => {setSearch("")}, [showFilter])

    return(
        <>
            <div>
                <NavBar create={user.email ? true : false} showSearch={user.email} title="" setShowFilter={setShowFilter} search={search} onSearch={onSearch} onCreate={onCreate}></NavBar>

                <div style={{overflow: "auto", backgroundColor: "#eee"}}>
                    <DefaultPageContainer text={user.email ? "" : "You are not signed in"} link={user.email ? "" : "sign in"}>
                        {showFilter && <FilterBarContainer setShowFilter={setShowFilter}></FilterBarContainer>}
                        {user.email && !showFilter && <UserGroupsContainer data={userGroups}></UserGroupsContainer>}
                        {user.email && showFilter && <GroupSearchContainer data={groups}></GroupSearchContainer>}
                    </DefaultPageContainer>
                </div>
                
            </div>
        </>
    )
}