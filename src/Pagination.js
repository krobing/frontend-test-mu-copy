import React from 'react';
import { Flipper, decorators } from '@orange-marmalade/paginate-this';

const renderItems = results => results.map(record => (
	<li key={record.id}>
		<div>
			<img src={record.image} alt={record.name} />
			<p>{record.name}</p>
		</div>
	</li>
));

const Pagination = ({ listId, results, isLoading }) => (
	<div className="main-content">
		<Flipper listId={listId} />
		{ isLoading && <span>Cargando...</span> }
		<ul className="list-items">
			{ renderItems(results) }
		</ul>
    	<Flipper listId={listId} />
    </div>
);

export default decorators.tabulate(Pagination)