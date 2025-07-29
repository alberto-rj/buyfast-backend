import { createCategories } from './categories';
import { createUsers } from './users';

(async () => {
  try {
    await createUsers();
    await createCategories();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
