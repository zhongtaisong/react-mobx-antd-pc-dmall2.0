export interface IFormProps {
    /**
     * 品牌 - 菜单状态
     */
    brandMenu?: boolean;
    /**
     * 品牌 - 操作权限
     */
    brandBtn?: Array<string>;
    /**
     * 商品 - 菜单状态
     */
    productMenu?: boolean;
    /**
     * 商品 - 操作权限
     */
    productBtn?: Array<string>;
    /**
     * 订单 - 菜单状态
     */
    orderMenu?: boolean;
    /**
     * 订单 - 操作权限
     */
    orderBtn?: Array<string>;
    /**
     * 评价 - 菜单状态
     */
    commentMenu?: boolean;
    /**
     * 评价 - 操作权限
     */
    commentBtn?: Array<string>;
    /**
     * 用户 - 菜单状态
     */
    userMenu?: boolean;
    /**
     * 用户 - 操作权限
     */
    userBtn?: Array<string>;
    /**
     * 权限 - 菜单状态
     */
    adminMenu?: boolean;
    /**
     * 权限 - 操作权限
     */
    adminBtn?: Array<string>;
    /**
     * 当前选中角色
     */
    role?: '1' | '10' | '100';
}