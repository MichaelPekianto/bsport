import CreatePost from "@/Components/Additional/Detail/CreatePost";
import GroupInfo from "@/Components/Additional/Detail/GroupInfo";
import GroupMember from "@/Components/Additional/Detail/GroupMember";
import MyStat from "@/Components/Additional/Detail/MyStat";
import Standing from "@/Components/Additional/Detail/Standing";
import PostActivity from "@/Components/Additional/Profile/PostActivity";
import UserLayout from "@/Layouts/UserLayout";

const GroupDetail = (props) => {

    console.log("Group Detail Page: ",props);

    return (
        <>
            <UserLayout
                auth={props.auth}
                users={props.users}
                notifications={props.notifications}
            >
                <div className="grid grid-cols-4 gap-4 mx-4 mt-4 mb-4">
                    <div className="col-span-full lg:col-span-1">
                        <MyStat auth={props.auth.user}/>
                    </div>
                    <div className="col-span-full lg:col-span-2">
                        <CreatePost auth={props.auth.user} types={props.activities} flash={props.flash.message} mymemberid={props.mymemberid}/>
                    </div>
                    <div className="col-span-full lg:col-span-1 lg:row-span-2">
                        <div className="mb-4">
                            <GroupInfo group={props.group}/>
                        </div>
                        <div>
                            <GroupMember users={props.members}/>
                        </div>
                    </div>
                    <div className="col-span-full lg:col-span-1 lg:sticky lg:top-24">
                        <Standing />
                    </div>
                    <div className="col-span-full lg:col-span-2 lg:col-start-2 lg:row-span-2">
                        <PostActivity />
                    </div>
                </div>

            </UserLayout>
        </>
    )

}

export default GroupDetail;
