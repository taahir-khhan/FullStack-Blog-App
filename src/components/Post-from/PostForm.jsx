// import React, { useCallback, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import appwriteService from "../../appwrite/config";
// import { Button, Input, RTE, Select } from "../index";

// function PostForm({ post }) {
//   const { register, handleSubmit, watch, setValue, control, getValues } =
//     useForm({
//       defaultValues: {
//         title: post?.title || "",
//         slug: post?.slug || "",
//         content: post?.content || "",
//         status: post?.status || "active",
//       },
//     });

//   const navigate = useNavigate();
//   const userData = useSelector((state) => state.auth.userData);
//   const [isPosted, setIsPosted] = useState(false);

//   const submit = async (data) => {
//     try {
//       let fileId;

//       // Upload new image if provided
//       if (data.image && data.image[0]) {
//         const file = await appwriteService.uploadFile(data.image[0]);
//         fileId = file ? file.$id : null;

//         // Delete old image if updating an existing post
//         if (post && post.featuredImage) {
//           await appwriteService.deleteFile(post.featuredImage);
//         }
//       }

//       if (post) {
//         // Update the existing post
//         const updatedPost = await appwriteService.updatePost(post.$id, {
//           ...data,
//           featuredImage: fileId || post.featuredImage, // retain old image if no new one uploaded
//         });

//         if (updatedPost) {
//           navigate(`/post/${updatedPost.$id}`);
//         }
//       } else {
//         // Ensure userData is present for new post creation
//         if (!userData) {
//           console.error("User data is not available.");
//           return;
//         }

//         // Create a new post
//         await appwriteService.createPost({
//           ...data,
//           userId: userData.$id,
//           featuredImage: fileId,
//         });

//         toast.success("blog posted successfully");
//         setIsPosted(true);
//       }
//     } catch (error) {
//       console.error("Error in submit:", error);
//       toast.error(error.message || "Something went wrong");
//       setIsPosted(false);
//     }
//   };

//   // Slug transformation
//   const slugTransform = useCallback((value) => {
//     if (value && typeof value === "string") {
//       return value
//         .trim()
//         .toLowerCase()
//         .replace(/[^a-zA-Z\d\s]+/g, "-")
//         .replace(/\s/g, "-");
//     }
//     return "";
//   }, []);

//   // Watch for title changes to update the slug
//   useEffect(() => {
//     const subscription = watch((value, { name }) => {
//       if (name === "title") {
//         setValue("slug", slugTransform(value.title), { shouldValidate: true });
//       }
//     });

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [watch, slugTransform, setValue]);

//   useEffect(() => {
//     if (isPosted) {
//       navigate("/all-post");
//     }
//   }, [isPosted, setIsPosted]);

//   return (
//     <form onSubmit={handleSubmit(submit)} className='space-y-6'>
//       <div className='w-full text-white max-w-3xl mx-auto grid gap-6 md:grid-cols-2'>
//         <Input
//           label='Title'
//           placeholder='Enter title'
//           {...register("title", { required: true })}
//         />

//         <Input
//           label='Slug'
//           placeholder='Enter slug'
//           {...register("slug", { required: true })}
//           onInput={(e) =>
//             setValue("slug", slugTransform(e.target.value), {
//               shouldValidate: true,
//             })
//           }
//         />

//         <Input
//           label='Featured Image'
//           type='file'
//           accept='image/png, image/jpg, image/jpeg, image/gif'
//           {...register("image", { required: !post })}
//         />
//       </div>

//       {post?.featuredImage && (
//         <div className='flex justify-center'>
//           <img
//             src={appwriteService.getFilePreview(post.featuredImage)}
//             alt={post.title}
//             className='rounded-lg shadow-lg w-60 h-40 object-cover'
//           />
//         </div>
//       )}

//       <div className='w-full max-w-3xl mx-auto'>
//         <Select
//           options={["active", "inactive"]}
//           label='Status'
//           {...register("status", { required: true })}
//         />
//       </div>

//       <div className='text-center w-full max-w-3xl mx-auto'>
//         <RTE
//           label='Content'
//           name='content'
//           control={control}
//           defaultValue={getValues("content")}
//         />
//       </div>

//       <div className='flex justify-center'>
//         <Button
//           type='submit'
//           bgColor='bg-yellow-500 hover:bg-white'
//           className='px-6 py-3 text-black rounded-lg shadow-md'
//         >
//           {post ? "Update Post" : "Submit Post"}
//         </Button>
//       </div>
//     </form>
//   );
// }

// export default PostForm;

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Input, RTE, Select } from "../index";

function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    reset, // Import reset to update the form values dynamically
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      status: "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [isPosted, setIsPosted] = useState(false);

  // Update form values when post data is available
  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        slug: post.$id || "",
        content: post.content || "",
        status: post.status || "active",
      });
    }
  }, [post, reset]);

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
          featuredImage: fileId || post.featuredImage,
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
        await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          featuredImage: fileId,
        });

        toast.success("Blog posted successfully");
        setIsPosted(true);
      }
    } catch (error) {
      console.error("Error in submit:", error);
      toast.error(error.message || "Something went wrong");
      setIsPosted(false);
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

  useEffect(() => {
    if (isPosted) {
      navigate("/all-post");
    }
  }, [isPosted, navigate]);

  return (
    <form onSubmit={handleSubmit(submit)} className='space-y-6'>
      <div className='w-full text-white max-w-3xl mx-auto grid gap-6 md:grid-cols-2'>
        <Input
          label='Title'
          placeholder='Enter title'
          {...register("title", { required: true })}
        />

        <Input
          label='Slug'
          placeholder='Enter slug'
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.target.value), {
              shouldValidate: true,
            })
          }
        />

        <Input
          label='Featured Image'
          type='file'
          accept='image/png, image/jpg, image/jpeg, image/gif'
          {...register("image", { required: !post })}
        />
      </div>

      {post?.featuredImage && (
        <div className='flex justify-center'>
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className='rounded-lg shadow-lg w-60 h-40 object-cover'
          />
        </div>
      )}

      <div className='w-full max-w-3xl mx-auto'>
        <Select
          options={["active", "inactive"]}
          label='Status'
          {...register("status", { required: true })}
        />
      </div>

      <div className='text-center w-full max-w-3xl mx-auto'>
        <RTE
          label='Content'
          name='content'
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className='flex justify-center'>
        <Button
          type='submit'
          bgColor='bg-yellow-500 hover:bg-white'
          className='px-6 py-3 text-black rounded-lg shadow-md'
        >
          {post ? "Update Post" : "Submit Post"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
