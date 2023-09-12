import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, InputBase, Typography, useTheme } from "@mui/material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import ThreeDotsDropDown from "components/ThreeDotsDropDown";


const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  getPosts

}) => {
  const [isComments, setIsComments] = useState(false);
  const [commentValue, setCommentValue] = useState('')
  const [seeMore, setSeeMore] = useState(false)
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.user);
  // const firstname = useSelector((state) => state.user.firstName);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;

  const usersArray = Object.values(users)
  console.log("user", users)
  // userArray.forEach(([key, value]) => {
  //   console.log(key); //
  //   console.log(value); //
  // });

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const AddComment = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: loggedInUserId, commentText: commentValue })
    })
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }))
    setCommentValue('')
  }

  const handleOnOpenComment = () => {
    setIsComments(!isComments)

  }
  const handleCommentDelete = async (postId, commentId) => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/delete-comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ loggedInUserId, commentId })
    })
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }))
  }


  const handleDeletePost = async (postId) => {
    await fetch(`http://localhost:3001/posts/${postId}/delete-post`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ loggedInUserId, postUserId })
    })

    getPosts(); // Updates the the feed with posts 
  }

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => handleOnOpenComment()}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap='0.3rem'>
          {loggedInUserId === postUserId ?
            <>
              {/* <IconButton onClick={()=> handleDeletePost()}>
            <DeleteRoundedIcon />
          </IconButton> */}
              <ThreeDotsDropDown clickActions={{ handleDeletePost }} postId={postId} />
              <DeleteRoundedIcon />
              <IconButton>
                <ShareOutlined />
              </IconButton> </> :
            <IconButton>
              <ShareOutlined />
            </IconButton>}
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <FlexBetween
            // backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase value={commentValue} onChange={(e) => setCommentValue(e.target.value)} placeholder="Write your comment..." />
            <IconButton disabled={!commentValue} onClick={AddComment}>
              <SendRoundedIcon />
            </IconButton>
          </FlexBetween>

          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <FlexBetween>
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem", wordBreak: 'break-word' }}>
                  <FlexBetween gap={2}>

                    <Typography color={medium} fontSize="14px" fontStyle="italic">
                      {(() => {
                        const userIdIndex = usersArray.indexOf(comment.userId);
                        if (userIdIndex !== -1) {
                          const firstName = usersArray[userIdIndex + 1];
                          const lastName = usersArray[userIdIndex + 2];
                          return `${firstName} ${lastName}`;
                        } else {
                          return 'User not found';
                        }
                      })()}
                    </Typography>
                    <Typography color={medium} fontSize={10}>{ }</Typography>
                  </FlexBetween>

                  <Typography color={main}>{
                    comment.commentText.length < 150 ? comment.commentText :
                      <>{seeMore ? comment.commentText : comment.commentText.slice(0, 100) + "..."} <span
                        style={{ color: 'blue', textDecoration: "underline", cursor: 'pointer' }}
                        onClick={() => setSeeMore(!seeMore)}> {!seeMore ? ">See more" : "<See less"} </span></>
                  }</Typography>
                </Typography>
                <ThreeDotsDropDown
                  commentId={comment._id}
                  postId={postId}
                  commentUserId={comment.userId}
                  userId={loggedInUserId}
                  clickActions={{ handleCommentDelete }}
                />
              </FlexBetween>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
