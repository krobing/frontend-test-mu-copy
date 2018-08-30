import { initializeStore, paginate, configurePageParams } from '@orange-marmalade/paginate-this';
import { fetchCreator } from './api';

configurePageParams({
  perPage: ''
});

function fetchRecipes(pageInfo) {
  return () => fetchCreator('/character/')(pageInfo.query).then(({data}) => ({
  	data: {
        total_count: data.info.count,
        results: data.results
     }
  }))
}

initializeStore();
paginate({ 
	listId: 'recipeGrid', 
	fetch: fetchRecipes 
})