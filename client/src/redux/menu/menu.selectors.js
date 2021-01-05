import { createSelector } from "reselect";

const selectMenu = state => state.menu;

export const selectIsCollectionFetching = createSelector(
	[selectMenu],
	menu => menu.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
	[selectMenu],
	menu => !!menu.categories
);

export const selectMenuCategoriesNames = createSelector(
	[selectMenu],
	menu => menu.categories.map(function (item) {
		return item.category.name;
	})
);

export const selectMenuCategories = createSelector(
	[selectMenu],
	menu => menu.categories.map(function (item) {
		return item.category;
	})
);

export const selectMenuCategoryFull = createSelector(
	[selectMenu],
	menu => menu.categories
);

export const selectActiveCategoryDishes = createSelector(
	[selectMenu],
	menu => menu.selectedCategory.dishes
);

export const selectActiveCategory = createSelector(
	[selectMenu],
	menu => menu.selectedCategory.category
);

export const selectSelectedCategory = createSelector(
	[selectMenu],
	menu => menu.selectedCategory
);

