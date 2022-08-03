import Home from '@pages/home';
import Products from '@pages/products';
import ProductsDetail from '@pages/products-detail';
import MyShoppingCart from '@pages/shopping-cart';
import SettlementPage from '@pages/settlement-page';
import OrderDetails from '@pages/order-details';
import MyCollection from '@pages/my-collection';
import MyEvaluation from '@pages/my-evaluation';
import MyOrder from '@pages/my-order';
import WebsiteDescription from '@pages/website-description';
import UserCenter from '@pages/user-center';
import Message from '@pages/message';
import BrandList from '@pages/admin/products-manage/brand-list';
import ProductList from '@pages/admin/products-manage/product-list';
import OrdersList from '@pages/admin/orders-manage/order-list';
import UsersManageList from '@pages/admin/users-manage/user-list/list';
import CommentsManageList from '@pages/admin/comments-manage/comment-list/list';
import AdminList from '@pages/admin/admin-list';

/**
 * 核心页面路由
 * 
 * isOpen - 是否有权限访问
 */
export default [
    { 
        id: 1,
        path: '/views',
        redirect: '/views/home',
        title: '首页',
        isOpen: true,
    },
    { 
        id: 2,
        path: '/views/home',
        name: 'Home',
        component: Home,
        title: '首页',
        isOpen: true,
    },
    { 
        id: 3,
        path: '/views/products',
        name: 'Products',
        component: Products,
        title: '杂货铺',
        isOpen: true,
    },
    { 
        id: 4,
        path: '/views/web',
        name: 'WebsiteDescription',
        component: WebsiteDescription,
        title: '网站说明',
        isOpen: true,
    },
    { 
        id: 5,
        path: '/views/message',
        name: 'Message',
        component: Message,
        title: '留言',
        isOpen: true,
    },
    { 
        id: 6,
        path: '/views/cart',
        name: 'MyShoppingCart',
        component: MyShoppingCart,
        title: '我的购物车',
        isOpen: false,
    },
    { 
        id: 7,
        path: '/views/order',
        name: 'MyOrder',
        component: MyOrder,
        title: '我的订单',
        isOpen: false,
    },
    { 
        id: 8,
        path: '/views/collection',
        name: 'MyCollection',
        component: MyCollection,
        title: '我的收藏',
        isOpen: false,
    },
    { 
        id: 9,
        path: '/views/user',
        name: 'UserCenter',
        component: UserCenter,
        title: '用户中心',
        isOpen: false,
    },
    { 
        id: 10,
        path: '/views/products/detail/:id',
        name: 'ProductsDetail',
        component: ProductsDetail,
        title: '商品详情',
        isOpen: true,
    },
    { 
        id: 11,
        path: '/views/products/cart/settlement',
        name: 'SettlementPage',
        component: SettlementPage,
        title: '结算页',
        isOpen: false,
    },
    { 
        id: 12,
        path: '/views/products/cart/orderDetails',
        name: 'OrderDetails',
        component: OrderDetails,
        title: '订单详情',
        isOpen: false,
    },
    { 
        id: 13,
        path: '/views/products/cart/evaluate',
        name: 'MyEvaluation',
        component: MyEvaluation,
        title: '我的评价',
        isOpen: false,
    },
    { 
        id: 14,
        path: '/views/admin',
        redirect: '/views/admin/brand',
        title: '商城后台',
        isOpen: false,
    },
    {
        id: 15,
        path: '/views/admin/brand',
        name: 'BrandList',
        component: BrandList,
        title: '商品管理-品牌',
        isOpen: false,
    },
    {
        id: 16,
        path: '/views/admin/product',
        name: 'ProductList',
        component: ProductList,
        title: '商品管理-商品',
        isOpen: false,
    },
    {
        id: 17,
        path: '/views/admin/order',
        name: 'OrdersList',
        component: OrdersList,
        title: '订单管理-订单',
        isOpen: false,
    },
    {
        id: 18,
        path: '/views/admin/user',
        name: 'UsersManageList',
        component: UsersManageList,
        title: '用户管理-用户',
        isOpen: false,
    },
    {
        id: 19,
        path: '/views/admin/comment',
        name: 'CommentsManageList',
        component: CommentsManageList,
        title: '评论管理-评论',
        isOpen: false,
    },
    {
        id: 20,
        path: '/views/admin/adminList',
        name: 'AdminList',
        component: AdminList,
        title: '管理员列表',
        isOpen: false,
    }
];