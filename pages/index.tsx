import type { NextPage } from "next";
import { signOut } from "next-auth/client";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";
import Masonry from "react-masonry-css";

export interface DataProps {
  id: string;
  message: string;
  media?: string;
  resourceType?: string;
  pfp: string | undefined | null;
  username: string;
}

interface Posts {
  posts: DataProps[];
}

const breakpointColumnsObj = {
  default: 3,
  768: 2,
  640: 1,
};

const Home: NextPage<Posts> = (props) => {
  return (
    <>
      <Navbar />
      <div>
        <div>
          <h1 className="text-center">CodeDay Share</h1>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
          <p className="text-center">
            A place where you can share what's going on at your CodeDay!
          </p>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {props.posts.map((post) => {
              return (
                <PostCard
                  message={post.message}
                  media={post.media}
                  resourceType={post.resourceType}
                  username={post.username}
                  pfp={post.pfp}
                />
              );
            })}
          </Masonry>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps(context) {
  const { findAllPosts } = require("./api/get/all");

  const posts = await findAllPosts();

  return {
    props: { posts: posts },
  };
}

export default Home;
