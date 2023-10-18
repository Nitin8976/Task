import { useForm} from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const UserForm: React.FC = () => {
    const UserSchema = z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
          }).min(3) ,
        age: z.number({ required_error: "age  is min 18"}).min(18,{ message: "Lastname is required" }),
        dob: z.date(),
        isMarried: z.boolean(),
        skill: z.object({
          name: z.string(),
          experience: z.number(),
        }),
      });
    
      type UserSchemaType = z.infer<typeof UserSchema>;
 

      const { register, handleSubmit ,formState: { errors } } = useForm<UserSchemaType>({ resolver: zodResolver(UserSchema)});
  const onSubmit = async (data: UserSchemaType,e:any) => {
    console.log(data);
    const response = await axios.post("http://localhost:7000/users", data);
    console.log(response);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        placeholder="Name"
        {...register("name")}
   
      />
      {errors.name && <p>{errors.name.message}</p>}
      <br />

      <label htmlFor="age">Age</label>
      <input
        type="number"
        placeholder="Age"
        {...register("age")}
     
      />
      {errors.age && <p>{errors.age.message}</p>}
      <br />

      <label htmlFor="dob">Date of Birth</label>
      <input
        type="date"
        placeholder="Date of birth"
        {...register("dob")}
      />
      {errors.dob && <p>{errors.dob.message}</p>}
      <br />

      <label htmlFor="isMarried">Marital Status</label>
      <select {...register("isMarried")} required>
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      {errors.isMarried && <p>{errors.isMarried.message}</p>}
      <br />

      <label htmlFor="skill.name">Skill Name</label>
      <input
        type="text"
        placeholder="Skill name"
        {...register("skill.name")}
      />
      {errors.skill?.name && <p>{errors.skill.name.message}</p>}
      <br />

      <label htmlFor="skill.experience">Skill Experience</label>
      <input
        type="number"
        placeholder="Skill experience"
        {...register("skill.experience")}
      />
      {errors.skill?.experience && <p>{errors.skill.experience.message}</p>}
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};
export default UserForm;


