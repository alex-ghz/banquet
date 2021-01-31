const express = require('express');
const router = express.Router();

router.post('/getMenu', async (req, res) => {
	const { menuId } = req.body;

	getMenu(menuId)
		.then(menu => getCategories(menu))
		.then(categories => {
			let promises = [];

			categories.forEach(category => {
				promises.push(new Promise(resolve => {
					const categoryDishes = category.relation('dishes');

					categoryDishes.query()
								  .find()
								  .then(dishes => {
									  resolve({
										  category: {
											  objectId: category.toJSON().objectId,
											  ...category.attributes
										  },
										  dishes: openDishes(dishes)
									  });
								  });
				}));
			});

			Promise.all(promises)
				   .then((values) => {
					   res.json({ menu: values });
				   });
		});

});

router.post('/dishAvailability', (req, res) => {
	const { dishId, value } = req.body;

	if ( !!dishId === false ) {
		return;
	}

	const Dish = Parse.Object.extend("Dish");
	const dishQuery = new Parse.Query(Dish);

	dishQuery.get(dishId)
			 .then(dish => {
				 dish.set("available", value);

				 dish.save()
					 .then(response => {
						 res.json({ msg: "ok" });
					 });
			 });
});

router.post('/getDish', (req, res) => {
	const { dishId } = req.body;

	if ( !!dishId === false ) {
		return;
	}

	const Dish = Parse.Object.extend("Dish");
	const dishQuery = new Parse.Query(Dish);

	dishQuery.get(dishId)
			 .then(dish => {
				 res.json({ dish: dish.attributes });
			 });

});

router.post('/saveCategories', (req, res) => {
	const { menuId, categories } = req.body;

	getMenu(menuId)
		.then(menu => {
			getCategories(menu)
				.then(dbCategories => categoriesSyncer(menu, dbCategories, categories))
				.then(synced => {
					res.status(200).json({ synced: synced });
				});
		});
});

router.post('/addDish', (req, res) => {
	const { dishId } = req.body;

	if ( dishId === 'null' ) {
		addDish(req, res);
	} else {
		editDish(req, res);
	}
});

addDish = (req, res) => {
	saveDish(req, res);
}

editDish = (req, res) => {
	saveEditedDish(req, res);
}

function saveEditedDish(req, res) {
	const { name, price, allergen, description, dishId, file } = req.body;

	const Dish = Parse.Object.extend("Dish");
	const dishQuery = new Parse.Query(Dish);

	dishQuery.get(dishId)
			 .then(dish => {
				 dish.set("price", parseInt(price, 10));
				 dish.set("name", name);
				 dish.set("allergens", allergen);
				 dish.set("description", description);
				 dish.set("imgURL", file);

				 dish.save()
					 .then(updatedDish => {
						 res.json({ msg: "ok" });
					 });
			 });
}

function saveDish(req, res) {
	const { name, price, allergen, description, chefId, categoryId, file } = req.body;

	const Chef = Parse.Object.extend("Chef");
	const queryChef = new Parse.Query(Chef);

	queryChef.get(chefId)
			 .then(chef => {
				 const MenuCategory = Parse.Object.extend("MenuCategory");
				 const categoryQuery = new Parse.Query(MenuCategory);

				 categoryQuery.get(categoryId)
							  .then(category => {
								  const Dish = Parse.Object.extend("Dish");
								  const dish = new Dish();

								  dish.set("chef", chef);
								  dish.set("price", parseInt(price, 10));
								  dish.set("available", false);
								  dish.set("name", name);
								  dish.set("allergens", allergen);
								  dish.set("description", description);
								  dish.set("category", category);
								  dish.set("imgURL", file);

								  dish.save()
									  .then(newDish => {
										  const categoryRelation = category.relation("dishes");
										  categoryRelation.add(newDish);

										  category.save()
												  .then(result => {
													  res.json({ res: result });
												  });
									  });

							  });
			 });
}

function saveImage(file) {
	return new Promise(resolve => {
		const userFileName = file.name;

		const data = Array.from(Buffer.from(file.data, 'binary'));
		const parseFile = new Parse.File(userFileName, data);

		parseFile.save()
				 .then(result => {
					 resolve(result.url());
				 });
	});
}

categoriesSyncer = (menu, dbCategories, categories) => {
	return new Promise(resolve => {
		const MenuCategory = Parse.Object.extend("MenuCategory");

		let promises = [];

		categories.forEach((category, index, arr) => {
			promises.push(new Promise(resolve => {
				let selectedDbCategory = dbCategories[index];

				if ( category.new ) {
					// insert new category
					let indexNew = dbCategories.length;

					let newCategory = new MenuCategory();

					newCategory.set('name', category.name);
					newCategory.set('index', indexNew);

					newCategory.save()
							   .then(savedCategory => {
								   let menuRelation = menu.relation('categories');
								   menuRelation.add(savedCategory);

								   menu.save()
									   .then(result => resolve(result));
							   });
				} else {
					selectedDbCategory.set('name', category.name);

					selectedDbCategory.save()
									  .then(result => resolve(result));
				}
			}));
		});

		Promise.all(promises)
			   .then(values => {
				   resolve(true);
			   });
	});

}

openDishes = dishes => {
	return dishes.map(dish => {
		return {
			...dish.attributes,
			objectId: dish.toJSON().objectId
		}
	});
}

getCategories = menu => {
	return new Promise(resolve => {
		const menuCategories = menu.relation('categories');

		menuCategories.query()
					  .ascending('index')
					  .find()
					  .then(categories => resolve(categories));
	})
}

getMenu = menuId => {
	return new Promise(resolve => {
		const Menu = Parse.Object.extend("Menu");
		const queryMenu = new Parse.Query(Menu);

		queryMenu.equalTo('objectId', menuId);

		queryMenu.find()
				 .then(result => result[0])
				 .then(menu => {
					 resolve(menu);
				 });
	});
};

function getFileExtension(fileName) {
	let arr = fileName.split('.');
	return arr[arr.length - 1];
}

module.exports = router;