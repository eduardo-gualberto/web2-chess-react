import React from "react";

type UserChessboardCardProps = {
    isCurrentUser: boolean
    user_id: string
    user_name: string
}

export default function UserChessboardCard(props: UserChessboardCardProps) {
    const { isCurrentUser, user_id, user_name } = props

    return (
        <div className="user-div" id="current-user">
            <div className="user-name-div">
                {user_name}
                {isCurrentUser ? <span className="material-icons" id="id-icon">
                    circle
                </span> : <></>}
            </div>
            <div className="user-id-div">{user_id}</div>
        </div>
    )
}