

export default {

    name:"jmp23-table-fields"

    ,fields_user:[
        {
            key:"userId"
            ,label:"用户ID"
            ,sortable:true
        },
        {
            key:"username"
            ,label:"用户名"
        },
        {
            key:"email"
            ,label:"邮箱"
        },
        {
            key:"mobile"
            ,label:"手机号"
        },
        {
            key:"status"
            ,label:"状态"
        },
        {
            key:"options"
            ,label:"操作"
        }
    ]


    ,fields_menu:[
        {
            key:"name"
            ,label:"菜单名"
            ,sortable:true
        },
        {
            key:"url"
            ,label:"菜单地址"
        },
        {
            key:"perms"
            ,label:"所属权限"
        },
        {
            key:"type"
            ,label:"类型"
        },
        {
            key:"options"
            ,label:"操作"
        }
    ]

    ,fields_tag:[
        {
            key:"id"
            ,label:"标签ID"
            ,sortable:true
        },
        {
            key:"name"
            ,label:"标签名称"
        },
/*        {
            key:"isDeleted"
            ,label:"是否删除"
        },*/
        {
            key:"type"
            ,label:"标签类型"
        },
        {
            key:"createTime"
            ,label:"创建时间"
        },
        {
            key:"lastUpdateTime"
            ,label:"最后更新"
        },
        {
            key:"options"
            ,label:"操作"
        }
    ]
    ,fields_article:[
        {
            key:"title"
            ,label:"资讯标题"
        },
        {
            key:"source"
            ,label:"来源"
        },
        {
            key:"author"
            ,label:"作者"
        },
        {
            key:"summary"
            ,label:"摘要"
        },
        {
            key:"coverPic"
            ,label:"主图"
        },
        {
            key:"options"
            ,label:"操作"
        }
    ]



}