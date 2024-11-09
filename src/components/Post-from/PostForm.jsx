import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Input, RTE, Select } from "../index";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      let fileId;

      // Upload new image if provided
      if (data.image && data.image[0]) {
        const file = await appwriteService.uploadFile(data.image[0]);
        fileId = file ? file.$id : null;

        // Delete old image if updating an existing post
        if (post && post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
      }

      if (post) {
        // Update the existing post
        const updatedPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: fileId || post.featuredImage, // retain old image if no new one uploaded
        });

        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`);
        }
      } else {
        // Ensure userData is present for new post creation
        if (!userData) {
          console.error("User data is not available.");
          return;
        }

        // Create a new post
        const newPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          featuredImage: fileId,
        });

        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        }
      }
    } catch (error) {
      console.error("Error in submit:", error);
    }
  };

  // Slug transformation
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  // Watch for title changes to update the slug
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="w-[70%] mx-auto grid grid-col-1 gap-2 md:grid-cols-2">
        <Input
          label="Title: "
          placeholder="Title"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug: "
          placeholder="Slug"
          className=""
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <Input
          label="Featured Image: "
          type="file"
          className=""
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && post.featuredImage && (
          <div className="">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status: "
          className="w-[300px] flex items-center justify-center  py-2"
          {...register("status", { required: true })}
        />
      </div>

      <div className="text-center">
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />

        <Button type="submit" bgColor="bg-green-500" className="w-[200px]">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
