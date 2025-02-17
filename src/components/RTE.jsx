import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Controller } from "react-hook-form";
import conf from "../config/conf";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {label && (
        <label className='text-lg font-medium text-white block mb-2'>
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey={conf.tinyMceApiKey}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | removeformat",
              content_style:
                "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
