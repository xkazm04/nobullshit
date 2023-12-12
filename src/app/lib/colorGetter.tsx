import { categories } from "@/data/enums";

export const getCategoryColor = (categoryId) => {
    const category = categories.find(category => category.id === categoryId);
    return category ? category.color : 'black'; // default color if category not found
};
