import Home from '@pages/Home';
import Products from '@pages/Products';
import ProductsDetail from '@pages/ProductsDetail';
import MyShoppingCart from '@pages/MyShoppingCart';
import SettlementPage from '@pages/SettlementPage';
import OrderDetails from '@pages/OrderDetails';
import MyCollection from '@pages/MyCollection';
import MyEvaluation from '@pages/MyEvaluation';
import MyOrder from '@pages/MyOrder';
import WebsiteDescription from '@pages/WebsiteDescription';
import UserCenter from '@pages/UserCenter';
import Message from '@pages/Message';
import BrandList from '@pages/Admin/productsManage/brandList';
import ProductList from '@pages/Admin/productsManage/productList/list';
import OrdersList from '@pages/Admin/ordersManage/orderList/list';
import UsersManageList from '@pages/Admin/usersManage/userList/list';
import CommentsManageList from '@pages/Admin/commentsManage/commentList/list';
import AdminList from '@pages/Admin/adminList';

// auth 登录权限
// noDirectAccess 禁止直接访问
export default [
    { 
        id: 1,
        path: '/views',
        redirect: '/views/home',
        title: '首页'
    },
    { 
        id: 2,
        path: '/views/home',
        name: 'Home',
        component: Home,
        title: '首页'
    },
    { 
        id: 3,
        path: '/views/products',
        name: 'Products',
        component: Products,
        title: '杂货铺'
    },
    { 
        id: 4,
        path: '/views/web',
        name: 'WebsiteDescription',
        component: WebsiteDescription,
        title: '网站说明'
    },
    { 
        id: 5,
        path: '/views/message',
        name: 'Message',
        component: Message,
        title: '留言'
    },
    { 
        id: 6,
        path: '/views/cart',
        name: 'MyShoppingCart',
        component: MyShoppingCart,
        title: '我的购物车',
        noDirectAccess: true
    },
    { 
        id: 7,
        path: '/views/order',
        name: 'MyOrder',
        component: MyOrder,
        title: '我的订单',
        noDirectAccess: true
    },
    { 
        id: 8,
        path: '/views/collection',
        name: 'MyCollection',
        component: MyCollection,
        title: '我的收藏',
        noDirectAccess: true
    },
    { 
        id: 9,
        path: '/views/user',
        name: 'UserCenter',
        component: UserCenter,
        title: '用户中心',
        noDirectAccess: true
    },
    { 
        id: 10,
        path: '/views/products/detail/:id',
        name: 'ProductsDetail',
        component: ProductsDetail,
        title: '商品详情'
    },
    { 
        id: 11,
        path: '/views/products/cart/settlement',
        name: 'SettlementPage',
        component: SettlementPage,
        title: '结算页',
        noDirectAccess: true
    },
    { 
        id: 12,
        path: '/views/products/cart/orderDetails',
        name: 'OrderDetails',
        component: OrderDetails,
        title: '订单详情',
        noDirectAccess: true
    },
    { 
        id: 13,
        path: '/views/products/cart/evaluate',
        name: 'MyEvaluation',
        component: MyEvaluation,
        title: '我的评价',
        noDirectAccess: true
    },
    { 
        id: 14,
        path: '/views/admin',
        redirect: '/views/admin/brand',
        title: '商城后台',
        noDirectAccess: true
    },
    {
        id: 15,
        path: '/views/admin/brand',
        name: 'BrandList',
        component: BrandList,
        title: '商品管理-品牌'
    },
    {
        id: 16,
        path: '/views/admin/product',
        name: 'ProductList',
        component: ProductList,
        title: '商品管理-商品'
    },
    {
        id: 17,
        path: '/views/admin/order',
        name: 'OrdersList',
        component: OrdersList,
        title: '订单管理-订单'
    },
    {
        id: 18,
        path: '/views/admin/user',
        name: 'UsersManageList',
        component: UsersManageList,
        title: '用户管理-用户'
    },
    {
        id: 19,
        path: '/views/admin/comment',
        name: 'CommentsManageList',
        component: CommentsManageList,
        title: '评论管理-评论'
    },
    {
        id: 20,
        path: '/views/admin/adminList',
        name: 'AdminList',
        component: AdminList,
        title: '管理员列表'
    }
];