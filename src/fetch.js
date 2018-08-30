import { initializeStore, paginate, configurePageParams } from '@orange-marmalade/paginate-this';
import { fetchCreator } from './api';

configurePageParams({
  perPage: 'results_per_page',
  sortOrder: 'sort_reverse'
});

function fetchRecipes(pageInfo) {
  return () => fetchCreator('/documentation/#get-all-characters')(pageInfo.query)
}

initializeStore()
paginate({ 
	listId: 'recipeGrid', 
	fetch: fetchRecipes 
})