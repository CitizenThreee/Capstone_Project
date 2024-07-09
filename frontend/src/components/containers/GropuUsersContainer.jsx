import UserCard from "../cards/UserCard"

export default function GroupUsersContainer({users}) {
    return (
        <>
            <div>
                {users.map((user, index) => (
                    <div className="mb-3">
                        <UserCard user={user} key={index}></UserCard>
                    </div>
                    
                ))}
            </div>
        </>
    )
}