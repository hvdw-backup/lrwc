import BackButton from "@/app/components/BackButton";
import ButtonAction from "@/app/components/ButtonAction";
import { db } from "@/app/lib/db";
import { FunctionComponent } from "react";

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

const getPost = async (id: string) => {
  const response = await db.post.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      tag: true,
    },
  });

  return response;
};

const BlogDetailPage: FunctionComponent<BlogDetailPageProps> = async ({
  params,
}) => {
  const post = await getPost(params.id);

  return (
    <div>
      <BackButton />
      <div className="mb-8">
        <h2 className="text-2xl font-bold my-4">{post?.title}</h2>
      </div>
      <p className="text-slate-700">{post?.content}</p>
      <span className="badge badge neutral">{post?.tag.name}</span>
      <ButtonAction id={params.id} />
    </div>
  );
};

export default BlogDetailPage;
