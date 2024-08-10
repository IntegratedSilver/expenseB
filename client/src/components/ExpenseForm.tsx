import categories from "../categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z
  .object({
    id: z.number().default(0),
    description: z.string().min(3, { message: "Need at least 3 letters" }),
    amount: z.number(),
    category: z.string(),
  })
  .refine((data) => data.category !== "Select a Category", {
    message: "Pick a Category",
    path: ["category"],
  });
type FormData = z.infer<typeof schema>;
interface ExpenseProps {
  onHelpSubmit: (data: FormData) => void;
}
const ExpenseForm = ({ onHelpSubmit }: ExpenseProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  console.log("These are your errors: ", errors);
  return (
    <>
      <form onSubmit={handleSubmit(onHelpSubmit)}>
        <div className="col mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            placeholder=""
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="col mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            placeholder="0"
            className="form-control"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        <div className="col ">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            name="category"
            className="form-select"
          >
            <option>Select a Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <button className="btn btn-outline-success " type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default ExpenseForm;
