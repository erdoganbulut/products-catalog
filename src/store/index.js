import moduleLang from './modules/lang';
import moduleCatalogs from './modules/catalogs';
import moduleCategories from './modules/categories';
import moduleProducts from './modules/products';
import moduleSubCategories from './modules/subCategories';
import moduleFunctions from './modules/functions';
import moduleSeries from './modules/series';
import moduleMenu from './modules/menu';
import moduleProductDetail from './modules/productDetail';
import moduleAuth from './modules/auth';
import moduleList from './modules/list';
import moduleInners from './modules/inners';
import modulePreloader from './modules/preloader';

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
    product: moduleProductDetail,
    auth: moduleAuth,
    list: moduleList,
    inners: moduleInners,
    preloader: modulePreloader,
  },
};
