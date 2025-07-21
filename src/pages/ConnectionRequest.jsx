import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Check, X, Loader2, Clock, User, MessageCircle } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ConnectionRequests = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const {
        data: { user },
        error: userErr,
      } = await supabase.auth.getUser();

      if (userErr || !user) {
        console.error("Failed to get user", userErr);
        setLoading(false);
        return;
      }

      // Fetch pending requests
      const { data: requestsData, error: requestsError } = await supabase
        .from("connections")
        .select(
          `
          id,
          created_at,
          sender_id,
          status,
          sender:user_auth!connections_sender_id_fkey (
            fullname,
            user_profiles (
              profile_image,
              job_title
            )
          )
        `
        )
        .eq("receiver_id", user.id)
        .eq("status", "pending");

      // Fetch accepted connections (friends)
      const { data: friendsData, error: friendsError } = await supabase
        .from("connections")
        .select(
          `
          id,
          sender_id,
          receiver_id,
          status,
          sender:user_auth!connections_sender_id_fkey (
            fullname,
            user_profiles (
              profile_image,
              job_title
            )
          ),
          receiver:user_auth!connections_receiver_id_fkey (
            fullname,
            user_profiles (
              profile_image,
              job_title
            )
          )
        `
        )
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .eq("status", "accepted");

      if (requestsError) {
        console.error("Requests fetch error:", requestsError);
      } else {
        setRequests(requestsData || []);
      }

      if (friendsError) {
        console.error("Friends fetch error:", friendsError);
      } else {
        // Process friends data to show the other person's info
        const processedFriends = (friendsData || []).map((connection) => {
          const isCurrentUserSender = connection.sender_id === user.id;
          return {
            ...connection,
            friend: isCurrentUserSender
              ? connection.receiver
              : connection.sender,
            friendId: isCurrentUserSender
              ? connection.receiver_id
              : connection.sender_id,
          };
        });
        setFriends(processedFriends);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleUpdate = async (id, status) => {
    setActioningId(id);
    const { error } = await supabase
      .from("connections")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Update error:", error);
    } else {
      if (status === "accepted") {
        // Move the accepted request to friends list
        const acceptedRequest = requests.find((r) => r.id === id);
        if (acceptedRequest) {
          const newFriend = {
            ...acceptedRequest,
            status: "accepted",
            friend: acceptedRequest.sender,
            friendId: acceptedRequest.sender_id,
          };
          setFriends((prev) => [newFriend, ...prev]);
        }
      }
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
    setActioningId(null);
  };

  const handleMessage = (friendId) => {
    // Implement your messaging functionality here
    console.log("Opening message with friend:", friendId);
    // You might want to navigate to a messaging component or open a modal
  };

  const formatConnectedTime = (dateString) => {
    const now = dayjs();
    const connectionDate = dayjs(dateString);
    const diffInDays = now.diff(connectionDate, "day");

    if (diffInDays === 0) {
      return "Connected today";
    } else if (diffInDays === 1) {
      return "Connected 1 day ago";
    } else {
      return `Connected ${diffInDays} days ago`;
    }
  };

  const renderUserCard = (item, isRequest = true) => {
    const userInfo = isRequest ? item.sender : item.friend;
    const profile = userInfo?.user_profiles || {};
    const name = userInfo?.fullname || "Unnamed Developer";
    const jobTitle = profile.job_title || "Unknown Role";
    const image = profile.profile_image || "/default-avatar.png";
    const timeDisplay = isRequest
      ? dayjs(item.created_at).fromNow()
      : formatConnectedTime(item.created_at);

    return (
      <li
        key={item.id}
        className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-xl px-6 py-4 hover:bg-gray-700 transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
          />
          <div>
            <h3 className="font-semibold text-lg text-white">{name}</h3>
            <p className="text-gray-300 text-sm">{jobTitle}</p>
            <p className="text-xs text-gray-400 flex items-center mt-1">
              <Clock size={14} className="mr-1" />
              {timeDisplay}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {isRequest ? (
            <>
              <button
                onClick={() => handleUpdate(item.id, "accepted")}
                disabled={actioningId === item.id}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-full font-medium text-sm shadow-md transition-colors duration-200"
              >
                {actioningId === item.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Check size={16} />
                )}
                Approve
              </button>
              <button
                onClick={() => handleUpdate(item.id, "rejected")}
                disabled={actioningId === item.id}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-full font-medium text-sm shadow-md transition-colors duration-200"
              >
                {actioningId === item.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <X size={16} />
                )}
                Reject
              </button>
            </>
          ) : (
            <button
              onClick={() => handleMessage(item.friendId)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium text-sm shadow-md transition-colors duration-200"
            >
              <MessageCircle size={16} />
              Message
            </button>
          )}
        </div>
      </li>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4  min-h-screen">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-white">
        Connections
      </h1>

      {/* Tab Navigation 
      <div className="mb-8">
          <nav className="flex space-x-1 bg-gray-900 p-1 rounded-lg"> 
          <button
            onClick={() => setActiveTab("requests")}
             className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium text-sm transition-all duration-200 ${
              activeTab === "requests"
                ? "bg-gray-800 text-white  border-indigo-500"
                : "text-gray-400 hover:text-white "
            }`}
          >
            Requests
            {requests.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[1.5rem] h-6 flex items-center justify-center">
                {requests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium text-sm transition-all duration-200 ${
              activeTab === "friends"
                ? "bg-gray-700 text-white shadow-md"
                : "text-gray-300 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            Friends
            {friends.length > 0 && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full min-w-[1.5rem] h-6 flex items-center justify-center">
                {friends.length}
              </span>
            )}
          </button>
        </nav>
      </div>
*/}

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-700">
        {["requests", "friends"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold capitalize ${
              activeTab === tab
                ? "bg-gray-800 text-white border-b-2 border-indigo-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab === "requests" ? "Requests" : "Friends"}{" "}
            <span className="ml-1 text-xs bg-gray-600 px-2 py-0.5 rounded-full text-white/80">
              {tab === "requests" ? requests.length : friends.length}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-blue-400" size={32} />
        </div>
      ) : (
        <div>
          {activeTab === "requests" ? (
            <>
              <p className="text-gray-400 mb-6">
                {requests.length} pending request
                {requests.length !== 1 ? "s" : ""}
              </p>
              {requests.length === 0 ? (
                <div className="p-12 text-center bg-gray-800 rounded-xl border border-gray-700">
                  <div className="mx-auto w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    No pending requests
                  </h3>
                  <p className="text-gray-400">
                    You're all caught up! No new connection requests at the
                    moment.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {requests.map((req) => renderUserCard(req, true))}
                </ul>
              )}
            </>
          ) : (
            <>
              <p className="text-gray-400 mb-6">
                {friends.length} connected friend
                {friends.length !== 1 ? "s" : ""}
              </p>
              {friends.length === 0 ? (
                <div className="p-12 text-center bg-gray-800 rounded-xl border border-gray-700">
                  <div className="mx-auto w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    No friends yet
                  </h3>
                  <p className="text-gray-400">
                    Start connecting with other developers to build your
                    network!
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {friends.map((friend) => renderUserCard(friend, false))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectionRequests;

// import React, { useEffect, useState } from "react";
// import { supabase } from "../utils/supabase";
// import { Check, X, MessageCircle, Loader2, Clock, Users } from "lucide-react";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// dayjs.extend(relativeTime);

// const Connections = () => {
//   const [activeTab, setActiveTab] = useState("requests");
//   const [requests, setRequests] = useState([]);
//   const [friends, setFriends] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actioningId, setActioningId] = useState(null);

//   useEffect(() => {
//     const fetchConnections = async () => {
//       setLoading(true);
//       const {
//         data: { user },
//         error: userErr,
//       } = await supabase.auth.getUser();

//       if (userErr || !user) return console.error(userErr);

//       // Fetch Requests
//       const { data: requestData } = await supabase
//         .from("connections")
//         .select(
//           `
//           id,
//           created_at,
//           sender_id,
//           status,
//           sender:user_auth!connections_sender_id_fkey (
//             fullname,
//             user_profiles (
//               profile_image,
//               job_title
//             )
//           )
//         `
//         )
//         .eq("receiver_id", user.id)
//         .eq("status", "pending");

//       setRequests(requestData || []);

//       // Fetch Friends
//       const { data: friendsData } = await supabase
//         .from("connections")
//         .select(
//           `
//           id,
//           created_at,
//           sender_id,
//           receiver_id,
//           status,
//           sender:user_auth!connections_sender_id_fkey (
//             fullname,
//             user_profiles (
//               profile_image,
//               job_title
//             )
//           ),
//           receiver:user_auth!connections_receiver_id_fkey (
//             fullname,
//             user_profiles (
//               profile_image,
//               job_title
//             )
//           )
//         `
//         )
//         .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
//         .eq("status", "accepted");

//       // Extract only the "other user"
//       const cleaned = (friendsData || []).map((conn) => {
//         const isSender = conn.sender?.fullname !== user.email;
//         const other = isSender ? conn.receiver : conn.sender;
//         return {
//           name: other?.fullname,
//           image: other?.user_profiles?.profile_image,
//           job: other?.user_profiles?.job_title,
//           connectedAt: conn.created_at,
//         };
//       });

//       setFriends(cleaned);
//       setLoading(false);
//     };

//     fetchConnections();
//   }, []);

//   const handleUpdate = async (id, status) => {
//     setActioningId(id);
//     await supabase.from("connections").update({ status }).eq("id", id);
//     setRequests((prev) => prev.filter((r) => r.id !== id));
//     setActioningId(null);
//   };

//   return (
//     <div className="max-w-4xl mx-auto py-10 px-4 text-white">
//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6 border-b border-gray-700">
//         {["requests", "friends"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 font-semibold capitalize ${
//               activeTab === tab
//                 ? "bg-gray-800 text-white border-b-2 border-indigo-500"
//                 : "text-gray-400 hover:text-white"
//             }`}
//           >
//             {tab === "requests" ? "Requests" : "Friends"}{" "}
//             <span className="ml-1 text-xs bg-gray-600 px-2 py-0.5 rounded-full text-white/80">
//               {tab === "requests" ? requests.length : friends.length}
//             </span>
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <Loader2 className="animate-spin text-indigo-400" size={32} />
//         </div>
//       ) : activeTab === "requests" ? (
//         <ul className="space-y-4">
//           {requests.map((req) => {
//             const sender = req.sender;
//             const profile = sender?.user_profiles || {};
//             return (
//               <li
//                 key={req.id}
//                 className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow border border-gray-700"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={profile.profile_image || "/default-avatar.png"}
//                     alt={sender.fullname}
//                     className="w-12 h-12 rounded-full border border-gray-600 object-cover"
//                   />
//                   <div>
//                     <p className="font-semibold">{sender.fullname}</p>
//                     <p className="text-sm text-gray-400">
//                       {profile.job_title || "Developer"}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1 flex items-center">
//                       <Clock size={14} className="mr-1" />
//                       {dayjs(req.created_at).fromNow()}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleUpdate(req.id, "accepted")}
//                     disabled={actioningId === req.id}
//                     className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm"
//                   >
//                     <Check size={16} /> Approve
//                   </button>
//                   <button
//                     onClick={() => handleUpdate(req.id, "rejected")}
//                     disabled={actioningId === req.id}
//                     className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm"
//                   >
//                     <X size={16} /> Reject
//                   </button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       ) : (
//         <ul className="space-y-4">
//           {friends.map((f, i) => (
//             <li
//               key={i}
//               className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow border border-gray-700"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={f.image || "/default-avatar.png"}
//                   alt={f.name}
//                   className="w-12 h-12 rounded-full border border-gray-600 object-cover"
//                 />
//                 <div>
//                   <p className="font-semibold">{f.name}</p>
//                   <p className="text-sm text-gray-400">
//                     {f.job || "Developer"}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1 flex items-center">
//                     <Users size={14} className="mr-1" />
//                     Connected {dayjs(f.connectedAt).fromNow()}
//                   </p>
//                 </div>
//               </div>
//               <button className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full text-sm">
//                 <MessageCircle size={16} /> Message
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Connections;
