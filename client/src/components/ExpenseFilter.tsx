import categories from "../categories";
interface FilterProps {
  onSelectedCategory: (category: string) => void;
}
const ExpenseFilter = ({ onSelectedCategory }: FilterProps) => {
  return (
    <>
      <div className="col mb-3">
        <select
          className="form-select"
          onChange={(e) => onSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ExpenseFilter;
