import CreatePost from "@/Components/Additional/Detail/CreatePost";
import MyFriend from "@/Components/Additional/Profile/MyFriend";
import NumberActivity from "@/Components/Additional/Profile/NumberActivity";
import PostActivity from "@/Components/Additional/Profile/PostActivity";
import ProfileHeader from "@/Components/Additional/Profile/ProfileHeader";
import TotalActivity from "@/Components/Additional/Profile/TotalActivity";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import {useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Profile = (props) => {

    //console.log('Profile Page',props);
    const [offset,setOffset] = useState(props.posts.data.length*2);

    const fetchData = async ()=>{
        const response = await Inertia.post(`/profile/${props.user.username}`,{"offset":offset},
       {preserveScroll: true});

        //console.log(response.data);

    }
    const handleNextPage=()=>{
        fetchData();
        setOffset(values=>values+=props.posts.data.length);
    }
    useEffect(()=>console.log(offset,props.posts.total));

    return (
        <>
            <UserLayout auth={props.auth} users={props.users} notifications={props.notifications}>
            <Head title={`${props.user.name + ' ' + props.user.last_name +' (@'+props.user.username+')'}`} />

                <div className="hero" style={{ backgroundImage: `url(${props.user.cover_picture ? `../storage/${props.user.cover_picture}` : "https://cutewallpaper.org/21/chill-anime-background/Load-104-More-Imagesgrid-View-Anime-Background-Wallpaper-.jpg"})`, height: `50vh` }}></div>

                <div className="grid grid-cols-4 gap-4 mr-4 ml-4">
                    <div className="col-span-full lg:col-span-1 lg:mt-4 order-2 lg:order-none">
                        <TotalActivity posts={props.posts}/>
                    </div>
                    <div className="col-span-full lg:col-span-2 order-first lg:order-none">
                        <ProfileHeader user={props.user} auth={props.auth.user} follower={props.follower} following={props.following} friend={props.friend}/>
                    </div>
                    <div className="col-span-full lg:col-span-1 row-span-1 lg:row-span-2 lg:mt-4 order-4 lg:order-none align-items-center lg:sticky top-24">
                        <MyFriend users={props.friend}/>
                    </div>
                    <div className="col-span-full lg:col-span-1 order-3 lg:order-none static lg:sticky top-24">
                        <NumberActivity sum={props.sum}/>
                    </div>
                    {
                        props.user.id === props.auth.user.id &&
                        <div className="col-span-full lg:col-span-2 order-first lg:order-none lg:mb-4">
                            <CreatePost auth={props.auth.user} types={props.activities} flash={props.flash.message} mymemberid={null} groupName={props.groups}/>
                        </div>
                    }
                    <div className="col-span-full lg:col-span-2 row-span-2 lg:order-last lg:col-start-2 order-5 " >
                        {
                        props.posts.data.length > 0 ?
                        props.posts.data.map((post,i) => {
                           return (
                            <div key={i}>
                                <PostActivity
                                    post={post}
                                    likes={props.likes.filter((like) => like.group_activity_id === post.id)}
                                    auth={props.auth}
                                    types={props.activities}
                                    comments={props.comments.filter((comment) => comment.group_activity_id === post.id)}
                                />
                            </div>
                           )
                        }
                        ) : <div className="ml-4"><span>There's no post yet!</span></div> }
                        <div className="flex justify-center mb-4">
                          { offset <= props.posts.total && <button className=" rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleNextPage}>
                            <FontAwesomeIcon icon={faRotateRight} /></button>}
                          </div>
                    </div>


                </div>

            </UserLayout>
        </>
    )
}

export default Profile;
