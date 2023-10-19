import React from "react";
import {
  useForm,
  Controller,
  useFieldArray,
  useFormState,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

interface FormData {
  name: string;
  age: string;
  dob: Date;
  isMarried: boolean;
  skill: { name: string; experience: number }[];
}

const schema = yup.object().shape({
  name: yup.string().required().min(5),
  age: yup.number().required().min(18),
  dob: yup.date().required(),
  isMarried: yup.boolean().required(),
  skill: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Skill name is required"),
      experience: yup
        .number()
        .required("Experience is required")
        .positive("Experience must be a positive number")
        .integer("Experience must be an integer"),
    })
  ),
});

const PersonForm = () => {
  const { register, handleSubmit, control } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const { errors } = useFormState({ control });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skill",
  });

  const onSubmit = async (data: FormData) => {
    console.log("onSubmit function called");
    console.log("Submitting data: ", data);
    try {
      const response = await axios.post("http://localhost:7000/users", data);
      console.log("Response from the server: ", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => <input type="text" id="name" {...field} />}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <Controller
          name="age"
          control={control}
          defaultValue=""
          render={({ field }) => <input type="number" id="age" {...field} />}
        />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <div>
        <label htmlFor="dob">Date of Birth:</label>
        <Controller
          name="dob"
          control={control}
          defaultValue={new Date()} // Provide a default date value here
          render={({ field }) => (
            <input
              type="date"
              id="dob"
              value={field.value.toISOString().substr(0, 10)} // Format as "YYYY-MM-DD"
              onChange={(e) => field.onChange(new Date(e.target.value))}
            />
          )}
        />
        {errors.dob && <p>{errors.dob.message}</p>}
      </div>
      <div>
        <label>
          <Controller
            name="isMarried"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <input
                type="checkbox"
                name={field.name}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          Is Married
        </label>
        {errors.isMarried && <p>{errors.isMarried.message}</p>}
      </div>

      {/* <div>
        <label>Skills:</label>
        {fields.map((item, index) => (
          <div key={item.id}>
            <input
              type="text"
              placeholder="Skill Name"
              {...item}
              name={`skill[${index}].name`}
            />
            <input
              type="number"
              placeholder="Experience"
              {...item}
              name={`skill[${index}].experience`}
            />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}
        {errors.skill && <p>{errors.skill.message}</p>}
      </div>
      <button type="button" onClick={() => append({ name: "", experience: 0 })}>
        Add Skill
      </button> */}


<div>
  {fields.map((field, index) =>{
    return <section key={field.id}>
      <label><span>Name</span><input {...register(`skill.${index}.name`)} /></label>

<label><span>Expirence</span><input type="number" {...register(`skill.${index}.experience`, {valueAsNumber:true})} /></label>

<button type="button" onClick={() => remove(index)}>
              Remove
            </button>
    </section>
    
  })}
</div>
<button type="button" onClick={()=>{
  append({
    name: "",
    experience:0
  })
}} >Append</button>





      {/* <button type="submit" >Submit</button> */}
      <input type="submit" />
    </form>
  );
};

export default PersonForm;
