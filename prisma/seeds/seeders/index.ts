import { createCategories } from './categories';
import { createProducts } from './products';
import { createUsers } from './users';

(async () => {
  try {
    await createUsers();
    await createCategories();
    await createProducts();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
