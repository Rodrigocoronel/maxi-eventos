export const admin_nav =
{
    items:
    [

        {
            title: true,
            name: 'Servicios',
            wrapper: {
                element: '',
                attributes: {}    
            },
            class: ''             
        },
        {
            name: 'Registro',
            url: '/app/dashboard',
            icon: 'icon-folder-alt',
        },
        {
            title: true,
            name: 'Usuarios',
            wrapper: {
                element: '',
                attributes: {},
            },
        },
        {
            name: 'Registro',
            url: '/app/usuarios',
            icon: 'icon-user',
        },
        { divider: true, },
        {
            name: 'SALIR',
            url: '/app/logout',
            icon: 'icon-logout',
        },
    ],
};

export const tecnico_nav =
{
    items:
    [

        {
            title: true,
            name: 'Servicios',
            wrapper: {
                element: '',
                attributes: {}    
            },
            class: ''             
        },
        {
            name: 'Registro',
            url: '/app/dashboard',
            icon: 'icon-folder-alt',
        },
        { divider: true, },
        {
            name: 'SALIR',
            url: '/app/logout',
            icon: 'icon-logout',
        },
    ],
};
