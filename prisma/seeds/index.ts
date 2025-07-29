import { createCategories } from './categories';
import { createUsers } from './users';

const main = async () => {
  await createUsers();
  await createCategories();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
