import moduleLang from './modules/lang';
import moduleCatalogs from './modules/catalogs';
import moduleCategories from './modules/categories';
import moduleProducts from './modules/products';
import moduleSubCategories from './modules/subCategories';
import moduleFunctions from './modules/functions';
import moduleSeries from './modules/series';
import moduleMenu from './modules/menu';

export default {
  modules: {
    lang: moduleLang,
    catalogs: moduleCatalogs,
    categories: moduleCategories,
    products: moduleProducts,
    subCategories: moduleSubCategories,
    functions: moduleFunctions,
    series: moduleSeries,
    menu: moduleMenu,
  },
};
